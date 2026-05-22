"use client";

import React, { useRef } from 'react';

// Reusable RVM Card Component
function RVMCard({ unit }: { unit: any }) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    panelRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(78, 222, 163, 0.05) 0%, rgba(26, 33, 30, 0.4) 50%)`;
  };

  const handleMouseLeave = () => {
    if (panelRef.current) panelRef.current.style.background = 'rgba(26, 33, 30, 0.4)';
  };

  const isOnline = unit.status === 'Online';
  const isPenuh = unit.status === 'Penuh';
  const isOffline = unit.status === 'Offline';

  let borderHoverClass = 'hover:border-primary/30';
  let badgeClass = 'bg-primary-container/20 text-primary';
  let badgeText = 'Online';
  let strokeColor = '#4edea3';
  let circleStrokeDasharray = `${unit.kapasitas} 100`;
  let textKapasitasColor = 'text-primary';
  let textStatusColor = 'text-on-surface-variant';

  if (isPenuh) {
    borderHoverClass = 'hover:border-error/30';
    badgeClass = 'bg-error/20 text-error';
    badgeText = 'Penuh';
    strokeColor = '#ffb4ab';
    circleStrokeDasharray = '100 100';
    textKapasitasColor = 'text-error';
    textStatusColor = 'text-error';
  } else if (isOffline) {
    borderHoverClass = 'hover:border-outline/30 hover:opacity-100 opacity-80';
    badgeClass = 'bg-surface-container-highest text-on-surface-variant';
    badgeText = 'Offline';
    strokeColor = '#86948a';
    circleStrokeDasharray = '0 100';
    textKapasitasColor = 'text-on-surface-variant';
    textStatusColor = 'text-error';
  }

  return (
    <div
      ref={panelRef}
      className={`glass-panel rounded-2xl flex flex-col group ${borderHoverClass} transition-all p-4`}
      style={{ background: 'rgba(26, 33, 30, 0.4)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className={`text-lg font-headline font-bold ${isOffline ? 'text-outline' : 'text-primary'}`}>{unit.id}</h4>
          <p className="text-xs text-on-surface-variant flex items-center gap-xs">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            {unit.lokasi}
          </p>
        </div>
        <span className={`px-2 py-0.5 ${badgeClass} rounded text-[10px] font-bold uppercase font-label`}>
          {badgeText}
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center border-y border-outline-variant/10 my-4 py-4">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" fill="none" r="15.9" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            <circle
              className="transition-all duration-1000"
              cx="18" cy="18" fill="none" r="15.9"
              stroke={strokeColor}
              strokeDasharray={circleStrokeDasharray}
              strokeLinecap="round" strokeWidth="3"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={`text-xl font-headline font-bold ${textKapasitasColor}`}>
              {isOffline ? '-' : `${unit.kapasitas}%`}
            </p>
            <p className="text-[9px] text-on-surface-variant font-label uppercase tracking-wider">Kapasitas</p>
          </div>
        </div>
        <div className="mt-md text-center">
          {isOffline ? (
            <p className="text-sm font-bold text-on-surface-variant">Data Tidak Tersedia</p>
          ) : (
            <p className={`text-sm font-bold ${isPenuh ? 'text-error' : 'text-on-surface'}`}>
              {unit.isi} <span className="text-on-surface-variant font-normal">/ {unit.maks} botol</span>
            </p>
          )}
          <p className={`text-[10px] mt-1 ${isPenuh || isOffline ? 'font-bold' : ''} ${textStatusColor}`}>
            {isOffline ? 'Lost Connection' : isPenuh ? 'Butuh Pengosongan' : 'Status: Normal'}
          </p>
        </div>
      </div>
      <div className="flex gap-sm">
        {isPenuh ? (
          <button className="flex-1 py-2 bg-error/20 hover:bg-error/30 border border-error/30 rounded-lg text-[11px] font-bold text-error transition-all">
            Kosongkan
          </button>
        ) : isOffline ? (
          <button className="flex-1 py-2 bg-surface-container hover:bg-surface-container-highest border border-outline-variant/30 rounded-lg text-[11px] font-bold text-on-surface transition-all">
            Reconnect
          </button>
        ) : (
          <button className="flex-1 py-2 bg-surface-container hover:bg-surface-container-highest border border-outline-variant/30 rounded-lg text-[11px] font-bold text-on-surface transition-all">
            Maintenance
          </button>
        )}
        <button className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-[11px] font-bold text-primary transition-all">
          Detail
        </button>
      </div>
    </div>
  );
}

export default function MesinRVMPage() {
  const units = [
    { id: 'RVM-01', lokasi: 'Fakultas Teknik', status: 'Online', kapasitas: 78, isi: 620, maks: 800 },
    { id: 'RVM-02', lokasi: 'Kantin Center', status: 'Online', kapasitas: 45, isi: 360, maks: 800 },
    { id: 'RVM-03', lokasi: 'Perpustakaan', status: 'Penuh', kapasitas: 100, isi: 800, maks: 800 },
    { id: 'RVM-04', lokasi: 'Gedung Rektorat', status: 'Online', kapasitas: 12, isi: 100, maks: 800 },
    { id: 'RVM-05', lokasi: 'Laboratorium Riset', status: 'Offline', kapasitas: 0, isi: 0, maks: 0 },
  ];

  return (
    <div className="ml-64 flex flex-col min-h-screen">
      <header className="h-20 bg-background/50 backdrop-blur-md sticky top-0 z-40 flex justify-between items-center px-gutter border-b border-outline-variant/30">
        <div className="flex flex-col">
          <div className="flex items-center gap-sm">
            <h2 className="font-headline text-2xl font-bold text-primary">RVM Network</h2>
            <span className="material-symbols-outlined text-primary text-sm">sensors</span>
          </div>
          <p className="text-xs text-on-surface-variant">Monitoring Real-time Unit Mesin RVM</p>
        </div>
        <div className="flex items-center gap-md">
          <div className="hidden md:flex items-center gap-sm">
            <div className="flex items-center gap-xs px-sm py-2 bg-surface-container rounded-lg border border-outline-variant/30 cursor-pointer hover:border-primary/40 transition-all">
              <span className="material-symbols-outlined text-sm">filter_alt</span>
              <span className="text-xs">Semua Lokasi</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-white/10 mx-xs"></div>
          <div className="flex items-center gap-md gap-4">
            <div className="relative">
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">notifications</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-background flex items-center justify-center text-[8px] font-bold">3</span>
            </div>
            <div className="relative flex items-center justify-center"><span className="material-symbols-outlined text-on-surface-variant hover:text-primary-fixed cursor-pointer transition-colors">light_mode</span></div>
            <div className="relative flex items-center justify-center"><span className="material-symbols-outlined text-on-surface-variant hover:text-primary-fixed cursor-pointer transition-colors">settings</span></div>
            <div className="flex items-center gap-sm bg-surface-container pl-sm pr-xs py-xs rounded-full border border-outline-variant/30">
              <div className="text-right">
                <p className="text-[12px] font-bold text-primary">Admin</p>
                <p className="text-[10px] text-on-surface-variant leading-none">Super Admin</p>
              </div>
              <img alt="Admin avatar" className="w-8 h-8 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgODpEKbz6oZBhVOmiLYpZI1hxCuC09c-L6Jy2AIuIcPvVFgiYqsBaWJ3o1zY3QT3fAf1B3Qhgk_iAc0gQ1FunscmSPTYZXgAiiGkMV9kRPU1OZEPEj3IfeK245TA3jVfr-SYV3-NolFGzC3Zj4OhRwcX6zDYP0cKsDpcCQeXG4GM3iNZ8jHk7vhSQ1VwvBvsSdPQo3fPgJyGOHqD_vvja_SCCsjhCnH_zRoGKS0RYcO8Vid1BN7aTjDEnIX15nPIyuoOHMAqvrNU" />
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 flex-1">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {units.map(unit => <RVMCard key={unit.id} unit={unit} />)}
        </section>
      </main>

      <footer className="mt-auto px-gutter py-md border-t border-outline-variant/30 flex justify-between items-center text-[10px] text-on-surface-variant opacity-50 uppercase tracking-widest font-label font-bold">
        <div className="flex items-center gap-sm">
          <span className="w-2 h-2 rounded-full bg-primary pulse-emerald"></span>
          <span>Sistem Online &amp; Terhubung</span>
        </div>
        <span>EARN System v1.0.0</span>
        <span>© 2025 Eco Action &amp; Reward Network</span>
      </footer>
    </div>
  );
}
