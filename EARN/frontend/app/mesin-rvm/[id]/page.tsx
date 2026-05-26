"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RvmDetailPage({ params }: { params: { id: string } }) {
  const [strokeDashoffset, setStrokeDashoffset] = useState(565.48); // Initial state for circle animation
  
  const id = params.id || 'RVM-01';
  
  // Dummy data based on ID
  const isMaintenance = id === 'RVM-06';
  const isFull = id === 'RVM-03';
  const isOffline = id === 'RVM-05';
  
  let statusText = 'ONLINE';
  let statusColor = 'primary';
  let capacity = 78; // %
  
  if (isMaintenance) {
    statusText = 'MAINTENANCE';
    statusColor = 'yellow-500';
    capacity = 0;
  } else if (isFull) {
    statusText = 'FULL';
    statusColor = 'error';
    capacity = 100;
  } else if (isOffline) {
    statusText = 'OFFLINE';
    statusColor = 'outline';
    capacity = 0;
  }
  
  useEffect(() => {
    // Animation for progress circle
    const circumference = 2 * Math.PI * 90;
    const targetOffset = circumference * (1 - capacity / 100);
    const timer = setTimeout(() => {
      setStrokeDashoffset(targetOffset);
    }, 300);
    return () => clearTimeout(timer);
  }, [capacity]);

  return (
    <div className="w-full min-h-screen bg-background text-on-surface font-body-md pb-10">
      <style>{`
        .glass-card {
            background: rgba(22, 29, 26, 0.4);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(78, 222, 163, 0.1);
            transition: all 0.3s ease;
        }
        .glass-card:hover {
            border-color: rgba(78, 222, 163, 0.3);
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.05);
        }
        .organic-glow-primary {
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.15);
        }
        .gauge-container {
            position: relative;
            width: 220px;
            height: 220px;
        }
        .gauge-svg {
            transform: rotate(-90deg);
        }
        .progress-circle {
            transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
            stroke-dasharray: 565.48;
        }
        @keyframes pulse-emerald {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .status-pulse {
            animation: pulse-emerald 2s infinite ease-in-out;
        }
      `}</style>

      {/* Fixed TopAppBar with Back Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-[0_4px_20px_rgba(16,185,129,0.05)]">
        <div className="flex justify-between items-center px-8 py-4">
          {/* Left: Back button + Breadcrumbs */}
          <div className="flex flex-col gap-1">
            <Link href="/mesin-rvm" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group w-fit text-sm font-medium">
              <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
              <span>Kembali</span>
            </Link>
            <nav className="flex items-center gap-2 text-on-surface-variant/80 font-label text-[10px] uppercase tracking-wider">
              <Link href="/mesin-rvm" className="hover:text-primary transition-colors">Mesin RVM</Link>
              <span className="material-symbols-outlined text-base">chevron_right</span>
              <span className="text-primary font-bold">{id} Detail</span>
            </nav>
          </div>
          
          {/* Right: Search + Actions */}
          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="bg-surface-container-low border border-outline-variant/20 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-primary w-64 text-sm transition-all" placeholder="Search machines..." type="text" />
            </div>
            <div className="flex items-center gap-4">
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">settings</span>
              </button>
              <div className="h-10 w-10 rounded-full overflow-hidden border border-primary/20">
                <img alt="User profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx5k5NAJObc8f2lUxLKsA0JqFNVrfkc9VcnFZaJBKOFBYj-Oy8_5NXSvNgZGJow7uk-R3snQ_qCN-gfrC92SzScj-5ftLzDtA9op20O6HfOV6S2mE2OAvp21ijPKXvZaGL3gTbrqgmPYZdD0jXyvhRt0mtp8qsojYbtqeC-de_ujjl2eIQBoUrzSm0sS4CRU2YRNVbJgNbxgy01QT1KfBOyCIOFnhhosQHmuh1fQGvw7EvdREBTgKR5sUsJd0SedQVEggnVgwmKAs" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content — offset for fixed header */}
      <div className="px-8 py-6 pt-[90px] max-w-[1600px] mx-auto">

        {/* Hero Header */}
        <div className="glass-card rounded-2xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -z-10 rounded-full"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <h1 className="font-headline text-4xl font-bold text-primary">{id}</h1>
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 bg-${statusColor}/10 text-${statusColor} border border-${statusColor}/20 rounded-full font-label text-xs font-bold`}>
                  <span className={`w-2 h-2 bg-${statusColor} rounded-full ${!isOffline ? 'status-pulse' : ''}`}></span>
                  {statusText}
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-xl">location_on</span>
                <span className="text-sm font-medium">Fakultas Teknik, Universitas Indonesia</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label text-sm font-medium rounded-xl transition-all flex items-center gap-2 border border-outline-variant/30">
                <span className="material-symbols-outlined">restart_alt</span>
                Reactivate
              </button>
              <button className="px-6 py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label text-sm font-medium rounded-xl transition-all flex items-center gap-2 border border-outline-variant/30">
                <span className="material-symbols-outlined">build</span>
                Maintenance Mode
              </button>
              <button className="px-6 py-2.5 bg-primary/20 text-primary font-bold rounded-xl transition-all flex items-center gap-2 hover:bg-primary/30 organic-glow-primary border border-primary/30">
                <span className="material-symbols-outlined">delete_sweep</span>
                Empty Tank
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            
            {/* Telemetry Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="md:col-span-1 glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full">
                <h3 className="font-label text-xs font-bold text-on-surface-variant mb-6 uppercase tracking-wider">Storage Capacity</h3>
                <div className="gauge-container mb-4">
                  <svg className="gauge-svg w-full h-full" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" fill="none" r="90" stroke="#242c28" strokeWidth="12"></circle>
                    <circle 
                      className="progress-circle" 
                      cx="100" cy="100" fill="none" r="90" 
                      stroke={statusColor === 'primary' ? '#4edea3' : (statusColor === 'error' ? '#ffb4ab' : '#86948a')} 
                      strokeLinecap="round" strokeWidth="12" 
                      style={{ strokeDashoffset: strokeDashoffset }}
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`font-headline text-4xl font-bold text-${statusColor}`}>{capacity}%</span>
                    <span className="font-label text-[10px] text-on-surface-variant uppercase mt-1">Ready</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant font-medium">{Math.floor(800 * capacity / 100)} / 800 bottles</p>
              </div>
              
              <div className="md:col-span-1 flex flex-col gap-6">
                <div className="glass-card rounded-xl p-6 flex flex-col justify-between flex-1">
                  <div className="flex items-center gap-3 text-on-surface-variant mb-2">
                    <span className="material-symbols-outlined">humidity_percentage</span>
                    <span className="font-label text-xs uppercase tracking-wider font-bold">Kelembapan</span>
                  </div>
                  <div>
                    <div className="font-headline text-primary text-3xl font-bold">92%</div>
                    <div className="text-xs text-on-surface-variant mt-1 font-medium">Normal Pressure</div>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-6 flex flex-col justify-between flex-1">
                  <div className="flex items-center gap-3 text-on-surface-variant mb-2">
                    <span className="material-symbols-outlined">thermostat</span>
                    <span className="font-label text-xs uppercase tracking-wider font-bold">Internal Temp</span>
                  </div>
                  <div>
                    <div className="font-headline text-primary text-3xl font-bold">24°C</div>
                    <div className="text-xs text-on-surface-variant mt-1 font-medium">Optimal Range</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Chart */}
            <div className="glass-card rounded-2xl p-6 h-96 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-label text-xs font-bold text-on-surface uppercase tracking-wider">Collection Activity (24h)</h3>
                <div className="flex items-center gap-4 text-[10px] font-label font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Plastic</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary"></span> Can</div>
                </div>
              </div>
              <div className="flex-1 relative flex items-end gap-2">
                {[40, 65, 30, 55, 90, 75, 45, 60, 80, 50, 35, 20, 40, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary/20 rounded-t hover:bg-primary transition-all group relative cursor-pointer" style={{ height: `${h}%` }}>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-surface px-2 py-1 rounded text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-primary/20">
                      {h * 2} items
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-label font-bold text-on-surface-variant">
                <span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>23:59</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Transaction List Card */}
            <div className="glass-card rounded-2xl flex flex-col h-[500px] overflow-hidden">
              <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
                <h3 className="font-label text-xs font-bold text-on-surface uppercase tracking-wider">Recent Activity</h3>
                <button className="text-primary text-[10px] font-label font-bold uppercase tracking-wider hover:underline">Export CSV</button>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/5">
                {[
                  { name: 'Plastic Bottle (Large)', time: 'Today, 14:24', pts: '+20 pts' },
                  { name: 'Aluminum Can', time: 'Today, 14:15', pts: '+15 pts' },
                  { name: 'Plastic Bottle (Small)', time: 'Today, 13:58', pts: '+10 pts' },
                  { name: 'Plastic Bottle (Large)', time: 'Today, 12:40', pts: '+20 pts' },
                  { name: 'Aluminum Can', time: 'Today, 11:20', pts: '+15 pts' },
                ].map((item, i) => (
                  <div key={i} className="px-6 py-4 hover:bg-surface-container-high/30 flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-sm">person</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-on-surface">{item.name}</div>
                        <div className="text-[10px] text-on-surface-variant font-medium">{item.time}</div>
                      </div>
                    </div>
                    <div className="text-sm font-label font-bold text-primary">{item.pts}</div>
                  </div>
                ))}
              </div>
              <Link href="/transaksi" className="p-4 bg-surface-container-high text-center font-label text-[10px] uppercase font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2">
                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Integrated Logs */}
            <div className="glass-card rounded-2xl flex-1 overflow-hidden flex flex-col min-h-[300px]">
              <div className="p-4 border-b border-outline-variant/10 flex items-center gap-2 bg-surface-container-low">
                <span className="material-symbols-outlined text-primary text-xl">terminal</span>
                <h3 className="font-label text-xs font-bold text-on-surface uppercase tracking-wider">System Logs</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 font-label text-[11px]">
                <div className="flex gap-3">
                  <span className="text-on-surface-variant/50">15:42</span>
                  <span className="text-primary font-bold">INFO</span>
                  <span className="truncate text-on-surface">Door opened for inspection.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-on-surface-variant/50">14:00</span>
                  <span className="text-primary font-bold">INFO</span>
                  <span className="truncate text-on-surface">Sensor recalibrated.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-on-surface-variant/50">12:30</span>
                  <span className="text-primary font-bold">INFO</span>
                  <span className="truncate text-on-surface">Storage level updated to 78%.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-on-surface-variant/50">10:15</span>
                  <span className="text-yellow-500 font-bold">WARN</span>
                  <span className="truncate text-on-surface">Capacity reaching 80%.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-on-surface-variant/50">08:00</span>
                  <span className="text-primary font-bold">INFO</span>
                  <span className="truncate text-on-surface">System online.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
