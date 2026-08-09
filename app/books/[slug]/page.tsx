import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getBookBySlug } from "@/lib/actions/book.actions";
import VapiControls from "@/components/VapiControls";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) {
    redirect("/");
  }

  const book = result.data;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(214,180,122,0.08),transparent_18%),linear-gradient(180deg,#0A0F1C_0%,#0B1120_100%)] text-[#F5EFE6]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-[#E7ECF3] transition hover:bg-white/[0.07]">
            <ArrowLeft className="size-4" />
            Back to library
          </Link>
        </div>

        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] shadow-[0_24px_70px_rgba(0,0,0,0.30)]">
          <div className="absolute left-[-40px] top-[-40px] h-48 w-48 rounded-full bg-[#D6B47A]/10 blur-3xl" />
          <div className="absolute right-[-60px] bottom-[-60px] h-60 w-60 rounded-full bg-[#7C8DB5]/10 blur-3xl" />

          <div className="relative px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
            <VapiControls book={book} />
          </div>
        </section>
      </div>
    </main>
  );
}
