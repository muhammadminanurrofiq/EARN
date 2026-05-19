const mqtt = require('mqtt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const MQTT_BROKER = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';

console.log(`Menghubungkan ke MQTT Broker di ${MQTT_BROKER}...`);
const client = mqtt.connect(MQTT_BROKER);

client.on('connect', () => {
  console.log('✅ Berhasil terhubung ke MQTT Broker');
  // Subscribe ke topik transaksi dari semua mesin RVM
  client.subscribe('earn/rvm/+/transaction', (err) => {
    if (err) {
      console.error('Gagal subscribe ke topik transaksi:', err);
    } else {
      console.log('📡 Berhasil subscribe ke earn/rvm/+/transaction');
    }
  });
});

client.on('message', async (topic, message) => {
  console.log(`📥 Menerima pesan di topik ${topic}: ${message.toString()}`);
  
  if (topic.startsWith('earn/rvm/') && topic.endsWith('/transaction')) {
    try {
      const payload = JSON.parse(message.toString());
      const { id_mesin, id_user, jumlah_botol, poin } = payload;

      // 1. Catat transaksi ke DB
      const transaksi = await prisma.transaksi.create({
        data: {
          id_user,
          id_mesin,
          jumlah_botol,
          jumlah_poin: poin,
        }
      });

      // 2. Update poin user (dengan select agar nama tersedia)
      const user = await prisma.users.update({
        where: { id_user },
        data: {
          total_poin: { increment: poin }
        },
        select: {
          id_user: true,
          nama: true,
          total_poin: true,
        }
      });

      // 3. Update kapasitas dan last_ping mesin (dengan select agar field tersedia)
      const mesin = await prisma.mesin_RVM.update({
        where: { id_mesin },
        data: {
          kapasitas_saat_ini: { increment: jumlah_botol },
          last_ping: new Date()
        },
        select: {
          id_mesin: true,
          kapasitas_saat_ini: true,
          lokasi: true,
        }
      });

      console.log(`✅ Transaksi berhasil diproses. Poin ${user.nama} bertambah ${poin}.`);

      // 4. Publish update ke Frontend Web (Topik broadcast)
      const broadcastPayload = {
        action: 'NEW_TRANSACTION',
        data: {
          transaksi,
          user: { id_user: user.id_user, nama: user.nama, total_poin: user.total_poin },
          mesin: { id_mesin: mesin.id_mesin, kapasitas_saat_ini: mesin.kapasitas_saat_ini }
        }
      };
      
      client.publish('earn/app/live/transactions', JSON.stringify(broadcastPayload));
      console.log(`📤 Broadcast update transaksi ke web frontend`);

    } catch (error) {
      console.error('❌ Terjadi kesalahan saat memproses pesan:', error);
    }
  }
});

// Seed data awal jika diperlukan
async function initSeed() {
  try {
    const userCount = await prisma.users.count();
    if (userCount === 0) {
      const u = await prisma.users.create({
        data: { id_user: 'USR-001', nama: 'Budi Santoso', email: 'budi@earn.local', password: 'hashedpassword' }
      });
      const m = await prisma.mesin_RVM.create({
        data: { id_mesin: 'M001', lokasi: 'Stasiun Pusat', kapasitas_maks: 500, kapasitas_saat_ini: 0 }
      });
      console.log('🌱 Berhasil melakukan seed data awal.');
    }
  } catch(e) {
    console.error('Gagal seed:', e);
  }
}

setTimeout(initSeed, 5000); // Tunggu DB siap
