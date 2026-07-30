import { PricingTable } from "@clerk/nextjs";

export default function SubscriptionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#212a3b] mb-4">
          Choose Your Plan
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl">
          Upgrade to unlock more books, longer sessions, and advanced features.
        </p>
      </div>


      <div className="flex justify-center w-full max-w-5xl mx-auto">
        <PricingTable />
      </div>
    </div>
  );
}
