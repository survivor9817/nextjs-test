import { getBookPage } from "@/data/fehrestsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchBookPage = async (bookId: string, pageNumber: number) => {
  const pageContent = await fakeFetch(() => getBookPage(bookId, pageNumber));
  if (!pageContent) {
    throw new Error(`pageContent not found: ${bookId}`);
  }
  return pageContent;
};
