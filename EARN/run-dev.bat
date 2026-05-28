@echo off
title EARN - Local Development Environment Manager
cls

:: Hubungkan file docker-compose default dan dev
set COMPOSE_FILES=-f docker-compose.yml -f docker-compose.dev.yml

:: Cek argumen pertama
if "%~1"=="up" goto up
if "%~1"=="build" goto build
if "%~1"=="down" goto down
if "%~1"=="restart-frontend" goto restart_frontend
if "%~1"=="restart-backend" goto restart_backend
if "%~1"=="logs" goto logs
if "%~1"=="prod" goto prod
if not "%~1"=="" goto usage

:menu
echo =======================================================
echo          EARN - DEVELOPMENT MANAGER SYSTEM
echo =======================================================
echo   [1] Jalankan Docker Dev Mode (Hot-Reload di Docker)
echo   [2] Jalankan Dev Mode dengan Rebuild (Docker)
echo   [3] Hentikan Dev Mode (Docker Down)
echo   [4] Restart / Rebuild Frontend saja (Docker)
echo   [5] Restart / Rebuild Backend saja (Docker)
echo   [6] Lihat Log Kontainer (Docker Logs)
echo   [7] Jalankan Production Mode (Docker Standalone)
echo   [8] Keluar
echo =======================================================
set /p choice="Pilih opsi (1-8): "

if "%choice%"=="1" goto up
if "%choice%"=="2" goto build
if "%choice%"=="3" goto down
if "%choice%"=="4" goto restart_frontend
if "%choice%"=="5" goto restart_backend
if "%choice%"=="6" goto logs
if "%choice%"=="7" goto prod
if "%choice%"=="8" exit
echo Pilihan tidak valid! Silakan coba lagi.
pause
cls
goto menu

:up
echo.
echo [INFO] Menyalakan kontainer dalam mode Development (Hot-Reload)...
docker compose %COMPOSE_FILES% up -d
echo.
echo [INFO] Layanan berhasil dijalankan!
echo - Frontend: http://localhost:3000
echo - Mosquitto WebSocket (MQTT): ws://localhost:9001
echo - DB PostgreSQL: localhost:5432
echo.
echo Tekan tombol apa saja untuk kembali ke menu...
pause
cls
goto menu


:build
echo.
echo [INFO] Membangun ulang (rebuild) dan menyalakan semua kontainer...
docker compose %COMPOSE_FILES% up -d --build
echo.
echo [INFO] Layanan berhasil dibangun ulang dan dijalankan!
pause
cls
goto menu

:down
echo.
echo [INFO] Mematikan dan membersihkan semua kontainer...
docker compose %COMPOSE_FILES% down
echo.
echo [INFO] Kontainer berhasil dihentikan.
pause
cls
goto menu

:restart_frontend
echo.
echo [INFO] Membangun ulang dan me-restart container FRONTEND...
docker compose %COMPOSE_FILES% up -d --build frontend
echo.
echo [INFO] Frontend berhasil di-restart!
pause
cls
goto menu

:restart_backend
echo.
echo [INFO] Membangun ulang dan me-restart container BACKEND...
docker compose %COMPOSE_FILES% up -d --build backend
echo.
echo [INFO] Backend berhasil di-restart!
pause
cls
goto menu

:logs
echo.
echo [INFO] Membuka log (tekan Ctrl+C untuk keluar dari log)...
docker compose %COMPOSE_FILES% logs -f
goto menu

:prod
echo.
echo [INFO] Menyalakan kontainer dalam mode Production (Standalone)...
docker compose up -d
echo.
echo [INFO] Mode Produksi dijalankan di http://localhost:3000
pause
cls
goto menu

:usage
echo Penggunaan: run-dev.bat [perintah]
echo.
echo Perintah yang tersedia:
echo   up                 Menyalakan Docker Dev Mode (Hot-Reload)
echo   build              Rebuild dan nyalakan Docker Dev Mode
echo   down               Mematikan Docker Dev Mode
echo   restart-frontend   Rebuild & restart Frontend saja
echo   restart-backend    Rebuild & restart Backend saja
echo   logs               Lihat log kontainer secara real-time
echo   prod               Menyalakan Production Mode
echo.
exit /b 1
