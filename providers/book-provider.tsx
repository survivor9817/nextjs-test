"use client";
import { Book, BookOption } from "@/data/booksData";
import { FehrestSection } from "@/data/fehrestsData";
import { useBookNavigation } from "@/hooks/use-book-navigation";
import { createContext, useContext, type ReactNode } from "react";

type BookNavigation = ReturnType<typeof useBookNavigation>;

export type BookContextType = {
  books: BookOption[];
  selectedBook: BookOption | null;
  page: string;
  bookInfo: Book;
  currentFehrest: FehrestSection[] | null;
} & BookNavigation;

const BookContext = createContext<BookContextType | null>(null);

export const useBookContext = (): BookContextType => {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBookContext must be used within BookProvider");
  return ctx;
};

type BookProviderProps = {
  children: ReactNode;
  value: Omit<BookContextType, keyof BookNavigation>;
};

export const BookProvider = ({ children, value }: BookProviderProps) => {
  const { changeBook, changePage, goToNextPage, goToPrevPage, createTocUrl } = useBookNavigation(
    value.bookInfo.lastPage,
  );
  const contextValue = {
    ...value,
    changeBook,
    changePage,
    goToNextPage,
    goToPrevPage,
    createTocUrl,
  };

  return <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>;
};
