"use client";
import { Book, BookOption } from "@/data/booksData";
import { FehrestSection } from "@/data/fehrestsData";
import { useBook } from "@/hooks/use-book";
import { createContext, useContext, type ReactNode } from "react";

type BookContextType = ReturnType<typeof useBook>;

const BookContext = createContext<BookContextType | null>(null);

export const useBookContext = (): BookContextType => {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBookContext must be used within BookProvider");
  return ctx;
};

type BookProviderProps = {
  children: ReactNode;
};

export const BookProvider = ({ children }: BookProviderProps) => {
  const value = useBook();

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
