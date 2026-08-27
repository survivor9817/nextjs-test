import { getBookById, getBookSelectOptions, isValidBookId } from "@/data/booksData";
import { fakeFetch } from "@/lib/fakeFetch";
import { getFehrestById } from "@/data/fehrestsData";
import StudyTabs from "@/components/study-page/study-tabs";
import { BookProvider } from "@/providers/book-provider";
import Fehrest from "@/components/study-page/fehrest/fehrest";
import Book from "@/components/study-page/book/book";

type Props = {
  params: Promise<{
    book: string;
    page: string;
  }>;
};

const StudyPage = async ({ params }: Props) => {
  const { book, page } = await params;

  const bookId = book ?? "706";

  const bookInfo = await fakeFetch(() => getBookById(bookId));
  const books = await fakeFetch(() => getBookSelectOptions(/** maybe purchased books by user id*/));
  const selectedBook = books.find((b) => b.value === bookId) ?? null;
  const currentFehrest = await fakeFetch(() => getFehrestById(isValidBookId(bookId) ? bookId : ""));
  // data:
  // selectedBook option.
  // selectedBookInfo.
  // table of contents.
  // page number.
  // page contents.

  // navigation:
  // changeBook.
  // changePage.

  return (
    <>
      <BookProvider value={{ books, selectedBook, page, bookInfo, currentFehrest }}>
        <StudyTabs />
      </BookProvider>
    </>
  );
};

export default StudyPage;
