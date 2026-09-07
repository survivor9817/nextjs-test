import { useBookContext } from "@/components/study-page/book/book-provider";
import { useStudyTabs } from "../tabs-provider";
import { FehrestSection } from "@/data/fehrestsData";
import { checkActive, getCurrentSectionPage } from "./fehrest-utils";
import { useFehrestData } from "./use-fehrest-data";

export const useFehrestList = () => {
  const { currentBookId, currentBookInfo, currentPage, goToPage } = useBookContext();
  const { changeTab } = useStudyTabs();

  const { data: currentFehrest, isLoading, error, refetch } = useFehrestData(currentBookId);

  const currentSectionPage =
    currentPage && currentFehrest ? getCurrentSectionPage(currentPage, currentFehrest) : null;

  const handleSelect = (section: FehrestSection) => {
    goToPage(section.page);
    const hasSubSection = Boolean(section.sections?.length);
    const isActive = currentSectionPage !== null && checkActive(currentSectionPage, section);
    if (!hasSubSection || isActive) changeTab("book");
  };

  return {
    currentFehrest,
    isLoading,
    error,
    refetch,
    hasSelectedBook: Boolean(currentBookInfo),
    hasSelectedPage: Boolean(currentPage),
    currentSectionPage,
    handleSelect,
  };
};
