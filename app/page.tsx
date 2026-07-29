import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { sampleBooks } from "@/lib/constants";

export default function page() {
  return (
    <div>
      <HeroSection />
      <div className="flex max-w-350 mx-auto flex-wrap justify-center gap-6">
        {sampleBooks.map((book) => (
          <BookCard
            key={book._id}
            title={book.title}
            author={book.author}
            coverURL={book.coverURL}
            slug={book.slug}
          />
        ))}
      </div>
    </div>
  );
}; 