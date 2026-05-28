#!/bin/sh
# ══════════════════════════════════════════════
# Entrypoint Development — EARN Backend Worker
# Menunggu PostgreSQL siap, run migration,
# kemudian start Nodemon worker.
# ══════════════════════════════════════════════

set -e

echo "⏳ [Dev] Menunggu PostgreSQL siap di db:5432..."

# Loop sampai PostgreSQL bisa dikoneksi
until nc -z db 5432; do
  echo "   [Dev] PostgreSQL belum siap — tunggu 2 detik..."
  sleep 2
done

echo "✅ [Dev] PostgreSQL siap!"

echo "🔄 [Dev] Menjalankan Prisma Migrate Deploy..."
npx prisma migrate deploy

echo "🚀 [Dev] Memulai EARN Backend Worker (Nodemon)..."
exec npm run dev
