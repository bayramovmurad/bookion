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
import {
  ACCEPTED_PDF_TYPES,
  ACCEPTED_IMAGE_TYPES,
  DEFAULT_VOICE,
} from "@/lib/constants";
import FileUploader from "./FileUploader";
import VoiceSelector from "./VoiceSelector";
import LoadingOverlay from "./LoadingOverlay";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { checkBookExists, createBook, saveBookSegments } from "@/lib/actions/book.actions";
import { parsePDFFile } from "@/lib/utils";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";

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
      return toast.error("Please login to upload bookd");
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

          const uploadedCoverBlob = await upload(
            `${fileTitle}_cover.png`,
            blob,
            {
              access: "public",
              handleUploadUrl: "/api/upload",
              contentType: "image/png",
            },
          );
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

         if (!book.success) throw new Error("Failed to create book");

         if (book.alreadyExists) {
           toast.info("Book with same title already exists.");
           form.reset();
           router.push(`/books/${existsCheck.book.slug}`);
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
      console.error(error)
    }finally{
      setIsSubmitting(false);
    }

    setIsSubmitting(true);
    console.log(data);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsSubmitting(false);
  };

  if (!isMounted) return null;

  return (
    <>
      {isSubmitting && <LoadingOverlay />}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 mb-16">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FileUploader
              control={form.control}
              name="pdfFile"
              label="Book PDF File"
              acceptTypes={ACCEPTED_PDF_TYPES}
              icon={Upload}
              placeholder="Click to upload PDF"
              hint="PDF file (max 50MB)"
              disabled={isSubmitting}
            />
            <FileUploader
              control={form.control}
              name="coverImage"
              label="Cover Image (Optional)"
              acceptTypes={ACCEPTED_IMAGE_TYPES}
              icon={ImageIcon}
              placeholder="Click to upload cover image"
              hint="Leave empty to auto-generate from PDF"
              disabled={isSubmitting}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 3. Title Input */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-[#212a3b]">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 text-base focus-visible:ring-2 focus-visible:ring-[#663820] transition-all"
                        placeholder="ex: Rich Dad Poor Dad"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-[#212a3b]">
                      Author Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 text-base focus-visible:ring-2 focus-visible:ring-[#663820] transition-all"
                        placeholder="ex: Robert Kiyosaki"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="persona"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-[#212a3b]">
                    Choose Assistant Voice
                  </FormLabel>
                  <FormControl>
                    <VoiceSelector
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold rounded-xl bg-[#CCE5F2] hover:bg-transparent border hover:border-[#CCE5F2] text-black transition-all duration-200 shadow-md hover:shadow-lg mt-8"
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
