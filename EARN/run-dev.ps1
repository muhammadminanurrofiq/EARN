# ══════════════════════════════════════════════
# EARN - Local Development Environment Manager
# PowerShell Version (Modern & Colorized)
# ══════════════════════════════════════════════

$COMPOSE_FILES = @("-f", "docker-compose.yml", "-f", "docker-compose.dev.yml")

function Show-Header {
    Clear-Host
    Write-Host "=======================================================" -ForegroundColor Cyan
    Write-Host "          EARN - DEVELOPMENT MANAGER SYSTEM            " -ForegroundColor Cyan -Bold
    Write-Host "=======================================================" -ForegroundColor Cyan
}

function Show-Menu {
    Show-Header
    Write-Host " [1] " -NoNewline -ForegroundColor Green; Write-Host "Jalankan Docker Dev Mode (Hot-Reload di Docker)"
    Write-Host " [2] " -NoNewline -ForegroundColor Green; Write-Host "Jalankan Dev Mode dengan Rebuild (Docker)"
    Write-Host " [3] " -NoNewline -ForegroundColor Red; Write-Host "Hentikan Dev Mode (Docker Down)"
    Write-Host " [4] " -NoNewline -ForegroundColor Yellow; Write-Host "Restart / Rebuild Frontend saja (Docker)"
    Write-Host " [5] " -NoNewline -ForegroundColor Yellow; Write-Host "Restart / Rebuild Backend saja (Docker)"
    Write-Host " [6] " -NoNewline -ForegroundColor Blue; Write-Host "Lihat Log Kontainer (Docker Logs)"
    Write-Host " [7] " -NoNewline -ForegroundColor Magenta; Write-Host "Jalankan Production Mode (Docker Standalone)"
    Write-Host " [8] " -NoNewline -ForegroundColor Gray; Write-Host "Keluar"
    Write-Host "=======================================================" -ForegroundColor Cyan
    
    $choice = Read-Host "Pilih opsi (1-8)"
    switch ($choice) {
        "1" { Start-Dev }
        "2" { Start-Build }
        "3" { Stop-Dev }
        "4" { Restart-Frontend }
        "5" { Restart-Backend }
        "6" { Show-Logs }
        "7" { Start-Prod }
        "8" { exit }
        default { 
            Write-Host "Pilihan tidak valid! Silakan coba lagi." -ForegroundColor Red
            Start-Sleep -Seconds 1
            Show-Menu
        }
    }
}

function Start-Dev {
    Write-Host "`n[INFO] Menyalakan kontainer dalam mode Development (Hot-Reload)..." -ForegroundColor Green
    docker compose $COMPOSE_FILES up -d
    Write-Host "`n[SUCCESS] Layanan berhasil dijalankan!" -ForegroundColor Green -Bold
    Write-Host " - Frontend: " -NoNewline; Write-Host "http://localhost:3000" -ForegroundColor Cyan
    Write-Host " - Mosquitto WebSocket (MQTT): " -NoNewline; Write-Host "ws://localhost:9001" -ForegroundColor Cyan
    Write-Host " - DB PostgreSQL: " -NoNewline; Write-Host "localhost:5432" -ForegroundColor Cyan
    Write-Host "`nTekan ENTER untuk kembali ke menu..."
    Read-Host
    Show-Menu
}


function Start-Build {
    Write-Host "`n[INFO] Membangun ulang (rebuild) dan menyalakan semua kontainer..." -ForegroundColor Green
    docker compose $COMPOSE_FILES up -d --build
    Write-Host "`n[SUCCESS] Layanan berhasil dibangun ulang dan dijalankan!" -ForegroundColor Green -Bold
    Write-Host "`nTekan ENTER untuk kembali ke menu..."
    Read-Host
    Show-Menu
}

function Stop-Dev {
    Write-Host "`n[INFO] Mematikan dan membersihkan semua kontainer..." -ForegroundColor Yellow
    docker compose $COMPOSE_FILES down
    Write-Host "`n[SUCCESS] Kontainer berhasil dihentikan." -ForegroundColor Green -Bold
    Write-Host "`nTekan ENTER untuk kembali ke menu..."
    Read-Host
    Show-Menu
}

function Restart-Frontend {
    Write-Host "`n[INFO] Membangun ulang dan me-restart container FRONTEND..." -ForegroundColor Yellow
    docker compose $COMPOSE_FILES up -d --build frontend
    Write-Host "`n[SUCCESS] Frontend berhasil di-restart!" -ForegroundColor Green -Bold
    Write-Host "`nTekan ENTER untuk kembali ke menu..."
    Read-Host
    Show-Menu
}

function Restart-Backend {
    Write-Host "`n[INFO] Membangun ulang dan me-restart container BACKEND..." -ForegroundColor Yellow
    docker compose $COMPOSE_FILES up -d --build backend
    Write-Host "`n[SUCCESS] Backend berhasil di-restart!" -ForegroundColor Green -Bold
    Write-Host "`nTekan ENTER untuk kembali ke menu..."
    Read-Host
    Show-Menu
}

function Show-Logs {
    Write-Host "`n[INFO] Membuka log (tekan Ctrl+C untuk keluar dari log)..." -ForegroundColor Blue
    docker compose $COMPOSE_FILES logs -f
    Show-Menu
}

function Start-Prod {
    Write-Host "`n[INFO] Menyalakan kontainer dalam mode Production (Standalone)..." -ForegroundColor Magenta
    docker compose up -d
    Write-Host "`n[SUCCESS] Mode Produksi dijalankan di http://localhost:3000" -ForegroundColor Green -Bold
    Write-Host "`nTekan ENTER untuk kembali ke menu..."
    Read-Host
    Show-Menu
}

# Jalankan langsung berdasarkan argumen jika ada
if ($args.Count -gt 0) {
    switch ($args[0]) {
        "up" { docker compose $COMPOSE_FILES up -d }
        "build" { docker compose $COMPOSE_FILES up -d --build }
        "down" { docker compose $COMPOSE_FILES down }
        "restart-frontend" { docker compose $COMPOSE_FILES up -d --build frontend }
        "restart-backend" { docker compose $COMPOSE_FILES up -d --build backend }
        "logs" { docker compose $COMPOSE_FILES logs -f }
        "prod" { docker compose up -d }
        default {
            Write-Host "Penggunaan: .\run-dev.ps1 [perintah]" -ForegroundColor Yellow
            Write-Host "`nPerintah yang tersedia:"
            Write-Host "  up                 Menyalakan Docker Dev Mode (Hot-Reload)"
            Write-Host "  build              Rebuild dan nyalakan Docker Dev Mode"
            Write-Host "  down               Mematikan Docker Dev Mode"
            Write-Host "  restart-frontend   Rebuild & restart Frontend saja"
            Write-Host "  restart-backend    Rebuild & restart Backend saja"
            Write-Host "  logs               Lihat log kontainer secara real-time"
            Write-Host "  prod               Menyalakan Production Mode"
        }
    }
} else {
    Show-Menu
}
