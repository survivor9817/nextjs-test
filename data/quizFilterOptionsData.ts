import type { QuizFiltersType } from "../hooks/useQuizFilters";
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

const getFlatFehrestSectionsById = (bookId: number): FilterOption[] => {
  return createFehrestOption(getFehrestById(bookId));
};

const levelOptions = [
  { id: 1, value: "0", label: "همه سطح‌ها" },
  { id: 2, value: "1", label: "ساده" },
  { id: 3, value: "2", label: "متوسط" },
  { id: 4, value: "3", label: "سخت" },
];
const getLevelOptions = () => levelOptions;

const referenceOptions = [
  { id: 1, value: "0", label: "همه منابع" },
  { id: 2, value: "امتحان نهایی", label: "امتحان نهایی" },
  { id: 3, value: "شبه نهایی", label: "شبه نهایی" },
  { id: 4, value: "کنکور سراسری", label: "کنکور سراسری" },
  { id: 5, value: "تیزهوشان", label: "تیزهوشان" },
  { id: 6, value: "نمونه دولتی", label: "نمونه دولتی" },
  { id: 7, value: "تألیفی", label: "تألیفی" },
];
const getReferenceOptions = () => referenceOptions;

// masalan api gereftane filter option haa.
export const getOptionsFromDB = (id: string, quizFilters: QuizFiltersType) => {
  // baayad dependant dropdown list baashe. yani agar level ya source bood,
  // baa darnazar gereftane quiz filters gozine haa bargardande beshan.
  if (!quizFilters.BookId) return;
  if (id === "Where") return getFlatFehrestSectionsById(quizFilters.BookId);
  if (id === "Level") return getLevelOptions();
  if (id === "Source") return getReferenceOptions();
};
