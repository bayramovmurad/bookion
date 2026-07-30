import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { getAllBooks } from "@/lib/actions/book.actions";


export default async function page() {
  const bookResults = await getAllBooks()
   const books = bookResults.success ? bookResults.data ?? [] : []
  return (
    <div>
      <HeroSection />
      <div className="flex max-w-350 mx-auto flex-wrap justify-center gap-6">
        {books.map((book:any) => (
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