import React from 'react';
import { Bell, ChevronDown, MapPin, CalendarDays, Settings, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 border-b border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)]/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
      
      <div className="flex items-center gap-4 flex-1">
        <div>
          <h2 className="text-xl md:text-2xl font-headline font-bold text-[color:var(--text-primary)] flex items-center gap-2">
            Network Monitoring <span className="text-[color:var(--accent-primary)]">✔</span>
          </h2>
          <p className="text-[10px] md:text-xs text-[color:var(--text-secondary)]">Dashboard Monitoring Sistem EARN</p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Filters */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Search Box */}
          <div className="relative group">
            <Search className="w-4 h-4 text-[color:var(--text-tertiary)] absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[color:var(--accent-primary)] transition-colors" />
            <input 
              type="text" 
              placeholder="Cari ID Mesin..." 
              className="bg-[color:var(--surface-secondary)] border border-[color:var(--border-subtle)] text-[color:var(--text-primary)] text-xs rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-[color:var(--accent-primary)] focus:ring-1 focus:ring-[color:var(--accent-primary)] transition-all w-48"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface-secondary)] hover:bg-[color:var(--surface-tertiary)] hover:border-[color:var(--border-default)] transition-all text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-[color:var(--accent-secondary)]" />
            <span className="text-[color:var(--text-primary)]">Semua Lokasi</span>
            <ChevronDown className="w-3 h-3 text-[color:var(--text-tertiary)] ml-1" />
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface-secondary)] hover:bg-[color:var(--surface-tertiary)] hover:border-[color:var(--border-default)] transition-all text-xs font-medium">
            <CalendarDays className="w-3.5 h-3.5 text-[color:var(--accent-secondary)]" />
            <span className="text-[color:var(--text-primary)]">Hari Ini</span>
            <ChevronDown className="w-3 h-3 text-[color:var(--text-tertiary)] ml-1" />
          </button>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-[color:var(--border-subtle)]"></div>

        {/* Action Icons: Notifications & Settings */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg text-[color:var(--text-secondary)] hover:text-[color:var(--accent-primary)] hover:bg-[color:rgba(78,222,163,0.1)] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[color:var(--accent-danger)] rounded-full border border-[color:var(--surface-primary)] shadow-[0_0_6px_var(--accent-danger)]"></span>
          </button>
          
          <button className="p-2 rounded-lg text-[color:var(--text-secondary)] hover:text-[color:var(--accent-primary)] hover:bg-[color:rgba(78,222,163,0.1)] transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer pl-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[color:var(--accent-primary)] to-[color:var(--accent-secondary)] p-[1px] shadow-[0_0_12px_rgba(78,222,163,0.2)]">
            <div className="w-full h-full rounded-full bg-[color:var(--surface-secondary)] flex items-center justify-center font-headline font-bold text-sm text-[color:var(--accent-primary)]">
              AM
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-[color:var(--text-primary)]">Admin Master</p>
            <p className="text-[10px] text-[color:var(--text-tertiary)] uppercase tracking-wider font-mono">System Ops</p>
          </div>
        </div>

      </div>
    </header>
  );
}
