import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const roboto = Roboto({
  weight: ['400', '500', '600', '700'],
  variable: "--font-roboto",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Bookio",
  description: "Turn your books into interactive AI companions. Upload PDFs and talk to your books using your voice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.variable} antialiased bg-[#CCE5F2]`}>
          <Navbar />
          {children}
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
