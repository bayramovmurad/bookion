import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-16 mt-8">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 md:p-10 lg:p-12 shadow-sm border border-gray-200 relative overflow-hidden">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6">
          <div className=" text-center lg:text-left flex flex-col items-center lg:items-start max-w-l">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
              Your Library
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
              Convert your books into interactive AI conversations.{" "}
              <br className="hidden md:block" />
              Listen, learn, and discuss your favorite reads.
            </p>
            <Link
              href="/books/new"
              className="mt-6 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200 text-[#212a3b] rounded-full px-6 py-3 w-fit font-medium"
            >
              <span className="text-3xl font-light mb-1 mr-2 leading-none">+</span>
              <span>Add new book</span>
            </Link>
          </div>
          <div className="flex-1 flex justify-center items-center w-full max-w-[300px] md:max-w-[370px]">
            <Image
              src="/assets/heroo.png"
              alt="Books"
              width={400}
              height={400}
              className="object-contain w-full h-auto drop-shadow-lg"
            />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 min-w-[260px] max-w-[280px] z-10 w-full flex-shrink-0">
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full border border-gray-300 bg-gray-50 flex items-center justify-center font-medium text-lg text-gray-700">
                  1
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900">
                    Upload PDF
                  </h3>
                  <p className="text-sm text-gray-500">
                    Add your book file
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full border border-gray-300 bg-gray-50 flex items-center justify-center font-medium text-lg text-gray-700">
                  2
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900">
                    AI Processing
                  </h3>
                  <p className="text-sm text-gray-500">
                    We analyze the content
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full border border-gray-300 bg-gray-50 flex items-center justify-center font-medium text-lg text-gray-700">
                  3
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900">
                    Voice Chat
                  </h3>
                  <p className="text-sm text-gray-500">
                    Discuss with AI
                  </p>
                </div>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;