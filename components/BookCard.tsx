import Link from "next/link";
import { BookCardProps } from "@/types";
import Image from "next/image";

const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
  return (
    <Link href={`/books/${slug}`} className="group block w-full max-w-[240px]">
      <article className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D6B47A]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
        <figure className="m-0">
          <div className="relative mb-4 overflow-hidden rounded-[18px] bg-[#121A2B]">
            <Image
              src={coverURL}
              alt={title}
              width={240}
              height={320}
              className="h-[285px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 to-transparent opacity-80" />
          </div>

          <figcaption>
            <h3 className="line-clamp-2 text-[17px] font-semibold leading-6 text-[#F8F3EA] transition-colors duration-200 group-hover:text-[#E7D3A7]">
              {title}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm text-[#94A0B3]">{author}</p>
          </figcaption>
        </figure>
      </article>
    </Link>
  );
};

export default BookCard;
