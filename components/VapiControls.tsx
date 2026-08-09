"use client";

import { Mic, MicOff } from "lucide-react";
import useVapi from "@/hooks/useVapi";
import { IBook } from "@/types";
import Image from "next/image";
import Transcript from "@/components/Transcript";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VapiControls = ({ book }: { book: IBook }) => {
  const {
    status,
    isActive,
    messages,
    currentMessage,
    currentUserMessage,
    duration,
    start,
    stop,
    clearError,
    limitError,
    isBillingError,
    maxDurationSeconds,
  } = useVapi(book);

  const router = useRouter();

  useEffect(() => {
    if (limitError) {
      toast.error(limitError);
      router.push(isBillingError ? "/subscriptions" : "/");
      clearError();
    }
  }, [isBillingError, limitError, router, clearError]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "connecting":
        return { label: "Connecting...", dot: "bg-amber-400" };
      case "starting":
        return { label: "Starting...", dot: "bg-sky-400" };
      case "listening":
        return { label: "Listening", dot: "bg-emerald-400" };
      case "thinking":
        return { label: "Thinking...", dot: "bg-violet-400" };
      case "speaking":
        return { label: "Speaking", dot: "bg-emerald-400" };
      default:
        return { label: "Ready", dot: "bg-zinc-400" };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="flex max-w-7xl flex-col gap-6">
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-8">
        <div className="absolute left-[-40px] top-[-40px] h-48 w-48 rounded-full bg-[#D6B47A]/10 blur-3xl" />
        <div className="absolute right-[-60px] bottom-[-60px] h-60 w-60 rounded-full bg-[#7C8DB5]/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="relative mx-auto shrink-0 sm:mx-0">
            <Image
              src={book.coverURL || "/images/book-placeholder.png"}
              alt={book.title}
              width={140}
              height={210}
              className="h-[210px] w-[140px] rounded-[20px] object-cover shadow-[0_16px_40px_rgba(0,0,0,0.32)]"
              priority
            />

            <div className="absolute -bottom-4 -right-4">
              {isActive && (status === "speaking" || status === "thinking") && (
                <div className="absolute inset-0 scale-110 rounded-full bg-[#D6B47A]/30 animate-ping" />
              )}

              <button
                onClick={isActive ? stop : start}
                disabled={status === "connecting"}
                className={`relative flex h-[64px] w-[64px] items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isActive
                    ? "border-red-400/30 bg-red-500 text-white shadow-[0_10px_30px_rgba(239,68,68,0.35)]"
                    : "border-[#D6B47A]/20 bg-[linear-gradient(180deg,#F5EFE6_0%,#E9DCC7_100%)] text-[#0A0F1C] shadow-[0_10px_30px_rgba(0,0,0,0.20)]"
                }`}>
                {isActive ? (
                  <Mic className="size-7" />
                ) : (
                  <MicOff className="size-7" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 text-center sm:text-left">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#D6B47A]">
                AI Reading Session
              </p>
              <h1 className="line-clamp-2 text-3xl font-serif font-semibold text-[#F8F3EA] sm:text-4xl">
                {book.title}
              </h1>
              <p className="mt-2 text-sm font-medium text-[#95A0B2] sm:text-base">
                by {book.author}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${statusDisplay.dot}`}
                />
                <span className="text-sm font-medium text-[#E8EDF5]">
                  {statusDisplay.label}
                </span>
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm font-medium text-[#E8EDF5]">
                Voice: {book.persona || "Daniel"}
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm font-medium tracking-wide text-[#E8EDF5]">
                {formatDuration(duration)} /{" "}
                {formatDuration(maxDurationSeconds)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.22)] min-h-[400px] h-[60vh] max-h-[600px] sm:p-4">
        <Transcript
          messages={messages}
          currentMessage={currentMessage}
          currentUserMessage={currentUserMessage}
        />
      </div>
    </div>
  );
};

export default VapiControls;
