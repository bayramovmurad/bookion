import UploadForm from "@/components/UploadForm";

const Page = () => {
  return (
    <main className="wrapper container mx-auto">
      <section className="flex flex-col gap-5 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-black tracking-[-0.02em] leading-13.5 font-serif;">
          Add a New Book
        </h1>
        <p className="text-primary leading-7">
          Upload a PDF to generate your interactive reading experience
        </p>
      </section>

      <UploadForm />
    </main>
  );
};

export default Page;