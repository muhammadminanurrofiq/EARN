-- CreateTable
CREATE TABLE "Users" (
    "id_user" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "total_poin" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Mesin_RVM" (
    "id_mesin" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "kapasitas_maks" INTEGER NOT NULL,
    "kapasitas_saat_ini" INTEGER NOT NULL DEFAULT 0,
    "status_operasional" TEXT NOT NULL DEFAULT 'Aktif',
    "last_ping" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mesin_RVM_pkey" PRIMARY KEY ("id_mesin")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id_transaksi" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_mesin" TEXT NOT NULL,
    "jumlah_botol" INTEGER NOT NULL DEFAULT 1,
    "jumlah_poin" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id_transaksi")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_id_mesin_fkey" FOREIGN KEY ("id_mesin") REFERENCES "Mesin_RVM"("id_mesin") ON DELETE RESTRICT ON UPDATE CASCADE;
