#!/bin/bash
# ══════════════════════════════════════════════
# EARN - Local Development Environment Manager
# Bash Version for WSL / Linux
# ══════════════════════════════════════════════

COMPOSE_FILES="-f docker-compose.yml -f docker-compose.dev.yml"

show_header() {
    clear
    echo -e "\e[36m=======================================================\e[0m"
    echo -e "\e[36m\e[1m          EARN - DEVELOPMENT MANAGER SYSTEM            \e[0m"
    echo -e "\e[36m=======================================================\e[0m"
}

show_menu() {
    show_header
    echo -e " \e[32m[1]\e[0m Jalankan Docker Dev Mode (Hot-Reload di Docker)"
    echo -e " \e[32m[2]\e[0m Jalankan Dev Mode dengan Rebuild (Docker)"
    echo -e " \e[31m[3]\e[0m Hentikan Dev Mode (Docker Down)"
    echo -e " \e[33m[4]\e[0m Restart / Rebuild Frontend saja (Docker)"
    echo -e " \e[33m[5]\e[0m Restart / Rebuild Backend saja (Docker)"
    echo -e " \e[34m[6]\e[0m Lihat Log Kontainer (Docker Logs)"
    echo -e " \e[35m[7]\e[0m Jalankan Production Mode (Docker Standalone)"
    echo -e " \e[90m[8]\e[0m Keluar"
    echo -e "\e[36m=======================================================\e[0m"
    
    read -p "Pilih opsi (1-8): " choice
    case $choice in
        1) start_dev ;;
        2) start_build ;;
        3) stop_dev ;;
        4) restart_frontend ;;
        5) restart_backend ;;
        6) show_logs ;;
        7) start_prod ;;
        8) exit 0 ;;
        *)
            echo -e "\e[31mPilihan tidak valid! Silakan coba lagi.\e[0m"
            sleep 1
            show_menu
            ;;
    esac
}

start_dev() {
    echo -e "\n\e[32m[INFO] Menyalakan kontainer dalam mode Development (Hot-Reload)...\e[0m"
    docker compose $COMPOSE_FILES up -d
    echo -e "\n\e[32m\e[1m[SUCCESS] Layanan berhasil dijalankan!\e[0m"
    echo -e " - Frontend: \e[36mhttp://localhost:3000\e[0m"
    echo -e " - Mosquitto WebSocket (MQTT): \e[36mws://localhost:9001\e[0m"
    echo -e " - DB PostgreSQL: \e[36mlocalhost:5432\e[0m"
    echo -e "\nTekan ENTER untuk kembali ke menu..."
    read
    show_menu
}


start_build() {
    echo -e "\n\e[32m[INFO] Membangun ulang (rebuild) dan menyalakan semua kontainer...\e[0m"
    docker compose $COMPOSE_FILES up -d --build
    echo -e "\n\e[32m\e[1m[SUCCESS] Layanan berhasil dibangun ulang dan dijalankan!\e[0m"
    echo -e "\nTekan ENTER untuk kembali ke menu..."
    read
    show_menu
}

stop_dev() {
    echo -e "\n\e[33m[INFO] Mematikan dan membersihkan semua kontainer...\e[0m"
    docker compose $COMPOSE_FILES down
    echo -e "\n\e[32m\e[1m[SUCCESS] Kontainer berhasil dihentikan.\e[0m"
    echo -e "\nTekan ENTER untuk kembali ke menu..."
    read
    show_menu
}

restart_frontend() {
    echo -e "\n\e[33m[INFO] Membangun ulang dan me-restart container FRONTEND...\e[0m"
    docker compose $COMPOSE_FILES up -d --build frontend
    echo -e "\n\e[32m\e[1m[SUCCESS] Frontend berhasil di-restart!\e[0m"
    echo -e "\nTekan ENTER untuk kembali ke menu..."
    read
    show_menu
}

restart_backend() {
    echo -e "\n\e[33m[INFO] Membangun ulang dan me-restart container BACKEND...\e[0m"
    docker compose $COMPOSE_FILES up -d --build backend
    echo -e "\n\e[32m\e[1m[SUCCESS] Backend berhasil di-restart!\e[0m"
    echo -e "\nTekan ENTER untuk kembali ke menu..."
    read
    show_menu
}

show_logs() {
    echo -e "\n\e[34m[INFO] Membuka log (tekan Ctrl+C untuk keluar dari log)...\e[0m"
    docker compose $COMPOSE_FILES logs -f
    show_menu
}

start_prod() {
    echo -e "\n\e[35m[INFO] Menyalakan kontainer dalam mode Production (Standalone)...\e[0m"
    docker compose up -d
    echo -e "\n\e[32m\e[1m[SUCCESS] Mode Produksi dijalankan di http://localhost:3000\e[0m"
    echo -e "\nTekan ENTER untuk kembali ke menu..."
    read
    show_menu
}

# Periksa argumen CLI
if [ $# -gt 0 ]; then
    case $1 in
        up) docker compose $COMPOSE_FILES up -d ;;
        build) docker compose $COMPOSE_FILES up -d --build ;;
        down) docker compose $COMPOSE_FILES down ;;
        restart-frontend) docker compose $COMPOSE_FILES up -d --build frontend ;;
        restart-backend) docker compose $COMPOSE_FILES up -d --build backend ;;
        logs) docker compose $COMPOSE_FILES logs -f ;;
        prod) docker compose up -d ;;
        *)
            echo "Penggunaan: ./run-dev.sh [perintah]"
            echo ""
            echo "Perintah yang tersedia:"
            echo "  up                 Menyalakan Docker Dev Mode (Hot-Reload)"
            echo "  build              Rebuild dan nyalakan Docker Dev Mode"
            echo "  down               Mematikan Docker Dev Mode"
            echo "  restart-frontend   Rebuild & restart Frontend saja"
            echo "  restart-backend    Rebuild & restart Backend saja"
            echo "  logs               Lihat log kontainer secara real-time"
            echo "  prod               Menyalakan Production Mode"
            exit 1
            ;;
    esac
else
    show_menu
fi
