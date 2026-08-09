import UploadForm from "@/components/UploadForm";

const Page = () => {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(214,180,122,0.08),transparent_18%),linear-gradient(180deg,#0A0F1C_0%,#0B1120_100%)] text-[#F5EFE6]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <section className="mb-10 flex flex-col items-center text-center">
          <p className="mb-3 text-[11px] uppercase tracking-[0.30em] text-[#D6B47A]">
            Create your collection
          </p>

          <h1 className="max-w-3xl text-4xl font-serif font-semibold leading-[1.05] text-[#F8F3EA] md:text-5xl lg:text-6xl">
            Add a new book to your private AI library
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#98A3B6] md:text-base">
            Upload a PDF, choose a cover, and shape a richer reading experience
            with voice and AI conversation.
          </p>
        </section>

        <UploadForm />
      </div>
    </main>
  );
};

export default Page;
