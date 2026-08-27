import { getFehrestById } from "@/data/fehrestsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchFehrest = async (bookId: string) => {
  const fehrest = await fakeFetch(() => getFehrestById(bookId));
  if (!fehrest) {
    throw new Error(`Fehrest not found: ${bookId}`);
  }
  return fehrest;
};
