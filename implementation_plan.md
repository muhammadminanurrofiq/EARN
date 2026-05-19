# Implementasi Arsitektur Project EARN (Eco Action & Reward Network)

Project EARN adalah ekosistem Reverse Vending Machine (RVM) cerdas bertenaga Edge AI yang berjalan 100% menggunakan arsitektur Event-Driven via MQTT over WebSockets tanpa menggunakan REST API HTTP. Sistem akan dibangun di dalam lingkungan Docker di WSL, menggabungkan backend Node.js sebagai *worker*, PostgreSQL sebagai database, dan Next.js sebagai frontend SPA dengan desain Bio-Digital Minimalism.

## User Review Required

> [!IMPORTANT]
> **Arsitektur Tanpa REST API**: Karena permintaan Anda mensyaratkan komunikasi *murni* menggunakan MQTT, seluruh transaksi data dari browser (termasuk login, pengambilan data KPI, log transaksi) akan dikirimkan dan diterima melalui topik MQTT menggunakan klien MQTT.js via WebSockets. Apakah pendekatan ini sudah sesuai dengan yang Anda maksud untuk frontend? (Alternatif lain: REST API HTTP untuk fetch data historis saat awal dimuat, dan WebSockets MQTT hanya untuk menerima *live update* secara stream).

> [!WARNING]
> **Autentikasi di MQTT**: Untuk keamanan sistem *production*, Mosquitto MQTT perlu dikonfigurasi dengan otentikasi username/password dan ACL (Access Control List). Untuk tahap awal pengembangan, kita dapat mengaturnya sebagai *allow_anonymous true* sementara, lalu menambahkannya nanti. Apakah Anda setuju?

## Open Questions

1. **Topik MQTT**: Apakah Anda memiliki preferensi spesifik untuk struktur topik MQTT? (Rekomendasi saya: `earn/rvm/+/transaction` untuk transaksi dari mesin, dan `earn/app/+/data` untuk respon backend ke web).
2. **Setup Hardware**: Untuk *mocking* sisi Edge AI, apakah Anda ingin saya menyiapkan mock data generator di Node.js atau struktur folder berisi simulasi Python (NVIDIA Jetson) & C++ (ESP32) untuk referensi hardware asli?

## Proposed Changes

Proyek akan di-generate dalam subdirektori `C:\Users\Lenovo1\Documents\my_RVM\EARN` dengan struktur monorepo:

### 1. Infrastruktur Dasar (Docker)
- `docker-compose.yml`: Mengorkestrasi container: `mosquitto` (Broker), `db` (PostgreSQL), `backend` (Node.js), dan `frontend` (Next.js).
- `mosquitto/mosquitto.conf`: Konfigurasi listener port `1883` (TCP untuk mesin/Edge AI) dan port `9001` (WebSockets untuk Browser/Frontend SPA).

### 2. Database & Backend Worker (Node.js)
Backend hanya sebagai Node.js Worker tanpa express/http, langsung terhubung ke MQTT dan DB PostgreSQL via Prisma.

#### [NEW] [schema.prisma](file:///c:/Users/Lenovo1/Documents/my_RVM/EARN/backend/prisma/schema.prisma)
ERD untuk tabel:
- `Users`: id_user (PK), nama, email, password, total_poin, created_at.
- `Mesin_RVM`: id_mesin (PK), lokasi, kapasitas_maks, kapasitas_saat_ini, status_operasional, last_ping.
- `Transaksi`: id_transaksi (PK), id_user (FK), id_mesin (FK), jumlah_botol, jumlah_poin, timestamp.
#### [NEW] [worker.js](file:///c:/Users/Lenovo1/Documents/my_RVM/EARN/backend/src/worker.js)
Logika worker:
1. Subscribe ke `earn/rvm/+/transaction`. Saat menerima event *Accept*, Prisma memperbarui saldo `total_poin` di tabel `Users` dan `kapasitas_saat_ini` di `Mesin_RVM`.
2. Setelah sukses ke DB, mem-publish *broadcast event* ke `earn/app/live/transactions` agar frontend menangkap dan merender perubahan data UI (Admin Dashboard) secara *real-time*.

### 3. Frontend Web (Next.js & Bio-Digital Minimalism)
SPA Next.js menggunakan TailwindCSS dan arsitektur desain sesuai pedoman **Bio-Digital Minimalism 2026**.

#### [NEW] [globals.css](file:///c:/Users/Lenovo1/Documents/my_RVM/EARN/frontend/app/globals.css)
File untuk CSS variables (`--surface-primary`, `--text-primary`, shadow multi-layer, class `.badgePremium`, glassmorphism `.glass-panel`).
#### [NEW] [page.tsx](file:///c:/Users/Lenovo1/Documents/my_RVM/EARN/frontend/app/page.tsx)
Dashboard Admin menggunakan layout Card UI (KPI Global, Monitoring RVM, Informasi Live Transaksi Per-User).
#### [NEW] [MqttProvider.tsx](file:///c:/Users/Lenovo1/Documents/my_RVM/EARN/frontend/components/MqttProvider.tsx)
Provider React Context yang menjaga koneksi WebSocket (port 9001) ke MQTT di belakang layar.

### 4. Edge AI & Mikrokontroler (Simulasi Kode)
Script Python dan C++ untuk sisi perangkat keras.

#### [NEW] [jetson_inference.py](file:///c:/Users/Lenovo1/Documents/my_RVM/EARN/edge_ai/jetson_inference.py)
Script Python untuk Edge AI. Jika deteksi object: (1, 2, 3, 4, 6, 7), keputusannya adalah *Accept*. Mengirim sinyal via serial UART ke mikrokontroler dan publish MQTT payload.
#### [NEW] [esp32_controller.cpp](file:///c:/Users/Lenovo1/Documents/my_RVM/EARN/edge_ai/esp32_controller.cpp)
Kode mikrokontroler menerima komunikasi UART dan menggerakkan Motor DC/Limit Switch.

---

## Verification Plan

### Automated Tests
- Menjalankan `docker-compose up` untuk menyalakan ke-4 servis (DB, Broker, Backend, Frontend).
- Menjalankan Prisma migrate untuk membentuk relasi database.

### Manual Verification
- Buka port `3000` di web browser (Admin Dashboard).
- Jalankan script `jetson_inference.py` untuk men-trigger injeksi data (seakan-akan botol valid masuk ke alat).
- Perhatikan web browser yang terbuka, UI Card KPI dan Log Transaksi harus terupdate secara instan tanpa me-refresh halaman (bukti WebSockets MQTT berfungsi mulus).
