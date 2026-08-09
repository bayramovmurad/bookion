"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Library", href: "/" },
  { label: "Add Book", href: "/books/new" },
  { label: "Pricing", href: "/subscriptions" },
];

const Navbar = () => {
  const pathName = usePathname();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0A0F1C]/75 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/assets/logo.png"
                  alt="Bookio"
                  width={82}
                  height={28}
                  priority
                  className="h-auto w-auto object-contain"
                />
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
              {navItems.map(({ label, href }) => {
                const isActive =
                  pathName === href ||
                  (href !== "/" && pathName.startsWith(href));

                return (
                  <Link
                    key={label}
                    href={href}
                    className={cn(
                      "relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                      isActive
                        ? "bg-[#F5EFE6] text-[#0A0F1C] shadow-sm"
                        : "text-[#9BA6B8] hover:text-[#F5EFE6] hover:bg-white/[0.04]",
                    )}>
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="rounded-full border border-[#D6B47A]/25 bg-[linear-gradient(180deg,rgba(214,180,122,0.20),rgba(214,180,122,0.10))] px-5 py-2.5 text-sm font-semibold text-[#F5EFE6] transition hover:border-[#D6B47A]/40 hover:bg-[linear-gradient(180deg,rgba(214,180,122,0.28),rgba(214,180,122,0.14))]">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[#F5EFE6]">
                  <UserButton />
                  <span className="pr-1 text-sm font-medium text-[#D7DDEA]">
                    {user?.firstName}
                  </span>
                </div>
              </SignedIn>
            </div>

            <button
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#F5EFE6]"
              onClick={toggleMenu}
              aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen
              ? "max-h-[420px] opacity-100"
              : "max-h-0 opacity-0",
          )}>
          <div className="border-t border-white/5 bg-[#0E1525]/95 px-4 pb-5 pt-4 backdrop-blur-2xl">
            <div className="flex flex-col gap-2">
              {navItems.map(({ label, href }) => {
                const isActive =
                  pathName === href ||
                  (href !== "/" && pathName.startsWith(href));

                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-[#F5EFE6] text-[#0A0F1C]"
                        : "text-[#B7C0CF] hover:bg-white/[0.05] hover:text-white",
                    )}>
                    {label}
                  </Link>
                );
              })}

              <div className="mt-3 border-t border-white/5 pt-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full rounded-2xl border border-[#D6B47A]/25 bg-[linear-gradient(180deg,rgba(214,180,122,0.20),rgba(214,180,122,0.10))] px-4 py-3 text-sm font-semibold text-[#F5EFE6]">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <div className="flex items-center gap-3 text-[#F5EFE6]">
                    <UserButton />
                    <span className="text-sm font-medium">
                      {user?.firstName}
                    </span>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
