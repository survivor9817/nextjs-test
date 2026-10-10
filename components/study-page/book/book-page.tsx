"use client";
import BookPageSkeleton from "./book-page-skeleton";
import UnavailableBookError from "./unavailable-book-error";
import { useBookContext } from "@/components/study-page/book/book-provider";
import { useQuery } from "@tanstack/react-query";
import { fetchBookPage } from "@/services/client/fetchBookPage";
import ErrorFallback from "@/components/error-fallback";
import { useRef, useEffect } from "react";

const BookPage = () => {
  const { currentBookId, currentPage } = useBookContext();

  const {
    data: pageContent,
    isLoading,
    error,
    refetch: loadPageContent,
  } = useQuery({
    queryKey: ["page-content", currentBookId, currentPage],
    queryFn: () => fetchBookPage(currentBookId, currentPage),
    // staleTime: 60 * 1000,
    // gcTime: 10 * 60 * 1000,
  });

  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!isLoading && pageContent) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pageContent, isLoading, currentPage]);

  if (!currentBookId || !currentPage) return <UnavailableBookError />;

  if (isLoading) return <BookPageSkeleton />;

  if (error) {
    return (
      <div className="h-full grid place-items-center">
        <ErrorFallback onRefetch={loadPageContent} />
      </div>
    );
  }

  return (
    <section ref={sectionRef} key={currentPage} id={`page${currentPage}`} className="page relative">
      <div className="p-2 pt-8">
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
      </div>
    </section>
  );
};

export default BookPage;
