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

## 4. Mekanisme Maintenance & Autentikasi Operator
Sistem mendukung alur *Maintenance* ganda untuk memfasilitasi kebutuhan Operator di lapangan (berdasarkan Topologi Sistem):
- **Remote (Web Dashboard):** RVM men-generate OTP Acak yang divalidasi oleh sistem via input Operator di Dashboard (memanfaatkan alur komunikasi MQTT/DB).
- **Lokal (RVM GUI):** Opsi *fallback* tanpa bergantung koneksi server, melalui *Tombol Rahasia* di layar sentuh RVM.

## 5. Antarmuka Web (Dashboard) & Desain Visual
Sistem menggunakan pendekatan *Bio-Digital Minimalism* untuk Web Dashboard:
- **Komponen Modular:** Menggunakan prinsip *glassmorphism* (mis. popup *Maintenance Modal* dengan *backdrop blur* proporsional untuk mempertahankan konteks latar).
- **Pemetaan Relasi & Alur:** Struktur Database (Prisma) dan aliran pesan *event-driven* telah didokumentasikan sepenuhnya ke dalam bentuk *Data Flow Diagram* (DFD) dan *Entity Relationship Diagram* (ERD) sebagai referensi standar pengembangan lanjutan.
