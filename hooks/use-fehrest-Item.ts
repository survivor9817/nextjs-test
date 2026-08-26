import { useBookContext } from "@/app/providers/book-provider";
import type { FehrestSection } from "../data/fehrestsData";

// sudo code
// [1, 2, 6, 12, 13, 25, 35, 36, 48, 56, 65, 66, 77, 86, 98, 99, 107, 116, 124, 132]
// 27
// => 25

export const collectSectionPages = (fehrest: FehrestSection[]): number[] => {
  return fehrest.flatMap((s) => {
    const subsectionPages = s.sections ? collectSectionPages(s.sections) : [];
    return [s.page, ...subsectionPages];
  });
};

export const findSectionPage = (targetPage: number, sectionPages: number[]): number => {
  const smallerNumbers = sectionPages.filter((p) => p <= targetPage);
  const largestNumber = Math.max(...smallerNumbers);
  return largestNumber;
};

export const checkActive = (currentSectionPage: number, section: FehrestSection): boolean => {
  if (currentSectionPage === section.page) return true;
  return !!section.sections?.some((subsection) => {
    return checkActive(currentSectionPage, subsection);
  });
};

export const useFehrestItem = (
  currentSectionPage: number,
  section: FehrestSection,
  onClick: (page: string | number) => void,
) => {
  const handleClick = () => {
    onClick(section.page);
  };

  const isActive = checkActive(currentSectionPage, section);

  return { isActive, handleClick };
};
