"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { getMesinRVMs, createMesinRVM, updateStatusMesin, deleteMesinRVM, RvmStatus } from '@/app/actions/rvm';
import { useRouter } from 'next/navigation';

// ── Types ──────────────────────────────────────────────────────────────────────

interface RvmUnit {
  id: string;
  lokasi: string;
  status: RvmStatus;
  kapasitas: number; // percentage
  sensor?: any;
}

// ── Sub-Components ─────────────────────────────────────────────────────────────

function AddMachineModal({ onClose, onAdd }: { onClose: () => void, onAdd: (data: any) => Promise<void> }) {
  const [idMesin, setIdMesin] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [lat, setLat] = useState<string>('');
  const [lng, setLng] = useState<string>('');
  const [kapasitas, setKapasitas] = useState(800);
  const [initialStatus, setInitialStatus] = useState('offline');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onAdd({ 
      id_mesin: idMesin, 
      lokasi, 
      kapasitas_maks: kapasitas,
      lat: lat ? parseFloat(lat) : undefined,
      lng: lng ? parseFloat(lng) : undefined,
      initialStatus
    });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-surface-container-high border border-outline-variant/30 rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-highest">
          <h3 className="font-headline text-lg font-bold text-primary">Tambah Unit Baru</h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-error transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-label text-on-surface-variant uppercase tracking-wider">ID / Nama Mesin</label>
              <input required value={idMesin} onChange={e => setIdMesin(e.target.value)} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Contoh: RVM-07" type="text" />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-label text-on-surface-variant uppercase tracking-wider">LOKASI FISIK</label>
              <input required value={lokasi} onChange={e => setLokasi(e.target.value)} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Contoh: Gedung F" type="text" />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-label text-on-surface-variant uppercase tracking-wider">KOORDINAT LOKASI</label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input value={lat} onChange={e => setLat(e.target.value)} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="-6.3621" type="number" step="any" />
                  <span className="absolute right-3 top-2 text-[10px] text-on-surface-variant font-label opacity-50">LAT</span>
                </div>
                <div className="flex-1 relative">
                  <input value={lng} onChange={e => setLng(e.target.value)} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="106.8249" type="number" step="any" />
                  <span className="absolute right-3 top-2 text-[10px] text-on-surface-variant font-label opacity-50">LNG</span>
                </div>
                <button type="button" className="flex items-center justify-center p-2 bg-secondary-container/30 text-secondary border border-secondary/20 rounded-lg hover:bg-secondary/10 transition-all" title="Pilih di Peta">
                  <span className="material-symbols-outlined">map</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-label text-on-surface-variant uppercase tracking-wider">Kapasitas Maksimal (Botol)</label>
              <input required value={kapasitas} onChange={e => setKapasitas(Number(e.target.value))} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" type="number" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-label text-on-surface-variant uppercase tracking-wider block">Mode Status Awal</label>
              <div className="relative group">
                <select value={initialStatus} onChange={e => setInitialStatus(e.target.value)} className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer font-body-md pr-10">
                  <option value="online">Online</option>
                  <option value="offline">Offline (Default)</option>
                  <option value="full">Full</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-primary">
                  <span className="material-symbols-outlined text-xl">expand_more</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant/30 flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-bold font-label text-on-surface-variant hover:bg-surface-variant transition-all">BATAL</button>
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold font-label shadow-lg shadow-primary/20 hover:bg-primary-container transition-all">
              {loading ? 'MENYIMPAN...' : 'SIMPAN MESIN'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MaintenanceModal({ unit, onClose, onUpdateStatus }: { unit: RvmUnit, onClose: () => void, onUpdateStatus: (id: string, status: RvmStatus) => void }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [captureText, setCaptureText] = useState('Ambil Gambar');

  const handleCapture = () => {
    setCaptureText('Capturing...');
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
      setTimeout(() => {
        setCaptureText('Ambil Gambar');
      }, 500);
    }, 100);
  };

  if (!unit) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-lg transition-opacity duration-300">
      <div className={`glass-panel w-full ${isFullscreen ? 'max-w-[95vw] h-[95vh]' : 'max-w-6xl h-[85vh]'} rounded-xl border border-primary/20 flex flex-col shadow-2xl overflow-hidden relative transition-all duration-300`}>
        {/* Modal Header */}
        <div className="flex items-center justify-between p-md border-b border-outline-variant/30">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary">engineering</span>
            <h3 className="font-headline text-xl font-bold text-primary">Maintenance Mode - {unit.id}</h3>
          </div>
          <div className="flex items-center gap-sm">
            <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 hover:bg-white/5 rounded-lg text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
            </button>
            <button onClick={onClose} className="p-2 hover:bg-error/10 rounded-lg text-on-surface-variant hover:text-error transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Modal Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-md space-y-md">
          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
            <div className="lg:col-span-4 bg-surface-container/50 rounded-xl p-md border border-outline-variant/20 flex flex-col items-center justify-center">
              <h4 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-md">Kapasitas Penyimpanan</h4>
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" fill="none" r="15.9" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5"></circle>
                  <circle cx="18" cy="18" fill="none" r="15.9" stroke="#f59e0b" strokeDasharray={`${unit.kapasitas} 100`} strokeLinecap="round" strokeWidth="2.5"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-headline font-bold text-primary">{unit.kapasitas}%</span>
                  <span className="text-[9px] text-on-surface-variant font-label uppercase">{unit.kapasitas >= 80 ? 'Penuh' : 'Aman'}</span>
                </div>
              </div>
              <div className="mt-sm text-center">
                <p className="text-[11px] text-on-surface-variant">Sisa ruang: ~{Math.floor(((100 - unit.kapasitas) / 100) * 800)} botol</p>
              </div>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-md">
              {unit.sensor && Object.keys(unit.sensor).length > 0 ? (
                Object.entries(unit.sensor).slice(0, 2).map(([key, value], idx) => (
                  <div key={idx} className="flex-1 bg-surface-container/50 rounded-xl p-md border border-outline-variant/20 flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-primary mb-2">
                      {key.toLowerCase().includes('suhu') ? 'thermostat' : key.toLowerCase().includes('lembab') ? 'humidity_mid' : 'sensors'}
                    </span>
                    <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">{key}</p>
                    <p className="text-xl font-headline font-bold text-primary">{String(value)}{key.toLowerCase().includes('suhu') ? '°C' : key.toLowerCase().includes('lembab') ? '%' : ''}</p>
                    <p className="text-[9px] text-secondary font-medium mt-1">Real-time Data</p>
                  </div>
                ))
              ) : (
                <div className="flex-1 bg-surface-container/50 rounded-xl p-md border border-outline-variant/20 flex flex-col items-center justify-center text-center">
                  <span className="material-symbols-outlined text-on-surface-variant/50 mb-2">sensors_off</span>
                  <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">Sensor Kosong</p>
                </div>
              )}
            </div>
            <div className="lg:col-span-5 bg-surface-container/50 rounded-xl border border-outline-variant/20 flex flex-col overflow-hidden">
              <div className="relative aspect-video">
                <img alt="RVM Live Feed" className="w-full h-full object-cover grayscale-[0.2] brightness-75" src="https://lh3.googleusercontent.com/aida/ADBb0uiebtWC8SeJx2e6QOI86dM8HjLwqVm0SeP4efOvAHaYsICDvJ6hh1raC6aX0cmtj8kpQ_PmOUUHmtIvttebOzHgcnpP9H-VsXzXQMXieo17bn2sh96bXnQr9yKkd8-cJz6nh_sp7wZqsmsh7N4fd6PuMfa7_BTkyg382IfMtTUJ4QI3V84T73jOj5i_ietMXlXTuA1CNpRwRRnPpUFClodv32tbMADDUbS0NvHOs82f0Z1AucbbHnZsEA"/>
                <div className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-100 ${isFlashing ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 px-2 py-1 rounded text-[10px] font-bold text-error uppercase tracking-tighter border border-error/50">
                  <span className="w-1.5 h-1.5 bg-error rounded-full status-blink"></span> Live Feed
                </div>
              </div>
              <div className="p-sm bg-surface-container-high/80 flex items-center justify-center">
                <button onClick={handleCapture} className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-xs font-bold transition-all border border-primary/20">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                  <span className="">{captureText}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {/* System Logs */}
            <div className="bg-surface-container/50 rounded-xl p-md border border-outline-variant/20 flex flex-col h-64">
              <h4 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-sm">System Logs</h4>
              <div className="flex-1 overflow-y-auto space-y-2 font-label text-[11px] text-on-surface-variant/80">
                <div className="flex gap-2"><span className="text-primary">[14:20]</span> <span className="">Sensor 01 (Ultrasonic) Calibrated - OK</span></div>
                <div className="flex gap-2"><span className="text-primary">[14:25]</span> <span className="">Connectivity Check - Signal Strength 85%</span></div>
                <div className="flex gap-2"><span className="text-primary">[14:30]</span> <span className="">Internal Temp: 24.5°C - Normal</span></div>
                <div className="flex gap-2"><span className="text-primary">[14:32]</span> <span className="">User Session Started - ID 0x4f2</span></div>
                <div className="flex gap-2"><span className="text-primary">[14:35]</span> <span className="">Compactor Cycle Completed</span></div>
                <div className="flex gap-2"><span className="text-primary">[14:40]</span> <span className="">Door Lock Status: Verified Secure</span></div>
              </div>
            </div>

            {/* Action Controls */}
            <div className="bg-surface-container/50 rounded-xl p-md border border-outline-variant/20 flex flex-col">
              <h4 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">Action Controls</h4>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => { onUpdateStatus(unit.id, 'Online'); onClose(); }} className="flex items-center gap-2 px-3 py-2 bg-surface-container-highest/50 hover:bg-primary/10 rounded-lg border border-outline-variant/30 text-on-surface transition-all group">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-primary">play_arrow</span>
                  <span className="text-xs font-medium">Save Reactivate</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-surface-container-highest/50 hover:bg-primary/10 rounded-lg border border-outline-variant/30 text-on-surface transition-all group">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-primary">restart_alt</span>
                  <span className="text-xs font-medium">Reboot System</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-surface-container-highest/50 hover:bg-primary/10 rounded-lg border border-outline-variant/30 text-on-surface transition-all group">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-primary">lock_open</span>
                  <span className="text-xs font-medium">Unlock Door</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-surface-container-highest/50 hover:bg-primary/10 rounded-lg border border-outline-variant/30 text-on-surface transition-all group">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-primary">tune</span>
                  <span className="text-xs font-medium">Kalibrasi Sensor</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-surface-container-highest/50 hover:bg-primary/10 rounded-lg border border-outline-variant/30 text-on-surface transition-all group">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-primary">file_export</span>
                  <span className="text-xs font-medium">Export Logs</span>
                </button>
                <button onClick={onClose} className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary-fixed-dim rounded-lg text-on-primary shadow-lg shadow-primary/10 transition-all group">
                  <span className="material-symbols-outlined text-sm">save</span>
                  <span className="text-xs font-bold">Save as Draft</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RvmCard({ unit, onUpdateStatus, onOpenMaintenance, onDelete }: { unit: RvmUnit, onUpdateStatus: (id: string, status: RvmStatus) => void, onOpenMaintenance: (unit: RvmUnit) => void, onDelete: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Glass panel hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    panelRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(78, 222, 163, 0.05) 0%, rgba(26, 33, 30, 0.4) 50%)`;
  };

  const handleMouseLeave = () => {
    if (panelRef.current) {
      panelRef.current.style.background = 'rgba(26, 33, 30, 0.4)';
    }
  };

  // Determine styling based on status
  let colorTheme = 'primary';
  let hexColor = '#4edea3';
  let hoverBorder = 'hover:border-primary/30';
  let opacityClass = '';

  if (unit.status === 'FULL') {
    colorTheme = 'error';
    hexColor = '#ffb4ab';
    hoverBorder = 'hover:border-error/30';
  } else if (unit.status === 'MAINTENANCE') {
    colorTheme = 'yellow-500';
    hexColor = '#f59e0b';
    hoverBorder = 'hover:border-yellow-500/30';
  } else if (unit.status === 'Offline') {
    colorTheme = 'outline';
    hexColor = '#86948a';
    hoverBorder = 'hover:border-outline/30';
    opacityClass = 'opacity-80';
  }

  // Calculate SVG stroke-dasharray (circumference is ~100 for r=15.9 -> 2*PI*15.9 = 99.9)
  const dashVal = unit.kapasitas === 0 && unit.status !== 'Offline' && unit.status !== 'MAINTENANCE'
    ? 0 : unit.kapasitas;
  // Handle offline/maintenance display logic based on design
  const displayDash = (unit.status === 'Offline' || unit.status === 'MAINTENANCE') ? 0 : unit.kapasitas;
  const displayValue = unit.status === 'Offline' ? '-' : `${unit.kapasitas}%`;

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel rounded-xl flex items-center justify-between group ${hoverBorder} transition-all px-6 py-4 ${opacityClass} relative ${menuOpen ? 'z-50' : 'z-10'}`}
      style={{ background: 'rgba(26, 33, 30, 0.4)' }}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-[80px] h-[80px] shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" fill="none" r="15.9" stroke="rgba(255,255,255,0.05)" strokeWidth="3"></circle>
            <circle
              className="transition-all duration-1000"
              cx="18" cy="18" fill="none" r="15.9"
              stroke={hexColor}
              strokeDasharray={`${displayDash} 100`}
              strokeLinecap="round" strokeWidth="3"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={`text-sm font-headline font-bold text-${colorTheme} leading-none`}>{displayValue}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h4 className={`text-base font-headline font-bold text-${unit.status === 'Offline' ? 'outline' : colorTheme} leading-none`}>{unit.id}</h4>
            <div className={`flex items-center gap-1 bg-${colorTheme}/10 px-1.5 py-0.5 rounded border border-${colorTheme}/20`}>
              <span className={`w-1.5 h-1.5 rounded-full bg-${colorTheme} ${unit.status !== 'Offline' ? 'status-blink' : ''}`}></span>
              <span className={`text-[9px] font-bold text-${colorTheme} uppercase tracking-wider font-label leading-none`}>{unit.status}</span>
            </div>
          </div>
          <p className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-[14px]">location_on</span> {unit.lokasi}
          </p>
        </div>
      </div>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-on-surface-variant hover:text-primary transition-colors p-1"
        >
          <span className="material-symbols-outlined text-[18px]">more_vert</span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 w-32 bg-surface-container-high border border-outline-variant/30 rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="flex flex-col">
              <Link
                href={`/mesin-rvm/${unit.id}`}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors text-left"
              >
                <span className="material-symbols-outlined text-sm">visibility</span>
                Lihat
              </Link>
              <button
                onClick={() => {
                  onUpdateStatus(unit.id, 'MAINTENANCE');
                  onOpenMaintenance(unit);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors text-left"
              >
                <span className="material-symbols-outlined text-sm">build</span>
                Maintenance
              </button>
              <button onClick={() => onDelete(unit.id)} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-error hover:bg-error/10 transition-colors text-left border-t border-outline-variant/10">
                <span className="material-symbols-outlined text-sm">delete</span>
                Hapus
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page Component ───────────────────────────────────────────────────────

export default function MesinRvmPage() {
  const [units, setUnits] = useState<RvmUnit[]>([]);
  const [maintenanceUnit, setMaintenanceUnit] = useState<RvmUnit | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 6;

  const fetchUnits = async (page: number) => {
    setLoading(true);
    const result = await getMesinRVMs(page, limit);
    if (result.success && result.data && result.pagination) {
      setUnits(result.data as RvmUnit[]);
      setTotalPages(result.pagination.totalPages);
      setTotalItems(result.pagination.total);
      setCurrentPage(result.pagination.page);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUnits(currentPage);
  }, [currentPage]);

  const handleUpdateStatus = async (id: string, newStatus: RvmStatus) => {
    setUnits(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    if (maintenanceUnit && maintenanceUnit.id === id) {
      setMaintenanceUnit(prev => prev ? { ...prev, status: newStatus } : null);
    }
    await updateStatusMesin(id, newStatus);
  };

  const handleDelete = async (id: string) => {
    if (confirm(`Yakin ingin menghapus mesin ${id}?`)) {
      await deleteMesinRVM(id);
      fetchUnits(currentPage);
    }
  };

  const handleAdd = async (data: { 
    id_mesin: string; 
    lokasi: string; 
    kapasitas_maks: number;
    lat?: number;
    lng?: number;
    initialStatus?: string;
    sensor?: any;
  }) => {
    // Add default sensors
    data.sensor = [
      { name: "Suhu", icon: "device_thermostat", dataType: "Celsius", sensorType: "SHT4x", barcode: "S-001", value: 0 },
      { name: "Kelembaban", icon: "humidity_percentage", dataType: "Percentage", sensorType: "SHT4x", barcode: "H-001", value: 0 }
    ];
    const res = await createMesinRVM(data);
    if (res.success) {
      setIsAdding(false);
      router.push(`/mesin-rvm/${data.id_mesin}`);
    } else {
      alert("Gagal menambah mesin: " + res.message);
    }
  };

  return (
    <div className="md:ml-64 flex flex-col min-h-screen relative bg-background">
      {/* Background Decorative Elements */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-[-1]"></div>
      <div className="fixed bottom-[-10%] left-[15%] w-[400px] h-[400px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none z-[-1]"></div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        .status-blink { animation: blink 1.5s ease-in-out infinite; }
        .glass-panel {
          background: rgba(26, 33, 30, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(78, 222, 163, 0.05);
          transition: all 0.3s ease;
        }
        @keyframes pulse-emerald {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(1.2); }
        }
        .pulse-emerald {
          animation: pulse-emerald 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* TopAppBar — Shared Sticky Navbar */}
      <Header
        title="Mesin RVM"
        subtitle="Monitoring Real-time Unit Mesin RVM"
        icon="sensors"
        rightExtra={
          <div className="hidden md:flex items-center gap-sm">
            <div className="flex items-center gap-xs px-sm py-2 bg-surface-container rounded-lg border border-outline-variant/30 cursor-pointer hover:border-primary/40 transition-all">
              <span className="material-symbols-outlined text-sm">filter_alt</span>
              <span className="text-xs">Semua Lokasi</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </div>
          </div>
        }
      />

      {/* Main Content Area */}
      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col"></div>
          <button onClick={() => setIsAdding(true)} className="flex items-center gap-xs px-md py-2 bg-primary text-on-primary rounded-lg font-bold text-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-base">add</span>
            <span className="">Tambah Mesin Baru</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="material-symbols-outlined animate-spin text-primary text-4xl">autorenew</span>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit) => (
              <RvmCard key={unit.id} unit={unit} onUpdateStatus={handleUpdateStatus} onOpenMaintenance={setMaintenanceUnit} onDelete={handleDelete} />
            ))}
            {units.length === 0 && (
              <div className="col-span-full text-center py-12 text-on-surface-variant font-label">
                Belum ada data mesin RVM.
              </div>
            )}
          </section>
        )}

        {/* Pagination Controls */}
        <div className="mt-12 flex items-center justify-between border-t border-outline-variant/30 pt-6">
          <p className="text-xs text-on-surface-variant font-label tracking-wide uppercase opacity-70">
            Menampilkan {units.length} dari {totalItems} Unit
          </p>
          <nav className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
              <span className="text-xs font-bold font-label">Sebelumnya</span>
            </button>
            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold font-label transition-all ${
                    currentPage === idx + 1 
                      ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                      : 'text-on-surface-variant hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => p + 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              <span className="text-xs font-bold font-label">Selanjutnya</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </nav>
        </div>
      </main>

      {/* Modals */}
      {maintenanceUnit && (
        <MaintenanceModal 
          unit={maintenanceUnit} 
          onClose={() => setMaintenanceUnit(null)} 
          onUpdateStatus={handleUpdateStatus} 
        />
      )}
      
      {isAdding && (
        <AddMachineModal 
          onClose={() => setIsAdding(false)} 
          onAdd={handleAdd} 
        />
      )}

      {/* Footer */}
      <footer className="mt-auto px-8 py-6 border-t border-outline-variant/30 flex justify-between items-center text-[10px] text-on-surface-variant opacity-50 uppercase tracking-widest font-label font-bold">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary pulse-emerald"></span>
          <span>Sistem Online &amp; Terhubung</span>
        </div>
        <span>EARN System v1.0.0</span>
        <span>© 2026 Eco Action &amp; Reward Network</span>
      </footer>
    </div>
  );
}
