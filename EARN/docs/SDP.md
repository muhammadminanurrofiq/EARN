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

---
*(Entri log selanjutnya akan ditambahkan di atas garis ini)*
