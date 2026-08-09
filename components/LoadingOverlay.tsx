"use client";

import React from "react";
import { Loader2 } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050814]/72 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.42)] md:p-10">
        <div className="absolute left-[-30px] top-[-40px] h-40 w-40 rounded-full bg-[#D6B47A]/10 blur-3xl" />
        <div className="absolute right-[-40px] bottom-[-40px] h-44 w-44 rounded-full bg-[#7C8DB5]/10 blur-3xl" />

        <div className="relative flex flex-col items-center justify-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#D6B47A]/20 bg-[#D6B47A]/10">
            <Loader2 className="h-10 w-10 animate-spin text-[#E7D3A7]" />
          </div>

          <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#D6B47A]">
            Processing
          </p>

          <h2 className="text-2xl font-serif font-semibold text-[#F8F3EA] md:text-3xl">
            Synthesizing your book
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-7 text-[#95A0B2] md:text-base">
            Your PDF is being processed and prepared for a richer interactive
            reading experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
