"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const navItems = [
    { name: 'Home', icon: 'home', href: '/' },
    { name: 'Mesin RVM', icon: 'sensors', href: '/mesin-rvm' },
    { name: 'Transaksi', icon: 'receipt_long', href: '/transaksi' },
    { name: 'Pengguna', icon: 'group', href: '/pengguna' },
    { name: 'Reward & Voucher', icon: 'card_giftcard', href: '#' },
    { name: 'Laporan', icon: 'bar_chart', href: '#' },
    { name: 'Analitik', icon: 'analytics', href: '#' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      {/* Logo */}
      <div className="p-md">
        <div className="flex items-center gap-base mb-base">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary font-bold">eco</span>
          </div>
          <div>
            <h1 className="font-headline text-2xl font-bold text-primary tracking-tighter">EARN</h1>
            <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest opacity-70">
              Eco Action &amp; Reward Network
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-sm space-y-1" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && item.href !== '#' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary border border-transparent'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              <span className="font-label-md">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Impact Widget (Sidebar Bottom) */}
      <div className="mt-auto p-md border-t border-outline-variant/30">
        <div className="bg-surface-container rounded-xl p-md space-y-md relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <span className="material-symbols-outlined text-[80px] text-primary">eco</span>
          </div>
          <h6 className="font-label text-xs text-primary uppercase tracking-wider">Ringkasan Dampak</h6>
          <div className="space-y-sm relative z-10">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">recycling</span>
              <div>
                <p className="text-sm font-bold text-on-surface">1.247</p>
                <p className="text-[10px] text-on-surface-variant">Botol Terkumpul</p>
              </div>
            </div>
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary">co2</span>
              <div>
                <p className="text-sm font-bold text-on-surface">62.4 kg</p>
                <p className="text-[10px] text-on-surface-variant">CO2 Dikurangi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
