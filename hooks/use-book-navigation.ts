// hooks/use-page-navigation.ts
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { toEnDigits } from "@/lib/toEnDigits";
import { useBookParams } from "./use-study-params";
export const isPageInRange = (page: number, min: number, max: number) => {
  return Number.isInteger(page) && page >= min && page <= max;
};

export const parseValidPage = (
  page: string | number,
  min: number,
  max: number = 2,
): number | null => {
  if (typeof page === "number") {
    return isPageInRange(page, min, max) ? page : null;
  }

  const num = Number(toEnDigits(page));
  return isPageInRange(num, min, max) ? num : null;
};

export function useBookNavigation(max: number) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const changeBook = (newBookId: string, page?: string) => {
  //   const p = page ? parseValidPage(page, 1, max) : 1;
  //   if (p != null) {
  //     const query = searchParams.toString();
  //     router.push(`/study/${newBookId}/${p ?? 1}${query ? `?${query}` : ""}`);
  //   }
  // };

  const changeBook = (newBookId: string, page?: string) => {
    const p = page ? parseValidPage(page, 1, max) : 1;

    if (p != null) {
      const validPage = p ?? 1;
      const query = searchParams.toString();
      const newPath = `/study/${newBookId}/${validPage}${query ? `?${query}` : ""}`;

      // ۱. آپدیت URL در نوار آدرس مرورگر بدون راه‌اندازی چرخه ناوبری Next.js
      window.history.pushState(null, "", newPath);

      // ۲. ارسال ایونت برای کامپوننت‌هایی که باید دیتای جدید را بگیرند (مثل E)
      window.dispatchEvent(
        new CustomEvent("book-change", {
          detail: { bookId: newBookId, page: validPage },
        }),
      );
    }
  };

  const { bookId, page } = useBookParams();
  // const changePage = (newPage: string | number) => {
  //   const p = parseValidPage(newPage, 1, max);
  //   if (p != null) {
  //     const query = searchParams.toString();
  //     router.push(`/study/${bookId}/${p ?? 1}${query ? `?${query}` : ""}`);
  //   }
  // };

  const changePage = (newPage: string | number) => {
    const p = parseValidPage(newPage, 1, max);

    if (p != null) {
      const validPage = p ?? 1;
      const query = searchParams.toString();
      const newPath = `/study/${bookId}/${validPage}${query ? `?${query}` : ""}`;

      // ۱. به‌روزرسانی URL بدون ایجاد Re-render در روت و قطع انیمیشن
      window.history.pushState(null, "", newPath);

      // ۲. ارسال رویداد صفحه برای کامپوننت مقصد (مثلاً E)
      window.dispatchEvent(
        new CustomEvent("page-change", {
          detail: { page: validPage },
        }),
      );
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
