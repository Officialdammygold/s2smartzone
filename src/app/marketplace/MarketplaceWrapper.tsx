"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export default function MarketplaceWrapper() {
  const MarketplaceClient = dynamic(
    () => import('./MarketplaceClient'),
    { 
      ssr: false,
      loading: () => (
        <div className="min-h-screen bg-[#0A1A2F] flex items-center justify-center">
          <div className="text-white text-xl">Loading marketplace...</div>
        </div>
      )
    }
  );

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A1A2F] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <MarketplaceClient />
    </Suspense>
  );
}