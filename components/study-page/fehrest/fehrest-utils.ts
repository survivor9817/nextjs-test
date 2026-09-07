import { FehrestSection } from "@/data/fehrestsData";

const collectSectionPages = (fehrest: FehrestSection[]): number[] => {
  return fehrest.flatMap((s) => {
    const subsectionPages = s.sections ? collectSectionPages(s.sections) : [];
    return [s.page, ...subsectionPages];
  });
};

const findSectionPage = (targetPage: number, sectionPages: number[]): number => {
  const smallerNumbers = sectionPages.filter((p) => p <= targetPage);
  if (smallerNumbers.length === 0) return sectionPages[0] ?? targetPage; // unnecessary or not?
  const largestNumber = Math.max(...smallerNumbers);
  return largestNumber;
};

export const getCurrentSectionPage = (currentPage: number, currentFehrest: FehrestSection[]) => {
  return findSectionPage(+currentPage, collectSectionPages(currentFehrest));
};

export const checkActive = (currentSectionPage: number, section: FehrestSection): boolean => {
  if (currentSectionPage === section.page) return true;
  return !!section.sections?.some((subsection) => {
    return checkActive(currentSectionPage, subsection);
  });
};
