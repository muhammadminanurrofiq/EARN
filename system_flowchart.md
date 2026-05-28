# Flowchart Sistem EARN (Eco Action & Reward Network)

Berdasarkan dokumen desain sistem (`SRS.md`, `SDD.md`, dan `SRD.md`) yang telah saya pelajari, EARN menggunakan **Arsitektur Event-Driven 100%** dengan protokol MQTT (tanpa HTTP REST API).

Berikut adalah visualisasi arsitektur dan alur sistemnya:

## 1. Arsitektur Jaringan (Global Topology)

Diagram ini menunjukkan bagaimana berbagai frontend, Edge Device di mesin fisik, dan Cloud VPS saling terhubung.

```mermaid
flowchart TD
    %% Styling
    classDef cloud fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff
    classDef edge fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#fff
    classDef db fill:#1e3a8a,stroke:#60a5fa,stroke-width:2px,color:#fff
    classDef client fill:#374151,stroke:#9ca3af,stroke-width:2px,color:#fff

    subgraph Frontends ["Klien (Front-End)"]
        MobileApp["📱 Aplikasi Mobile (React Native / Customer)"]:::client
        WebDashboard["💻 Web Dashboard (Next.js / Admin, Tenant)"]:::client
    end

    subgraph CloudVPS ["Cloud VPS"]
        Mosquitto("🌐 Mosquitto MQTT (Broker Real-time)"):::cloud
        NodeWorker["⚙️ Node.js Worker (Logika & Validasi)"]:::cloud
        PostgreSQL[("🗄️ PostgreSQL (Prisma ORM)")]:::db
    end

    subgraph RVM ["Mesin RVM (Edge Device)"]
        PythonGUI["🖥️ Python GUI & Edge AI (Raspberry Pi / Jetson)"]:::edge
        ESP32["🔌 ESP32 (Microcontroller)"]:::edge
        Hardware["⚙️ Hardware (Motor Stepper, Ultrasonic, Laser, LED)"]:::edge
    end

    %% Koneksi Frontends ke Cloud
    MobileApp -- "Koneksi MQTT/WebSockets" --> Mosquitto
    WebDashboard -- "Koneksi MQTT/WebSockets (Real-time)" --> Mosquitto
    
    %% Internal Cloud
    Mosquitto <-->|"Subscribe / Publish Event"| NodeWorker
    NodeWorker <-->|"Prisma ORM (CRUD)"| PostgreSQL

    %% RVM ke Cloud & Internal
    PythonGUI -- "Publish Event & Telemetry (MQTT)" --> Mosquitto
    PythonGUI -- "UART Serial" --> ESP32
    ESP32 <-->|"Perintah I/O"| Hardware
```

---

## 2. Alur Transaksi Penukaran Botol (Flowchart Interaksi)

Flowchart ini menjelaskan bagaimana sistem mengambil keputusan saat pelanggan (Customer) memasukkan botol ke dalam mesin Reverse Vending Machine (RVM).

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant RVM as 🖥️ Python GUI (RVM)
    participant AI as 🧠 Model AI (Edge)
    participant ESP as 🔌 ESP32 (Hardware)
    participant MQTT as 🌐 Mosquitto Broker
    participant DB as 🗄️ Database (Worker)

    Customer->>RVM: Menekan "Mulai" di layar
    Customer->>RVM: Meletakkan botol di alas sementara
    RVM->>AI: Pindai objek (Inference)
    AI-->>RVM: Mengembalikan hasil (Valid/Invalid)
    
    alt Jika Botol VALID
        RVM->>ESP: Buka alas (Motor Stepper +6800 step)
        ESP-->>RVM: Status: Alas terbuka
        Note over RVM,ESP: Botol jatuh ke bak penampungan<br/>(Delay 2000 ms)
        RVM->>ESP: Tutup alas (Motor Stepper -6800 step)
        RVM->>ESP: Nyalakan LED Hijau WS2812B
        RVM->>MQTT: Publish Event (Sukses + ID Botol + Poin)
        MQTT->>DB: Validasi & Simpan Transaksi ke PostgreSQL
        DB-->>MQTT: Konfirmasi Poin Ditambahkan
        MQTT-->>RVM: Status Berhasil
        RVM-->>Customer: Tampilkan animasi Poin Bertambah
    else Jika Botol TIDAK VALID
        RVM->>ESP: Nyalakan LED Merah WS2812B
        RVM-->>Customer: Tampilkan pesan penolakan di layar
        Note over Customer,RVM: Pelanggan diminta mengambil<br/>kembali botol yang ditolak.
    end
```

---

## 3. Alur Penugasan & Kalibrasi (Operator Workflow)

Flowchart ini mencerminkan aktivitas manajerial dan pemeliharaan lapangan oleh Operator.

```mermaid
flowchart TD
    A(["Admin / SuperAdmin"]) -->|"Assign Tugas via Web Dashboard"| B("Database & MQTT")
    B -->|"Notifikasi Masuk"| C(["Operator"])
    C -->|"Membaca status di Web Dashboard"| D{"Tiba di Lokasi RVM?"}
    D -- "Ya" --> D2{"Pilih Metode Login Maintenance"}
    
    D2 -- "Via Web Dashboard (Laptop)" --> E1["Mesin RVM menampilkan Kode OTP Acak"]
    E1 --> E2["Operator input Kode OTP ke Web Dashboard"]
    E2 --> F["Verifikasi Sukses (Akses Maintenance Terbuka)"]
    
    D2 -- "Via Layar RVM (Lokal)" --> E3["Tekan Tombol Rahasia di Layar RVM"]
    E3 --> E4["Login berhasil ke menu rahasia RVM (Python GUI)"]
    E4 --> F
    
    F --> G{"Pilih Tindakan"}
    
    G -->|"Maintenance"| H["Kalibrasi Motor & Sensor"]
    H --> I("Kirim perintah UART ke ESP32")
    
    G -->|"Update AI"| J["Unduh best.pt dari GitHub Release"]
    J --> K("Perbarui model AI lokal Edge Device")
    
    I --> L["Pengujian"]
    K --> L
    
    L -->|"Publish Status Sukses"| B
    B -->|"Dashboard Real-time update"| A
```

> [!TIP]
> **Arsitektur Tanpa REST API**: Karena keseluruhan sistem bergantung pada MQTT, komunikasi bersifat dua arah dan real-time. Hal ini membuat dashboard (seperti yang sudah kita buat pada Next.js) bisa memantau pergerakan mesin, status `Maintenance` atau `Penuh` tanpa perlu melakukan *refresh* atau *long-polling*.
