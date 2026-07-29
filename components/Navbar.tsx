"use client";

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

const navItems = [
  { label: "Library", href: "/" },
  { label: "Add New", href: "/books/new" },
  { label: "Pricing", href: "/subscriptions" },
];

const Navbar = () => {
  const pathName = usePathname();
  const {user} = useUser();


  return (
    <header className="w-[90%] mx-auto z-50">
      <div className="wrapper py-4 flex mx-5 justify-between items-center">
        <Link href="/" className="flex gap-0.5 items-center">
          <Image src="/assets/logo.png" alt="Bookio" width={72} height={26} />
        </Link>

        <nav className="w-fit flex gap-7.5 items-center mx-5">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathName === href || (href !== "/" && pathName.startsWith(href));

            return (
              <Link
                href={href}
                key={label}
                className={cn(
                  "font-semibold",
                  isActive ? "nav-link-active" : "text-black hover:opacity-70",
                )}>
                {label}
              </Link>
            );
          })}

          <div className="flex gap-7.5 items-center">
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <div className="w-7 h-7 flex items-center gap-2">
                <UserButton />
                <div>{user?.firstName}</div>
              </div>
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
