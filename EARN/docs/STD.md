# Software Test Document (STD) - EARN

> **STATUS: DITANGGUHKAN (HOLD)**
> Berdasarkan keputusan manajemen proyek, eksekusi seluruh pengujian (beban, end-to-end, mocking hardware) ditahan dan HANYA AKAN DILAKUKAN atas instruksi spesifik.

## 1. Skenario Pengujian (Draf)

### 1.1 Hardware Mocking Test
- Menguji komunikasi *Ping-Pong* UART antara ESP32 dan Raspberry Pi.
- Memastikan sinyal aktuasi motor stepper (6800 step, delay 2000ms, -6800 step) dapat dieksekusi dari perintah Python.

### 1.2 System Test (End-to-End)
- Simulasi kamera mendeteksi botol PET $\rightarrow$ Logika AI $\rightarrow$ Aktuasi Stepper $\rightarrow$ Pengiriman Data MQTT $\rightarrow$ Penerimaan *real-time* di Dashboard Web & Mobile App.
- Pengujian beban (*Load Test*) pada Mosquitto MQTT Broker dengan ratusan simulasi mesin RVM yang mengirimkan data sensor (suhu, ultrasonik) setiap detik.
- Pengujian alur Autentikasi Maintenance: Validasi kesesuaian OTP Acak (Web Dashboard) dan respons akses *Tombol Rahasia* secara lokal.
