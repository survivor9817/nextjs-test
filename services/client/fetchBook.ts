import { getBookById } from "@/data/booksData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchBook = (bookId: string) => {
  return fakeFetch(() => getBookById(bookId));
};
