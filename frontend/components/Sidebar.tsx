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
      <div className="p-5 flex items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-[color:var(--accent-info)]">
          EARN<span className="text-[color:var(--accent-success)]">.</span>
        </h1>
        <Leaf className="w-5 h-5 text-[color:var(--accent-success)]" />
      </div>
      <div className="px-5 mb-5">
        <p className="text-[10px] text-[color:var(--text-tertiary)] font-medium uppercase tracking-wider">Eco Action & Reward Network</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={clsx(
              "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300",
              item.active
                ? "bg-gradient-to-r from-[color:hsla(145,63%,42%,0.2)] to-transparent text-[color:var(--accent-success)] font-medium border-l-2 border-[color:var(--accent-success)]"
                : "text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-elevated)] hover:text-[color:var(--text-primary)]"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className={clsx("w-4 h-4", item.active && "text-[color:var(--accent-success)]")} />
              <span className="text-sm">{item.name}</span>
            </div>
          </a>
        ))}
      </nav>

      {/* Ringkasan Dampak Widget */}
      <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-[color:hsla(145,63%,42%,0.15)] to-transparent border border-[color:hsla(145,63%,42%,0.2)] relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-20">
          <Leaf className="w-20 h-20 text-[color:var(--accent-success)]" />
        </div>
        <h3 className="text-xs font-semibold mb-2 relative z-10 text-[color:var(--accent-success)]">Setiap botol adalah langkah kecil untuk masa depan.</h3>
        
        <div className="mt-3 space-y-2 relative z-10">
          <h4 className="text-[10px] font-bold text-[color:var(--text-secondary)] uppercase">Ringkasan Dampak</h4>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[color:var(--surface-elevated)] rounded-lg">
              <Leaf className="w-3 h-3 text-[color:var(--accent-success)]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[color:var(--text-primary)]">1.247</p>
              <p className="text-[9px] text-[color:var(--text-tertiary)]">Botol Terkumpul</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[color:var(--surface-elevated)] rounded-lg">
              <MonitorSpeaker className="w-3 h-3 text-[color:var(--accent-warning)]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[color:var(--text-primary)]">62.4 kg</p>
              <p className="text-[9px] text-[color:var(--text-tertiary)]">CO₂ Dikurangi</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Connection Status */}
      <div className="px-5 pb-5 pt-2 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[color:var(--accent-success)] shadow-[0_0_8px_var(--accent-success)] animate-pulse"></div>
        <p className="text-[10px] text-[color:var(--text-tertiary)]">Sistem Online & Terhubung</p>
      </div>
    </aside>
  );
}
