import { getBookSelectOptions } from "@/data/booksData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchBookSelectOptions = () => {
  return fakeFetch(() => getBookSelectOptions());
};
