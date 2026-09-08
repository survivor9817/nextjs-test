import { useBookState } from "./use-book-state";
import { usePageInput } from "./use-page-input";
import { usePageState } from "./use-page-state";

export const useBook = (defaultBookId = "706", defaultPage = 1) => {
  const {
    currentBookId,
    setCurrentBookId,
    currentBookInfo,
    currentBookSelectOption,
    currentBookLastPage,
    isBookInfoLoading,
  } = useBookState(defaultBookId);

  const { currentPage, setCurrentPage, goToPage, goToPrevPage, goToNextPage } = usePageState(
    currentBookLastPage,
    defaultPage,
  );

  const {
    pageInput,
    pageInputError,
    handlers: { onInputChange, onInputKeyDown, onFocus, onBlur, onSliderChange },
  } = usePageInput({
    currentPage,
    lastPage: currentBookLastPage,
    onPageConfirm: goToPage,
  });

  const changeBook = (newBookId: string) => {
    setCurrentBookId(newBookId);
    setCurrentPage(1); // or last page read of new book.
  };

  return {
    // Book
    currentBookId,
    setCurrentBookId,
    changeBook,
    currentBookInfo,
    currentBookLastPage,
    currentBookSelectOption,
    isBookInfoLoading,

    // Page
    currentPage,
    setCurrentPage,
    goToPage,
    goToPrevPage,
    goToNextPage,

    // Page Input & Slider
    pageInput,
    pageInputError,
    onInputChange,
    onInputKeyDown,
    onFocus,
    onBlur,
    onSliderChange,
  };
};
