"use client";

import React from 'react';
import { useSidebar } from '@/context/SidebarContext';

interface HeaderProps {
  /** Judul halaman yang tampil di kiri header */
  title: string;
  /** Deskripsi singkat di bawah judul */
  subtitle: string;
  /** Nama icon Material Symbols Outlined yang tampil di samping judul */
  icon?: string;
  /** Elemen kustom tambahan di sisi kiri (contoh: navigasi tab, filter) */
  leftExtra?: React.ReactNode;
  /** Elemen kustom tambahan di sisi kanan (contoh: search bar, tombol tambah) */
  rightExtra?: React.ReactNode;
}

export default function Header({ title, subtitle, icon = 'eco', leftExtra, rightExtra }: HeaderProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <header
      id="sticky-navbar"
      className="h-20 bg-background/50 backdrop-blur-md sticky top-0 z-40 flex justify-between items-center px-4 md:px-gutter border-b border-outline-variant/30"
    >
      {/* Left: Title + Extra */}
      <div className="flex items-center gap-3 md:gap-6">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 -ml-2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-sm">
            <h2 className="font-headline text-lg md:text-2xl font-bold text-primary truncate max-w-[150px] sm:max-w-none">{title}</h2>
            <span className="material-symbols-outlined text-primary text-sm hidden sm:block">{icon}</span>
          </div>
          <p className="text-[10px] md:text-xs text-on-surface-variant truncate max-w-[200px] sm:max-w-none">{subtitle}</p>
        </div>
        {leftExtra && (
          <>
            <div className="h-6 w-[1px] bg-outline-variant/30 hidden md:block" />
            {leftExtra}
          </>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 md:gap-md">
        {/* Right Extra (search bar, buttons, etc.) */}
        <div className="hidden md:block">
          {rightExtra}
        </div>

        {/* Date Selector */}
        <div className="hidden md:flex items-center gap-sm">
          <div className="flex items-center gap-xs px-sm py-2 bg-surface-container rounded-lg border border-outline-variant/30 cursor-pointer hover:border-primary/40 transition-all">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            <span className="text-xs">Hari Ini</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-white/10 mx-xs"></div>

        {/* Icons */}
        <div className="flex items-center gap-md">
          {/* Notifications */}
          <div className="relative">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              notifications
            </span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-background flex items-center justify-center text-[8px] font-bold">
              3
            </span>
          </div>

          {/* Light mode */}
          <button
            id="toggle-theme-btn"
            aria-label="Toggle theme"
            className="flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary-fixed cursor-pointer transition-colors">
              light_mode
            </span>
          </button>

          {/* Settings */}
          <button
            id="settings-btn"
            aria-label="Settings"
            className="flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary-fixed cursor-pointer transition-colors">
              settings
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-sm bg-surface-container pl-sm pr-xs py-xs rounded-full border border-outline-variant/30">
            <div className="text-right hidden sm:block">
              <p className="text-[12px] font-bold text-primary">Admin</p>
              <p className="text-[10px] text-on-surface-variant leading-none">Super Admin</p>
            </div>
            <img
              alt="Admin avatar"
              className="w-8 h-8 rounded-full border border-primary/20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgODpEKbz6oZBhVOmiLYpZI1hxCuC09c-L6Jy2AIuIcPvVFgiYqsBaWJ3o1zY3QT3fAf1B3Qhgk_iAc0gQ1FunscmSPTYZXgAiiGkMV9kRPU1OZEPEj3IfeK245TA3jVfr-SYV3-NolFGzC3Zj4OhRwcX6zDYP0cKsDpcCQeXG4GM3iNZ8jHk7vhSQ1VwvBvsSdPQo3fPgJyGOHqD_vvja_SCCsjhCnH_zRoGKS0RYcO8Vid1BN7aTjDEnIX15nPIyuoOHMAqvrNU"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
