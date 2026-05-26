"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

// ── Types ──────────────────────────────────────────────────────────────────────
type RvmStatus = 'Online' | 'Offline' | 'FULL' | 'MAINTENANCE';

interface RvmUnit {
  id: string;
  lokasi: string;
  status: RvmStatus;
  kapasitas: number; // percentage
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const rvmUnits: RvmUnit[] = [
  { id: 'RVM-01', lokasi: 'Fakultas Teknik', status: 'Online', kapasitas: 78 },
  { id: 'RVM-02', lokasi: 'Kantin Center', status: 'Online', kapasitas: 45 },
  { id: 'RVM-03', lokasi: 'Perpustakaan', status: 'FULL', kapasitas: 100 },
  { id: 'RVM-04', lokasi: 'Gedung Rektorat', status: 'Online', kapasitas: 12 },
  { id: 'RVM-05', lokasi: 'Laboratorium Riset', status: 'Offline', kapasitas: 0 },
  { id: 'RVM-06', lokasi: 'Area Parkir', status: 'MAINTENANCE', kapasitas: 0 },
];

// ── Sub-Components ─────────────────────────────────────────────────────────────

function RvmCard({ unit, onUpdateStatus }: { unit: RvmUnit, onUpdateStatus: (id: string, status: RvmStatus) => void }) {
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
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors text-left"
              >
                <span className="material-symbols-outlined text-sm">build</span>
                Maintenance
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-error hover:bg-error/10 transition-colors text-left border-t border-outline-variant/10">
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
  const [units, setUnits] = useState<RvmUnit[]>(rvmUnits);

  const handleUpdateStatus = (id: string, newStatus: RvmStatus) => {
    setUnits(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  return (
    <div className="ml-64 flex flex-col min-h-screen relative overflow-hidden bg-background">
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

      {/* TopAppBar */}
      <header className="h-20 bg-background/50 backdrop-blur-md sticky top-0 z-40 flex justify-between items-center px-8 border-b border-outline-variant/30">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="font-headline text-2xl font-bold text-primary">RVM Network</h2>
            <span className="material-symbols-outlined text-primary text-sm">sensors</span>
          </div>
          <p className="text-xs text-on-surface-variant">Monitoring Real-time Unit Mesin RVM</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/30 cursor-pointer hover:border-primary/40 transition-all">
              <span className="material-symbols-outlined text-sm">filter_alt</span>
              <span className="text-xs">Semua Lokasi</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-white/10 mx-1"></div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">notifications</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-background flex items-center justify-center text-[8px] font-bold">3</span>
            </div>
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary-fixed cursor-pointer transition-colors">light_mode</span>
            </div>
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary-fixed cursor-pointer transition-colors">settings</span>
            </div>
            <div className="flex items-center gap-3 bg-surface-container pl-3 pr-1 py-1 rounded-full border border-outline-variant/30">
              <div className="text-right hidden sm:block">
                <p className="text-[12px] font-bold text-primary">Admin</p>
                <p className="text-[10px] text-on-surface-variant leading-none">Super Admin</p>
              </div>
              <img alt="Admin avatar" className="w-8 h-8 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgODpEKbz6oZBhVOmiLYpZI1hxCuC09c-L6Jy2AIuIcPvVFgiYqsBaWJ3o1zY3QT3fAf1B3Qhgk_iAc0gQ1FunscmSPTYZXgAiiGkMV9kRPU1OZEPEj3IfeK245TA3jVfr-SYV3-NolFGzC3Zj4OhRwcX6zDYP0cKsDpcCQeXG4GM3iNZ8jHk7vhSQ1VwvBvsSdPQo3fPgJyGOHqD_vvja_SCCsjhCnH_zRoGKS0RYcO8Vid1BN7aTjDEnIX15nPIyuoOHMAqvrNU" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-6">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => (
            <RvmCard key={unit.id} unit={unit} onUpdateStatus={handleUpdateStatus} />
          ))}
        </section>
      </main>

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
