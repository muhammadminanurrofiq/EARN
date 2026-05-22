"use client";

import React, { useState, useEffect } from 'react';

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
    <div className="glass-panel p-md rounded-2xl flex flex-col h-full relative overflow-hidden group" style={{ background: 'rgba(26, 33, 30, 0.4)' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-vertical {
          0% { top: 5%; opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { top: 95%; opacity: 0; }
        }
      `}} />
      
      {/* Camera Viewport */}
      <div className="relative flex-1 bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/30 min-h-[240px]">
        
        {/* Mock Video Feed Background (CSS Grid/Gradient) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--surface-tertiary)_0%,_var(--surface-primary)_100%)] opacity-50"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Scanner Bar */}
        {scanActive && (
          <div 
            className="absolute left-0 right-0 h-[2px] bg-primary opacity-70"
            style={{ 
              boxShadow: '0 0 15px 2px #4edea3',
              animation: 'scan-vertical 3s infinite linear' 
            }}
          ></div>
        )}

        {/* AI Bounding Box */}
        {detectedItem && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-primary rounded-sm bg-primary/5 transition-all flex flex-col justify-end" style={{ boxShadow: '0 0 15px #4edea3' }}>
            <div className="absolute -top-6 left-0 bg-primary text-on-primary text-[10px] font-bold font-mono px-2 py-1 rounded-t-sm whitespace-nowrap">
              {detectedItem.type} • {detectedItem.confidence}%
            </div>
            {/* Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary -mt-1 -ml-1"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary -mt-1 -mr-1"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary -mb-1 -ml-1"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary -mb-1 -mr-1"></div>
          </div>
        )}

        {/* Camera Overlay Status */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-secondary text-[10px] font-mono bg-background/60 px-2 py-1 rounded backdrop-blur-md border border-outline-variant/30">
            <span className="material-symbols-outlined text-[12px]">verified_user</span> Model: EARN-Vision-v2.4
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant text-[10px] font-mono bg-background/60 px-2 py-1 rounded backdrop-blur-md border border-outline-variant/30">
            FPS: 30 | 1080p
          </div>
        </div>
      </div>

      {/* Hardware Diagnostics */}
      <div className="grid grid-cols-3 gap-2 mt-4 relative z-10">
        <div className="bg-surface-container border border-outline-variant/30 rounded-md p-2 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-secondary text-base mb-1">device_thermostat</span>
          <span className="text-[10px] text-on-surface-variant font-mono">CPU Temp</span>
          <span className="text-xs font-bold text-on-surface">42°C</span>
        </div>
        <div className="bg-surface-container border border-outline-variant/30 rounded-md p-2 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-primary text-base mb-1">memory</span>
          <span className="text-[10px] text-on-surface-variant font-mono">Inference</span>
          <span className="text-xs font-bold text-on-surface">12ms</span>
        </div>
        <div className="bg-surface-container border border-outline-variant/30 rounded-md p-2 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-orange-400 text-base mb-1">electric_bolt</span>
          <span className="text-[10px] text-on-surface-variant font-mono">Motor DC</span>
          <span className="text-xs font-bold text-on-surface">Standby</span>
        </div>
      </div>
    </div>
  );
}
