import { getFehrestById } from "@/data/fehrestsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchFehrestListById = (bookId: string) => {
  return fakeFetch(() => getFehrestById(bookId));
};
