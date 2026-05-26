"use client";

import React from 'react';

export default function RvmDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide the global sidebar when viewing RVM detail */}
      <style>{`
        aside {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  );
}
