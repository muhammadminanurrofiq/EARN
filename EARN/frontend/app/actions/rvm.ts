"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Initialize Prisma Client
const prisma = new PrismaClient();

export type RvmStatus = "Online" | "Offline" | "FULL" | "MAINTENANCE";

// ── CREATE ──────────────────────────────────────────────────────────────────
export async function createMesinRVM(data: { 
  id_mesin: string; 
  lokasi: string; 
  kapasitas_maks: number;
  lat?: number;
  lng?: number;
  initialStatus?: string;
  sensor?: any;
}) {
  try {
    let dbStatus = "Nonaktif";
    let currCapacity = 0;
    
    if (data.initialStatus === "online") dbStatus = "Aktif";
    if (data.initialStatus === "maintenance") dbStatus = "Maintenance";
    if (data.initialStatus === "full") {
      dbStatus = "Aktif";
      currCapacity = data.kapasitas_maks;
    }

    const newMesin = await prisma.mesin_RVM.create({
      data: {
        id_mesin: data.id_mesin,
        lokasi: data.lokasi,
        kapasitas_maks: data.kapasitas_maks,
        kapasitas_saat_ini: currCapacity,
        status_operasional: dbStatus,
        lat: data.lat,
        lng: data.lng,
        sensor: data.sensor || {},
      },
    });
    revalidatePath("/mesin-rvm");
    return { success: true, data: newMesin };
  } catch (error: any) {
    console.error("Error creating RVM:", error);
    return { success: false, message: error.message };
  }
}

// ── READ (with Pagination) ──────────────────────────────────────────────────
export async function getMesinRVMs(page: number = 1, limit: number = 6) {
  try {
    const skip = (page - 1) * limit;
    
    const [mesins, totalCount] = await Promise.all([
      prisma.mesin_RVM.findMany({
        skip,
        take: limit,
        orderBy: { id_mesin: "asc" }
      }),
      prisma.mesin_RVM.count()
    ]);

    // Map database model to frontend RvmUnit structure
    const formattedData = mesins.map((m) => {
      let status: RvmStatus = "Offline";
      
      // Calculate capacity percentage
      const kapasitasPersen = Math.min(
        100,
        Math.round((m.kapasitas_saat_ini / m.kapasitas_maks) * 100)
      );

      // Determine status
      if (m.status_operasional === "Maintenance") {
        status = "MAINTENANCE";
      } else if (kapasitasPersen >= 100) {
        status = "FULL";
      } else {
        // Consider it offline if last ping is too old (e.g., > 5 mins). For now, check string status.
        if (m.status_operasional === "Nonaktif") {
          status = "Offline";
        } else {
          status = "Online";
        }
      }

      return {
        id: m.id_mesin,
        lokasi: m.lokasi,
        status,
        kapasitas: kapasitasPersen,
        raw_status: m.status_operasional,
        last_ping: m.last_ping,
        sensor: m.sensor || {},
      };
    });

    return {
      success: true,
      data: formattedData,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  } catch (error: any) {
    console.error("Error getting RVMs:", error);
    return { success: false, message: error.message, data: [], pagination: null };
  }
}

// ── GET SINGLE ──────────────────────────────────────────────────────────────
export async function getMesinById(id_mesin: string) {
  try {
    const mesin = await prisma.mesin_RVM.findUnique({
      where: { id_mesin }
    });
    
    if (!mesin) return { success: false, message: "Not found" };
    
    const kapasitasPersen = Math.min(
      100,
      Math.round((mesin.kapasitas_saat_ini / mesin.kapasitas_maks) * 100)
    );
    
    let status: RvmStatus = "Offline";
    if (mesin.status_operasional === "Maintenance") status = "MAINTENANCE";
    else if (kapasitasPersen >= 100) status = "FULL";
    else if (mesin.status_operasional === "Nonaktif") status = "Offline";
    else status = "Online";

    return {
      success: true,
      data: {
        id: mesin.id_mesin,
        lokasi: mesin.lokasi,
        status,
        kapasitas: kapasitasPersen,
        kapasitas_maks: mesin.kapasitas_maks,
        raw_status: mesin.status_operasional,
        last_ping: mesin.last_ping,
        sensor: mesin.sensor || {},
      }
    };
  } catch (error: any) {
    console.error("Error getting RVM:", error);
    return { success: false, message: error.message };
  }
}

// ── UPDATE ──────────────────────────────────────────────────────────────────
export async function updateStatusMesin(id_mesin: string, newStatus: string) {
  try {
    // newStatus in DB could be 'Aktif', 'Maintenance', 'Nonaktif'
    let dbStatus = "Aktif";
    if (newStatus === "MAINTENANCE") dbStatus = "Maintenance";
    if (newStatus === "Offline") dbStatus = "Nonaktif";
    if (newStatus === "Online") dbStatus = "Aktif";

    const updated = await prisma.mesin_RVM.update({
      where: { id_mesin },
      data: { status_operasional: dbStatus },
    });
    revalidatePath("/mesin-rvm");
    return { success: true, data: updated };
  } catch (error: any) {
    console.error("Error updating RVM status:", error);
    return { success: false, message: error.message };
  }
}

// ── UPDATE SENSOR ───────────────────────────────────────────────────────────
export async function updateMesinSensor(id_mesin: string, sensorData: any) {
  try {
    const updated = await prisma.mesin_RVM.update({
      where: { id_mesin },
      data: { sensor: sensorData },
    });
    revalidatePath(`/mesin-rvm/${id_mesin}`);
    revalidatePath("/mesin-rvm");
    return { success: true, data: updated };
  } catch (error: any) {
    console.error("Error updating sensor:", error);
    return { success: false, message: error.message };
  }
}

// ── DELETE ──────────────────────────────────────────────────────────────────
export async function deleteMesinRVM(id_mesin: string) {
  try {
    await prisma.mesin_RVM.delete({
      where: { id_mesin },
    });
    revalidatePath("/mesin-rvm");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting RVM:", error);
    // Usually foreign key constraints could throw if it has transactions
    return { success: false, message: error.message };
  }
}
