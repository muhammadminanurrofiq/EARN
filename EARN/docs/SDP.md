# Software Development Plan (SDP) - EARN

## 1. Fase Pengembangan (Development Roadmap)
- **Fokus Utama Saat Ini:** Tahap Pengembangan Lokal (Local Dev), menggunakan Raspberry Pi sebagai *Edge Device*.
- **Tahap Produksi:** Pemindahan *compute unit* ke NVIDIA Jetson dan *deployment* Cloud Server ke VPS akan dilakukan *hanya setelah ada instruksi dari User*.

## 2. Development Log / Progress Tracking (Handoff Log)
*Format entri: `[Tanggal/Waktu] - [Aktivitas] - [Catatan Handoff AI]`.*
*Batas maksimal baris log: 10.000 baris.*

- **2026-05-21 14:10:00** - Pembuatan Fondasi Dokumentasi Arsitektur (SRS, SDD, SRD, STD, SDP) disetujui dan dieksekusi. - *Handoff: Dokumen dasar arsitektur telah terbentuk utuh. Langkah selanjutnya adalah menyempurnakan struktur backend worker atau logika Python GUI sesuai kebutuhan.*

- **2026-05-21 14:48:00** - Pembuatan antarmuka Halaman Mesin RVM (Dashboard Super Admin) menggunakan prinsip Bio-Digital Minimalism. - *Handoff: Rute `/mesin-rvm` dan Card List Mesin RVM telah selesai dan merespons `usePathname()` untuk navigasi dinamis. Sidebar juga diperbarui.*
- **2026-05-21 15:37:00** - Pembuatan antarmuka Halaman Manajemen Pengguna (Dashboard Super Admin) menggunakan prinsip Bio-Digital Minimalism. - *Handoff: Rute `/pengguna` selesai dibuat dengan komponen bento cards untuk statistik dan reusable user cards (grid layout) beserta pagination UI.*

- **2026-05-26 09:42:00** - Pembaruan antarmuka Halaman Home (Dashboard Utama) menggunakan styling Bio-Digital Minimalism sesuai template terbaru. - *Handoff: Rute `/` (app/page.tsx) telah diperbarui dengan layout, grafik interaktif (Line Chart & Donut Chart), serta tooltip dinamis.*

- **2026-05-26 10:20:00** - Pembaruan antarmuka Halaman Pengguna menggunakan template Stitch terbaru. - *Handoff: Rute `/pengguna` (app/pengguna/page.tsx) diperbarui dengan compact user card, dropdown action menu interaktif, dan penyesuaian bento stats dashboard.*

- **2026-05-26 10:47:00** - Pembuatan antarmuka Halaman Transaksi menggunakan template Stitch terbaru. - *Handoff: Rute `/transaksi` (app/transaksi/page.tsx) dibuat dengan layout dua kolom (Transaksi Botol & Tukar Voucher) beserta implementasi grafik interaktif.*

- **2026-05-26 11:00:00** - Perbaikan tautan menu navigasi Sidebar. - *Handoff: Memperbaiki link href pada item "Transaksi" di komponen `Sidebar.tsx` agar mengarah ke `/transaksi`.*

- **2026-05-26 14:00:00** - Penyempurnaan UI Halaman Transaksi. - *Handoff: Memperbarui rute `/transaksi` untuk mengganti bar chart "Daily Activity" dengan komponen Line Chart interaktif (`InteractiveChart`) serta memperkaya detail persentase kategori pada Donut Chart.*

- **2026-05-26 14:15:00** - Perbaikan interaksi *Tooltip* pada Grafik Transaksi. - *Handoff: Memodifikasi logika `InteractiveChart` di rute `/transaksi` untuk menyediakan nilai fallback (titik tengah ordinat Y) apabila fungsi `getPointAtLength()` pada SVG gagal diukur, memastikan visibilitas indikator nilai tetap konsisten di seluruh sesi hover.*

- **2026-05-26 16:05:00** - Implementasi UI Menu Mesin RVM. - *Handoff: Menerjemahkan dan membangun *layout* halaman pemantauan Mesin RVM di rute `/mesin-rvm` dengan grid visualisasi status (Online, Offline, Full, Maintenance) berbasis Donut SVG interaktif dan *glassmorphism* styling.*

