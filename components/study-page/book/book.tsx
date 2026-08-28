import BookPage from "./book-page";
import BookPagination from "./book-pagination";

const Book = () => {
  return (
    <div>
      <div className="h-full overflow-auto">
        <BookPage />
      </div>

      <div className="flex justify-center items-center py-2 absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
        <BookPagination />
      </div>
    </div>
  );
};

export default Book;
