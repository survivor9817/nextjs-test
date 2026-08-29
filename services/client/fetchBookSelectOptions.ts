import { getBookSelectOptions } from "@/data/booksData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchBookSelectOptions = async () => {
  const option = await fakeFetch(() => getBookSelectOptions());
  if (!option) {
    throw new Error(`option not found: userfolan`);
  }
  return option;
};
