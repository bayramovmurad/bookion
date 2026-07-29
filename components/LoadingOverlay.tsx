"use client";

import React from "react";
import { Loader2 } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-all">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-[#CCE5F2]/5 rounded-full mb-2">
            <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-[#CCE5F2] animate-spin" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#212a3b] text-center">
            Synthesizing Your Book
          </h2>
          <p className="text-[#777] text-sm md:text-base text-center max-w-xs leading-relaxed">
            Please wait while we process your PDF and prepare your interactive
            literary experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
