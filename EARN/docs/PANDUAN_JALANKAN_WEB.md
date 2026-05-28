# Panduan Menjalankan Website - EARN (Eco Action & Reward Network)

Dokumen ini berisi panduan lengkap untuk menjalankan lingkungan pengembangan (*development environment*) website EARN secara cepat, mudah, dan efisien menggunakan skrip otomatisasi baru.

---

## 1. Prasyarat (Prerequisites)
Sebelum menjalankan aplikasi, pastikan Anda telah menginstal:
- **Node.js** (Versi 18 atau lebih baru)
- **Docker Desktop** (Pastikan aplikasi Docker sudah berjalan)
- **WSL 2** (Jika menggunakan terminal WSL/Linux di Windows)

---

## 2. Cara Menjalankan Menggunakan Skrip Otomatisasi (Sangat Direkomendasikan)
Kami telah menyediakan skrip otomatisasi sekali-klik untuk mengelola semua layanan (Database PostgreSQL, MQTT Broker, Frontend Next.js, dan Backend Worker) sekaligus.

Pilih skrip yang sesuai dengan terminal yang Anda gunakan:

### A. Jika Menggunakan WSL / Linux Terminal
1. Buka terminal WSL Anda dan masuk ke direktori proyek `EARN`:
   ```bash
   cd /mnt/c/Users/Lenovo1/Documents/my_RVM/EARN
   ```
2. Jalankan skrip dengan perintah berikut (jika pertama kali, berikan izin eksekusi terlebih dahulu):
   ```bash
   chmod +x run-dev.sh
   ./run-dev.sh
   ```
3. Pilih opsi menu yang Anda inginkan (misalnya **`1`** untuk Docker Dev Mode).

---

### B. Jika Menggunakan Windows Command Prompt (CMD)
1. Buka CMD, lalu masuk ke folder proyek:
   ```cmd
   cd C:\Users\Lenovo1\Documents\my_RVM\EARN
   ```
2. Jalankan file batch:
   ```cmd
   run-dev.bat
   ```
3. Pilih opsi menu (ketik angka **`1`** sampai **`9`** lalu tekan `ENTER`).

---

### C. Jika Menggunakan Windows PowerShell
1. Buka PowerShell, masuk ke folder proyek:
   ```powershell
   cd C:\Users\Lenovo1\Documents\my_RVM\EARN
   ```
2. Jalankan skrip PowerShell:
   ```powershell
   .\run-dev.ps1
   ```

---

## 3. Penjelasan Menu Pilihan Skrip (Opsi 1-8)

Berikut adalah penjelasan lengkap mengenai masing-masing dari 8 opsi perintah yang tersedia di dalam skrip interaktif (`run-dev`):

### [1] Jalankan Docker Dev Mode (Hot-Reload di Docker)
Menjalankan seluruh layanan (Database, MQTT Broker, Frontend, dan Backend) di dalam kontainer Docker. 
- **Kapan digunakan**: Ketika Anda ingin lingkungan pengembangan yang 100% identik dengan Docker produksi.
- **Cara Kerja**: Melakukan mount folder lokal ke dalam kontainer. Perubahan kode lokal tetap memicu hot-reloading di dalam kontainer tanpa perlu melakukan rebuild.

### [2] Jalankan Dev Mode dengan Rebuild (Docker)
Membangun ulang (*rebuild*) Docker image dan menyalakan semua kontainer dari awal.
- **Kapan digunakan**: Ketika ada perubahan dependensi sistem, seperti menambahkan library baru (`npm install`) atau memperbarui skema database Prisma.
- **Cara Kerja**: Memaksa Docker Compose untuk mengabaikan cache lama dan membangun ulang *layer* image kontainer.

### [3] Hentikan Dev Mode (Docker Down)
Menghentikan dan menghapus seluruh kontainer yang sedang berjalan.
- **Kapan digunakan**: Ketika Anda selesai bekerja dan ingin mengosongkan memori (RAM) serta menutup port koneksi.
- **Cara Kerja**: Menjalankan perintah `docker compose down`.

### [4] Restart / Rebuild Frontend saja (Docker)
Hanya membangun ulang dan me-restart kontainer `frontend` (Next.js).
- **Kapan digunakan**: Jika kontainer frontend mengalami crash, terjadi error kompilasi yang macet, atau ingin memaksa pembaruan Next.js mandiri tanpa mengganggu database/MQTT.
- **Cara Kerja**: Membangun ulang image `frontend` secara terisolasi dan me-restart kontainer tersebut.

### [5] Restart / Rebuild Backend saja (Docker)
Hanya membangun ulang dan me-restart kontainer `backend` (Node.js).
- **Kapan digunakan**: Ketika ada pembaruan file konfigurasi backend, atau migrasi Prisma yang memerlukan pembaruan cache internal backend secara mandiri.
- **Cara Kerja**: Membangun ulang image `backend` secara terisolasi dan me-restart kontainer tersebut.

### [6] Lihat Log Kontainer (Docker Logs)
Menampilkan log keluaran (*output console*) dari seluruh kontainer yang berjalan secara *real-time*.
- **Kapan digunakan**: Ketika Anda ingin melihat error yang terjadi, memantau lalu lintas MQTT, atau memantau koneksi database.
- **Cara Kerja**: Menampilkan stream log aktif. Anda dapat menekan `Ctrl + C` untuk keluar dari tampilan log tanpa mematikan layanan.

### [7] Jalankan Production Mode (Docker Standalone)
Menjalankan website dalam mode produksi (Next.js standalone build).
- **Kapan digunakan**: Untuk melakukan uji kelayakan atau simulasi kinerja sebelum melakukan deployment ke server VPS produksi.
- **Cara Kerja**: Membangun aplikasi dengan performa maksimal tanpa mengaktifkan fitur hot-reloading developer.

### [8] Keluar
Menutup menu skrip tanpa melakukan perubahan apa pun pada status kontainer yang sedang berjalan.

---

## 4. Cara Menghentikan Layanan
Untuk mematikan semua kontainer dan proses pengembangan yang berjalan:
- **Di WSL**: Jalankan `./run-dev.sh` lalu pilih menu **`[3] Hentikan Dev Mode`** (atau ketik langsung `./run-dev.sh down`).
- **Di CMD**: Jalankan `run-dev.bat` lalu pilih menu **`[3] Hentikan Dev Mode`** (atau ketik langsung `run-dev.bat down`).
- **Di PowerShell**: Jalankan `.\run-dev.ps1` lalu pilih menu **`[3] Hentikan Dev Mode`** (atau ketik langsung `.\run-dev.ps1 down`).

---

## 5. Pemecahan Masalah (Troubleshooting)

### Bentrokan Port (Port Clash)
Jika muncul error bahwa port `5432` atau `1883` sudah digunakan, pastikan tidak ada layanan PostgreSQL lokal atau Mosquitto lokal lain yang sedang berjalan di komputer Anda sebelum menjalankan skrip.

### Database Migrations Belum Ter-sync
Jika Anda melakukan perubahan pada skema database (`prisma/schema.prisma`), pilih menu **`[3] Jalankan Dev Mode dengan Rebuild`** di skrip agar kontainer membangun ulang Prisma client Anda.
