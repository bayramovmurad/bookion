"use client";

import React, { useEffect, useState } from "react";
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

      if (query.trim()) {
        params.set("query", query);
      } else {
        params.delete("query");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, pathname, router]);

  return (
    <div className="group flex h-14 w-full items-center rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] px-4 shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 focus-within:border-[#D6B47A]/35 focus-within:shadow-[0_10px_36px_rgba(0,0,0,0.24)] sm:max-w-md">
      <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-[#D6B47A]">
        <SearchIcon size={18} />
      </div>

      <input
        type="text"
        placeholder="Search by title, author, or mood"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-full w-full bg-transparent text-sm text-[#F5EFE6] outline-none placeholder:text-[#7F8A9D]"
      />

      <div className="hidden sm:flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#7F8A9D]">
        Search
      </div>
    </div>
  );
};

export default Search;
