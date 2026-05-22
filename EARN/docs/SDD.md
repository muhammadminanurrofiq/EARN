# Software Design Document (SDD) - EARN

## 1. Arsitektur Sistem Global (Event-Driven)
EARN menggunakan arsitektur Event-Driven 100% via protokol MQTT (tanpa HTTP REST API).
- **Cloud VPS:**
  - **Mosquitto MQTT Broker:** Mengelola seluruh pesan real-time.
  - **Node.js Worker:** Menerima pesan MQTT, memvalidasi, dan menyimpannya ke database.
  - **PostgreSQL Database:** Penyimpanan persisten (dengan Prisma ORM).
  - **Next.js Web Dashboard:** UI monitoring terpusat yang berjalan di browser, terhubung ke MQTT via WebSockets.
- **Edge Device (RVM):**
  - **Compute Unit:** Raspberry Pi (Fase Dev) / NVIDIA Jetson (Fase Produksi). Menjalankan **Python GUI** dan model deteksi objek.
  - **Microcontroller:** ESP32, berkomunikasi dengan Compute Unit via koneksi UART Serial.

## 2. Topologi Perangkat Keras (ESP32)
- **Sensor Suhu (DHT11):** Memantau suhu & kelembaban kabin RVM.
- **Sensor Jarak (Ultrasonic):** Mengukur ketinggian tumpukan botol di dalam bak penampungan.
- **Sensor Laser:** Pembatas batas atas (jika terputus = penampungan penuh).
- **Aktuator (Motor DC Stepper):** Mengerakkan buka tutup alas penampung botol sementara (6800 step).
- **Indikator (LED WS2812B):** Menyala hijau (valid), merah (invalid).

## 3. Skema Database (ERD) - Prisma
Tabel Utama:
- **Users:** `id` (PK), `role` (Enum: Customer, SuperAdmin, Admin, Operator, Tenant), `email`, `phone`, `poin`, `created_at`.
- **RVM_Machines:** `id_mesin` (PK), `lokasi`, `status` (Online/Penuh/Maintenance), `suhu`, `kapasitas_maks`, `kapasitas_saat_ini`.
- **Assignments:** `id_tugas` (PK), `id_mesin` (FK), `id_operator` (FK), `jenis_tugas` (Instalasi/Maintenance), `status`.
- **Transactions:** `id_transaksi` (PK), `id_user` (FK), `id_mesin` (FK), `poin_didapat`, `timestamp`.
