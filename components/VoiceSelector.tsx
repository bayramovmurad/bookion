"use client";

import React from "react";
import { voiceCategories, voiceOptions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { VoiceSelectorProps } from "@/types";

const VoiceSelector = ({
  value,
  onChange,
  disabled,
  className,
}: VoiceSelectorProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-[#777]">Male Voices</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {voiceCategories.male.map((voiceId) => {
              const voice = voiceOptions[voiceId as keyof typeof voiceOptions];
              const isSelected = value === voiceId;
              return (
                <Label
                  key={voiceId}
                  className={cn(
                    "relative flex flex-col cursor-pointer rounded-xl border p-4 transition-all duration-200 ease-in-out",
                    isSelected
                      ? "border-[#CCE5F2] bg-[#CCE5F2]/5 shadow-sm ring-1 ring-[#CCE5F2]"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50",
                    disabled &&
                      "opacity-50 cursor-not-allowed pointer-events-none grayscale",
                  )}>
                  <RadioGroupItem
                    value={voiceId}
                    id={voiceId}
                    className="sr-only"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-200",
                          isSelected ? "border-[#CCE5F2]" : "border-gray-300",
                        )}>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-[#CCE5F2]" />
                        )}
                      </div>
                      <span className="font-bold text-[#212a3b]">
                        {voice.name}
                      </span>
                    </div>
                    <p className="text-xs text-[#777] leading-relaxed pl-6.5">
                      {voice.description}
                    </p>
                  </div>
                </Label>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-[#777]">Female Voices</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {voiceCategories.female.map((voiceId) => {
              const voice = voiceOptions[voiceId as keyof typeof voiceOptions];
              const isSelected = value === voiceId;
              return (
                <Label
                  key={voiceId}
                  className={cn(
                    "relative flex flex-col cursor-pointer rounded-xl border p-4 transition-all duration-200 ease-in-out",
                    isSelected
                      ? "border-[#CCE5F2] bg-[#CCE5F2]/5 shadow-sm ring-1 ring-[#CCE5F2]"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50",
                    disabled &&
                      "opacity-50 cursor-not-allowed pointer-events-none grayscale",
                  )}>
                  <RadioGroupItem
                    value={voiceId}
                    id={voiceId}
                    className="sr-only"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-200",
                          isSelected ? "border-[#CCE5F2]" : "border-gray-300",
                        )}>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-[#CCE5F2]" />
                        )}
                      </div>
                      <span className="font-bold text-[#212a3b]">
                        {voice.name}
                      </span>
                    </div>
                    <p className="text-xs text-[#777] leading-relaxed pl-6.5">
                      {voice.description}
                    </p>
                  </div>
                </Label>
              );
            })}
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default VoiceSelector;
