"use client";
import { toFaDigits } from "@/lib/toFaDigits";
import BookPageSkeleton from "./book-page-skeleton";
import UnavailableBookError from "./unavailable-book-error";
import { useBookContext } from "@/components/study-page/book/book-provider";
import { useQuery } from "@tanstack/react-query";
import { fetchBookPage } from "@/services/client/fetchBookPage";
import ErrorFallback from "@/components/error-fallback";
import { Slider } from "@/components/ui/slider";

const BookPage = () => {
  const { currentBookId, currentPage } = useBookContext();

  // const { pageRef } = useBookPageScroll([currentBook, currentPage]);
  const {
    data: pageContent,
    isLoading,
    error,
    refetch: loadPageContent,
  } = useQuery({
    queryKey: ["pageContent", currentBookId, currentPage],
    queryFn: () => fetchBookPage(currentBookId, currentPage),

    // Data stays fresh for 1 minute. No new API calls within this window.
    // staleTime: 60 * 1000,

    // If the user leaves this page, keep the data in memory for 10 minutes
    // before destroying it.
    // gcTime: 10 * 60 * 1000,
  });

  if (!currentBookId || !currentPage) return <UnavailableBookError />;
  if (isLoading) return <BookPageSkeleton />;
  if (error) {
    return (
      <div className="h-full grid place-items-center">
        <ErrorFallback onRefetch={loadPageContent} />
      </div>
    );
  }

  const pageNum = toFaDigits(+currentPage);
  return (
    <section
      // ref={pageRef}
      // key={currentPage}
      id={`page${currentPage}`}
      className="page relative"
    >
      <div className="absolute top-0 left-0 bg-pink-400 m-1 p-2 rounded">{`${pageNum}`}</div>
      <div className="p-2 pt-8">
        {/* <div className={"w-80"}>
          <Slider min={1} max={100} />
        </div> */}
        <p>safhe {currentPage}</p>
        <p>safhe {pageNum}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
        <p>{pageContent}</p>
      </div>
    </section>
  );
};

export default BookPage;
