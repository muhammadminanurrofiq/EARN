# Software Requirements Specification (SRS) - EARN

## 1. Pendahuluan
Dokumen ini mendefinisikan spesifikasi kebutuhan perangkat lunak untuk sistem **EARN (Eco Action & Reward Network)**.

## 2. Role yang Tersedia
- **Customer (End-User):** Pelanggan menggunakan aplikasi mobile (React Native) untuk memasukkan botol ke mesin RVM dan menerima reward. Login menggunakan Gmail dan/atau nomor HP (SMS/WA untuk OTP via Firebase/Supabase Auth).
- **Super Admin:** Mengelola semua fitur dan layanan. Memantau status kesehatan jaringan mesin (Online/Penuh/Maintenance), melihat analitik karbon yang direduksi, dan mengelola transaksi botol, dan lain sebagainya (via Web Dashboard Next.js).
- **Operator:** Memantau status kesehatan jaringan mesin RVM (Online/Penuh/Maintenance) yang ditugaskan kepadanya oleh Super Admin dan Admin. Menangani proses instalasi mesin RVM yang ditugaskan juga (via Web Dashboard & Python GUI RVM UI).
- **Admin:** Mengelola mesin RVM, operator, customer, tenant. Memberi tugas atau menugaskan operator (via Web Dashboard).
- **Tenant:** Mengelola reward dan voucher (via Web Dashboard).

## 3. Cakupan Sistem (Scope)
Sistem memiliki 3 Frontend:
1. **Aplikasi Mobile (Customer):** React Native.
2. **Web Dashboard (Super Admin, Admin, Tenant, Operator):** Next.js.
3. **RVM UI (Customer Interact & Operator Login):** Python GUI (PyQt/Tkinter) berjalan di Raspberry Pi/NVIDIA Jetson.

## 4. Functional Requirements
- **FR-01 (Autentikasi):** Customer dapat login via OTP/Gmail. Operator dapat login via OTP Acak (diinput ke Web Dashboard) atau opsi fallback via Tombol Rahasia di layar mesin RVM.
- **FR-02 (Transaksi Botol):** Mesin RVM mendeteksi botol, memvalidasi (Accept/Reject), dan memberikan poin jika valid.
- **FR-03 (Manajemen RVM):** Sistem memantau status kesehatan mesin secara *real-time* (sensor suhu, laser penuh, ultrasonic, motor DC).
- **FR-04 (Penugasan):** Admin dapat menugaskan mesin ke Operator untuk instalasi atau perbaikan.

## 5. Non-Functional Requirements (UI/UX)
- **NFR-01 (Estetika & Ergonomi):** Web Dashboard wajib menerapkan prinsip *Bio-Digital Minimalism* (palet HSL, tipografi modern, animasi mikro *easing* natural).
- **NFR-02 (Aksesibilitas):** Modal/popup interaktif (seperti menu Maintenance) harus memiliki fokus yang jelas, memisahkan lapisan konten (*layering*) dengan efek *backdrop blur* yang diukur secara ergonomis untuk mencegah *cognitive overload* dan menjaga konteks visual.
