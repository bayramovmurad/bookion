"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (query) {
        params.set("query", query);
      } else {
        params.delete("query");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, pathname, router]);

  return (
    <div className="flex items-center w-full sm:max-w-sm md:max-w-md bg-gray-50/50 border border-gray-200 rounded-2xl shadow-sm transition-all focus-within:bg-white focus-within:border-[#212a3b] focus-within:ring-1 focus-within:ring-[#212a3b]">
      <div className="pl-4 flex items-center justify-center">
        <SearchIcon size={20} className="text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search books by title or author"
        className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent px-3 h-12 text-base text-[#212a3b] placeholder:text-gray-400"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
