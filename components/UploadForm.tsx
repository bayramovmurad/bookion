"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, ImageIcon } from "lucide-react";
import { UploadSchema } from "@/lib/zod";
import { BookUploadFormValues } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import FileUploader from "./FileUploader";
import VoiceSelector from "./VoiceSelector";
import LoadingOverlay from "./LoadingOverlay";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  checkBookExists,
  createBook,
  saveBookSegments,
} from "@/lib/actions/book.actions";
import { useRouter } from "next/navigation";
import { parsePDFFile } from "@/lib/utils";
import { upload } from "@vercel/blob/client";

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: "",
      author: "",
      persona: "",
      pdfFile: undefined,
      coverImage: undefined,
    },
  });

  const onSubmit = async (data: BookUploadFormValues) => {
    if (!userId) {
      return toast.error("Please login to upload books");
    }

    setIsSubmitting(true);

    try {
      const existsCheck = await checkBookExists(data.title);

      if (existsCheck.exists && existsCheck.book) {
        toast.info("Book with same title already exists.");
        form.reset();
        router.push(`/books/${existsCheck.book.slug}`);
        return;
      }

      const fileTitle = data.title.replace(/\s+/g, "-").toLowerCase();
      const pdfFile = data.pdfFile;

      const parsedPDF = await parsePDFFile(pdfFile);

      if (parsedPDF.content.length === 0) {
        toast.error(
          "Failed to parse PDF. Please try again with a different file.",
        );
        return;
      }

      const uploadedPdfBlob = await upload(fileTitle, pdfFile, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: "application/pdf",
      });

      let coverUrl: string;

      if (data.coverImage) {
        const coverFile = data.coverImage;
        const uploadedCoverBlob = await upload(
          `${fileTitle}_cover.png`,
          coverFile,
          {
            access: "public",
            handleUploadUrl: "/api/upload",
            contentType: coverFile.type,
          },
        );
        coverUrl = uploadedCoverBlob.url;
      } else {
        const response = await fetch(parsedPDF.cover);
        const blob = await response.blob();

        const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, blob, {
          access: "public",
          handleUploadUrl: "/api/upload",
          contentType: "image/png",
        });
        coverUrl = uploadedCoverBlob.url;
      }

      const book = await createBook({
        clerkId: userId,
        title: data.title,
        author: data.author,
        persona: data.persona,
        fileURL: uploadedPdfBlob.url,
        fileBlobKey: uploadedPdfBlob.pathname,
        coverURL: coverUrl,
        fileSize: pdfFile.size,
      });

      if (!book.success) {
        toast.error((book.error as string) || "Failed to create book");
        if (book.isBillingError) {
          router.push("/subscriptions");
        }
        return;
      }

      if (book.alreadyExists) {
        toast.info("Book with same title already exists.");
        form.reset();
        router.push(`/books/${book.data?.slug}`);
        return;
      }

      const segments = await saveBookSegments(
        book.data._id,
        userId,
        parsedPDF.content,
      );

      if (!segments.success) {
        toast.error("Failed to save book segments");
        throw new Error("Failed to save book segments");
      }

      form.reset();
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload book. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {isSubmitting && <LoadingOverlay />}

      <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 md:p-10">
        <div className="absolute left-[-30px] top-[-40px] h-44 w-44 rounded-full bg-[#D6B47A]/10 blur-3xl" />
        <div className="absolute right-[-40px] bottom-[-50px] h-52 w-52 rounded-full bg-[#7C8DB5]/10 blur-3xl" />

        <div className="relative mb-8 grid gap-4 rounded-[28px] border border-white/8 bg-white/[0.025] p-5 md:grid-cols-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#D6B47A]">
              Step 1
            </p>
            <h3 className="mt-2 text-sm font-semibold text-[#F8F3EA]">
              Upload your file
            </h3>
            <p className="mt-1 text-sm leading-6 text-[#95A0B2]">
              Add the PDF and optional cover image.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#D6B47A]">
              Step 2
            </p>
            <h3 className="mt-2 text-sm font-semibold text-[#F8F3EA]">
              Describe the book
            </h3>
            <p className="mt-1 text-sm leading-6 text-[#95A0B2]">
              Add title, author, and voice persona.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#D6B47A]">
              Step 3
            </p>
            <h3 className="mt-2 text-sm font-semibold text-[#F8F3EA]">
              Start synthesis
            </h3>
            <p className="mt-1 text-sm leading-6 text-[#95A0B2]">
              The book is processed into an AI experience.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FileUploader
                control={form.control}
                name="pdfFile"
                label="Book PDF File"
                acceptTypes={ACCEPTED_PDF_TYPES}
                icon={Upload}
                placeholder="Upload the PDF"
                hint="PDF file, up to 50MB"
                disabled={isSubmitting}
              />

              <FileUploader
                control={form.control}
                name="coverImage"
                label="Cover Image"
                acceptTypes={ACCEPTED_IMAGE_TYPES}
                icon={ImageIcon}
                placeholder="Upload a custom cover"
                hint="Optional — otherwise a cover will be generated"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2 text-sm font-medium tracking-[0.02em] text-[#EAE3D7]">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-14 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-base text-[#F8F3EA] placeholder:text-[#7F8A9D] shadow-none transition focus-visible:ring-0 focus-visible:border-[#D6B47A]/35"
                        placeholder="Rich Dad Poor Dad"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2 text-sm font-medium tracking-[0.02em] text-[#EAE3D7]">
                      Author
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-14 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-base text-[#F8F3EA] placeholder:text-[#7F8A9D] shadow-none transition focus-visible:ring-0 focus-visible:border-[#D6B47A]/35"
                        placeholder="Robert Kiyosaki"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="persona"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-sm font-medium tracking-[0.02em] text-[#EAE3D7]">
                    Assistant Voice
                  </FormLabel>
                  <FormControl>
                    <VoiceSelector
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-400" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-14 w-full rounded-2xl border border-[#D6B47A]/20 bg-[linear-gradient(180deg,#F5EFE6_0%,#E9DCC7_100%)] text-base font-semibold text-[#0A0F1C] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition hover:scale-[1.01] hover:brightness-[1.02]"
              disabled={isSubmitting}>
              Begin Synthesis
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UploadForm;
