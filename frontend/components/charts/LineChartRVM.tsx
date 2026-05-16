"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', botol: 120 },
  { time: '04:00', botol: 300 },
  { time: '08:00', botol: 600 },
  { time: '10:00', botol: 1024 }, // Highlight point
  { time: '12:00', botol: 400 },
  { time: '16:00', botol: 700 },
  { time: '20:00', botol: 900 },
  { time: '24:00', botol: 1247 },
];

export default function LineChartRVM() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsla(215, 20%, 65%, 0.1)" vertical={false} />
        <XAxis 
          dataKey="time" 
          stroke="var(--text-tertiary)" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
          padding={{ left: 10, right: 10 }}
        />
        <YAxis 
          stroke="var(--text-tertiary)" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(value) => `${value >= 1000 ? (value/1000).toFixed(1) + 'K' : value}`}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', fontSize: '12px' }}
          itemStyle={{ color: 'var(--text-primary)' }}
          labelStyle={{ color: 'var(--text-secondary)' }}
          formatter={(value: any) => [`${value} botol`, 'Total']}
        />
        <Line 
          type="monotone" 
          dataKey="botol" 
          stroke="var(--accent-success)" 
          strokeWidth={3} 
          dot={{ r: 3, fill: "var(--surface-primary)", stroke: "var(--accent-success)", strokeWidth: 2 }} 
          activeDot={{ r: 5, fill: "var(--accent-success)", stroke: "#fff", strokeWidth: 2 }}
          filter="url(#glow)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
