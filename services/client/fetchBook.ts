import { getBookById } from "@/data/booksData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchBook = async (bookId: string) => {
  const book = await fakeFetch(() => getBookById(bookId));
  if (!book) {
    throw new Error(`Book not found: ${bookId}`);
  }
  return book;
};
