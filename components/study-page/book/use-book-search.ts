"use client";

import * as React from "react";
import { BookSearchResult } from "./book-search";

export type UseBookSearchOptions = {
  /** آدرس API جستجو */
  endpoint?: string;
  /** تاخیر debounce به میلی‌ثانیه */
  debounceMs?: number;
  /** حداقل تعداد کاراکتر برای شروع جستجو */
  minChars?: number;
};

export function useBookSearch({
  endpoint = "/api/search",
  debounceMs = 300,
  minChars = 2,
}: UseBookSearchOptions = {}) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<BookSearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const debouncedQuery = useDebounce(query, debounceMs);

  React.useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (trimmed.length < minChars) {
      setResults([]);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(`${endpoint}?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Search failed");
        const data: BookSearchResult[] = await res.json();
        setResults(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("خطا در جستجو. دوباره تلاش کنید.");
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [debouncedQuery, endpoint, minChars]);

  const reset = React.useCallback(() => {
    setQuery("");
    setResults([]);
    setError(null);
  }, []);

  return { query, setQuery, results, isLoading, error, reset };
}

/** هوک debounce ساده و بدون وابستگی */
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}
