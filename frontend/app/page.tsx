"use client";

import React, { useEffect, useState } from 'react';
import { useMqtt } from '@/components/MqttProvider';
import { ArrowUp, ArrowDown, Activity, ChevronDown, CheckCircle2, XCircle, AlertCircle, Trash2, Droplet, Star, Users, Recycle } from 'lucide-react';
import LineChartRVM from '@/components/charts/LineChartRVM';
import DonutChartRVM from '@/components/charts/DonutChartRVM';

export default function AdminDashboard() {
  const { isConnected, latestEvent, globalKPI } = useMqtt();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    if (latestEvent) {
      setLogs(prev => [latestEvent, ...prev].slice(0, 5));
    }
  }, [latestEvent]);

  // Exact data to match the image
  const mockLogs = [
    { type: 'success', title: 'Botol berhasil diterima', desc: 'RVM-01 (Fakultas Teknik)', time: '10:24:36', poin: '+10 poin', initial: 'S', user: 'Salsabila Putri' },
    { type: 'info', title: 'Poin diberikan ke pengguna', desc: 'Salsabila Putri', time: '10:24:36', poin: '+10 poin', initial: 'S', user: 'Salsabila Putri' },
    { type: 'error', title: 'Botol tidak valid', desc: 'RVM-02 (Kantin Center)', time: '10:24:28', poin: '+0 poin', initial: 'B', user: 'Budi Santoso' },
    { type: 'warning', title: 'Pintu mesin dibuka', desc: 'RVM-01 (Fakultas Teknik)', time: '10:24:18', poin: '-', initial: 'A', user: 'Admin' },
    { type: 'alert', title: 'Mesin penuh', desc: 'RVM-03 (Perpustakaan)', time: '10:22:10', poin: '-', initial: 'M', user: 'System' },
  ];

  const mesinStatus = [
    { id: 'RVM-01', lokasi: 'Fakultas Teknik', status: 'Online', kapasitas: 78, isi: 620, maks: 800, kondisi: 'Normal' },
    { id: 'RVM-02', lokasi: 'Kantin Center', status: 'Online', kapasitas: 45, isi: 360, maks: 800, kondisi: 'Normal' },
    { id: 'RVM-03', lokasi: 'Perpustakaan', status: 'Penuh', kapasitas: 100, isi: 800, maks: 800, kondisi: 'Penuh' },
    { id: 'RVM-04', lokasi: 'Fakultas Ekonomi', status: 'Online', kapasitas: 30, isi: 240, maks: 800, kondisi: 'Normal' },
    { id: 'RVM-05', lokasi: 'Student Center', status: 'Online', kapasitas: 60, isi: 480, maks: 800, kondisi: 'Normal' },
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'success': return <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[color:var(--accent-success)] text-[color:var(--surface-primary)] flex items-center justify-center"><ArrowDown className="w-4 h-4 md:w-5 md:h-5" /></div>;
      case 'info': return <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[color:var(--accent-info)] text-white flex items-center justify-center"><CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" /></div>;
      case 'error': return <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[color:var(--accent-danger)] text-white flex items-center justify-center"><XCircle className="w-4 h-4 md:w-5 md:h-5" /></div>;
      case 'warning': return <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[color:var(--accent-info)] text-white flex items-center justify-center"><AlertCircle className="w-4 h-4 md:w-5 md:h-5" /></div>;
      case 'alert': return <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[color:var(--accent-warning)] text-[color:var(--surface-primary)] flex items-center justify-center"><AlertCircle className="w-4 h-4 md:w-5 md:h-5" /></div>;
      default: return null;
    }
  };

  return (
    <main className="flex-1 p-4 md:p-6 flex flex-col gap-4 overflow-hidden h-[calc(100vh-5rem)]">
      
      {/* 4 KPI Cards - Adjusted sizing to prevent scrolling */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-shrink-0">
        {/* Card 1 */}
        <div className="card-ui bg-gradient-to-br from-[color:var(--surface-elevated)] to-[color:var(--surface-primary)] relative overflow-hidden group py-4 px-5">
          <div className="absolute right-0 top-0 w-24 h-24 bg-[color:var(--accent-success)] opacity-10 rounded-full blur-3xl transform group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-xs font-medium text-[color:var(--text-secondary)] mb-1">Total Botol Hari Ini</p>
              <h3 className="text-2xl font-bold text-[color:var(--text-primary)] mb-1">1.247 <span className="text-xs font-normal text-[color:var(--text-tertiary)]">botol</span></h3>
              <p className="text-[10px] font-medium text-[color:var(--accent-success)] flex items-center gap-1">
                <ArrowUp className="w-3 h-3" /> 18.4% <span className="text-[color:var(--text-tertiary)] font-normal">dari kemarin</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[color:hsla(145,63%,42%,0.2)] flex items-center justify-center border border-[color:hsla(145,63%,42%,0.3)] shadow-[0_0_15px_hsla(145,63%,42%,0.2)]">
              <Droplet className="w-5 h-5 text-[color:var(--accent-success)]" />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card-ui bg-gradient-to-br from-[color:var(--surface-elevated)] to-[color:var(--surface-primary)] relative overflow-hidden group py-4 px-5">
          <div className="absolute right-0 top-0 w-24 h-24 bg-[color:var(--accent-info)] opacity-10 rounded-full blur-3xl transform group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-xs font-medium text-[color:var(--text-secondary)] mb-1">Total Poin Diberikan</p>
              <h3 className="text-2xl font-bold text-[color:var(--text-primary)] mb-1">12.470 <span className="text-xs font-normal text-[color:var(--text-tertiary)]">poin</span></h3>
              <p className="text-[10px] font-medium text-[color:var(--accent-success)] flex items-center gap-1">
                <ArrowUp className="w-3 h-3" /> 22.7% <span className="text-[color:var(--text-tertiary)] font-normal">dari kemarin</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[color:hsla(217,91%,60%,0.2)] flex items-center justify-center border border-[color:hsla(217,91%,60%,0.3)] shadow-[0_0_15px_hsla(217,91%,60%,0.2)]">
              <Star className="w-5 h-5 fill-current text-[color:var(--accent-info)]" />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card-ui bg-gradient-to-br from-[color:var(--surface-elevated)] to-[color:var(--surface-primary)] relative overflow-hidden group py-4 px-5">
          <div className="absolute right-0 top-0 w-24 h-24 bg-[color:var(--accent-purple)] opacity-10 rounded-full blur-3xl transform group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-xs font-medium text-[color:var(--text-secondary)] mb-1">Pengguna Aktif</p>
              <h3 className="text-2xl font-bold text-[color:var(--text-primary)] mb-1">342 <span className="text-xs font-normal text-[color:var(--text-tertiary)]">orang</span></h3>
              <p className="text-[10px] font-medium text-[color:var(--accent-success)] flex items-center gap-1">
                <ArrowUp className="w-3 h-3" /> 15.3% <span className="text-[color:var(--text-tertiary)] font-normal">dari kemarin</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[color:hsla(270,60%,55%,0.2)] flex items-center justify-center border border-[color:hsla(270,60%,55%,0.3)] shadow-[0_0_15px_hsla(270,60%,55%,0.2)]">
              <Users className="w-5 h-5 text-[color:var(--accent-purple)]" />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card-ui bg-gradient-to-br from-[color:var(--surface-elevated)] to-[color:var(--surface-primary)] relative overflow-hidden group py-4 px-5">
          <div className="absolute right-0 top-0 w-24 h-24 bg-[color:var(--accent-warning)] opacity-10 rounded-full blur-3xl transform group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-xs font-medium text-[color:var(--text-secondary)] mb-1">Sampah Berhasil Dikurangi</p>
              <h3 className="text-2xl font-bold text-[color:var(--text-primary)] mb-1">62.4 <span className="text-xs font-normal text-[color:var(--text-tertiary)]">kg</span></h3>
              <p className="text-[10px] font-medium text-[color:var(--accent-success)] flex items-center gap-1">
                <ArrowUp className="w-3 h-3" /> 20.1% <span className="text-[color:var(--text-tertiary)] font-normal">dari kemarin</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[color:hsla(45,93%,47%,0.2)] flex items-center justify-center border border-[color:hsla(45,93%,47%,0.3)] shadow-[0_0_15px_hsla(45,93%,47%,0.2)]">
              <Recycle className="w-5 h-5 text-[color:var(--accent-warning)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Area - Using flex to take available space */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[200px]">
        <div className="card-ui relative flex flex-col p-4">
          <div className="flex justify-between items-center mb-2 flex-shrink-0">
            <h3 className="text-sm font-semibold text-[color:var(--text-primary)]">Grafik Pengumpulan Botol</h3>
            <button className="text-[10px] flex items-center gap-1 text-[color:var(--text-secondary)] bg-[color:var(--surface-elevated)] px-2 py-1 rounded border border-[color:var(--border-subtle)]">
              Per Jam <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 w-full min-h-0">
            <LineChartRVM />
          </div>
        </div>
        <div className="card-ui relative flex flex-col p-4">
          <div className="flex justify-between items-center mb-2 flex-shrink-0">
            <h3 className="text-sm font-semibold text-[color:var(--text-primary)]">Distribusi Pengumpulan Botol per Mesin RVM</h3>
            <button className="text-[10px] flex items-center gap-1 text-[color:var(--text-secondary)] bg-[color:var(--surface-elevated)] px-2 py-1 rounded border border-[color:var(--border-subtle)]">
              Hari Ini <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 w-full min-h-0">
            <DonutChartRVM />
          </div>
        </div>
      </div>

      {/* Bottom Area: Activity & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 flex-1 min-h-[220px]">
        
        {/* Aktivitas Terbaru */}
        <div className="card-ui lg:col-span-2 flex flex-col p-4 overflow-hidden">
          <div className="flex justify-between items-center mb-3 flex-shrink-0">
            <h3 className="text-sm font-semibold text-[color:var(--text-primary)]">Aktivitas Terbaru</h3>
            <button className="text-[10px] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]">Lihat Semua</button>
          </div>
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {mockLogs.map((log, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="relative">
                  {renderIcon(log.type)}
                  {i !== mockLogs.length - 1 && <div className="absolute top-full left-1/2 -ml-px w-px h-5 bg-[color:var(--border-subtle)] group-hover:bg-[color:var(--accent-primary)] transition-colors"></div>}
                </div>
                <div className="w-7 h-7 rounded-full overflow-hidden border border-[color:var(--border-subtle)] flex-shrink-0 flex items-center justify-center bg-[color:var(--surface-tertiary)]">
                  <span className="text-[10px] font-bold text-[color:var(--text-secondary)]">{log.initial}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[color:var(--text-primary)] truncate">{log.title}</p>
                  <p className="text-[10px] text-[color:var(--text-tertiary)] truncate">{log.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-[color:var(--text-secondary)]">{log.time}</p>
                  <p className={`text-[10px] font-bold ${log.type === 'success' || log.type === 'info' ? 'text-[color:var(--accent-success)]' : 'text-[color:var(--text-tertiary)]'}`}>{log.poin}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Mesin RVM */}
        <div className="card-ui lg:col-span-3 flex flex-col p-4 overflow-hidden">
          <div className="flex justify-between items-center mb-3 flex-shrink-0">
            <h3 className="text-sm font-semibold text-[color:var(--text-primary)]">Status Mesin RVM</h3>
            <button className="text-[10px] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto overflow-y-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] text-[color:var(--text-tertiary)] border-b border-[color:var(--border-subtle)]">
                  <th className="pb-2 font-medium sticky top-0 bg-[color:var(--surface-elevated)] z-10">Mesin</th>
                  <th className="pb-2 font-medium sticky top-0 bg-[color:var(--surface-elevated)] z-10">Lokasi</th>
                  <th className="pb-2 font-medium sticky top-0 bg-[color:var(--surface-elevated)] z-10">Status</th>
                  <th className="pb-2 font-medium text-center sticky top-0 bg-[color:var(--surface-elevated)] z-10">Kapasitas</th>
                  <th className="pb-2 font-medium sticky top-0 bg-[color:var(--surface-elevated)] z-10">Isi / Maks</th>
                  <th className="pb-2 font-medium text-right sticky top-0 bg-[color:var(--surface-elevated)] z-10">Kondisi</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[color:var(--text-secondary)]">
                {mesinStatus.map((m, i) => {
                  const isPenuh = m.status === 'Penuh';
                  return (
                    <tr key={i} className="border-b border-[color:var(--border-subtle)] last:border-0 hover:bg-[color:var(--surface-tertiary)] transition-colors">
                      <td className="py-2.5 font-medium text-[color:var(--text-primary)]">{m.id}</td>
                      <td className="py-2.5">{m.lokasi}</td>
                      <td className="py-2.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${isPenuh ? 'border-[color:hsla(0,84%,60%,0.3)] text-[color:var(--accent-danger)] bg-[color:hsla(0,84%,60%,0.1)]' : 'border-[color:hsla(145,63%,42%,0.3)] text-[color:var(--accent-success)] bg-[color:hsla(145,63%,42%,0.1)]'}`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center justify-center">
                          <div className="relative w-8 h-8 flex items-center justify-center">
                            <svg className="w-8 h-8 transform -rotate-90">
                              <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-[color:var(--surface-tertiary)]" />
                              <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={`${m.kapasitas * 0.75} 100`} className={isPenuh ? 'text-[color:var(--accent-danger)]' : 'text-[color:var(--accent-success)]'} />
                            </svg>
                            <span className="absolute text-[8px] font-bold text-[color:var(--text-primary)]">{m.kapasitas}%</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5"><span className="text-[color:var(--text-primary)] font-medium">{m.isi}</span> / {m.maks} botol</td>
                      <td className={`py-2.5 text-right flex justify-end items-center gap-1 ${isPenuh ? 'text-[color:var(--accent-danger)]' : 'text-[color:var(--accent-success)]'}`}>
                        {m.kondisi} <Activity className="w-3 h-3 opacity-70" />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </main>
  );
}
