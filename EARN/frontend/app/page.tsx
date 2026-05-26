"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useMqtt } from '@/components/MqttProvider';
import Header from '@/components/Header';

// ── Types ──────────────────────────────────────────────────────────────────────
type LogType = 'success' | 'error' | 'info';

interface ActivityLog {
  type: LogType;
  title: string;
  desc: string;
  time: string;
  poin: string;
  avatar: string;
}

interface MesinStatus {
  id: string;
  lokasi: string;
  status: 'Online' | 'Penuh' | 'Maintenance';
  kapasitas: number;
  isi: number;
  maks: number;
  kondisi: string;
  strokeColor: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const mockLogs: ActivityLog[] = [
  {
    type: 'success',
    title: 'Botol berhasil diterima',
    desc: 'RVM-01 (Fakultas Teknik)',
    time: '10:24:36',
    poin: '+10 poin',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwcJNG_iW9lNGdxVSSpwPKuzTHEaf_2pt_pu0N2J6oVxl6IZypBU8s6iBGEIqH_4nNEW5hddv8VhOtQc6KfIyzm0R5QkOpZsTZywupfzaR9kq73IkinlXnUIQH2bgva4NoqMTvmkcJBA4zIWTcuWRcZ317J9K-NK3TjqsCg_-BxwnRywiUIWovVGB1hmbBmsbGEZyCUC6ICRQDSg6ThJUlUFbgb5BsGYDqO253oGAc8FMPhXDrpud40xvMb2_ara71jWgJnIeGIDM',
  },
  {
    type: 'info',
    title: 'Poin diberikan ke pengguna',
    desc: 'Salsabila Putri',
    time: '10:24:36',
    poin: '+10 poin',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX2idl8g_pihtK3Fg8GuKth5KG0uawDSF-uKQdzH35hxBI0IoMztmTPypgxENPBUncojzBmZhTLpTCfGO4sRKatqtMLd-tHSeJWA42D_p4x94x-qg1fddeMC9JQsD1nrGigj7zgugxSTvL927bupFK6WqB6NA_yAdMg2Qrs51XWJ0jCoCFIW_qAIPOZTyqH771e7Ugtu2E1iGxj_2WtE-RT6IoTSfBfh8pKUVk5Vt1PM4Aj9E0JxXpCRDs0TKcpH5wIQbutI5vD_k',
  },
  {
    type: 'error',
    title: 'Botol tidak valid',
    desc: 'RVM-02 (Kantin Center)',
    time: '10:24:28',
    poin: '+0 poin',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLFkw3QhsTNJb-UoxhwcN6DuIhG58IfY0onHWYICvI2bjTlV3DBetwtrrx8BzzN3vqxHhnJ07SX1YfnhhSoe6EdKMIIjTX0hfHUBnD-tsTHTh2DmQMIYWYjvFsZfQLS2t-0l-lTFN69PJZrHzH58QCIeOn0e5m6begBpfC2XtKD2FsW8Men2TGMh7UI-AR6aBOlvETOHxfmVKaUEh_GOMtrEWJDoVzSru7Cd8P9HtSDGWQngtmCipd6OMSYBOh9jWdGAZjGMKnFyw',
  },
];

const mesinStatusList: MesinStatus[] = [
  { id: 'RVM-01', lokasi: 'Fakultas Teknik', status: 'Online', kapasitas: 78, isi: 620, maks: 800, kondisi: 'Normal', strokeColor: '#4edea3' },
  { id: 'RVM-02', lokasi: 'Kantin Center', status: 'Online', kapasitas: 45, isi: 360, maks: 800, kondisi: 'Normal', strokeColor: '#95d3ba' },
  { id: 'RVM-03', lokasi: 'Perpustakaan', status: 'Penuh', kapasitas: 100, isi: 800, maks: 800, kondisi: 'Penuh', strokeColor: '#ffb4ab' },
  { id: 'RVM-04', lokasi: 'Food Court', status: 'Maintenance', kapasitas: 0, isi: 0, maks: 800, kondisi: 'Maintenance', strokeColor: '#fb923c' },
];

// ── Sub-Components ─────────────────────────────────────────────────────────────

function StatCard({ label, value, unit, trend, icon, hoverBorder }: {
  label: string; value: string; unit: string; trend: string; icon: string; hoverBorder: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = panelRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    panelRef.current!.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(78, 222, 163, 0.05) 0%, rgba(26, 33, 30, 0.4) 50%)`;
  };

  const handleMouseLeave = () => {
    if (panelRef.current) panelRef.current.style.background = 'rgba(26, 33, 30, 0.4)';
  };

  return (
    <div
      ref={panelRef}
      className={`glass-panel p-md rounded-2xl relative overflow-hidden transition-all group ${hoverBorder}`}
      style={{ background: 'rgba(26, 33, 30, 0.4)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className={`material-symbols-outlined text-[80px] ${icon === 'stars' ? 'text-secondary' : icon === 'group' ? 'text-on-surface-variant' : 'text-primary'}`}>{icon}</span>
      </div>
      <p className="text-xs text-on-surface-variant uppercase font-label tracking-wider mb-sm">{label}</p>
      <div className="flex items-baseline gap-xs mb-xs">
        <h4 className="text-2xl font-headline font-bold text-primary">{value}</h4>
        <span className="text-xs text-on-surface-variant">{unit}</span>
      </div>
      <div className="flex items-center gap-xs text-[10px] text-primary-fixed-dim font-bold">
        <span className="material-symbols-outlined text-xs">arrow_upward</span>
        <span>{trend}</span>
      </div>
    </div>
  );
}

function LineChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<{ x: number; time: string; value: string; show: boolean }>({ x: 0, time: '', value: '', show: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    if (x >= 0 && x <= rect.width) {
      const hours = Math.floor((percentage / 100) * 24);
      const mins = Math.floor(((percentage / 100) * 24 % 1) * 60);
      const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
      const value = Math.floor(400 + (Math.sin(percentage / 10) * 300) + (percentage * 8));
      
      setTooltipData({
        x,
        time: timeStr,
        value: value.toLocaleString('id-ID'),
        show: true,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltipData(prev => ({ ...prev, show: false }));
  };

  // calculate dynamic tooltip left position to avoid overflow
  let tooltipLeft = tooltipData.x + 15;
  if (containerRef.current) {
    if (tooltipLeft + 100 > containerRef.current.getBoundingClientRect().width) {
      tooltipLeft = tooltipData.x - 115; // move to left side of cursor
    }
  }

  return (
    <div className="relative h-64 w-full flex items-end">
      {/* Chart Gridlines */}
      <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-on-surface-variant opacity-40">
        {['1.5K', '1.2K', '900', '600', '300', '0'].map((label) => (
          <div key={label} className={`w-full border-t ${label === '0' ? 'border-outline-variant' : 'border-dashed border-outline-variant/50'} flex justify-between items-start`}>
            <span>{label}</span>
          </div>
        ))}
      </div>
      
      {/* Smooth Data Path */}
      <svg className="w-full h-full relative z-10" preserveAspectRatio="none" viewBox="0 0 1000 100">
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4edea3" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path className="drop-shadow-[0_0_8px_rgba(78,222,163,0.5)]" d="M0,85 C50,80 100,88 150,80 C200,72 250,50 300,45 C350,40 400,60 450,55 C500,50 550,85 600,75 C650,65 700,20 750,25 C800,30 850,70 900,50 C950,30 1000,15 1000,15" fill="none" stroke="#4edea3" strokeWidth="2"></path>
        <path d="M0,85 C50,80 100,88 150,80 C200,72 250,50 300,45 C350,40 400,60 450,55 C500,50 550,85 600,75 C650,65 700,20 750,25 C800,30 850,70 900,50 C950,30 1000,15 1000,15 L1000,100 L0,100 Z" fill="url(#chartGradient)"></path>
      </svg>
      
      {/* Interactive Marker & Tooltip */}
      <div 
        ref={containerRef}
        className="absolute inset-0 z-20 cursor-crosshair" 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`absolute top-0 bottom-0 w-[1px] bg-primary/30 pointer-events-none ${tooltipData.show ? '' : 'hidden'}`} style={{ left: tooltipData.x }}>
          <div className="absolute top-0 -left-1 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#4edea3]"></div>
        </div>
        <div 
          className={`absolute pointer-events-none bg-surface-container-highest border border-primary/30 px-3 py-2 rounded-lg shadow-2xl backdrop-blur-md min-w-[100px] ${tooltipData.show ? '' : 'hidden'}`} 
          style={{ left: tooltipLeft, top: '20px' }}
        >
          <div className="text-[10px] text-on-surface-variant font-bold uppercase font-label mb-1">{tooltipData.time}</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="text-xs text-primary font-bold"><span>{tooltipData.value}</span> <span className="font-normal opacity-70">botol</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DonutChart() {
  const donutData = [
    { label: 'RVM-01 (Fakultas Teknik)', botol: 620, persen: '49.7%', color: '#10b981', bgRGB: 'rgb(16, 185, 129)', textColor: 'text-primary', offset: 0 },
    { label: 'RVM-02 (Kantin Center)', botol: 360, persen: '28.9%', color: '#84cc16', bgRGB: 'rgb(132, 204, 22)', textColor: 'text-secondary', offset: -49.7 },
    { label: 'RVM-03 (Perpustakaan)', botol: 200, persen: '16.1%', color: '#059669', bgRGB: 'rgb(5, 150, 105)', textColor: 'text-secondary-container', offset: -78.6 },
  ];

  return (
    <div className="glass-panel p-md rounded-2xl flex flex-col" style={{ background: 'rgba(26, 33, 30, 0.4)' }}>
      <div className="flex justify-between items-center mb-md">
        <h5 className="font-label text-sm text-primary">Distribusi Pengumpulan</h5>
        <div className="flex items-center gap-xs px-sm py-1 bg-surface-container rounded-lg border border-outline-variant/30 text-[10px] cursor-pointer hover:border-primary/40 transition-all">
          <span>Hari Ini</span>
          <span className="material-symbols-outlined text-xs">expand_more</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-md">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90 overflow-visible" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
            {donutData.map((d, i) => (
              <circle
                key={i}
                className="transition-all duration-300 origin-center cursor-pointer hover:scale-105 hover:stroke-[5px]"
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke={d.color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${parseFloat(d.persen)} 100`}
                strokeDashoffset={d.offset}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-[8px] text-on-surface-variant uppercase font-bold font-label">Total</p>
            <p className="text-2xl font-headline font-bold text-primary leading-none">1.247</p>
            <p className="text-[8px] text-on-surface-variant">botol</p>
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex justify-between text-[10px] text-on-surface-variant border-b border-outline-variant/30 pb-1 opacity-50 uppercase font-bold font-label">
          <span>Mesin</span>
          <div className="flex gap-4">
            <span>Botol</span>
            <span>Persentase</span>
          </div>
        </div>
        {donutData.map((d, i) => (
          <div key={i} className="flex justify-between items-center text-[11px]">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: d.bgRGB }} />
              <span className="text-on-surface">
                {d.label.split(' ')[0]} <span className="opacity-50">({d.label.split('(')[1]?.replace(')', '') ?? ''})</span>
              </span>
            </div>
            <div className="flex gap-10">
              <span>{d.botol}</span>
              <span className={`font-bold ${d.textColor}`} style={{ color: d.bgRGB }}>{d.persen}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityFeed({ logs }: { logs: ActivityLog[] }) {
  const iconMap: Record<LogType, { icon: string; bgClass: string; textClass: string }> = {
    success: { icon: 'arrow_downward', bgClass: 'bg-primary/20', textClass: 'text-primary' },
    info: { icon: 'person', bgClass: 'bg-secondary/20', textClass: 'text-secondary' },
    error: { icon: 'close', bgClass: 'bg-error/20', textClass: 'text-error' },
  };

  return (
    <div className="glass-panel p-md rounded-2xl flex flex-col" style={{ background: 'rgba(26, 33, 30, 0.4)' }}>
      <div className="flex justify-between items-center mb-md">
        <h5 className="font-label text-xs text-primary uppercase tracking-wider">Aktivitas Terbaru</h5>
        <button className="text-[10px] text-primary font-bold hover:underline">Lihat Semua</button>
      </div>
      <div className="space-y-sm overflow-y-auto max-h-[400px] pr-2">
        {logs.map((log, i) => {
          const { icon, bgClass, textClass } = iconMap[log.type];
          return (
            <div key={i} className="flex items-center gap-md p-sm rounded-xl hover:bg-primary/5 transition-colors group">
              <div className={`w-8 h-8 rounded-full ${bgClass} flex items-center justify-center ${textClass}`}>
                <span className="material-symbols-outlined text-sm">{icon}</span>
              </div>
              <img
                alt="user"
                className="w-8 h-8 rounded-full border border-outline-variant/30"
                src={log.avatar}
              />
              <div className="flex-1">
                <p className="text-xs font-bold text-on-surface">{log.title}</p>
                <p className="text-[10px] text-on-surface-variant">{log.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-on-surface-variant">{log.time}</p>
                <p className={`text-[10px] font-bold ${log.type === 'error' ? 'text-error' : 'text-primary'}`}>
                  {log.poin}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MesinTable({ mesinList }: { mesinList: MesinStatus[] }) {
  const getStatusBadge = (status: MesinStatus['status']) => {
    switch (status) {
      case 'Online': return <span className="px-2 py-0.5 bg-primary-container/20 text-primary-fixed rounded text-[10px]">Online</span>;
      case 'Penuh': return <span className="px-2 py-0.5 bg-error/20 text-error rounded text-[10px]">Penuh</span>;
      case 'Maintenance': return <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-[10px]">Maintenance</span>;
    }
  };

  const getKondisiColor = (status: MesinStatus['status']) => {
    switch (status) {
      case 'Online': return 'text-primary';
      case 'Penuh': return 'text-error';
      case 'Maintenance': return 'text-orange-400';
    }
  };

  const getWaveColor = (status: MesinStatus['status']) => {
    switch (status) {
      case 'Online': return '#4edea3';
      case 'Penuh': return '#ffb4ab';
      case 'Maintenance': return '#fb923c';
    }
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col" style={{ background: 'rgba(26, 33, 30, 0.4)' }}>
      <div className="p-md flex justify-between items-center border-b border-outline-variant/30 bg-white/5">
        <h5 className="font-label text-xs text-primary uppercase tracking-wider">Status Mesin RVM</h5>
        <button className="text-[10px] text-primary font-bold hover:underline">Lihat Semua</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" aria-label="Status Mesin RVM">
          <thead>
            <tr className="text-[10px] text-on-surface-variant uppercase font-label tracking-wider border-b border-outline-variant/30">
              <th className="px-md py-sm" scope="col">Mesin</th>
              <th className="px-md py-sm" scope="col">Lokasi</th>
              <th className="px-md py-sm" scope="col">Status</th>
              <th className="px-md py-sm" scope="col">Kapasitas</th>
              <th className="px-md py-sm" scope="col">Isi / Maks</th>
              <th className="px-md py-sm" scope="col">Kondisi</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {mesinList.map((m) => (
              <tr key={m.id} className="border-b border-outline-variant/20 hover:bg-primary/5 transition-colors last:border-0">
                <td className="px-md py-md font-bold text-primary">{m.id}</td>
                <td className="px-md py-md text-on-surface-variant">{m.lokasi}</td>
                <td className="px-md py-md">{getStatusBadge(m.status)}</td>
                <td className="px-md py-md">
                  <div className="relative w-8 h-8">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                      <circle
                        cx="18" cy="18" r="16"
                        fill="none"
                        stroke={m.strokeColor}
                        strokeDasharray={`${m.kapasitas} 100`}
                        strokeWidth="4"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold font-label">
                      {m.kapasitas}%
                    </span>
                  </div>
                </td>
                <td className="px-md py-md text-on-surface-variant">
                  <span className={`font-bold ${getKondisiColor(m.status)}`}>{m.isi}</span> / {m.maks} botol
                </td>
                <td className="px-md py-md">
                  <div className="flex items-center gap-xs">
                    <span className={`text-[10px] ${getKondisiColor(m.status)}`}>{m.kondisi}</span>
                    <svg width="24" height="12" className="opacity-50" aria-hidden="true">
                      {m.status === 'Online' && (
                        <path d="M0,6 L4,6 L6,2 L10,10 L12,6 L24,6" fill="none" stroke={getWaveColor(m.status)} strokeWidth="1.5" />
                      )}
                      {m.status === 'Penuh' && (
                        <path d="M0,6 L4,6 L6,0 L10,12 L12,6 L24,6" fill="none" stroke={getWaveColor(m.status)} strokeWidth="1.5" />
                      )}
                      {m.status === 'Maintenance' && (
                        <path d="M0,6 L24,6" fill="none" stroke={getWaveColor(m.status)} strokeWidth="1.5" />
                      )}
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { latestEvent } = useMqtt();
  const [logs, setLogs] = useState<ActivityLog[]>(mockLogs);

  useEffect(() => {
    if (latestEvent) {
      const newLog: ActivityLog = {
        type: 'success',
        title: 'Botol berhasil diterima',
        desc: `${latestEvent.data?.mesin?.id_mesin ?? 'RVM'}`,
        time: new Date().toLocaleTimeString('id-ID', { hour12: false }),
        poin: `+${latestEvent.data?.transaksi?.jumlah_poin ?? 10} poin`,
        avatar: mockLogs[0].avatar,
      };
      setLogs((prev) => [newLog, ...prev].slice(0, 10));
    }
  }, [latestEvent]);

  // Glass panel mouse move effect
  const handlePanelMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(78, 222, 163, 0.05) 0%, rgba(26, 33, 30, 0.4) 50%)`;
  };
  const handlePanelMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.background = 'rgba(26, 33, 30, 0.4)';
  };

  return (
    <div className="ml-64 flex flex-col min-h-screen">
      <Header />

      <main className="p-gutter flex flex-col gap-gutter">
        {/* ── KPI Cards ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md" aria-label="KPI Cards">
          <StatCard label="Total Botol Hari Ini" value="1.247" unit="botol" trend="18.4% dari kemarin" icon="recycling" hoverBorder="hover:border-primary/20" />
          <StatCard label="Total Poin Diberikan" value="12.470" unit="poin" trend="22.7% dari kemarin" icon="stars" hoverBorder="hover:border-secondary/20" />
          <StatCard label="Pengguna Aktif" value="342" unit="orang" trend="15.3% dari kemarin" icon="group" hoverBorder="hover:border-primary/20" />
          <StatCard label="Sampah Berhasil Dikurangi" value="62.4" unit="kg" trend="20.1% dari kemarin" icon="eco" hoverBorder="hover:border-primary/20" />
        </section>

        {/* ── Charts ── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-md" aria-label="Charts">
          {/* Line Chart */}
          <div
            className="lg:col-span-2 glass-panel p-md rounded-2xl flex flex-col"
            style={{ background: 'rgba(26, 33, 30, 0.4)' }}
            onMouseMove={handlePanelMouseMove}
            onMouseLeave={handlePanelMouseLeave}
          >
            <div className="flex justify-between items-center mb-lg">
              <h5 className="font-label text-sm text-primary">Grafik Pengumpulan Botol</h5>
              <div className="flex items-center gap-xs px-sm py-1 bg-surface-container rounded-lg border border-outline-variant/30 text-[10px] cursor-pointer">
                <span>Per Jam</span>
                <span className="material-symbols-outlined text-xs">expand_more</span>
              </div>
            </div>
            <LineChart />
            <div className="flex justify-between mt-sm text-[10px] text-on-surface-variant font-label uppercase tracking-tighter opacity-60">
              {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          {/* Donut Chart */}
          <DonutChart />
        </section>

        {/* ── Bottom: Feed & Table ── */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-md" aria-label="Activity and Machine Status">
          <div className="lg:col-span-2">
            <ActivityFeed logs={logs} />
          </div>
          <div className="lg:col-span-3">
            <MesinTable mesinList={mesinStatusList} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto px-gutter py-md border-t border-outline-variant/30 flex justify-between items-center text-[10px] text-on-surface-variant opacity-50 uppercase tracking-widest font-label font-bold">
        <div className="flex items-center gap-sm">
          <span className="w-2 h-2 rounded-full bg-primary pulse-emerald" />
          <span>Sistem Online &amp; Terhubung</span>
        </div>
        <span>EARN System v1.0.0</span>
        <span>© 2025 Eco Action &amp; Reward Network</span>
      </footer>
    </div>
  );
}
