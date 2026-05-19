"use client";

import React, { useState, useEffect } from 'react';
import { Camera, Cpu, Zap, Wifi, Maximize2, ShieldCheck, Thermometer } from 'lucide-react';

interface CameraFeedProps {
  machineId: string;
}

export default function CameraFeed({ machineId }: CameraFeedProps) {
  const [scanActive, setScanActive] = useState(false);
  const [detectedItem, setDetectedItem] = useState<{ type: string; confidence: number } | null>(null);

  // Simulate AI detections
  useEffect(() => {
    const interval = setInterval(() => {
      setScanActive(true);
      setTimeout(() => {
        const types = [
          { type: 'Plastic PET Bottle', conf: 98 },
          { type: 'Aluminum Can', conf: 94 },
          { type: 'Glass Bottle', conf: 89 }
        ];
        const randomItem = types[Math.floor(Math.random() * types.length)];
        setDetectedItem({ type: randomItem.type, confidence: randomItem.conf });
        setScanActive(false);
        
        setTimeout(() => {
          setDetectedItem(null);
        }, 2000);
      }, 1500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-ui flex flex-col h-full relative overflow-hidden group">
      {/* Camera Viewport */}
      <div className="relative flex-1 bg-[color:var(--surface-primary)] rounded-lg overflow-hidden border border-[color:var(--border-subtle)] min-h-[240px]">
        
        {/* Mock Video Feed Background (CSS Grid/Gradient) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--surface-tertiary)_0%,_var(--surface-primary)_100%)] opacity-50"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Scanner Bar */}
        {scanActive && <div className="scanner-bar"></div>}

        {/* AI Bounding Box */}
        {detectedItem && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-[color:var(--accent-primary)] shadow-[0_0_15px_var(--accent-primary)] rounded-sm bg-[color:rgba(78,222,163,0.05)] transition-all animate-pulse-organic flex flex-col justify-end">
            <div className="absolute -top-6 left-0 bg-[color:var(--accent-primary)] text-[color:var(--surface-primary)] text-[10px] font-bold font-mono px-2 py-1 rounded-t-sm whitespace-nowrap">
              {detectedItem.type} • {detectedItem.confidence}%
            </div>
            {/* Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[color:var(--accent-primary)] -mt-1 -ml-1"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[color:var(--accent-primary)] -mt-1 -mr-1"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[color:var(--accent-primary)] -mb-1 -ml-1"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[color:var(--accent-primary)] -mb-1 -mr-1"></div>
          </div>
        )}

        {/* Camera Overlay Status */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[color:var(--accent-secondary)] text-[10px] font-mono bg-[color:rgba(14,21,18,0.6)] px-2 py-1 rounded backdrop-blur-md">
            <ShieldCheck className="w-3 h-3" /> Model: EARN-Vision-v2.4
          </div>
          <div className="flex items-center gap-1.5 text-[color:var(--text-tertiary)] text-[10px] font-mono bg-[color:rgba(14,21,18,0.6)] px-2 py-1 rounded backdrop-blur-md">
            FPS: 30 | 1080p
          </div>
        </div>
      </div>

      {/* Hardware Diagnostics */}
      <div className="grid grid-cols-3 gap-2 mt-4 relative z-10">
        <div className="bg-[color:var(--surface-primary)] border border-[color:var(--border-subtle)] rounded-md p-2 flex flex-col items-center justify-center">
          <Thermometer className="w-4 h-4 text-[color:var(--accent-secondary)] mb-1" />
          <span className="text-[10px] text-[color:var(--text-tertiary)] font-mono">CPU Temp</span>
          <span className="text-xs font-bold text-[color:var(--text-primary)]">42°C</span>
        </div>
        <div className="bg-[color:var(--surface-primary)] border border-[color:var(--border-subtle)] rounded-md p-2 flex flex-col items-center justify-center">
          <Cpu className="w-4 h-4 text-[color:var(--accent-primary)] mb-1" />
          <span className="text-[10px] text-[color:var(--text-tertiary)] font-mono">Inference</span>
          <span className="text-xs font-bold text-[color:var(--text-primary)]">12ms</span>
        </div>
        <div className="bg-[color:var(--surface-primary)] border border-[color:var(--border-subtle)] rounded-md p-2 flex flex-col items-center justify-center">
          <Zap className="w-4 h-4 text-[color:var(--accent-warning)] mb-1" />
          <span className="text-[10px] text-[color:var(--text-tertiary)] font-mono">Motor DC</span>
          <span className="text-xs font-bold text-[color:var(--text-primary)]">Standby</span>
        </div>
      </div>
    </div>
  );
}
