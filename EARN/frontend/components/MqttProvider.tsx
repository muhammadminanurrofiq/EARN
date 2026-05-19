"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import mqtt from 'mqtt';

interface Transaction {
  id_transaksi: string;
  jumlah_botol: number;
  jumlah_poin: number;
  timestamp: string;
}

interface User {
  id_user: string;
  nama: string;
  total_poin: number;
}

interface Mesin {
  id_mesin: string;
  kapasitas_saat_ini: number;
}

interface MqttEvent {
  action: string;
  data: {
    transaksi: Transaction;
    user: User;
    mesin: Mesin;
  }
}

interface MqttContextType {
  isConnected: boolean;
  latestEvent: MqttEvent | null;
  globalKPI: { totalBotol: number; totalPoin: number };
}

const MqttContext = createContext<MqttContextType>({
  isConnected: false,
  latestEvent: null,
  globalKPI: { totalBotol: 0, totalPoin: 0 }
});

export const useMqtt = () => useContext(MqttContext);

export default function MqttProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [latestEvent, setLatestEvent] = useState<MqttEvent | null>(null);
  
  // KPI Global (Mock Initial State)
  const [globalKPI, setGlobalKPI] = useState({ totalBotol: 1250, totalPoin: 12500 });

  useEffect(() => {
    // Connect to WebSocket port 9001
    const brokerUrl = process.env.NEXT_PUBLIC_MQTT_WS_URL || 'ws://localhost:9001';
    const client = mqtt.connect(brokerUrl);

    client.on('connect', () => {
      console.log('✅ Connected to MQTT via WebSockets');
      setIsConnected(true);
      
      // Subscribe to live transactions
      client.subscribe('earn/app/live/transactions');
    });

    client.on('message', (topic, message) => {
      if (topic === 'earn/app/live/transactions') {
        try {
          const payload: MqttEvent = JSON.parse(message.toString());
          console.log('📥 New Live Event:', payload);
          setLatestEvent(payload);
          
          // Update KPI optimistically
          setGlobalKPI(prev => ({
            totalBotol: prev.totalBotol + payload.data.transaksi.jumlah_botol,
            totalPoin: prev.totalPoin + payload.data.transaksi.jumlah_poin
          }));
        } catch (error) {
          console.error('Error parsing MQTT message', error);
        }
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <MqttContext.Provider value={{ isConnected, latestEvent, globalKPI }}>
      {children}
    </MqttContext.Provider>
  );
}
