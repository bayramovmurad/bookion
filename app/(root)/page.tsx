import React from "react";
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";
import Search from "@/components/Search";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const { query } = await searchParams;

  const bookResults = await getAllBooks(query);
  const books = bookResults.success ? (bookResults.data ?? []) : [];

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-[#F5EFE6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <HeroSection />

        <section className="mt-16">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-[#D6B47A]">
                Curated collection
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#F8F3EA]">
                Recent Books
              </h2>
            </div>

            <Search />
          </div>

          {books.length > 0 ? (
            <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {books.map((book: any) => (
                <BookCard
                  key={book._id}
                  title={book.title}
                  author={book.author}
                  coverURL={book.coverURL}
                  slug={book.slug}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[32px] border border-white/10 bg-white/[0.03] px-6 py-20 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
              <h3 className="mb-2 text-2xl font-semibold text-[#F8F3EA]">
                No books found
              </h3>
              <p className="mx-auto max-w-md text-sm text-[#95A0B2] sm:text-base">
                {query
                  ? `We couldn't find any books matching "${query}".`
                  : "There are no books in the library yet."}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Page;
