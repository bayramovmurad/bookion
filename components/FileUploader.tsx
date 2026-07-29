"use client";

import React, { useCallback, useRef } from "react";
import { useController, FieldValues } from "react-hook-form";
import { X } from "lucide-react";
import { FileUploadFieldProps } from "@/types";
import { cn } from "@/lib/utils";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const FileUploader = <T extends FieldValues>({
  control,
  name,
  label,
  acceptTypes,
  disabled,
  icon: Icon,
  placeholder,
  hint,
}: FileUploadFieldProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({ name, control });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onChange(file);
      }
    },
    [onChange],
  );

  const onRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [onChange],
  );

  const isUploaded = !!value;

  return (
    <FormItem className="w-full">
      {/* Label (Başlıq) */}
      <FormLabel className="text-base font-semibold text-[#212a3b] mb-2 block">
        {label}
      </FormLabel>

      <FormControl>
        <div
          className={cn(
            // Əsas yükləmə qutusu dizaynı
            "relative flex flex-col items-center justify-center w-full min-h-[160px] p-6 rounded-2xl border-2 border-dashed transition-all duration-200 group",

            // Fayl yüklənibsə və ya boşdursa rənglərin dəyişməsi
            isUploaded
              ? "border-[#CCE5F2]/40 bg-[#CCE5F2]/5"
              : "border-[#CCE5F2]/20 bg-gray-50/50 hover:bg-gray-50 hover:border-[#CCE5F2]/40",

            // Deaktiv (Disabled) vəziyyət
            disabled
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "cursor-pointer",
          )}
          onClick={() => !disabled && inputRef.current?.click()}>
          <input
            type="file"
            accept={acceptTypes.join(",")}
            className="hidden"
            ref={inputRef}
            onChange={handleFileChange}
            disabled={disabled}
          />

          {isUploaded ? (
            <div className="flex flex-col items-center justify-center w-full px-4 text-center">
              <div
                className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 w-full max-w-xs mx-auto flex items-center justify-between gap-3"
                onClick={(e) => e.stopPropagation()}>
                <p className="text-sm font-medium text-gray-700 truncate">
                  {(value as File).name}
                </p>
                <button
                  type="button"
                  onClick={onRemove}
                  className="shrink-0 p-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors focus:outline-none">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 mb-3 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-[#CCE5F2]" />
              </div>
              <p className="text-sm font-medium text-[#212a3b] mb-1">
                {placeholder}
              </p>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                {hint}
              </p>
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage className="text-red-500 text-sm mt-2" />
    </FormItem>
  );
};

export default FileUploader;
