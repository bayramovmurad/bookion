"use client";

import { useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import { Messages } from "@/types";

interface TranscriptProps {
  messages: Messages[];
  currentMessage: string;
  currentUserMessage: string;
}

const Transcript = ({
  messages,
  currentMessage,
  currentUserMessage,
}: TranscriptProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentMessage, currentUserMessage]);

  const isEmpty =
    messages.length === 0 && !currentMessage && !currentUserMessage;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8 opacity-80">
        <Mic className="size-12 text-[#212a3b] mb-4 opacity-60" />
        <h2 className="text-xl font-bold text-[#212a3b]">
          No conversation yet
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Click the mic button above to start talking
        </p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex flex-col gap-4 overflow-y-auto pr-2 flex-1 w-full p-2 md:p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex w-full ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}>
          <div
            className={`relative max-w-[85%] md:max-w-[75%] px-5 py-3 text-sm md:text-base leading-relaxed rounded-2xl shadow-sm ${
              message.role === "user"
                ? "bg-[#212a3b] text-white rounded-br-sm" // İstifadəçi mesajı (Tünd)
                : "bg-gray-100 border border-gray-200 text-[#212a3b] rounded-bl-sm" // Assistant mesajı (Açıq)
            }`}>
            {message.content}
          </div>
        </div>
      ))}
      {currentUserMessage && (
        <div className="flex w-full justify-end">
          <div className="relative max-w-[85%] md:max-w-[75%] px-5 py-3 text-sm md:text-base leading-relaxed rounded-2xl shadow-sm bg-[#212a3b] text-white rounded-br-sm">
            {currentUserMessage}
            <span className="inline-block w-1 h-4 ml-1.5 bg-white animate-pulse align-middle" />
          </div>
        </div>
      )}
      {currentMessage && (
        <div className="flex w-full justify-start">
          <div className="relative max-w-[85%] md:max-w-[75%] px-5 py-3 text-sm md:text-base leading-relaxed rounded-2xl shadow-sm bg-gray-100 border border-gray-200 text-[#212a3b] rounded-bl-sm">
            {currentMessage}
            <span className="inline-block w-1 h-4 ml-1.5 bg-[#212a3b] animate-pulse align-middle" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Transcript;
