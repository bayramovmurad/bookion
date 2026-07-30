import Link from "next/link";
import { BookCardProps } from "@/types";
import Image from "next/image";

const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
  return (
    <Link href={`/books/${slug}`} className="block group">
      <article className="flex flex-col  md:w-60 w-75 lg:w-60 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 h-full cursor-pointer">
        <figure className="flex flex-col items-center h-full w-full m-0">
          <div className="relative w-full flex justify-center mb-4">
            <div className="overflow-hidden rounded-md shadow-sm group-hover:shadow-md transition-all duration-300">
              <Image
                src={coverURL}
                alt={title}
                width={150}
                height={200}
                className="object-cover md:w-[200px] w-[250] h-[200px] group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>
          <figcaption className="flex flex-col w-full text-left mt-auto">
            <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-1.5 font-medium line-clamp-1">
              {author}
            </p>
          </figcaption>
        </figure>
      </article>
    </Link>
  );
};

export default BookCard;
