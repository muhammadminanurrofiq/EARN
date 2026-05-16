import React from 'react';
import { Bell, ChevronDown, MapPin, CalendarDays, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 border-b border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)] flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
      
      <div className="flex items-center gap-4 flex-1">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[color:var(--text-primary)] flex items-center gap-2">
            Home <span className="text-[color:var(--accent-success)]">✔</span>
          </h2>
          <p className="text-[10px] md:text-xs text-[color:var(--text-secondary)]">Dashboard Monitoring Sistem EARN</p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Filters */}
        <div className="hidden md:flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface-elevated)] hover:bg-[color:var(--surface-tertiary)] transition-colors text-xs font-medium">
            <MapPin className="w-3 h-3 text-[color:var(--text-tertiary)]" />
            <span>Semua Lokasi</span>
            <ChevronDown className="w-3 h-3 text-[color:var(--text-tertiary)] ml-1" />
          </button>
          
          <button className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface-elevated)] hover:bg-[color:var(--surface-tertiary)] transition-colors text-xs font-medium">
            <CalendarDays className="w-3 h-3 text-[color:var(--text-tertiary)]" />
            <span>Hari Ini</span>
            <ChevronDown className="w-3 h-3 text-[color:var(--text-tertiary)] ml-1" />
          </button>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-[color:var(--border-subtle)]"></div>

        {/* Action Icons: Notifications & Settings */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors">
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[color:var(--accent-danger)] rounded-full border-2 border-[color:var(--surface-primary)]"></span>
          </button>
          
          <button className="p-2 text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors">
            <Settings className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer pl-1 md:pl-2">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[color:var(--surface-elevated)] border border-[color:var(--border-subtle)] overflow-hidden flex items-center justify-center font-bold text-sm text-[color:var(--accent-info)]">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-xs md:text-sm font-bold text-[color:var(--text-primary)]">Admin</p>
            <p className="text-[9px] md:text-[10px] text-[color:var(--text-tertiary)] uppercase tracking-wider">Super Admin</p>
          </div>
        </div>

      </div>
    </header>
  );
}