- **2026-05-26 16:20:00** - Perbaikan Z-Index Dropdown Mesin RVM. - *Handoff: Memperbaiki isu tumpang tindih (*overlap*) antar kartu mesin RVM dengan menambahkan class dinamis `relative z-50` saat menu dropdown aktif pada file `page.tsx`.*

- **2026-05-26 16:40:00** - Penambahan Fungsi Status Maintenance pada RVM. - *Handoff: Memigrasikan data statis `rvmUnits` ke dalam `useState` di komponen utama `MesinRvmPage` dan menghubungkan tombol aksi "Maintenance" di tiap kartu agar dapat memperbarui status mesin secara interaktif secara *real-time* di sisi klien.*

- **2026-05-26 17:00:00** - Implementasi Halaman Detail Unit RVM. - *Handoff: Membangun rute dinamis `/mesin-rvm/[id]/page.tsx` untuk menampilkan telemetri mesin spesifik (kapasitas, suhu, log aktivitas, grafik) dan menghubungkan opsi "Lihat" di kartu RVM ke URL dinamis tersebut menggunakan komponen `Link` Next.js.*

- **2026-05-28 10:48:00** - Pembuatan skrip otomatisasi, konfigurasi hot-reloading, serta panduan lengkap cara menjalankan website. - *Handoff: Lingkungan development kini mendukung mode Docker Dev dengan hot-reloading (via volume mounting) dan Hybrid Dev (Docker DB/MQTT + Local Node/Next.js). Pengguna dapat menjalankan file `run-dev.bat`, `run-dev.ps1`, atau `run-dev.sh` (untuk WSL/Linux) untuk memulai/mengelola alur kerja. Panduan lengkap telah dibuat di `docs/PANDUAN_JALANKAN_WEB.md`.*

- **2026-05-28 11:25:00** - Refaktorisasi Sticky Navbar Konsisten di seluruh halaman menu. - *Handoff: Komponen `Header.tsx` di-refaktor menjadi reusable dengan props (`title`, `subtitle`, `icon`, `leftExtra`, `rightExtra`). Halaman Home, Mesin RVM, Transaksi, dan Pengguna kini menggunakan komponen Header yang sama sebagai sticky navbar. Inline header custom di masing-masing halaman telah dihapus dan digantikan oleh komponen bersama.*

- **2026-05-28 11:37:00** - Implementasi Layout Mobile Responsive & Sidebar Toggle. - *Handoff: Membuat `SidebarContext` untuk mengelola state global sidebar. Menambahkan tombol Hamburger di Header khusus tampilan mobile. Sidebar sekarang menggunakan teknik off-canvas (drawer) yang tersembunyi dengan `-translate-x-full` di mobile dan ditutupi oleh *backdrop* blur saat terbuka. Semua halaman (Home, Mesin RVM, Transaksi, Pengguna) diubah class marginnya dari `ml-64` menjadi `md:ml-64` agar lebar layar penuh digunakan pada smartphone.*

- **2026-05-28 12:25:00** - Pembaruan UI Halaman Pengguna sesuai Mockup Stitch Refined Header & Actions. - *Handoff: Halaman Pengguna (`/pengguna`) telah diselaraskan dengan mockup terbaru dari Stitch. Dropdown menu (tiga titik) di setiap kartu pengguna kini dikelola dengan state induk (`activeDropdownIdx`) untuk menjamin hanya ada satu dropdown yang terbuka dalam satu waktu dan menutup otomatis ketika area luar diklik. Animasi transisi dropdown dan organic glow hover juga telah disesuaikan di `globals.css`.*

- **2026-05-28 12:57:00** - Implementasi Webpack Watch Options Polling di Next.js Config. - *Handoff: Mengaktifkan polling (`poll: 800`) pada Webpack di file `next.config.mjs` ketika mode pengembangan aktif. Perubahan ini untuk mengatasi keterbatasan bawaan WSL2 yang tidak mendeteksi event inotify untuk file mount yang diedit dari sistem operasi host (Windows). Dengan ini, hot-reloading Next.js akan bekerja secara instan di dalam WSL meskipun file berada di drive `/mnt/c/`.*

- **2026-05-28 13:30:00** - Pembersihan opsi Hybrid Dev Mode demi konsistensi Dockerize penuh sesuai SDD.md. - *Handoff: Menghapus opsi Hybrid Dev Mode dari run-dev.sh, run-dev.bat, dan run-dev.ps1 serta memperbarui docs/PANDUAN_JALANKAN_WEB.md. Seluruh environment pengembangan lokal sekarang dikunci 100% menggunakan kontainer Docker di port 3000.*

