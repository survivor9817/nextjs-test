// hooks/use-page-navigation.ts
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { toEnDigits } from "@/lib/toEnDigits";
import { useBookParams } from "./use-study-params";

export function useBookNavigation(max: number) {
  const isPageInRange = (page: number, min: number, max: number) => {
    return Number.isInteger(page) && page >= min && page <= max;
  };

  const parseValidPage = (page: string | number, min: number, max: number = 2): number | null => {
    if (typeof page === "number") {
      return isPageInRange(page, min, max) ? page : null;
    }

    const num = Number(toEnDigits(page));
    return isPageInRange(num, min, max) ? num : null;
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const changeBook = (newBookId: string, page?: string) => {
    const p = page ? parseValidPage(page, 1, max) : 1;
    if (p != null) {
      const query = searchParams.toString();
      router.push(`/study/${newBookId}/${p ?? 1}${query ? `?${query}` : ""}`);
    }
  };

  const { bookId, page } = useBookParams();
  const changePage = (newPage: string | number) => {
    const p = parseValidPage(newPage, 1, max);
    if (p != null) {
      const query = searchParams.toString();
      router.push(`/study/${bookId}/${p ?? 1}${query ? `?${query}` : ""}`);
    }
  };

  const createTocUrl = (newPage: string | number) => {
    const p = newPage ? parseValidPage(newPage, 1, max) : 1;
    if (p != null) {
      const query = searchParams.toString();
      const url = `/study/${bookId}/${p ?? 1}${query ? `?${query}` : ""}`;
      return url;
    }
  };

  const num = Number(page) || 0;
  const goToNextPage = () => changePage(+num + 1);
  const goToPrevPage = () => changePage(+num - 1);

  return { changeBook, changePage, goToNextPage, goToPrevPage, createTocUrl };
}
