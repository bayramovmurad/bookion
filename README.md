# 📚 Bookio - AI Voice Book Companion

> An AI-powered, full-stack book assistant built with Next.js and Vapi to provide interactive, voice-driven book experiences.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)

Bookio is a modern, full-stack web application that allows users to upload PDF books and interact with them using advanced Voice AI (powered by Vapi). It features secure authentication, subscription-based access, and a highly responsive, modern user interface.

## ✨ Key Features

*   🎙️ **Voice AI Interaction:** Have real-time, voice-driven conversations with your books using distinct AI personas.
*   📄 **Smart PDF Processing:** Upload PDFs, automatically parse book content, and auto-generate cover images.
*   🔐 **Authentication & Authorization:** Secure user login, registration, and session management powered by Clerk.
*   💳 **Subscription System:** Tiered access (Free/Pro plans) with limits on reading/listening duration, managed via Clerk Subscriptions.
*   ☁️ **Cloud Storage:** Fast and secure file uploads (PDFs and Images) using Vercel Blob.
*   🔍 **Optimized Search:** Debounced, fast search functionality to easily find books by title or author.
*   🎨 **Beautiful UI/UX:** Fully responsive, modern design built with Tailwind CSS and Shadcn UI components.

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Voice AI:** [Vapi](https://vapi.ai/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
*   **Authentication:** [Clerk](https://clerk.com/)
*   **Storage:** [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
*   **Forms & Validation:** React Hook Form + Zod
*   **Notifications:** Sonner (Toast)

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have Node.js (v18 or higher) installed.

### Installation

1. **Clone the repository:**
   
  git clone https://github.com/bayramovmurad/bookion.git
  cd bookion

## Bash

npm install
# or
yarn install
# or
pnpm install


## .env

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Vapi (Voice AI)
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# Database URL
DATABASE_URL=your_database_connection_string


├── app/                  # Next.js App Router (Pages & API routes)
├── components/           # Reusable UI components (Navbar, BookCard, VapiControls)
├── hooks/                # Custom React hooks (e.g., useVapi)
├── lib/                  # Utilities, Actions (Server Actions), Constants, and Zod schemas
├── public/               # Static assets (Images, Icons)
├── types/                # TypeScript interfaces and type definitions
└── tailwind.config.ts    # Tailwind CSS configuration

