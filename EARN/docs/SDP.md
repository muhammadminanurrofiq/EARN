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

---
*(Entri log selanjutnya akan ditambahkan di atas garis ini)*
