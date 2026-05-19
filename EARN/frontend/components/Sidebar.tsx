import React from 'react';
import { Home, MonitorSpeaker, ReceiptText, Users, Gift, FileText, PieChart, Leaf } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const navItems = [
    { name: 'Home', icon: Home, active: true },
    { name: 'Mesin RVM', icon: MonitorSpeaker },
    { name: 'Transaksi', icon: ReceiptText },
    { name: 'Pengguna', icon: Users },
    { name: 'Reward & Voucher', icon: Gift },
    { name: 'Laporan', icon: FileText },
    { name: 'Analitik', icon: PieChart },
  ];

  return (
    <aside className="w-60 h-screen fixed left-0 top-0 bg-[color:var(--surface-secondary)] border-r border-[color:var(--border-subtle)] flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <h1 className="text-2xl font-headline font-bold tracking-tight text-[color:var(--text-primary)]">
          EARN<span className="text-[color:var(--accent-primary)]">.</span>
        </h1>
        <Leaf className="w-5 h-5 text-[color:var(--accent-primary)]" />
      </div>
      <div className="px-6 mb-6">
        <p className="text-[10px] text-[color:var(--text-tertiary)] font-mono font-medium uppercase tracking-widest">Eco Action & Reward</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={clsx(
              "flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-300",
              item.active
                ? "bg-[color:rgba(78,222,163,0.08)] text-[color:var(--accent-primary)] font-medium stem-active"
                : "text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-tertiary)] hover:text-[color:var(--text-primary)]"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className={clsx("w-4 h-4", item.active && "text-[color:var(--accent-primary)]")} />
              <span className="text-sm">{item.name}</span>
            </div>
          </a>
        ))}
      </nav>

      {/* Impact Summary Widget */}
      <div className="p-4 m-4 rounded-xl bg-gradient-to-br from-[color:rgba(78,222,163,0.1)] to-[color:var(--surface-tertiary)] border border-[color:rgba(78,222,163,0.15)] relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <Leaf className="w-24 h-24 text-[color:var(--accent-primary)]" />
        </div>
        <h3 className="text-xs font-semibold mb-3 relative z-10 text-[color:var(--accent-primary)] leading-tight">Masa depan hijau dimulai dari sini.</h3>
        
        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[color:var(--surface-secondary)] rounded shadow-[0_0_8px_rgba(78,222,163,0.15)]">
              <Leaf className="w-3.5 h-3.5 text-[color:var(--accent-primary)]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[color:var(--text-primary)] font-mono">1.247</p>
              <p className="text-[10px] text-[color:var(--text-tertiary)]">Botol Terkumpul</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[color:var(--surface-secondary)] rounded shadow-[0_0_8px_rgba(149,211,186,0.15)]">
              <MonitorSpeaker className="w-3.5 h-3.5 text-[color:var(--accent-secondary)]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[color:var(--text-primary)] font-mono">62.4 kg</p>
              <p className="text-[10px] text-[color:var(--text-tertiary)]">CO₂ Dikurangi</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Connection Status */}
      <div className="px-6 pb-6 pt-2 flex items-center gap-3">
        <div className="dotActive"></div>
        <p className="text-xs font-mono text-[color:var(--text-secondary)]">Online & Terhubung</p>
      </div>
    </aside>
  );
}
