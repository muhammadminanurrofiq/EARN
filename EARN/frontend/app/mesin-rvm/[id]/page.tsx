"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { getMesinById, updateMesinSensor, updateStatusMesin } from '@/app/actions/rvm';

export default function RvmDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const [mesin, setMesin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [strokeDashoffset, setStrokeDashoffset] = useState(565.48);

  // Sensor config state
  const [isSensorModalOpen, setIsSensorModalOpen] = useState(false);
  const [sensors, setSensors] = useState<any[]>([]);
  const [savingSensor, setSavingSensor] = useState(false);
  const [newSensor, setNewSensor] = useState({ icon: 'sensors', name: '', dataType: 'Percentage', sensorType: '', barcode: '' });
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchMesin();
  }, [id]);

  const fetchMesin = async () => {
    setLoading(true);
    const res = await getMesinById(id);
    if (res.success && res.data) {
      setMesin(res.data);
      let parsedSensors: any[] = [];
      if (Array.isArray(res.data.sensor)) {
        parsedSensors = res.data.sensor;
      } else if (res.data.sensor && typeof res.data.sensor === 'object') {
        // Fallback for old object-based sensors
        parsedSensors = Object.entries(res.data.sensor).map(([k, v]) => ({
          name: k,
          icon: 'sensors',
          value: v,
          dataType: 'Percentage'
        }));
      }
      setSensors(parsedSensors);
    }
    setLoading(false);
  };

  const handleToggleMaintenance = async () => {
    if (!mesin) return;
    const newStatus = mesin.status === 'MAINTENANCE' ? 'Online' : 'MAINTENANCE';
    await updateStatusMesin(id, newStatus);
    fetchMesin();
  };

  const handleSaveSensor = async (sensorList: any[]) => {
    setSavingSensor(true);
    await updateMesinSensor(id, sensorList);
    setIsSensorModalOpen(false);
    fetchMesin();
    setSavingSensor(false);
  };

  const handleAddSensorSubmit = () => {
    if (!newSensor.name) return alert('Nama sensor wajib diisi!');
    const updatedSensors = [...sensors, { ...newSensor, value: 0 }];
    handleSaveSensor(updatedSensors);
    setNewSensor({ icon: 'sensors', name: '', dataType: 'Percentage', sensorType: '', barcode: '' });
  };

  const handleRemoveSensor = (index: number) => {
    if (confirm('Yakin ingin menghapus sensor ini?')) {
      const updatedSensors = sensors.filter((_, i) => i !== index);
      handleSaveSensor(updatedSensors);
    }
  };

  const predefinedSensors = [
    { name: 'Sensor MQ-2 (asap & LPG)', icon: 'co2' },
    { name: 'Sensor MQ-3 (alkohol)', icon: 'science' },
    { name: 'Sensor MQ-4 (metana/gas alam)', icon: 'co2' },
    { name: 'Sensor MQ-5 (LPG & gas kota)', icon: 'co2' },
    { name: 'Sensor MQ-6 (LPG & butana)', icon: 'co2' },
    { name: 'Sensor MQ-7 (karbon monoksida/CO)', icon: 'co2' },
    { name: 'Sensor MQ-8 (hidrogen)', icon: 'science' },
    { name: 'Sensor MQ-9 (CO & gas)', icon: 'co2' },
    { name: 'Sensor MQ-131 (ozon)', icon: 'air' },
    { name: 'Sensor MQ-135 (kualitas udara/amonia/benzena)', icon: 'air' },
    { name: 'Sensor MQ-136 (hidrogen sulfida)', icon: 'science' },
    { name: 'Sensor MQ-137 (amonia)', icon: 'science' },
    { name: 'Sensor MQ-138 (aseton/uap organik)', icon: 'science' },
    { name: 'Sensor MQ-214 (metana)', icon: 'co2' },
    { name: 'Sensor MQ-303A (alkohol portabel)', icon: 'science' },
    { name: 'Sensor suhu DHT11', icon: 'device_thermostat' },
    { name: 'Sensor suhu DHT22', icon: 'device_thermostat' },
    { name: 'Sensor suhu DS18B20 (waterproof)', icon: 'device_thermostat' },
    { name: 'Sensor suhu LM35', icon: 'device_thermostat' },
    { name: 'Sensor suhu & tekanan BMP280', icon: 'compress' },
    { name: 'Sensor suhu & kelembaban SHT31', icon: 'humidity_percentage' },
    { name: 'Sensor suhu inframerah MLX90614', icon: 'device_thermostat' },
    { name: 'Sensor termokopel MAX6675', icon: 'device_thermostat' },
    { name: 'Sensor ultrasonik HC-SR04', icon: 'settings_input_antenna' },
    { name: 'Sensor ultrasonik US-100', icon: 'settings_input_antenna' },
    { name: 'Sensor jarak laser VL53L0X (ToF)', icon: 'visibility' },
    { name: 'Sensor inframerah tcrt5000', icon: 'visibility' },
    { name: 'Sensor rintangan inframerah KY-032', icon: 'settings_input_antenna' },
    { name: 'Sensor gerak PIR HC-SR501', icon: 'directions_run' },
    { name: 'Sensor gerak mikro RCWL-0516', icon: 'sensors' },
    { name: 'Sensor akselerometer & giroskop MPU6050', icon: 'vibration' },
    { name: 'Sensor akselerometer MPU9250', icon: 'vibration' },
    { name: 'Sensor kompas HMC5883L', icon: 'explore' },
    { name: 'Sensor magnetik Hall Effect A3144', icon: 'magnet' },
    { name: 'Sensor kelembaban tanah YL-69', icon: 'water_drop' },
    { name: 'Sensor kelembaban tanah kapasitif', icon: 'water_drop' },
    { name: 'Sensor tingkat air (water level)', icon: 'waves' },
    { name: 'Sensor aliran air YF-S201', icon: 'water' },
    { name: 'Sensor hujan (rain sensor)', icon: 'thunderstorm' },
    { name: 'Sensor tekanan barometrik MS5611', icon: 'compress' },
    { name: 'Sensor cahaya LDR', icon: 'light_mode' },
    { name: 'Sensor cahaya lux BH1750', icon: 'wb_sunny' },
    { name: 'Sensor warna TCS3200', icon: 'palette' },
    { name: 'Sensor warna TCS34725', icon: 'palette' },
    { name: 'Sensor detak jantung MAX30102', icon: 'favorite' },
    { name: 'Sensor pulsa (pulse sensor)', icon: 'favorite' },
    { name: 'Sensor sidik jari AS608', icon: 'fingerprint' },
    { name: 'Sensor sidik jari kapasitif R307', icon: 'fingerprint' },
    { name: 'Modul kamera OV7670', icon: 'camera_alt' },
    { name: 'Modul kamera ESP32-Cam', icon: 'camera_alt' },
    { name: 'Modul pembaca RFID RC522', icon: 'nfc' },
    { name: 'Modul pembaca barcode GM65', icon: 'qr_code_scanner' },
    { name: 'Sensor berat load cell', icon: 'monitor_weight' },
    { name: 'Modul penguat load cell HX711', icon: 'developer_board' },
    { name: 'Sensor suara KY-037', icon: 'mic' },
    { name: 'Sensor suara KY-038', icon: 'mic' },
    { name: 'Sensor getaran SW-420', icon: 'vibration' },
    { name: 'Sensor kemiringan SW-520D', icon: 'screen_rotation' },
    { name: 'Sensor sentuh kapasitif TTP223', icon: 'touch_app' },
    { name: 'Sensor flex (tekuk)', icon: 'gesture' },
    { name: 'Sensor tekanan film tipis FSR402', icon: 'compress' },
    { name: 'Sensor pH air pH-4502C', icon: 'science' },
    { name: 'Sensor kekeruhan air TSW-30', icon: 'opacity' },
    { name: 'Sensor TDS air', icon: 'opacity' },
    { name: 'Penerima GPS NEO-6M', icon: 'gps_fixed' },
    { name: 'Penerima GPS NEO-7M', icon: 'gps_fixed' },
    { name: 'Potensiometer rotari', icon: 'rotate_right' },
    { name: 'Rotary encoder KY-040', icon: 'rotate_right' },
    { name: 'Motor servo SG90', icon: 'settings' },
    { name: 'Motor servo MG996R', icon: 'settings' },
    { name: 'Motor servo continuous', icon: 'settings' },
    { name: 'Motor stepper NEMA 17', icon: 'precision_manufacturing' },
    { name: 'Motor stepper 28BYJ-48', icon: 'precision_manufacturing' },
    { name: 'Driver motor stepper A4988', icon: 'developer_board' },
    { name: 'Driver motor stepper TB6600', icon: 'developer_board' },
    { name: 'Motor DC 5V', icon: 'settings' },
    { name: 'Motor DC coreless', icon: 'settings' },
    { name: 'Motor gear box', icon: 'settings' },
    { name: 'Driver motor DC L298N', icon: 'developer_board' },
    { name: 'Driver motor DC L293D', icon: 'developer_board' },
    { name: 'Driver motor BTS7960', icon: 'developer_board' },
    { name: 'Aktuator linier elektrik', icon: 'height' },
    { name: 'Solenoid pemukul', icon: 'eject' },
    { name: 'Solenoid kunci pintu', icon: 'lock' },
    { name: 'Katup solenoid air', icon: 'water_drop' },
    { name: 'Silinder pneumatik kerja tunggal', icon: 'air' },
    { name: 'Silinder pneumatik kerja ganda', icon: 'air' },
    { name: 'Katup kontrol pneumatik', icon: 'air' },
    { name: 'Kompresor udara mini', icon: 'air' },
    { name: 'Pompa air DC mini', icon: 'water' },
    { name: 'Pompa air peristaltik', icon: 'opacity' },
    { name: 'Pompa diafragma 12V', icon: 'water' },
    { name: 'Kipas pendingin DC', icon: 'mode_fan' },
    { name: 'Modul relay 1-channel', icon: 'toggle_on' },
    { name: 'Modul relay 4-channel', icon: 'toggle_on' },
    { name: 'Solid state relay (SSR)', icon: 'power' },
    { name: 'Buzzer piezoelektrik pasif', icon: 'volume_up' },
    { name: 'Buzzer piezoelektrik aktif', icon: 'volume_up' },
    { name: 'Speaker mini 8 ohm', icon: 'speaker' },
    { name: 'Lampu LED diffuser', icon: 'lightbulb' },
    { name: 'Lampu LED super bright', icon: 'lightbulb' },
    { name: 'Strip LED addressable WS2812B', icon: 'wb_incandescent' },
    { name: 'Strip LED RGB 5050', icon: 'palette' },
    { name: 'Modul laser dioda', icon: 'flare' },
    { name: 'Elemen pemanas (PTC)', icon: 'local_fire_department' },
    { name: 'Pendingin peltier TEC1', icon: 'ac_unit' },
    { name: 'Modul vibrasi koin', icon: 'vibration' },
    { name: 'Layar LCD 16x2', icon: 'desktop_windows' },
    { name: 'Layar LCD 20x4', icon: 'desktop_windows' },
    { name: 'Layar OLED SSD1306', icon: 'tv' },
    { name: 'Layar TFT ST7735', icon: 'tv' },
    { name: 'Layar e-ink', icon: 'chrome_reader_mode' }
  ];
  const filteredSensors = newSensor.name ? predefinedSensors.filter(s => s.name.toLowerCase().includes(newSensor.name.toLowerCase())) : predefinedSensors;

  let statusText = mesin?.status || 'OFFLINE';
  let statusColor = statusText === 'Online' ? 'primary' : (statusText === 'MAINTENANCE' || statusText === 'FULL' ? 'error' : 'outline');
  let capacity = mesin?.kapasitas || 0;
  
  useEffect(() => {
    const circumference = 2 * Math.PI * 90;
    const targetOffset = circumference * (1 - capacity / 100);
    const timer = setTimeout(() => {
      setStrokeDashoffset(targetOffset);
    }, 300);
    return () => clearTimeout(timer);
  }, [capacity]);

  if (loading && !mesin) {
    return <div className="w-full flex items-center justify-center min-h-screen"><span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span></div>;
  }

  return (
    <div className="w-full flex flex-col min-h-screen relative bg-background text-on-surface font-body-md pb-10">
      {/* Background Decorative Elements */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-[-1]"></div>
      <div className="fixed bottom-[-10%] left-[15%] w-[400px] h-[400px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none z-[-1]"></div>
      <style>{`
        .glass-card {
            background: rgba(22, 29, 26, 0.4);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(78, 222, 163, 0.1);
            transition: all 0.3s ease;
        }
        .glass-card:hover {
            border-color: rgba(78, 222, 163, 0.3);
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.05);
        }
        .organic-glow-primary {
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.15);
        }
        .gauge-container {
            position: relative;
            width: 220px;
            height: 220px;
        }
        .gauge-svg {
            transform: rotate(-90deg);
        }
        .progress-circle {
            transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
            stroke-dasharray: 565.48;
        }
        @keyframes pulse-emerald {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .status-pulse {
            animation: pulse-emerald 2s infinite ease-in-out;
        }
      `}</style>

      {/* Shared Sticky Navbar */}
      <Header
        title={`${id} Detail`}
        subtitle="Monitoring Real-time RVM Unit"
        icon="memory"
        leftExtra={
          <Link href="/mesin-rvm" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group w-fit text-[10px] font-bold uppercase tracking-wider font-label bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/30">
            <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="hidden sm:inline">Kembali</span>
          </Link>
        }
      />

      {/* Page Content */}
      <div className="px-8 py-6 max-w-[1600px] mx-auto w-full">

        {/* Hero Header */}
        <div className="glass-card rounded-2xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -z-10 rounded-full"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <h1 className="font-headline text-4xl font-bold text-primary">{id}</h1>
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 bg-${statusColor}/10 text-${statusColor} border border-${statusColor}/20 rounded-full font-label text-xs font-bold`}>
                  <span className={`w-2 h-2 bg-${statusColor} rounded-full ${statusText !== 'OFFLINE' ? 'status-pulse' : ''}`}></span>
                  {statusText}
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-xl">location_on</span>
                <span className="text-sm font-medium">{mesin?.lokasi || "Lokasi tidak diketahui"}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleToggleMaintenance}
                className={`flex items-center gap-2 px-8 py-2.5 rounded-xl transition-all duration-300 group ${
                  mesin?.status === 'MAINTENANCE' 
                    ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(78,222,163,0.3)] hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-surface-container-highest text-on-surface border border-outline-variant/30 hover:bg-surface-container-high hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-180">
                  {mesin?.status === 'MAINTENANCE' ? 'play_circle' : 'build'}
                </span>
                <span className="font-label text-xs font-bold uppercase tracking-wider">
                  {mesin?.status === 'MAINTENANCE' ? 'Reactivate' : 'Maintenance'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            
            {/* Telemetry Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="md:col-span-1 glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full">
                <h3 className="font-label text-xs font-bold text-on-surface-variant mb-6 uppercase tracking-wider">Storage Capacity</h3>
                <div className="gauge-container mb-4">
                  <svg className="gauge-svg w-full h-full" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" fill="none" r="90" stroke="#242c28" strokeWidth="12"></circle>
                    <circle 
                      className="progress-circle" 
                      cx="100" cy="100" fill="none" r="90" 
                      stroke={statusColor === 'primary' ? '#4edea3' : (statusColor === 'error' ? '#ffb4ab' : '#86948a')} 
                      strokeLinecap="round" strokeWidth="12" 
                      style={{ strokeDashoffset: strokeDashoffset }}
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`font-headline text-4xl font-bold text-${statusColor}`}>{capacity}%</span>
                    <span className="font-label text-[10px] text-on-surface-variant uppercase mt-1">Ready</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant font-medium">{Math.floor((mesin?.kapasitas_maks || 800) * capacity / 100)} / {mesin?.kapasitas_maks || 800} bottles</p>
              </div>
              
              <div className="md:col-span-1 flex flex-col gap-4">
                <button onClick={() => setIsSensorModalOpen(true)} className="flex items-center justify-center gap-2 w-full py-2 border border-dashed border-primary/40 rounded-xl text-primary hover:bg-primary/5 transition-colors font-label font-medium">
                  <span className="material-symbols-outlined text-lg">add</span>
                  <span>Add Sensor</span>
                </button>
                {sensors.map((sensor, idx) => (
                  <div key={idx} className="glass-card rounded-xl p-5 flex flex-col justify-between flex-1 relative min-h-[140px]">
                    <button onClick={() => handleRemoveSensor(idx)} className="absolute top-3 right-3 text-on-surface-variant/40 hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                    <div className="flex items-center gap-3 text-on-surface-variant mb-2">
                      <span className="material-symbols-outlined">{sensor.icon || 'sensors'}</span>
                      <span className="font-label text-sm">{sensor.name}</span>
                    </div>
                    <div>
                      <div className="font-headline text-primary text-2xl">
                        {sensor.value}{sensor.dataType === 'Percentage' ? '%' : sensor.dataType === 'Celsius' ? '°C' : ''}
                      </div>
                      <div className="text-xs text-on-surface-variant font-label">{sensor.sensorType || 'Normal Status'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Chart */}
            <div className="glass-card rounded-2xl p-6 h-96 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-label text-xs font-bold text-on-surface uppercase tracking-wider">Collection Activity (24h)</h3>
                <div className="flex items-center gap-4 text-[10px] font-label font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Plastic</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary"></span> Can</div>
                </div>
              </div>
              <div className="flex-1 relative flex items-end gap-2">
                {[40, 65, 30, 55, 90, 75, 45, 60, 80, 50, 35, 20, 40, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary/20 rounded-t hover:bg-primary transition-all group relative cursor-pointer" style={{ height: `${h}%` }}>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-surface px-2 py-1 rounded text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-primary/20">
                      {h * 2} items
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-label font-bold text-on-surface-variant">
                <span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>23:59</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Transaction List Card */}
            <div className="glass-card rounded-2xl flex flex-col h-[500px] overflow-hidden">
              <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
                <h3 className="font-label text-xs font-bold text-on-surface uppercase tracking-wider">Recent Activity</h3>
                <button className="text-primary text-[10px] font-label font-bold uppercase tracking-wider hover:underline">Export CSV</button>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/5">
                {[
                  { name: 'Plastic Bottle (Large)', time: 'Today, 14:24', pts: '+20 pts' },
                  { name: 'Aluminum Can', time: 'Today, 14:15', pts: '+15 pts' },
                  { name: 'Plastic Bottle (Small)', time: 'Today, 13:58', pts: '+10 pts' },
                  { name: 'Plastic Bottle (Large)', time: 'Today, 12:40', pts: '+20 pts' },
                  { name: 'Aluminum Can', time: 'Today, 11:20', pts: '+15 pts' },
                ].map((item, i) => (
                  <div key={i} className="px-6 py-4 hover:bg-surface-container-high/30 flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-sm">person</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-on-surface">{item.name}</div>
                        <div className="text-[10px] text-on-surface-variant font-medium">{item.time}</div>
                      </div>
                    </div>
                    <div className="text-sm font-label font-bold text-primary">{item.pts}</div>
                  </div>
                ))}
              </div>
              <Link href="/transaksi" className="p-4 bg-surface-container-high text-center font-label text-[10px] uppercase font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2">
                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Integrated Logs */}
            <div className="glass-card rounded-2xl flex-1 overflow-hidden flex flex-col min-h-[300px]">
              <div className="p-4 border-b border-outline-variant/10 flex items-center gap-2 bg-surface-container-low">
                <span className="material-symbols-outlined text-primary text-xl">terminal</span>
                <h3 className="font-label text-xs font-bold text-on-surface uppercase tracking-wider">System Logs</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 font-label text-[11px]">
                <div className="flex gap-3">
                  <span className="text-on-surface-variant/50">15:42</span>
                  <span className="text-primary font-bold">INFO</span>
                  <span className="truncate text-on-surface">Door opened for inspection.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-on-surface-variant/50">14:00</span>
                  <span className="text-primary font-bold">INFO</span>
                  <span className="truncate text-on-surface">Sensor recalibrated.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-on-surface-variant/50">12:30</span>
                  <span className="text-primary font-bold">INFO</span>
                  <span className="truncate text-on-surface">Storage level updated to 78%.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-on-surface-variant/50">10:15</span>
                  <span className="text-yellow-500 font-bold">WARN</span>
                  <span className="truncate text-on-surface">Capacity reaching 80%.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-on-surface-variant/50">08:00</span>
                  <span className="text-primary font-bold">INFO</span>
                  <span className="truncate text-on-surface">System online.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Sensor Modal */}
      {isSensorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) setIsSensorModalOpen(false); }}>
          <div className="glass-card w-full max-w-md p-6 rounded-2xl shadow-2xl border border-primary/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-xl text-primary font-bold">Add New Sensor</h3>
              <button onClick={() => setIsSensorModalOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-label text-on-surface-variant mb-1 uppercase">Sensor Icon</label>
                <div className="grid grid-cols-8 gap-2 p-3 bg-surface-container-low/50 rounded-xl border border-outline-variant/10 max-h-32 overflow-y-auto">
                  {['device_thermostat', 'humidity_percentage', 'co2', 'light_mode', 'settings_input_antenna', 'visibility', 'speed', 'water_drop', 'power', 'bolt', 'weight', 'compress', 'volume_up', 'vibration', 'memory', 'sensors', 'air', 'opacity', 'wb_sunny', 'thunderstorm', 'gas_meter', 'electric_meter', 'monitor_weight', 'science', 'explore', 'magnet', 'waves', 'water', 'palette', 'favorite', 'fingerprint', 'camera_alt', 'nfc', 'qr_code_scanner', 'developer_board', 'mic', 'screen_rotation', 'touch_app', 'gesture', 'gps_fixed', 'rotate_right', 'precision_manufacturing', 'height', 'eject', 'lock', 'mode_fan', 'toggle_on', 'speaker', 'lightbulb', 'wb_incandescent', 'flare', 'local_fire_department', 'ac_unit', 'tv', 'desktop_windows', 'chrome_reader_mode', 'directions_run'].map((ic) => (
                    <button key={ic} onClick={() => setNewSensor({...newSensor, icon: ic})} type="button" className={`flex items-center justify-center p-2 rounded-lg transition-all text-on-surface-variant hover:bg-primary/20 hover:text-primary ${newSensor.icon === ic ? 'bg-primary/20 text-primary border border-primary/30' : ''}`}>
                      <span className="material-symbols-outlined">{ic}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-label text-on-surface-variant mb-1 uppercase">Sensor Name</label>
                <div className="relative group/suggestions">
                  <input 
                    value={newSensor.name} 
                    onChange={e => setNewSensor({...newSensor, name: e.target.value})} 
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none transition-all" 
                    placeholder="e.g. Optical Sensor A" type="text" 
                  />
                  
                  {showSuggestions && (
                    <div className="absolute z-50 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-surface-container shadow-2xl border border-outline-variant/20 rounded-xl origin-top">
                      <div className="p-2 sticky top-0 text-[10px] font-label text-primary/60 uppercase tracking-widest border-b border-outline-variant/10 bg-surface-container-high/90 backdrop-blur-md">Suggestions</div>
                      {filteredSensors.length > 0 ? filteredSensors.map((s, idx) => (
                        <button key={idx} onClick={() => setNewSensor({...newSensor, name: s.name, icon: s.icon})} type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 border-b border-outline-variant/5">
                          <span className="material-symbols-outlined text-sm">{s.icon}</span> {s.name}
                        </button>
                      )) : (
                        <div className="px-4 py-3 text-xs text-on-surface-variant">Tidak ada sensor yang cocok.</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label text-on-surface-variant mb-1 uppercase">Data Type</label>
                  <select value={newSensor.dataType} onChange={e => setNewSensor({...newSensor, dataType: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none appearance-none">
                    <option value="Percentage">Percentage</option>
                    <option value="Celsius">Celsius</option>
                    <option value="Binary">Binary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-label text-on-surface-variant mb-1 uppercase">Sensor Type</label>
                  <input value={newSensor.sensorType} onChange={e => setNewSensor({...newSensor, sensorType: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" placeholder="SHT4x" type="text" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-label text-on-surface-variant mb-1 uppercase">Barcode Code</label>
                <input value={newSensor.barcode} onChange={e => setNewSensor({...newSensor, barcode: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" placeholder="BR-990-XXX" type="text" />
              </div>
              
              <button disabled={savingSensor} onClick={handleAddSensorSubmit} className="w-full bg-primary text-on-primary py-3 rounded-xl font-label font-bold uppercase mt-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                {savingSensor ? 'Menyimpan...' : 'Create Sensor'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
