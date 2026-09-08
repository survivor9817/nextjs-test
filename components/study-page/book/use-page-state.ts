import { parseAsInteger, useQueryState } from "nuqs";
import { parseValidPage } from "./book-utils";

export const usePageState = (lastPage: number, defaultPage: number = 1) => {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(defaultPage),
  );

  const goToPage = (page: string | number) => {
    const valid = parseValidPage(page, 1, lastPage);
    if (valid != null) setCurrentPage(valid);
    return valid != null;
  };

  const goToPrevPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  return {
    currentPage,
    setCurrentPage,
    goToPage,
    goToPrevPage,
    goToNextPage,
  };
};
