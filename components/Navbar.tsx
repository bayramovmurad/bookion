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
  { label: "Add New", href: "/books/new" },
  { label: "Pricing", href: "/subscriptions" },
];

const Navbar = () => {
  const pathName = usePathname();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center z-50">
              <Image
                src="/assets/logo.png"
                alt="Bookio"
                width={72}
                height={26}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 items-center">
              {navItems.map(({ label, href }) => {
                const isActive =
                  pathName === href ||
                  (href !== "/" && pathName.startsWith(href));

                return (
                  <Link
                    href={href}
                    key={label}
                    className={cn(
                      "font-semibold transition-all duration-200",
                      isActive
                        ? "text-[#212a3b] border-b-2 border-[#CCE5F2] pb-1"
                        : "text-gray-500 hover:text-[#212a3b] hover:opacity-70",
                    )}>
                    {label}
                  </Link>
                );
              })}

              {/* Desktop Auth */}
              <div className="flex items-center ml-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="font-semibold text-white bg-[#212a3b] px-4 py-2 rounded-xl hover:bg-[#1a2130] transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                    <UserButton />
                    <span className="font-medium text-sm text-[#212a3b] pr-1">
                      {user?.firstName}
                    </span>
                  </div>
                </SignedIn>
              </div>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <button
              className="md:hidden p-2 text-[#212a3b] z-50 transition-transform active:scale-95"
              onClick={toggleMenu}
              aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Smooth Animated Mobile Navigation Dropdown */}
        <div
          className={cn(
            "md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-b border-gray-100 rounded-b-2xl overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 border-transparent",
          )}>
          <div className="py-4 px-4 flex flex-col gap-2">
            {navItems.map(({ label, href }) => {
              const isActive =
                pathName === href ||
                (href !== "/" && pathName.startsWith(href));

              return (
                <Link
                  href={href}
                  key={label}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "font-semibold block px-4 py-3 rounded-xl transition-colors",
                    isActive
                      ? "bg-[#CCE5F2]/20 text-[#212a3b]"
                      : "text-gray-500 hover:bg-gray-50 hover:text-[#212a3b]",
                  )}>
                  {label}
                </Link>
              );
            })}

            {/* Mobile Auth */}
            <div className="flex items-center px-4 pt-4 pb-2 mt-2 border-t border-gray-100">
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full font-semibold text-white bg-[#212a3b] px-4 py-3 rounded-xl hover:bg-[#1a2130] transition-colors text-center">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-3 font-medium text-[#212a3b]">
                  <UserButton />
                  <span>{user?.firstName}</span>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;