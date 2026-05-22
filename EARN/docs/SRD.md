# Software Requirements and Design (SRD) - EARN

## 1. Alur Transaksi Penukaran Botol
1. Customer memulai transaksi di Python GUI RVM.
2. Botol diletakkan di atas alas sementara.
3. Kamera (Edge AI) memindai botol.
4. **Jika Valid (Accepted):**
   - Motor Stepper bergerak 6800 langkah untuk membuka alas (botol jatuh ke bak).
   - *Delay 2000 ms.*
   - Motor Stepper bergerak mundur -6800 langkah ke posisi semula.
   - Poin dikalkulasi, Publish pesan sukses ke MQTT.
5. **Jika Tidak Valid (Rejected):**
   - Layar LCD Python GUI menampilkan pesan penolakan.
   - LED WS2812B menyala Merah.
   - Botol harus diambil kembali oleh Customer.

## 2. Alur Penugasan & Kalibrasi (Operator)
1. Admin menugaskan mesin RVM baru kepada Operator via Web Dashboard.
2. Operator memantau status penugasan via Web Dashboard.
3. Operator tiba di lokasi mesin fisik.
4. Operator login di RVM UI (Python GUI) menggunakan QR Code (memindai melalui kamera).
5. Operator melakukan kalibrasi motor dan sensor secara langsung via UI (perintah diteruskan dari Python GUI ke ESP32 via UART).
6. Operator memperbarui model AI (`best.pt`) dengan mengunduhnya dari GitHub Release langsung ke penyimpanan lokal *Edge Device*.
