import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="mx-auto mt-4 max-w-[1400px]">
      <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[linear-gradient(135deg,#0D1424_0%,#111827_45%,#182033_100%)] px-6 py-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] md:px-10 md:py-12 lg:px-14 lg:py-14">
        <div className="absolute left-[-40px] top-[-60px] h-64 w-64 rounded-full bg-[#D6B47A]/10 blur-3xl" />
        <div className="absolute right-[-20px] top-10 h-72 w-72 rounded-full bg-[#7C8DB5]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.07),transparent_30%)]" />

        <div className="relative flex flex-col items-center justify-between gap-10 lg:flex-row">
          <div className="flex max-w-[580px] flex-col items-center text-center lg:items-start lg:text-left">
            <p className="mb-4 text-[11px] uppercase tracking-[0.30em] text-[#D6B47A]">
              A refined reading experience
            </p>

            <h1 className="text-4xl font-serif font-semibold leading-[1.02] text-[#F8F3EA] md:text-5xl lg:text-6xl">
              Where books become
              <br />
              intelligent conversations
            </h1>

            <p className="mt-5 max-w-[520px] text-[15px] leading-8 text-[#9BA6B8] md:text-lg">
              Build a private library with a calmer, richer interface designed
              for thoughtful reading, listening, and AI interaction.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/books/new"
                className="inline-flex items-center justify-center rounded-full bg-[#F5EFE6] px-6 py-3 text-sm font-semibold text-[#0A0F1C] transition hover:bg-[#fff8ee] md:text-base">
                Add new book
              </Link>

            </div>
          </div>


          <div className="w-full max-w-[300px] rounded-[30px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
            <div className="mb-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#D6B47A]">
                How it works
              </p>
            </div>

            <ul className="space-y-10">
              {[
                [
                  "01",
                  "Upload PDF",
                  "Bring your favorite book into the library",
                ],
                ["02", "AI Processing", "The content is analyzed and prepared"],
                ["03", "Voice Chat", "Discuss ideas naturally with AI"],
              ].map(([num, title, desc]) => (
                <li key={num} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D6B47A]/20 bg-[#D6B47A]/10 text-sm font-semibold text-[#E8D3A4]">
                    {num}
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-[#F8F3EA]">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#9BA6B8]">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
