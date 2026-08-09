"use client";

import React from "react";
import { voiceCategories, voiceOptions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { VoiceSelectorProps } from "@/types";
import { Mic2 } from "lucide-react";

const VoiceSelector = ({
  value,
  onChange,
  disabled,
  className,
}: VoiceSelectorProps) => {
  const renderVoiceCard = (voiceId: string) => {
    const voice = voiceOptions[voiceId as keyof typeof voiceOptions];
    const isSelected = value === voiceId;

    return (
      <Label
        key={voiceId}
        className={cn(
          "group relative flex cursor-pointer flex-col rounded-[22px] border p-4 transition-all duration-300",
          isSelected
            ? "border-[#D6B47A]/35 bg-[linear-gradient(180deg,rgba(214,180,122,0.14),rgba(214,180,122,0.06))] shadow-[0_14px_34px_rgba(0,0,0,0.18)]"
            : "border-white/10 bg-white/[0.035] hover:border-white/15 hover:bg-white/[0.05]",
          disabled && "pointer-events-none opacity-50 grayscale",
        )}>
        <RadioGroupItem value={voiceId} id={voiceId} className="sr-only" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                isSelected
                  ? "border-[#D6B47A]/30 bg-[#D6B47A]/12 text-[#E7D3A7]"
                  : "border-white/10 bg-white/[0.04] text-[#8B97AA]",
              )}>
              <Mic2 size={16} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-sm font-semibold transition-colors duration-300",
                    isSelected ? "text-[#F8F3EA]" : "text-[#E2E8F0]",
                  )}>
                  {voice.name}
                </span>
              </div>

              <p
                className={cn(
                  "mt-1 text-xs leading-6 transition-colors duration-300",
                  isSelected ? "text-[#D8CFC1]" : "text-[#8C97AA]",
                )}>
                {voice.description}
              </p>
            </div>
          </div>

          <div
            className={cn(
              "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
              isSelected
                ? "border-[#D6B47A] bg-[#D6B47A]"
                : "border-white/20 bg-transparent",
            )}>
            <div
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                isSelected ? "bg-[#0A0F1C]" : "bg-transparent",
              )}
            />
          </div>
        </div>
      </Label>
    );
  };

  return (
    <div className={cn("space-y-8", className)}>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#D6B47A]">
              Male Voices
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {voiceCategories.male.map((voiceId) => renderVoiceCard(voiceId))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#D6B47A]">
              Female Voices
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {voiceCategories.female.map((voiceId) => renderVoiceCard(voiceId))}
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default VoiceSelector;
