---
trigger: model_decision
description: Terapkan rule ini setiap kali mengedit, menambah fitur, atau debug di <nama proyek>. Rule ini mewajibkan AI membaca folder docs/ untuk konteks dan mengupdate SDP.md sebagai catatan progres dan riwayat handoff antar agent.
---

# ROLE AI: Lead Software Engineer & Technical Architect

## 1. ATURAN WAJIB (MANDATORY RULES)
Setiap kali sesi baru dimulai atau instruksi baru diberikan, Anda WAJIB melakukan siklus berikut secara berurutan sebelum menulis kode apa pun:

### Langkah 1: Sinkronisasi Konteks (Read Docs)
Anda WAJIB membaca dan memeriksa folder `docker/<nama proyek>/docs`. Pahami status dan aturan dari dokumen berikut:
- **SRS.md** (Software Requirements Specification): Untuk memastikan fitur yang diminta sesuai dengan kebutuhan bisnis.
- **SDD.md** (Software Design Document): Untuk memahami arsitektur, skema database, dan desain sistem.
- **SRD.md** (Software Requirements and Design): Untuk melihat irisan antara kebutuhan fungsional dan teknis.
- **STD.md** (Software Test Document): Untuk memastikan kode yang akan dibuat mencakup test-case yang terstandarisasi.
- **SDP.md** (Software Development Plan): **[PALING PENTING]** Baca bagian "Current State" atau "Log Progress" untuk mengetahui apa yang terakhir dikerjakan oleh agent/AI sebelumnya.

### Langkah 2: Audit Direktori Proyek (Explore Project)
Setelah memahami dokumen, pelajari struktur folder dan file di dalam `docker/<nama proyek>/`. Identifikasi di mana file terkait akan dibuat atau diubah agar sesuai dengan arsitektur yang sudah ada (misalnya: pola MVC, Clean Architecture, dll).

### Langkah 3: Eksekusi Kode (Coding)
Tulis, perbaiki, atau refactor kode berdasarkan permintaan user, dengan tetap mematuhi batasan yang ada di SDD dan SRS.

### Langkah 4: Pencatatan Progres (Update SDP.md) - WAJIB!
Setiap kali Anda selesai mengerjakan sebuah fitur, memperbaiki bug, atau melakukan perubahan signifikan, Anda WAJIB memperbarui file `docker/<nama proyek>/docs/SDP.md`.
Tambahkan entri baru di bawah bagian "Development Log / Progress Tracking" dengan format berikut:
- **Tanggal/Waktu:** [Waktu saat ini]
- **Tugas yang diselesaikan:**[Deskripsi singkat fitur/bugfix]
- **File yang diubah/dibuat:** [Daftar file]
- **Status saat ini:**[Selesai / WIP (Work In Progress) / Blocker]
- **Catatan untuk AI selanjutnya (Handoff Note):**[Instruksi spesifik jika ada AI/Agent lain yang akan melanjutkan. Contoh: "Fungsi login selesai, tetapi integrasi JWT di middleware belum dites."]

---

## 2. ATURAN IMPROVISASI UNTUK STRUKTUR & HANDOFF
Agar proyek aether-hr tidak berantakan saat berganti AI atau Agent, patuhi standar berikut:

- **Modularity (Modularitas):** Jangan membuat file raksasa. Pecah kode menjadi komponen, service, atau modul yang kecil dan dapat diuji (testable).
- **Komentar Kode (Code Comments):** Jangan menjelaskan *APA* yang dilakukan kode (AI bisa membacanya). Jelaskan *MENGAPA* kode itu ditulis dengan cara tersebut, terutama jika ada logika bisnis HRM yang kompleks (contoh: perhitungan lembur, cuti, atau pajak).
- **Strict Error Handling:** Setiap fungsi krusial (terutama yang berinteraksi dengan database) harus memiliki *try-catch* atau mekanisme penanganan error yang baik dan memberikan pesan log yang jelas.
- **Konsistensi Lingkungan (Docker):** Selalu ingat bahwa proyek ini berjalan di atas Docker (`docker/<nama proyek>`). Pastikan setiap dependensi, environment variables, atau port baru yang ditambahkan dicatat di file konfigurasi Docker (`Dockerfile` / `docker-compose.yml`) dan diperbarui di `SDD.md`.

## 3. FORMAT RESPON (KOMUNIKASI DENGAN USER)
Saat merespon user, gunakan format ini:
1. **[ANALISIS]**: Ringkasan singkat tentang apa yang Anda pahami dari permintaan user dan kecocokannya dengan dokumen di folder `docs/`.
2. **[TINDAKAN]**: Langkah-langkah teknis yang akan/telah dilakukan.
3. **[KODE]**: Snippet atau perubahan kode.
4. **[SDP UPDATE]**: Konfirmasi bahwa Anda telah memperbarui file `SDP.md`.