import { QuizFiltersType } from "@/components/study-page/quiz/use-filters";
import { getFehrestById, type FehrestSection } from "./fehrestsData";

// FILTERS AND QUIZ
export type FilterOption = {
  value: string;
  label: string;
  // className?: string;
  isDisabled?: boolean;
};

const createFehrestOption = (fehrest: FehrestSection[]): FilterOption[] => {
  return fehrest.flatMap((s) => [
    { value: s.title, label: s.title },
    ...(s.sections ? createFehrestOption(s.sections) : []),
  ]);
};

const getFlatFehrestSectionsById = (bookId: string): FilterOption[] => {
  return createFehrestOption(getFehrestById(bookId));
};

const levelOptions = [
  { value: "0", label: "همه سطح‌ها" },
  { value: "1", label: "ساده" },
  { value: "2", label: "متوسط" },
  { value: "3", label: "سخت" },
];
const getLevelOptions = () => levelOptions;

const referenceOptions = [
  { value: "0", label: "همه منابع" },
  { value: "امتحان نهایی", label: "امتحان نهایی" },
  { value: "شبه نهایی", label: "شبه نهایی" },
  { value: "کنکور سراسری", label: "کنکور سراسری" },
  { value: "تیزهوشان", label: "تیزهوشان" },
  { value: "نمونه دولتی", label: "نمونه دولتی" },
  { value: "تألیفی", label: "تألیفی" },
];
const getReferenceOptions = () => referenceOptions;

export const getOptionsFromDB = (id: string, quizFilters: QuizFiltersType) => {
  if (!quizFilters.book?.value) return null;
  if (id === "where") return getFlatFehrestSectionsById(quizFilters.book.value);
  if (id === "level") return getLevelOptions();
  if (id === "source") return getReferenceOptions();
  return null;
};
