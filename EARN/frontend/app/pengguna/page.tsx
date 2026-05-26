"use client";

import React, { useRef, useState, useEffect } from 'react';

// Reusable User Card Component
function UserCard({ user }: { user: any }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <div
      ref={panelRef}
      className={`glass-panel p-4 rounded-xl organic-glow flex flex-col gap-3 relative group transition-all overflow-visible ${isDropdownOpen ? 'z-[60]' : 'hover:z-[40]'}`}
      style={{ background: 'rgba(26, 33, 30, 0.4)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-3 right-2 z-50">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
          className="dropdown-trigger text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined text-xl">more_vert</span>
        </button>
        {isDropdownOpen && (
          <div 
            className="absolute right-0 top-full mt-1 rounded-xl border border-primary/20 shadow-2xl py-2 z-[100] min-w-[160px] animate-[fadeIn_0.2s_ease-out]" 
            style={{ background: 'rgba(26, 33, 30, 0.95)', backdropFilter: 'blur(16px)' }}
          >
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all">
              <span className="material-symbols-outlined text-lg">visibility</span>
              <span>Lihat</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all">
              <span className="material-symbols-outlined text-lg">edit</span>
              <span>Edit</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all">
              <span className="material-symbols-outlined text-lg">login</span>
              <span>Login As</span>
            </button>
            <div className="h-[1px] bg-outline-variant/10 my-1 mx-2"></div>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-all">
              <span className="material-symbols-outlined text-lg">delete</span>
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${user.avatarClass}`}>
          {user.initials}
        </div>
        <div className="overflow-hidden">
          <h5 className="font-body-md text-sm font-bold text-on-surface truncate">{user.name}</h5>
          <p className="font-body-sm text-[10px] text-on-surface-variant truncate">{user.email}</p>
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
    panelRef.current.style.setProperty('--mouse-x', `${x}px`);
    panelRef.current.style.setProperty('--mouse-y', `${y}px`);
    panelRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(78, 222, 163, 0.05) 0%, rgba(26, 33, 30, 0.4) 50%)`;
  };

  const handleMouseLeave = () => {
    if (panelRef.current) panelRef.current.style.background = 'rgba(26, 33, 30, 0.4)';
  };

  return (
    <div
      ref={panelRef}
      className="glass-panel p-md rounded-xl organic-glow group transition-all relative overflow-hidden"
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
    { initials: 'SP', name: 'Salsabila Putri', email: 'salsabila@email.com', avatarClass: 'bg-gradient-to-br from-primary to-secondary text-on-primary' },
    { initials: 'AW', name: 'Andi Wijaya', email: 'andi.op@earn.id', avatarClass: 'bg-gradient-to-br from-tertiary to-secondary text-on-tertiary' },
    { initials: 'BS', name: 'Budi Santoso', email: 'budi_s@gmail.com', avatarClass: 'bg-surface-container-highest text-on-surface-variant' },
    { initials: 'RW', name: 'Rina Wijaya', email: 'rina.w@earn.id', avatarClass: 'bg-gradient-to-br from-primary to-secondary text-on-primary' },
  ];

  return (
    <div className="ml-64 flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Atmospheric Effect */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-5%] left-[10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Main Content Canvas */}
      <main className="flex-1 p-margin-desktop relative">
        {/* TopAppBar Anchor */}
        <header className="flex justify-between items-center w-full h-20 sticky top-0 z-50 mb-8 px-4 bg-surface-container/80 backdrop-blur-xl border-b border-white/10 rounded-b-xl shadow-[0_0_20px_rgba(78,222,163,0.05)]">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">Manajemen Pengguna</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="bg-surface-container-low border-outline-variant/30 text-on-surface rounded-full pl-10 pr-4 py-2 w-64 focus:ring-1 focus:ring-primary focus:border-primary transition-all font-body-sm" placeholder="Cari pengguna..." type="text" />
            </div>
            <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-label-md text-sm font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-[0_0_15px_rgba(78,222,163,0.3)]">
              <span className="material-symbols-outlined">add</span>
              Tambah Pengguna Baru
            </button>
            <div className="flex gap-4">
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
          </div>
        </header>

        {/* Stats Overview (Bento Grid) */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-xl">
          <StatBentoCard>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined text-primary">group</span>
              </div>
              <span className="text-primary font-label-sm text-[12px] bg-primary/10 px-2 py-1 rounded-full font-bold">↑ 12%</span>
            </div>
            <h3 className="font-body-sm text-sm text-on-surface-variant mb-1">Total Pengguna</h3>
            <p className="font-headline-lg text-4xl font-bold text-on-surface">3.452</p>
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
                <span className="font-label-sm text-[12px] text-on-surface-variant font-bold">Live</span>
              </div>
            </div>
            <h3 className="font-body-sm text-sm text-on-surface-variant mb-1">Pengguna Aktif</h3>
            <p className="font-headline-lg text-4xl font-bold text-on-surface">1.240</p>
            <p className="font-label-sm text-[12px] text-on-surface-variant mt-2">Sedang online sekarang</p>
          </StatBentoCard>

          <StatBentoCard>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-tertiary/10 rounded-lg">
                <span className="material-symbols-outlined text-tertiary">person_add</span>
              </div>
            </div>
            <h3 className="font-body-sm text-sm text-on-surface-variant mb-1">Pendaftaran Baru</h3>
            <p className="font-headline-lg text-4xl font-bold text-on-surface">45</p>
            <p className="font-label-sm text-[12px] text-primary mt-2">Target tercapai hari ini</p>
          </StatBentoCard>

          <StatBentoCard>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined text-primary">token</span>
              </div>
            </div>
            <h3 className="font-body-sm text-sm text-on-surface-variant mb-1">Total Poin Terdistribusi</h3>
            <p className="font-headline-lg text-4xl font-bold text-on-surface">850.200 <span className="font-label-md text-sm font-normal text-on-surface-variant">PTS</span></p>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex -space-x-2">
                <img alt="User" className="w-6 h-6 rounded-full border border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpxKR2P63FFz1CVmhVq5PcgX_Sp7oBRJNyS38hz3Q3tILzY6R_PBnPcDTHMM9zSYpz75Xq1vvGSbFxabG-h-0R1jc04i44DXiglSdPbjYqdj1zv1jV1VDo3BgZZNAlTzTQ9fS6uUAuTcEP1MPbcWfGC1wb_LjRdBU8_BErYS-vAqfnmq4fFLd1B148UO14sWPhdftzp4_niDYmotK0LsUO4C4d8sAbNkHhJz-2q3cQ5jR-WAPPNeTRAHHOt7qVVcmyQjVe_iM2paE" />
                <img alt="User" className="w-6 h-6 rounded-full border border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8hbofyWUfEkLPzEIxv2tW5Klzrg2-HZogR8Ym1IsUVstLbnjWL4g8_5-4BZj1va_WufYCIbYqg1rxPsZcX2tgrtnPtUcQQEPukPABf48C_Pmt70mVTfZ1-M_wQBNf_DpBvv0Py2y_wkQjHkdWkQKoHVc2yF5KcX6sTQxFIuWvY2N-RV7SnYEJa6i6-NuJ2VAgeaktCQao72D8pLbTj8EY-Nv5WBjRmVJ7ht7Jtj32vUGuMhGLNt7jPzGMjpRkEH_93l8jSVtJr8U" />
                <div className="w-6 h-6 rounded-full bg-surface-container border border-surface flex items-center justify-center text-[8px]">+12</div>
              </div>
              <span className="font-label-sm text-[12px] text-on-surface-variant">Penerima terbanyak</span>
            </div>
          </StatBentoCard>
        </section>

        {/* User List Table */}
        <section className="glass-panel rounded-xl border border-white/5" style={{ background: 'rgba(26, 33, 30, 0.4)' }}>
          <div className="p-md border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low">
            <h4 className="font-headline-lg-mobile text-2xl font-bold text-on-surface">Daftar Pengguna</h4>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>
          <div className="p-md">
            <div className="flex flex-col space-y-3">
              {/* User Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-visible">
                {users.map((user, idx) => (
                  <UserCard key={idx} user={user} />
                ))}
              </div>
            </div>
          </div>
          <div className="px-md py-4 bg-surface-container-low border-t border-outline-variant/10 flex items-center justify-between">
            <p className="font-body-sm text-sm text-on-surface-variant">Menampilkan 4 dari 3.452 pengguna</p>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-all">Sebelumnya</button>
              <div className="flex gap-2 items-center">
                <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary/20 border border-primary/40 text-primary font-bold">1</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-all">2</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-all">3</button>
                <span className="text-on-surface-variant px-1">...</span>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-all">1151</button>
              </div>
              <button className="px-4 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-all">Selanjutnya</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
