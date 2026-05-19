"use client";

import React, { useEffect, useState } from 'react';
import { useMqtt } from '@/components/MqttProvider';
import { ArrowUp, Activity, CheckCircle2, XCircle, AlertCircle, Droplet, Star, Users, Recycle, Cpu, MapPin } from 'lucide-react';
import LineChartRVM from '@/components/charts/LineChartRVM';
import DonutChartRVM from '@/components/charts/DonutChartRVM';
import CameraFeed from '@/components/CameraFeed';
import clsx from 'clsx';

export default function AdminDashboard() {
  const { isConnected, latestEvent, globalKPI } = useMqtt();
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<string>('RVM-01');

  useEffect(() => {
    if (latestEvent) {
      setLogs(prev => [latestEvent, ...prev].slice(0, 5));
    }
  }, [latestEvent]);

  // Exact mock data
  const mockLogs = [
    { type: 'success', title: 'Botol berhasil diterima', desc: 'RVM-01 (Fakultas Teknik)', time: '10:24:36', poin: '+10 poin', initial: 'S', user: 'Salsabila Putri' },
    { type: 'info', title: 'Poin diberikan ke pengguna', desc: 'Salsabila Putri', time: '10:24:36', poin: '+10 poin', initial: 'S', user: 'Salsabila Putri' },
    { type: 'error', title: 'Botol tidak valid', desc: 'RVM-02 (Kantin Center)', time: '10:24:28', poin: '+0 poin', initial: 'B', user: 'Budi Santoso' },
    { type: 'warning', title: 'Pintu mesin dibuka', desc: 'RVM-01 (Fakultas Teknik)', time: '10:24:18', poin: '-', initial: 'A', user: 'Admin' },
  ];

  const mesinStatus = [
    { id: 'RVM-01', lokasi: 'Fakultas Teknik', status: 'Online', kapasitas: 78, isi: 620, maks: 800, kondisi: 'Normal' },
    { id: 'RVM-02', lokasi: 'Kantin Center', status: 'Online', kapasitas: 45, isi: 360, maks: 800, kondisi: 'Normal' },
    { id: 'RVM-03', lokasi: 'Perpustakaan', status: 'Penuh', kapasitas: 100, isi: 800, maks: 800, kondisi: 'Penuh' },
    { id: 'RVM-04', lokasi: 'Fakultas Ekonomi', status: 'Online', kapasitas: 30, isi: 240, maks: 800, kondisi: 'Normal' },
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'success': return <div className="w-8 h-8 rounded-full bg-[color:rgba(78,222,163,0.1)] text-[color:var(--accent-primary)] flex items-center justify-center border border-[color:rgba(78,222,163,0.2)]"><ArrowUp className="w-4 h-4 transform rotate-180" /></div>;
      case 'info': return <div className="w-8 h-8 rounded-full bg-[color:rgba(149,211,186,0.1)] text-[color:var(--accent-secondary)] flex items-center justify-center border border-[color:rgba(149,211,186,0.2)]"><CheckCircle2 className="w-4 h-4" /></div>;
      case 'error': return <div className="w-8 h-8 rounded-full bg-[color:rgba(255,180,171,0.1)] text-[color:var(--accent-danger)] flex items-center justify-center border border-[color:rgba(255,180,171,0.2)]"><XCircle className="w-4 h-4" /></div>;
      case 'warning': return <div className="w-8 h-8 rounded-full bg-[color:rgba(176,240,214,0.1)] text-[color:var(--accent-warning)] flex items-center justify-center border border-[color:rgba(176,240,214,0.2)]"><AlertCircle className="w-4 h-4" /></div>;
      default: return null;
    }
  };

  return (
    <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar h-[calc(100vh-5rem)]">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-shrink-0">
        <div className="card-ui relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[color:var(--accent-primary)] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-xs font-medium text-[color:var(--text-tertiary)] mb-1">Total Botol Terkumpul</p>
              <h3 className="text-2xl font-bold font-mono text-[color:var(--text-primary)] mb-1">1.247 <span className="text-xs font-sans font-normal text-[color:var(--text-secondary)]">botol</span></h3>
              <p className="text-[10px] font-medium text-[color:var(--accent-primary)] flex items-center gap-1">
                <ArrowUp className="w-3 h-3" /> 18.4% <span className="text-[color:var(--text-tertiary)] font-normal">dari kemarin</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[color:rgba(78,222,163,0.1)] flex items-center justify-center border border-[color:rgba(78,222,163,0.2)]">
              <Droplet className="w-6 h-6 text-[color:var(--accent-primary)]" />
            </div>
          </div>
        </div>

        

        <div className="card-ui relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[color:var(--accent-tertiary)] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-xs font-medium text-[color:var(--text-tertiary)] mb-1">Pengguna Aktif (Daily)</p>
              <h3 className="text-2xl font-bold font-mono text-[color:var(--text-primary)] mb-1">342 <span className="text-xs font-sans font-normal text-[color:var(--text-secondary)]">orang</span></h3>
              <p className="text-[10px] font-medium text-[color:var(--accent-primary)] flex items-center gap-1">
                <ArrowUp className="w-3 h-3" /> 15.3% <span className="text-[color:var(--text-tertiary)] font-normal">dari kemarin</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[color:rgba(168,207,188,0.1)] flex items-center justify-center border border-[color:rgba(168,207,188,0.2)]">
              <Users className="w-6 h-6 text-[color:var(--accent-tertiary)]" />
            </div>
          </div>
        </div>

        <div className="card-ui relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[color:var(--accent-primary)] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-xs font-medium text-[color:var(--text-tertiary)] mb-1">Karbon Tereduksi</p>
              <h3 className="text-2xl font-bold font-mono text-[color:var(--text-primary)] mb-1">62.4 <span className="text-xs font-sans font-normal text-[color:var(--text-secondary)]">kg</span></h3>
              <p className="text-[10px] font-medium text-[color:var(--accent-primary)] flex items-center gap-1">
                <ArrowUp className="w-3 h-3" /> 20.1% <span className="text-[color:var(--text-tertiary)] font-normal">dari kemarin</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[color:rgba(78,222,163,0.1)] flex items-center justify-center border border-[color:rgba(78,222,163,0.2)]">
              <Recycle className="w-6 h-6 text-[color:var(--accent-primary)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-shrink-0">
        <div className="card-ui lg:col-span-2 relative z-10 flex flex-col min-h-[300px]">
          <h3 className="text-sm font-bold font-headline text-[color:var(--text-primary)] mb-4">Tren Pengumpulan Botol</h3>
          <div className="flex-1 w-full relative">
            <LineChartRVM />
          </div>
        </div>
        <div className="card-ui lg:col-span-1 relative z-10 flex flex-col min-h-[300px]">
          <h3 className="text-sm font-bold font-headline text-[color:var(--text-primary)] mb-4">Komposisi Material</h3>
          <div className="flex-1 w-full relative">
            <DonutChartRVM />
          </div>
        </div>
      </div>

      {/* Main Grid: Network Monitoring & Detail */}
      <div className="flex-1 min-h-[400px] grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Network Monitoring List (Takes 2/3 space) */}
        <div className="card-ui lg:col-span-2 xl:col-span-3 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h3 className="font-headline font-bold text-lg text-[color:var(--text-primary)]">RVM Network Monitoring</h3>
            <div className="flex gap-2">
              <span className="badgePremium">
                <div className="w-2 h-2 rounded-full bg-[color:var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)] animate-pulse-organic"></div>
                4 Online
              </span>
              <span className="badgePremium border-[color:rgba(255,180,171,0.2)] bg-[color:rgba(255,180,171,0.1)] text-[color:var(--accent-danger)]">
                <div className="w-2 h-2 rounded-full bg-[color:var(--accent-danger)]"></div>
                1 Penuh
              </span>
            </div>
          </div>
          
          <div className="overflow-x-auto overflow-y-auto custom-scrollbar flex-1 pr-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-[color:var(--text-tertiary)] border-b border-[color:var(--border-subtle)]">
                  <th className="pb-3 font-medium sticky top-0 bg-[color:var(--surface-secondary)] z-10 pl-2">ID Unit</th>
                  <th className="pb-3 font-medium sticky top-0 bg-[color:var(--surface-secondary)] z-10">Lokasi</th>
                  <th className="pb-3 font-medium sticky top-0 bg-[color:var(--surface-secondary)] z-10">Status</th>
                  <th className="pb-3 font-medium text-center sticky top-0 bg-[color:var(--surface-secondary)] z-10">Kapasitas</th>
                  <th className="pb-3 font-medium sticky top-0 bg-[color:var(--surface-secondary)] z-10">Isi / Maks</th>
                  <th className="pb-3 font-medium text-right sticky top-0 bg-[color:var(--surface-secondary)] z-10 pr-2">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {mesinStatus.map((m, i) => {
                  const isPenuh = m.status === 'Penuh';
                  const isSelected = selectedMachine === m.id;
                  return (
                    <tr 
                      key={m.id} 
                      onClick={() => setSelectedMachine(m.id)}
                      className={clsx(
                        "border-b border-[color:var(--border-subtle)] last:border-0 transition-colors cursor-pointer group",
                        isSelected ? "bg-[color:rgba(78,222,163,0.05)]" : "hover:bg-[color:var(--surface-tertiary)]"
                      )}
                    >
                      <td className="py-3 pl-2">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[color:var(--text-tertiary)] group-hover:text-[color:var(--accent-primary)] transition-colors" />
                          <span className={clsx("font-mono font-bold", isSelected ? "text-[color:var(--accent-primary)]" : "text-[color:var(--text-primary)]")}>{m.id}</span>
                        </div>
                      </td>
                      <td className="py-3 text-[color:var(--text-secondary)] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[color:var(--text-tertiary)]" /> {m.lokasi}
                      </td>
                      <td className="py-3">
                        <span className={clsx(
                          "text-[10px] px-2.5 py-1 rounded-md border font-medium flex items-center gap-1.5 w-max",
                          isPenuh 
                            ? "border-[color:rgba(255,180,171,0.2)] text-[color:var(--accent-danger)] bg-[color:rgba(255,180,171,0.1)]" 
                            : "border-[color:rgba(78,222,163,0.2)] text-[color:var(--accent-primary)] bg-[color:rgba(78,222,163,0.1)]"
                        )}>
                          <div className={clsx("w-1.5 h-1.5 rounded-full", isPenuh ? "bg-[color:var(--accent-danger)]" : "bg-[color:var(--accent-primary)] animate-pulse-organic")}></div>
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center justify-center">
                          <div className="relative w-10 h-10 flex items-center justify-center">
                            <svg className="w-10 h-10 transform -rotate-90 drop-shadow-[0_0_2px_rgba(78,222,163,0.3)]">
                              <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-[color:var(--surface-tertiary)]" />
                              <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={`${m.kapasitas} 100`} className={isPenuh ? 'text-[color:var(--accent-danger)]' : 'text-[color:var(--accent-primary)]'} />
                            </svg>
                            <span className="absolute text-[9px] font-bold font-mono text-[color:var(--text-primary)]">{m.kapasitas}%</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 font-mono text-xs">
                        <span className={clsx("font-bold", isPenuh ? "text-[color:var(--accent-danger)]" : "text-[color:var(--text-primary)]")}>{m.isi}</span>
                        <span className="text-[color:var(--text-tertiary)]"> / {m.maks}</span>
                      </td>
                      <td className="py-3 text-right pr-2">
                        <button className="text-[10px] font-medium text-[color:var(--accent-secondary)] bg-[color:rgba(149,211,186,0.1)] hover:bg-[color:rgba(149,211,186,0.2)] px-3 py-1.5 rounded transition-colors border border-[color:rgba(149,211,186,0.2)]">
                          View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Camera Feed Detail (Takes 1/3 space) */}
        <div className="lg:col-span-1 flex flex-col h-full">
          <CameraFeed machineId={selectedMachine} />
        </div>
        
      </div>
    </main>
  );
}
