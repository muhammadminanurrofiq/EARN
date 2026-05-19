"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Exact data matching the image
const data = [
  { name: 'RVM-01 (Fakultas Teknik)', value: 620, color: '#4edea3' }, // Emerald (Accent Primary)
  { name: 'RVM-02 (Kantin Center)', value: 360, color: '#95d3ba' }, // Forest Green (Accent Secondary)
  { name: 'RVM-03 (Perpustakaan)', value: 200, color: '#a8cfbc' }, // Soft Mint (Accent Tertiary)
  { name: 'RVM-04 (Fakultas Ekonomi)', value: 120, color: '#c4e5d4' }, // Light Mint
  { name: 'RVM-05 (Student Center)', value: 0, color: '#dde4df' }, // Surface Text
];

export default function DonutChartRVM() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex items-center h-full w-full">
      <div className="w-1/2 h-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="85%"
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: 'var(--text-primary)' }}
              formatter={(value: any) => [`${value} botol`, 'Jumlah']}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[10px] text-[color:var(--text-secondary)]">Total</p>
          <p className="text-xl font-bold text-[color:var(--text-primary)]">1.247</p>
          <p className="text-[10px] text-[color:var(--text-secondary)]">botol</p>
        </div>
      </div>
      
      {/* Legend List */}
      <div className="w-1/2 flex flex-col justify-center gap-2 pl-2">
        <div className="flex text-[10px] text-[color:var(--text-tertiary)] font-medium mb-1 border-b border-[color:var(--border-subtle)] pb-1">
          <span className="flex-1">Mesin</span>
          <span className="w-10 text-right">Botol</span>
          <span className="w-12 text-right">Persentase</span>
        </div>
        {data.map((item, index) => {
          const percentage = [49.7, 28.9, 16.1, 9.6, 0.0][index];
          return (
            <div key={index} className="flex items-center text-[10px]">
              <div className="flex-1 flex items-center gap-1.5 truncate pr-1">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-[color:var(--text-secondary)] truncate">{item.name}</span>
              </div>
              <span className="w-10 text-right font-medium text-[color:var(--text-primary)]">
                {item.value > 0 ? item.value : '-'}
              </span>
              <span className="w-12 text-right text-[color:var(--text-tertiary)]">
                {percentage.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
