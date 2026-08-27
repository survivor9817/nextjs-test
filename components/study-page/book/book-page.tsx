"use client";
import { toFaDigits } from "@/lib/toFaDigits";
import BookPageSkeleton from "./book-page-skeleton";
import UnavailableBookError from "./unavailable-book-error";
import { useBookContext } from "@/providers/book-provider";

const BookPage = () => {
  const { bookInfo, page } = useBookContext();

  // const { pageRef } = useBookPageScroll([currentBook, currentPage]);
  // const { pageContent, isLoading, error, loadPageContent } = useBookPageData();

  // if (!currentBook || !currentPage) return <UnavailableBookError />;
  // if (isLoading) return <BookPageSkeleton />;
  // if (error) {
  //   return (
  //     <div className="h-full grid place-items-center">
  //       <ErrorFallback onRefetch={loadPageContent} />
  //     </div>
  //   );
  // }

  const pageNum = toFaDigits(+page);
  return (
    <section
      // ref={pageRef}
      // key={currentPage}
      id={`page${page}`}
      className="page relative"
    >
      <div className="absolute top-0 left-0 bg-pink-400 m-1 p-2 rounded">{`${pageNum}`}</div>
      <div className="p-2 pt-8">
        <p>safhe {page}</p>
        <p>safhe {pageNum}</p>
      </div>
    </section>
  );
};

export default BookPage;
