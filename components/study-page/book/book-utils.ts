import { toEnDigits } from "@/lib/toEnDigits";

const isInRange = (value: number, min: number, max: number): boolean => {
  return Number.isInteger(value) && value >= min && value <= max;
};

const isPageInRange = (page: number, min: number, max: number) => {
  return isInRange(page, min, max);
};

export const parseValidPage = (page: string | number, min: number, max: number): number | null => {
  if (typeof page === "number") {
    return isPageInRange(page, min, max) ? page : null;
  }

  const num = Number(toEnDigits(page));
  return isPageInRange(num, min, max) ? num : null;
};
