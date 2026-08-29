import { useEffect, useState } from "react";
import { useBookContext } from "../book/book-provider";

export type QuizFiltersKey = "bookId" | "where" | "level" | "source";

export type QuizFilterOption = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

export type QuizFiltersType = {
  book: QuizFilterOption | null;
  where: QuizFilterOption | null;
  level: QuizFilterOption | null;
  source: QuizFilterOption | null;
};

export const useFilters = () => {
  const { currentBookId, currentBookSelectOption } = useBookContext();

  const [quizFilters, setQuizFilters] = useState<QuizFiltersType>({
    book: currentBookSelectOption,
    where: null,
    level: null,
    source: null,
  });

  const clearFilters = () => {
    setQuizFilters({
      book: currentBookSelectOption,
      where: null,
      level: null,
      source: null,
    });
  };

  // وقتی کتاب انتخابی عوض بشه، فیلترها ریست می‌شن و bookId جدید ست می‌شه
  useEffect(() => {
    clearFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBookId, currentBookSelectOption]);

  const onChangeFilterSelect = (
    id: Exclude<QuizFiltersKey, "bookId">,
    selectedOption: QuizFilterOption | null,
  ) => {
    setQuizFilters((prev) => ({
      ...prev,
      [id]: selectedOption,
    }));
  };

  return {
    quizFilters,
    clearFilters,
    onChangeFilterSelect,
  };
};
