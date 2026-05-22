"use client";

import React, { useRef } from 'react';

// Reusable User Card Component
function UserCard({ user }: { user: any }) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    panelRef.current.style.setProperty('--mouse-x', `${x}px`);
    panelRef.current.style.setProperty('--mouse-y', `${y}px`);
    panelRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(78, 222, 163, 0.05) 0%, rgba(26, 33, 30, 0.4) 50%)`;
  };

  const handleMouseLeave = () => {
    if (panelRef.current) {
      panelRef.current.style.background = 'rgba(26, 33, 30, 0.4)';
    }
  };

  const isActive = user.status === 'AKTIF';
  const hasBottles = user.botol > 0;

  return (
    <div
      ref={panelRef}
      className="glass-panel p-6 rounded-xl organic-glow group transition-all relative"
      style={{ background: 'rgba(26, 33, 30, 0.4)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button className="absolute top-4 right-4 p-1 text-on-surface-variant hover:text-primary transition-colors">
        <span className="material-symbols-outlined">more_vert</span>
      </button>
      <div className="flex flex-col items-center text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg ${user.avatarClass}`}>
          {user.initials}
        </div>
        <h5 className="font-body-md text-lg font-bold text-on-surface mb-1">{user.name}</h5>
        <p className="font-body-sm text-on-surface-variant mb-6">{user.email}</p>
        
        <div className="w-full grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/10">
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider text-on-surface-variant mb-1">Total Botol</p>
            <div className="flex items-center gap-1.5">
              <span className={`material-symbols-outlined text-lg ${hasBottles ? 'text-primary' : 'text-on-surface-variant'}`}>eco</span>
              <span className={`font-label-md font-bold ${hasBottles ? 'text-primary' : 'text-on-surface-variant'}`}>{user.botol}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-on-surface-variant mb-1">Status</p>
            {isActive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                AKTIF
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold border border-outline-variant/20">
                <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span>
                NONAKTIF
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Bento Card Component for Stats
function StatBentoCard({ children }: { children: React.ReactNode }) {
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

  return (
    <div
      ref={panelRef}
      className="glass-panel p-md rounded-xl organic-glow group transition-all"
      style={{ background: 'rgba(26, 33, 30, 0.4)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default function PenggunaPage() {
  const users = [
    { initials: 'SP', name: 'Salsabila Putri', email: 'salsabila@email.com', botol: 156, status: 'AKTIF', avatarClass: 'bg-gradient-to-br from-primary to-secondary text-on-primary' },
    { initials: 'AW', name: 'Andi Wijaya', email: 'andi.op@earn.id', botol: 0, status: 'AKTIF', avatarClass: 'bg-gradient-to-br from-tertiary to-secondary text-on-tertiary' },
    { initials: 'BS', name: 'Budi Santoso', email: 'budi_s@gmail.com', botol: 89, status: 'NONAKTIF', avatarClass: 'bg-surface-container-highest text-on-surface-variant' },
    { initials: 'RW', name: 'Rina Wijaya', email: 'rina.w@earn.id', botol: 452, status: 'AKTIF', avatarClass: 'bg-gradient-to-br from-primary to-secondary text-on-primary' },
    { initials: 'BK', name: 'Bambang Kusuma', email: 'bambang.k@gmail.com', botol: 12, status: 'NONAKTIF', avatarClass: 'bg-surface-container-highest text-on-surface-variant' },
    { initials: 'SA', name: 'Siti Aminah', email: 'siti.aminah@earn.id', botol: 88, status: 'AKTIF', avatarClass: 'bg-gradient-to-br from-tertiary to-secondary text-on-tertiary' },
    { initials: 'DS', name: 'Dian Sastro', email: 'dian.s@earn.id', botol: 124, status: 'AKTIF', avatarClass: 'bg-gradient-to-br from-primary to-secondary text-on-primary' },
    { initials: 'AA', name: 'Ahmad Albar', email: 'ahmad.a@gmail.com', botol: 5, status: 'NONAKTIF', avatarClass: 'bg-surface-container-highest text-on-surface-variant' },
    { initials: 'IH', name: 'Indra Herlambang', email: 'indra.h@earn.id', botol: 231, status: 'AKTIF', avatarClass: 'bg-gradient-to-br from-tertiary to-secondary text-on-tertiary' },
    { initials: 'MA', name: 'Maia Ahmad', email: 'maia.a@earn.id', botol: 567, status: 'AKTIF', avatarClass: 'bg-gradient-to-br from-primary to-secondary text-on-primary' },
    { initials: 'TM', name: 'Taufik Mansyur', email: 'taufik.m@yahoo.com', botol: 0, status: 'NONAKTIF', avatarClass: 'bg-surface-container-highest text-on-surface-variant' },
    { initials: 'LN', name: 'Lestari Ningsih', email: 'lestari.n@earn.id', botol: 189, status: 'AKTIF', avatarClass: 'bg-gradient-to-br from-tertiary to-secondary text-on-tertiary' }
  ];

  return (
    <div className="ml-64 flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Atmospheric Effect */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-5%] left-[10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Header (TopAppBar) */}
      <header className="flex justify-between items-center w-full h-20 sticky top-0 z-50 mb-8 px-8 bg-surface-container/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(78,222,163,0.05)]">
        <div className="flex items-center gap-4">
          <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">Manajemen Pengguna</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input className="bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-full pl-10 pr-4 py-2 w-64 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm outline-none" placeholder="Cari pengguna..." type="text" />
          </div>
          <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-[0_0_15px_rgba(78,222,163,0.3)]">
            <span className="material-symbols-outlined text-sm">add</span>
            Tambah Pengguna Baru
          </button>
          <div className="flex gap-4 border-l border-white/10 pl-4 items-center">
            <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="flex items-center gap-sm bg-surface-container pl-sm pr-xs py-xs rounded-full border border-outline-variant/30 ml-2">
              <div className="text-right">
                <p className="text-[12px] font-bold text-primary">Admin</p>
                <p className="text-[10px] text-on-surface-variant leading-none">Super Admin</p>
              </div>
              <img alt="Admin avatar" className="w-8 h-8 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgODpEKbz6oZBhVOmiLYpZI1hxCuC09c-L6Jy2AIuIcPvVFgiYqsBaWJ3o1zY3QT3fAf1B3Qhgk_iAc0gQ1FunscmSPTYZXgAiiGkMV9kRPU1OZEPEj3IfeK245TA3jVfr-SYV3-NolFGzC3Zj4OhRwcX6zDYP0cKsDpcCQeXG4GM3iNZ8jHk7vhSQ1VwvBvsSdPQo3fPgJyGOHqD_vvja_SCCsjhCnH_zRoGKS0RYcO8Vid1BN7aTjDEnIX15nPIyuoOHMAqvrNU" />
            </div>
          </div>
        </div>
      </header>

      <main className="px-8 flex-1 flex flex-col gap-8 pb-8">
        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatBentoCard>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined text-primary">group</span>
              </div>
              <span className="text-primary text-[12px] font-bold bg-primary/10 px-2 py-1 rounded-full">↑ 12%</span>
            </div>
            <h3 className="text-sm text-on-surface-variant mb-1">Total Pengguna</h3>
            <p className="text-4xl font-headline font-bold text-on-surface">3.452</p>
            <div className="w-full bg-surface-container-high h-1 mt-4 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[70%] shadow-[0_0_8px_#4edea3]"></div>
            </div>
          </StatBentoCard>

          <StatBentoCard>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <span className="material-symbols-outlined text-secondary">bolt</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[12px] font-bold text-on-surface-variant">Live</span>
              </div>
            </div>
            <h3 className="text-sm text-on-surface-variant mb-1">Pengguna Aktif</h3>
            <p className="text-4xl font-headline font-bold text-on-surface">1.240</p>
            <p className="text-[12px] text-on-surface-variant mt-2">Sedang online sekarang</p>
          </StatBentoCard>

          <StatBentoCard>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-tertiary/10 rounded-lg">
                <span className="material-symbols-outlined text-tertiary">person_add</span>
              </div>
            </div>
            <h3 className="text-sm text-on-surface-variant mb-1">Pendaftaran Baru</h3>
            <p className="text-4xl font-headline font-bold text-on-surface">45</p>
            <p className="text-[12px] text-primary mt-2">Target tercapai hari ini</p>
          </StatBentoCard>

          <StatBentoCard>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined text-primary">token</span>
              </div>
            </div>
            <h3 className="text-sm text-on-surface-variant mb-1">Total Poin Terdistribusi</h3>
            <p className="text-4xl font-headline font-bold text-on-surface">850.200 <span className="text-sm font-normal text-on-surface-variant">PTS</span></p>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex -space-x-2">
                <img alt="User" className="w-6 h-6 rounded-full border border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpxKR2P63FFz1CVmhVq5PcgX_Sp7oBRJNyS38hz3Q3tILzY6R_PBnPcDTHMM9zSYpz75Xq1vvGSbFxabG-h-0R1jc04i44DXiglSdPbjYqdj1zv1jV1VDo3BgZZNAlTzTQ9fS6uUAuTcEP1MPbcWfGC1wb_LjRdBU8_BErYS-vAqfnmq4fFLd1B148UO14sWPhdftzp4_niDYmotK0LsUO4C4d8sAbNkHhJz-2q3cQ5jR-WAPPNeTRAHHOt7qVVcmyQjVe_iM2paE" />
                <img alt="User" className="w-6 h-6 rounded-full border border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8hbofyWUfEkLPzEIxv2tW5Klzrg2-HZogR8Ym1IsUVstLbnjWL4g8_5-4BZj1va_WufYCIbYqg1rxPsZcX2tgrtnPtUcQQEPukPABf48C_Pmt70mVTfZ1-M_wQBNf_DpBvv0Py2y_wkQjHkdWkQKoHVc2yF5KcX6sTQxFIuWvY2N-RV7SnYEJa6i6-NuJ2VAgeaktCQao72D8pLbTj8EY-Nv5WBjRmVJ7ht7Jtj32vUGuMhGLNt7jPzGMjpRkEH_93l8jSVtJr8U" />
                <div className="w-6 h-6 rounded-full bg-surface-container border border-surface flex items-center justify-center text-[8px]">+12</div>
              </div>
              <span className="text-[12px] text-on-surface-variant">Penerima terbanyak</span>
            </div>
          </StatBentoCard>
        </section>

        {/* User List Table */}
        <section className="glass-panel rounded-xl overflow-hidden border border-white/5" style={{ background: 'rgba(26, 33, 30, 0.4)' }}>
          <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low">
            <h4 className="text-xl font-headline font-bold text-on-surface">Daftar Pengguna</h4>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {users.map((user, idx) => (
                <UserCard key={idx} user={user} />
              ))}
            </div>
          </div>

          <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/10 flex items-center justify-between">
            <p className="text-sm text-on-surface-variant">Menampilkan 12 dari 3.452 pengguna</p>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-all text-sm">Sebelumnya</button>
              <div className="flex gap-2 items-center">
                <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary/20 border border-primary/40 text-primary font-bold text-sm">1</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-all text-sm">2</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-all text-sm">3</button>
                <span className="text-on-surface-variant px-1">...</span>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-all text-sm">288</button>
              </div>
              <button className="px-4 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-all text-sm">Selanjutnya</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
