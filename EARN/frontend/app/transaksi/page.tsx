"use client";

import React, { useRef, useState, useEffect } from 'react';

function InteractiveChart({ children, chartId, tooltipUnit = "botol", baseValue = 800, volatility = 500 }: { children: React.ReactNode, chartId: string, tooltipUnit?: string, baseValue?: number, volatility?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [interaction, setInteraction] = useState({ active: false, x: 0, ptX: 0, ptY: 0, timeStr: '00:00', value: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const svg = containerRef.current.querySelector('svg');
    const path = containerRef.current.querySelector('.interactive-path') as SVGPathElement;
    
    if (!svg || !path) return;

    const x = e.clientX - rect.left;
    const xPercent = (x / rect.width) * 100;
    const constrainedX = Math.max(0, Math.min(100, xPercent));

    let targetX = x;
    let targetY = rect.height / 2;

    try {
      const pathLength = path.getTotalLength();
      if (pathLength > 0) {
        const pointOnPath = path.getPointAtLength((constrainedX / 100) * pathLength);
        
        const viewBoxStr = svg.getAttribute('viewBox');
        const viewBoxArr = viewBoxStr ? viewBoxStr.split(' ').map(Number) : [0, 0, 100, 30];
        const vW = viewBoxArr[2] || 100;
        const vH = viewBoxArr[3] || 30;

        const pxToUnitX = rect.width / vW;
        const pxToUnitY = rect.height / vH;

        targetX = pointOnPath.x * pxToUnitX;
        targetY = pointOnPath.y * pxToUnitY;
      }
    } catch(err) {
      console.warn("SVG path measurement failed", err);
    }

    const hour = Math.floor((constrainedX / 100) * 24);
    const mins = Math.floor(((constrainedX / 100) * 24 % 1) * 60);
    const timeStr = `${hour.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    
    // stable fake data based on x
    const value = Math.floor(baseValue + Math.sin(constrainedX / 10) * (volatility / 2) + (constrainedX * 2));

    setInteraction({
      active: true,
      x: x,
      ptX: targetX,
      ptY: targetY,
      timeStr: timeStr,
      value
    });
  };

  const handleMouseLeave = () => {
    setInteraction(prev => ({ ...prev, active: false }));
  };

  let tooltipLeft = interaction.x - 60;
  if (containerRef.current) {
     const rect = containerRef.current.getBoundingClientRect();
     if (tooltipLeft < 0) tooltipLeft = 0;
     if (tooltipLeft > rect.width - 120) tooltipLeft = rect.width - 120;
  }
  const tooltipTop = Math.max(0, interaction.ptY - 45);

  return (
    <div 
      id={chartId}
      ref={containerRef}
      className="relative cursor-crosshair h-24 w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Indicator Line */}
      <div 
        className="absolute top-0 bottom-0 w-px pointer-events-none transition-opacity duration-200 ease-in-out z-10"
        style={{ 
          background: 'linear-gradient(to bottom, transparent, rgba(78, 222, 163, 0.5), transparent)',
          opacity: interaction.active ? 1 : 0,
          left: `${interaction.x}px`
        }}
      ></div>

      {/* Point */}
      <div 
        className="absolute w-2 h-2 rounded-full border-2 border-surface bg-primary pointer-events-none transition-opacity duration-200 ease-in-out shadow-[0_0_8px_#4edea3] z-20"
        style={{
          opacity: interaction.active ? 1 : 0,
          left: `${interaction.ptX - 4}px`,
          top: `${interaction.ptY - 4}px`
        }}
      ></div>

      {/* Tooltip */}
      <div 
        className="absolute pointer-events-none bg-surface/95 border border-primary/30 rounded-md px-3 py-2 text-xs text-on-surface z-30 transition-opacity duration-200 ease-in-out shadow-lg whitespace-nowrap"
        style={{
          opacity: interaction.active ? 1 : 0,
          left: `${tooltipLeft}px`,
          top: `${tooltipTop}px`
        }}
      >
        <div className="font-bold text-primary">{interaction.timeStr}</div> 
        <div className="text-[10px] text-on-surface-variant">{interaction.value.toLocaleString()} {tooltipUnit}</div>
      </div>

      {children}
    </div>
  );
}

export default function TransaksiPage() {
  return (
    <div className="ml-64 flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-[-1]"></div>
      <div className="fixed bottom-[-10%] left-[15%] w-[400px] h-[400px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none z-[-1]"></div>
      
      <style>{`
        @keyframes chart-entrance {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-chart {
            animation: chart-entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .glass-card {
          background: rgba(26, 33, 30, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(78, 222, 163, 0.1);
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          border-color: rgba(78, 222, 163, 0.3);
          box-shadow: 0 0 20px rgba(78, 222, 163, 0.05);
        }
      `}</style>

      {/* TopAppBar */}
      <header className="h-20 w-full sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">Transaksi</h2>
          <div className="h-6 w-[1px] bg-outline-variant/30 ml-2 mr-2"></div>
          <nav className="flex gap-6">
            <a className="text-primary font-bold text-sm" href="#">Real-time Feed</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors text-sm" href="#">Archive</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-sm">search</span>
            <input className="bg-surface-container-lowest border-none rounded-full pl-10 pr-4 py-2 w-64 text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="Cari transaksi..." type="text"/>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden ml-2">
              <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApwH78humvKdlfIyE5RAGD_MmvXRTlHHO2NjCnBaYMmkiyVszXghcfwUb-5oP3RjpTm5-C6Ymxkld3cmfi2LHmie4lrolBD1GI9yNnO1izIZR21tjlpO77kN6HEI5MdDsqS3xbwrK8dkT9f0vycFdmWoOogfwMYl45yyKZoeq39niamdv2u20wR-hdvh51TCqvnumc1vEt6i-p8jyKEBKdsQWPjosdOc39zfjjQhYD-gD3Z01XABDjIqfQp2Bct4chsS-sxW-46q8"/>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-80px)] overflow-hidden">
        
        {/* Left Column: Transaksi Botol */}
        <section className="flex flex-col gap-6 overflow-hidden h-full">
          <div className="flex items-center justify-between px-2 flex-shrink-0">
            <h3 className="font-headline text-[24px] font-bold text-on-surface">Transaksi Botol</h3>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Live Update
            </span>
          </div>

          {/* Bottle Charts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-shrink-0">
            <div className="glass-card p-5 rounded-xl flex flex-col gap-4 animate-chart">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Grafik Overall</p>
                  <h4 className="font-headline text-3xl font-bold">12.4k</h4>
                </div>
                <span className="text-primary text-xs font-bold">+12%</span>
              </div>
              <InteractiveChart chartId="chart-overall" tooltipUnit="botol" baseValue={1000} volatility={600}>
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                  <defs>
                    <filter height="140%" id="glow-green" width="140%" x="-20%" y="-20%">
                      <feGaussianBlur result="blur" stdDeviation="0.8"></feGaussianBlur>
                      <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                    </filter>
                  </defs>
                  <path d="M0 35 Q 20 38, 40 32 T 80 34 T 100 37" fill="none" opacity="0.4" stroke="#ff5252" strokeWidth="1.5"></path>
                  <path d="M0 25 Q 15 20, 35 28 T 70 18 T 100 22" fill="none" opacity="0.3" stroke="#ffffff" strokeWidth="1.5"></path>
                  <path className="interactive-path" d="M0 15 Q 25 5, 50 18 T 85 8 T 100 12" fill="none" filter="url(#glow-green)" stroke="#4edea3" strokeWidth="2"></path>
                </svg>
              </InteractiveChart>
            </div>

            <div className="glass-card p-5 rounded-xl flex flex-col gap-4 animate-chart" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Grafik Harian</p>
                  <h4 className="font-headline text-3xl font-bold">842</h4>
                </div>
                <span className="text-primary text-xs font-bold">Peak</span>
              </div>
              <InteractiveChart chartId="chart-daily" tooltipUnit="botol" baseValue={300} volatility={200}>
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 30">
                  <path className="interactive-path drop-shadow-[0_0_8px_#4edea3]" d="M0 25 Q 10 5, 20 20 T 40 15 T 60 10 T 80 20 T 100 5" fill="none" stroke="#4edea3" strokeWidth="2"></path>
                </svg>
              </InteractiveChart>
            </div>
          </div>

          {/* Bottle Transaction List */}
          <div className="glass-card flex-1 rounded-xl overflow-hidden flex flex-col min-h-0">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex items-center justify-between flex-shrink-0">
              <h4 className="font-headline text-lg font-bold">List Transaksi</h4>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0 relative">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-highest/50 text-xs text-on-surface-variant sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-3 font-semibold tracking-wider">ID</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">User</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Status</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">#TRX-8291</td>
                    <td className="px-6 py-4 font-medium text-sm">Budi Santoso</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">Success</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">2m ago</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">#TRX-8290</td>
                    <td className="px-6 py-4 font-medium text-sm">Siti Aminah</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">Success</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">5m ago</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">#TRX-8289</td>
                    <td className="px-6 py-4 font-medium text-sm">Agus Salim</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-wider border border-yellow-500/20">Pending</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">12m ago</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">#TRX-8288</td>
                    <td className="px-6 py-4 font-medium text-sm">Rina Wijaya</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-error/10 text-error text-[10px] font-bold uppercase tracking-wider border border-error/20">Failed</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">15m ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/10 flex items-center justify-between flex-shrink-0">
              <p className="text-[12px] text-on-surface-variant">4 dari 3.452 transaksi</p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-all text-xs font-medium">Prev</button>
                <div className="flex gap-1 items-center">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/20 border border-primary/40 text-primary text-xs font-bold">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-all text-xs font-medium">2</button>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-all text-xs font-medium">Next</button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Transaksi Tukar Voucher/Point */}
        <section className="flex flex-col gap-6 overflow-hidden h-full">
          <div className="flex items-center justify-between px-2 flex-shrink-0">
            <h3 className="font-headline text-[24px] font-bold text-on-surface">Tukar Voucher/Point</h3>
            <span className="px-3 py-1 bg-secondary-container/30 text-secondary rounded-full text-xs font-bold">
              Activity: High
            </span>
          </div>

          {/* Voucher Charts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-shrink-0">
            {/* Donut Chart Component */}
            <div className="glass-card p-5 rounded-xl flex flex-col gap-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-on-surface-variant text-[12px] font-bold uppercase tracking-wider mb-1">Distribusi Kategori</p>
                  <h4 className="font-headline text-[32px] font-bold text-primary leading-tight">4.2k</h4>
                  <span className="text-secondary text-xs font-bold flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Redeemed
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle className="text-surface-variant/20" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="12"></circle>
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#10b981" strokeDasharray="50.24 251.2" strokeDashoffset="0" strokeLinecap="round" strokeWidth="12" className="transition-all duration-1000 ease-out drop-shadow-[0_0_4px_rgba(16,185,129,0.3)]"></circle>
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#4edea3" strokeDasharray="50.24 251.2" strokeDashoffset="-50.24" strokeLinecap="round" strokeWidth="12" className="transition-all duration-1000 ease-out drop-shadow-[0_0_4px_rgba(78,222,163,0.3)]"></circle>
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#95d3ba" strokeDasharray="50.24 251.2" strokeDashoffset="-100.48" strokeLinecap="round" strokeWidth="12" className="transition-all duration-1000 ease-out drop-shadow-[0_0_4px_rgba(149,211,186,0.3)]"></circle>
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#a8cfbc" strokeDasharray="37.68 251.2" strokeDashoffset="-150.72" strokeLinecap="round" strokeWidth="12" className="transition-all duration-1000 ease-out drop-shadow-[0_0_4px_rgba(168,207,188,0.3)]"></circle>
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#84ab98" strokeDasharray="37.68 251.2" strokeDashoffset="-188.4" strokeLinecap="round" strokeWidth="12" className="transition-all duration-1000 ease-out drop-shadow-[0_0_4px_rgba(132,171,152,0.3)]"></circle>
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#2f3633" strokeDasharray="25.12 251.2" strokeDashoffset="-226.08" strokeLinecap="round" strokeWidth="12" className="transition-all duration-1000 ease-out drop-shadow-[0_0_4px_rgba(47,54,51,0.3)]"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-on-surface-variant leading-none uppercase tracking-wider">Total</span>
                    <span className="text-[12px] font-bold text-on-surface">100%</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-y-0.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                      <span className="text-[11px] text-on-surface-variant truncate">Indomaret</span>
                    </div>
                    <span className="text-[11px] font-bold text-on-surface">20%</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                      <span className="text-[11px] text-on-surface-variant truncate">Lainnya</span>
                    </div>
                    <span className="text-[11px] font-bold text-on-surface">20%</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#95d3ba]"></span>
                      <span className="text-[11px] text-on-surface-variant truncate">Grab</span>
                    </div>
                    <span className="text-[11px] font-bold text-on-surface">20%</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#a8cfbc]"></span>
                      <span className="text-[11px] text-on-surface-variant truncate">Listrik</span>
                    </div>
                    <span className="text-[11px] font-bold text-on-surface">15%</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#84ab98]"></span>
                      <span className="text-[11px] text-on-surface-variant truncate">Coffee</span>
                    </div>
                    <span className="text-[11px] font-bold text-on-surface">15%</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#2f3633]"></span>
                      <span className="text-[11px] text-on-surface-variant truncate">Outer</span>
                    </div>
                    <span className="text-[11px] font-bold text-on-surface">10%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Activity Chart Component */}
            <div className="glass-card p-5 rounded-xl flex flex-col gap-4 animate-chart" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-on-surface-variant text-[12px] font-bold uppercase tracking-wider mb-1">Daily Activity</p>
                  <h4 className="font-headline text-[28px] font-bold">128</h4>
                </div>
                <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">+5%</span>
              </div>
              <InteractiveChart chartId="chart-activity" tooltipUnit="items" baseValue={100} volatility={150}>
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 30">
                  <path className="interactive-path drop-shadow-[0_0_8px_#10b981]" d="M0 28 Q 15 25, 30 15 T 60 20 T 80 5 T 100 12" fill="none" stroke="#10b981" strokeWidth="2.5"></path>
                </svg>
              </InteractiveChart>
            </div>
          </div>

          {/* Voucher Transaction List */}
          <div className="glass-card flex-1 rounded-xl overflow-hidden flex flex-col min-h-0">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex items-center justify-between flex-shrink-0">
              <h4 className="font-headline text-lg font-bold">List Tukar Voucher</h4>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-[18px]">filter_list</span></button>
                <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-[18px]">download</span></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0 relative">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-highest/50 text-xs text-on-surface-variant sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-3 font-semibold tracking-wider">Voucher</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Points</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">User</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  <tr className="hover:bg-secondary/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                        </div>
                        <span className="font-medium text-sm">Voucher Indomaret</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-secondary font-bold text-sm">2.5k</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">Doni Tata</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase border border-primary/20">Success</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-secondary/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined text-[18px]">directions_car</span>
                        </div>
                        <span className="font-medium text-sm">Grab Ride Promo</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-secondary font-bold text-sm">1.0k</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">Maya Sari</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase border border-primary/20">Success</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-secondary/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined text-[18px]">electric_bolt</span>
                        </div>
                        <span className="font-medium text-sm">Token Listrik</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-secondary font-bold text-sm">5.0k</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">Rahmat H.</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase border border-primary/20">Success</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-secondary/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined text-[18px]">coffee</span>
                        </div>
                        <span className="font-medium text-sm">Kopi Kenangan</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-secondary font-bold text-sm">1.5k</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">Indah K.</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase border border-yellow-500/20">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/10 flex items-center justify-between flex-shrink-0">
              <p className="text-[12px] text-on-surface-variant">4 dari 1.2k transaksi</p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-all text-xs font-medium">Prev</button>
                <button className="px-3 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-all text-xs font-medium">Next</button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

