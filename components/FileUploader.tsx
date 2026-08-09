"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  control: any;
  name: string;
  label: string;
  acceptTypes: string[];
  icon?: React.ElementType;
  placeholder: string;
  hint?: string;
  disabled?: boolean;
}

const FileUploader = ({
  control,
  name,
  label,
  acceptTypes,
  icon: Icon = UploadCloud,
  placeholder,
  hint,
  disabled,
}: FileUploaderProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const file = field.value;

        return (
          <div className="space-y-3">
            <label className="text-sm font-medium tracking-[0.02em] text-[#EAE3D7]">
              {label}
            </label>

            <label
              className={cn(
                "group flex min-h-[160px] w-full cursor-pointer flex-col items-center justify-center rounded-[26px] border border-dashed px-6 py-8 text-center transition-all duration-300",
                file
                  ? "border-[#D6B47A]/35 bg-[linear-gradient(180deg,rgba(214,180,122,0.12),rgba(214,180,122,0.05))]"
                  : "border-white/12 bg-white/[0.035] hover:border-[#D6B47A]/25 hover:bg-white/[0.05]",
                disabled && "pointer-events-none opacity-50",
              )}>
              <input
                type="file"
                accept={acceptTypes.join(",")}
                className="hidden"
                disabled={disabled}
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />

              <div
                className={cn(
                  "mb-4 flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300",
                  file
                    ? "border-[#D6B47A]/30 bg-[#D6B47A]/12 text-[#E7D3A7]"
                    : "border-white/10 bg-white/[0.04] text-[#8B97AA] group-hover:text-[#D6B47A]",
                )}>
                <Icon size={22} />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#F8F3EA]">
                  {file ? file.name : placeholder}
                </p>

                {hint && (
                  <p className="text-xs leading-6 text-[#8C97AA]">{hint}</p>
                )}
              </div>
            </label>

            {fieldState.error && (
              <p className="text-sm text-red-400">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default FileUploader;
