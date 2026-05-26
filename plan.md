Sebagai **Lead Software Engineer & Technical Architect**, saya akan memberikan pandangan yang objektif dan strategis mengenai apa yang sedang kita kerjakan, serta evaluasi langsung berdasarkan *Rules* Anda. 

Mari kita luruskan struktur dan tujuan proyek ini agar Anda tidak kehilangan arah.

### 1. Apa yang Sedang Kita Bangun?
Kita sedang membangun **Sistem Informasi Manajemen RVM (Reverse Vending Machine) terpadu bernama EARN (Eco Action & Reward Network)**. 
Ini bukan sekadar aplikasi web biasa, melainkan sebuah **Ekosistem IoT Cerdas (Edge AI-to-Cloud)** yang beroperasi secara *100% Event-Driven*. Sistem ini memungkinkan mesin pendaur ulang pintar mendeteksi jenis botol, memberikan poin kepada pengguna, dan mengirim data secara *real-time* ke dashboard pusat tanpa *delay*.

### 2. Scope (Cakupan Proyek)
Secara arsitektur, *scope* proyek ini terbagi menjadi 4 pilar utama:
1. **Edge AI & Perangkat Keras (Perangkat RVM):** Deteksi botol (Plastik PET, Kaleng, Kaca) menggunakan NVIDIA Jetson (Python) yang berkomunikasi dengan ESP32 (C++) via UART untuk menggerakkan mesin.
2. **Konektivitas (Message Broker):** Menggunakan **Mosquitto MQTT**. Tidak ada REST API konvensional (HTTP). Semua data mengalir secara *real-time stream*.
3. **Backend Worker & Database:** Node.js yang bertugas hanya sebagai *worker* di belakang layar (menerima pesan MQTT dari mesin, mencatatnya ke database, lalu *broadcast* ke web).
4. **Frontend Admin Dashboard:** Web SPA (Single Page Application) pemantauan terpusat untuk melihat status mesin, *live feed* kamera, dan metrik lingkungan secara langsung (berbasis WebSocket MQTT).

### 3. Role yang Tersedia
Berdasarkan skema database dan desain arsitektur, saat ini terdapat 2 *role* utama:
1. **End-User (Pengguna Aplikasi):** Pelanggan yang memasukkan botol ke mesin RVM dan menerima *Reward* (Poin).
2. **Super Admin / System Ops (Dashboard Web):** Anda (atau operator sistem) yang memantau status kesehatan jaringan mesin (Online/Penuh/Maintenance), melihat analitik karbon yang direduksi, dan mengelola transaksi botol.

### 4. Tech Stack yang Digunakan
- **Frontend:** Next.js (React), Tailwind CSS, MQTT.js (mengadopsi UI *Bio-Digital Minimalism*).
- **Backend:** Node.js (Worker), Prisma ORM.
- **Database:** PostgreSQL.
- **Message Broker:** Eclipse Mosquitto (MQTT).
- **Edge AI:** Python & C++.
- **Infrastruktur/DevOps:** Docker & Docker Compose (berjalan di atas WSL Windows).

---

### 5. Evaluasi Kritis & Rencana Implementasi (SDP, SDD, SRS)
*(Berdasarkan Rule: Profesional & Dev-Project)*

**Saya harus bicara jujur:** Anda memiliki *Mandatory Rule* (Aturan Wajib) di `dev-project.md` yang mengharuskan AI membaca dan memperbarui folder `docs/` (terutama `SDP.md`) di setiap sesi. Namun, setelah saya audit direktori proyek Anda (`c:\Users\Lenovo1\Documents\my_RVM\EARN\`), **folder `docs/` dan dokumen-dokumen tersebut BELUM ADA.**

**Opportunity Cost (Kerugian jika ini diabaikan):**
Bekerja tanpa SRS, SDD, dan SDP dalam arsitektur yang kompleks ini (IoT + Edge AI + MQTT) adalah bunuh diri arsitektural. Jika Anda terus coding tanpa dokumentasi ini, setiap kali Anda berganti AI atau Agent, kami akan kehilangan konteks. Kami tidak akan tahu apa *Current State* (SDP), skema database (SDD), atau batas ruang lingkup fitur (SRS). Ini membuang waktu (*wasting time*) untuk *re-prompting* dan berisiko merusak kode yang sudah ada.

#### ⚡ Prioritized Plan (Langkah Taktis Selanjutnya)
Sebagai profesional, saya merekomendasikan kita untuk berhenti menulis kode fitur sejenak, dan mengeksekusi rencana berikut secara berurutan:

1. **Buat Folder `docs/` Sekarang Juga:** Saya akan men-generate folder `EARN/docs/`.
2. **Tulis Dokumen Fondasi:** 
   - `SRS.md`: Menulis aturan fungsional (apa yang terjadi jika botol ditolak mesin, dll).
   - `SDD.md`: Mendokumentasikan desain MQTT *Topic Tree* dan Skema Database Prisma.
   - `SDP.md`: Membuat log progres pertama kita, mencatat bahwa *Frontend UI* dan *Docker Base* sudah selesai dibuat.
3. **Standarisasi Alur (Handoff):** Memastikan mulai hari ini dan seterusnya, fitur apa pun yang selesai (seperti perbaikan *Dashboard* yang baru saja kita lakukan) langsung dicatat di `SDP.md`.

Apakah Anda memberi saya izin (Go Ahead) untuk langsung membuat folder `docs/` beserta struktur dokumen `SRS`, `SDD`, dan `SDP` sekarang?