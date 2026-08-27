import { getBookPage } from "../data/fehrestsData";

export const fetchBookPage = (bookId: string, pageNumber: number) => {
  return getBookPage(bookId, pageNumber);
};
