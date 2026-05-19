#!/bin/sh
# ══════════════════════════════════════════════
# Entrypoint — EARN Backend Worker
# Menunggu PostgreSQL siap, lalu run migration,
# kemudian start Node.js worker.
# ══════════════════════════════════════════════

set -e

echo "⏳ Menunggu PostgreSQL siap di db:5432..."

# Loop sampai PostgreSQL bisa dikoneksi
until nc -z db 5432; do
  echo "   PostgreSQL belum siap — tunggu 2 detik..."
  sleep 2
done

echo "✅ PostgreSQL siap!"

echo "🔄 Menjalankan Prisma Migrate Deploy..."
npx prisma migrate deploy

echo "🚀 Memulai EARN Backend Worker..."
exec node src/worker.js
