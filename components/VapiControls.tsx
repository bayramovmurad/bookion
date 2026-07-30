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
      if (isBillingError) {
        router.push("/subscriptions");
      } else {
        router.push("/");
      }
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
        return { label: "Connecting...", color: "bg-yellow-400 animate-pulse" };
      case "starting":
        return { label: "Starting...", color: "bg-blue-400 animate-pulse" };
      case "listening":
        return { label: "Listening", color: "bg-green-500 animate-pulse" };
      case "thinking":
        return { label: "Thinking...", color: "bg-purple-500 animate-pulse" };
      case "speaking":
        return { label: "Speaking", color: "bg-green-500" };
      default:
        return { label: "Ready", color: "bg-gray-400" };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 p-4">
      {/* Header Card */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-6 sm:p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
        {/* Cover & Mic Section */}
        <div className="relative shrink-0">
          <Image
            src={book.coverURL || "/images/book-placeholder.png"}
            alt={book.title}
            width={120}
            height={180}
            className="w-[120px] h-[180px] object-cover rounded-xl shadow-md bg-gray-100"
            priority
          />

          <div className="absolute -bottom-4 -right-4 z-10">
            {isActive && (status === "speaking" || status === "thinking") && (
              <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-60 scale-110" />
            )}
            <button
              onClick={isActive ? stop : start}
              disabled={status === "connecting"}
              className={`relative flex items-center justify-center w-[60px] h-[60px] rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95 ${
                isActive
                  ? "bg-red-500 hover:bg-red-600 shadow-red-500/30"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              }`}>
              {isActive ? (
                <Mic className="size-7 text-white" />
              ) : (
                <MicOff className="size-7 text-[#212a3b]" />
              )}
            </button>
          </div>
        </div>

        {/* Book Info & Status Section */}
        <div className="flex flex-col gap-4 flex-1 text-center sm:text-left mt-4 sm:mt-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#212a3b] mb-1 line-clamp-2">
              {book.title}
            </h1>
            <p className="text-gray-500 font-medium text-sm sm:text-base">
              by {book.author}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
            {/* Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full">
              <span
                className={`w-2.5 h-2.5 rounded-full ${statusDisplay.color}`}
              />
              <span className="text-sm font-medium text-[#212a3b]">
                {statusDisplay.label}
              </span>
            </div>

            {/* Voice Pill */}
            <div className="flex items-center px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full">
              <span className="text-sm font-medium text-[#212a3b]">
                Voice: {book.persona || "Daniel"}
              </span>
            </div>

            {/* Duration Pill */}
            <div className="flex items-center px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full">
              <span className="text-sm font-medium text-[#212a3b] tracking-wide">
                {formatDuration(duration)} /{" "}
                {formatDuration(maxDurationSeconds)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Section */}
      <div className="flex flex-col bg-white rounded-3xl p-2 sm:p-4 shadow-sm border border-gray-100 overflow-hidden min-h-[400px] h-[60vh] max-h-[600px]">
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
