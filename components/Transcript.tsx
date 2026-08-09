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
      <div className="flex min-h-[320px] h-full flex-col items-center justify-center rounded-[28px] border border-white/8 bg-white/[0.025] p-8 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#D6B47A]/20 bg-[#D6B47A]/10">
          <Mic className="size-7 text-[#E7D3A7]" />
        </div>

        <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-[#D6B47A]">
          Voice conversation
        </p>

        <h2 className="text-2xl font-serif font-semibold text-[#F8F3EA]">
          No conversation yet
        </h2>

        <p className="mt-3 max-w-sm text-sm leading-7 text-[#95A0B2]">
          Start speaking to begin an intelligent conversation with your book.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex w-full flex-1 flex-col gap-4 overflow-y-auto p-2 pr-2 md:p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex w-full ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}>
          <div
            className={`relative max-w-[88%] rounded-[22px] px-5 py-3.5 text-sm leading-7 shadow-[0_10px_30px_rgba(0,0,0,0.14)] md:max-w-[74%] md:text-base ${
              message.role === "user"
                ? "rounded-br-md border border-[#D6B47A]/15 bg-[linear-gradient(180deg,rgba(214,180,122,0.16),rgba(214,180,122,0.08))] text-[#F8F3EA]"
                : "rounded-bl-md border border-white/10 bg-white/[0.05] text-[#DCE3EF]"
            }`}>
            {message.content}
          </div>
        </div>
      ))}

      {currentUserMessage && (
        <div className="flex w-full justify-end">
          <div className="relative max-w-[88%] rounded-[22px] rounded-br-md border border-[#D6B47A]/15 bg-[linear-gradient(180deg,rgba(214,180,122,0.16),rgba(214,180,122,0.08))] px-5 py-3.5 text-sm leading-7 text-[#F8F3EA] shadow-[0_10px_30px_rgba(0,0,0,0.14)] md:max-w-[74%] md:text-base">
            {currentUserMessage}
            <span className="ml-1.5 inline-block h-4 w-1 animate-pulse rounded-full bg-[#F8F3EA] align-middle" />
          </div>
        </div>
      )}

      {currentMessage && (
        <div className="flex w-full justify-start">
          <div className="relative max-w-[88%] rounded-[22px] rounded-bl-md border border-white/10 bg-white/[0.05] px-5 py-3.5 text-sm leading-7 text-[#DCE3EF] shadow-[0_10px_30px_rgba(0,0,0,0.14)] md:max-w-[74%] md:text-base">
            {currentMessage}
            <span className="ml-1.5 inline-block h-4 w-1 animate-pulse rounded-full bg-[#D6B47A] align-middle" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Transcript;