- **2026-05-28 17:05:00** - Penyesuaian Seluruh Dokumen Arsitektur dengan Flowchart Sistem. - *Handoff: Memperbarui `SRS.md`, `SRD.md`, `SDD.md`, dan `STD.md` untuk mengakomodasi perubahan metode login Maintenance bagi Operator (menggunakan OTP Acak via Web Dashboard dan opsi fallback Tombol Rahasia lokal, menggantikan metode lama scan QR Code).*

- **2026-06-02 12:09:00** - Pembaruan UI Halaman Detail RVM sesuai mockup. - *Handoff: Menghapus tombol 'Empty Tank' dan menggabungkan opsi 'Maintenance' serta 'Reactivate' ke dalam satu tombol interaktif dengan React State `localMaintenance` pada rute `/mesin-rvm/[id]/page.tsx`. Perubahan status mode juga mengubah lencana (badge) kapasitas/status secara real-time.*

- **2026-06-02 12:15:00** - Penyesuaian Layout Halaman Detail RVM. - *Handoff: Merefaktor rute `/mesin-rvm/[id]/page.tsx` dengan menghapus custom inline header dan menggantinya dengan komponen reusable `<Header />`.*
- **2026-06-02 12:17:00** - Penyesuaian Full-Width Detail RVM. - *Handoff: Menyembunyikan komponen `Sidebar` secara kondisional di rute `/mesin-rvm/[id]` dan mengubah container margin agar halaman tampil *full-width* sesuai *mockup* awal tanpa menyisakan ruang kosong di sisi kiri.*
- **2026-06-02 14:26:00** - Pembuatan Popup Maintenance. - *Handoff: Mengimplementasikan komponen `MaintenanceModal` di rute `/mesin-rvm/page.tsx` yang memuat statistik langsung, *live feed* kamera RVM, *system logs*, dan *action controls* sesuai spesifikasi desain. Diintegrasikan ke tombol 'Maintenance' di menu titik-tiga pada setiap unit card.*

- **2026-06-02 15:15:00** - Verifikasi dan Penyelarasan UI Popup Maintenance. - *Handoff: Memastikan popup maintenance muncul saat tombol Maintenance di menu titik tiga diklik. Menyesuaikan teks tombol "Reactivate" menjadi "Save Reactivate" dan "Simpan Perubahan" menjadi "Save as Draft" pada `Action Controls` agar sesuai presisi dengan referensi desain/HTML yang diberikan User.*

- **2026-06-02 15:31:00** - Penyesuaian Backdrop Popup Maintenance. - *Handoff: Memperbarui styling overlay modal pada `/mesin-rvm/page.tsx` dari `bg-background/80 backdrop-blur-xl` menjadi `bg-black/40 backdrop-blur-md` agar efek transparan dan blur pada halaman di belakangnya terlihat lebih jelas dan tidak pekat hitam.*

- **2026-06-02 15:53:00** - Penyesuaian Lanjutan Backdrop Popup Maintenance. - *Handoff: Mengurangi intensitas blur pada overlay modal dari `backdrop-blur-md` menjadi `backdrop-blur` (nilai default Tailwind: 8px) untuk memberikan visibilitas yang lebih baik terhadap elemen antarmuka di belakangnya sesuai dengan umpan balik visual User.*

- **2026-06-02 15:56:00** - Penyesuaian Final Backdrop Popup Maintenance. - *Handoff: Menurunkan lagi efek blur pada overlay dari `backdrop-blur` (8px) menjadi `backdrop-blur-sm` (4px). Latar belakang kini menjadi jauh lebih transparan dan tajam sambil mempertahankan batas modal yang jelas.*

- **2026-06-02 17:27:00** - Pembaruan Dokumen Arsitektur (Sinkronisasi Progres). - *Handoff: Memperbarui seluruh dokumen utama (`SDD.md`, `SRS.md`, `SRD.md`, dan `STD.md`) tanpa menghapus konten asli. Penambahan difokuskan pada penggabungan diagram relasional (ERD) & alir data (DFD), standar desain UI/UX (Bio-Digital Minimalism), penjabaran alur fungsional Maintenance Modal, serta draf pengujian interaksi antarmuka (Web Dashboard).*

---
*(Entri log selanjutnya akan ditambahkan di atas garis ini)*
