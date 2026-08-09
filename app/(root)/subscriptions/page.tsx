import { PricingTable } from "@clerk/nextjs";

export default function SubscriptionsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(214,180,122,0.08),transparent_18%),linear-gradient(180deg,#0A0F1C_0%,#0B1120_100%)] text-[#F5EFE6]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mb-14 flex flex-col items-center text-center">
          <p className="mb-3 text-[11px] uppercase tracking-[0.30em] text-[#D6B47A]">
            Premium access
          </p>

          <h1 className="max-w-3xl text-4xl font-serif font-semibold leading-[1.05] text-[#F8F3EA] md:text-5xl lg:text-6xl">
            Choose a plan for a richer reading experience
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#98A3B6] md:text-base">
            Unlock more uploads, longer sessions, and a more powerful AI reading
            workflow.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-6 md:p-8">
          <div className="absolute left-[-40px] top-[-40px] h-48 w-48 rounded-full bg-[#D6B47A]/10 blur-3xl" />
          <div className="absolute right-[-50px] bottom-[-50px] h-56 w-56 rounded-full bg-[#7C8DB5]/10 blur-3xl" />

          <div>
            <PricingTable
              appearance={{
                baseTheme: undefined,
                variables: {
                  colorPrimary: "#D6B47A",
                  colorBackground: "#101726",
                  colorText: "#F5EFE6",
                  colorTextSecondary: "#98A3B6",
                },
               elements:{
                badge:{
                  color:"white",
                }
               }
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
