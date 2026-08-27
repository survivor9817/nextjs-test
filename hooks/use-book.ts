import { useRef, useState } from "react";
import { useTimeoutFn } from "./useTimeoutFn";
import { toEnDigits } from "@/lib/toEnDigits";
import { toFaDigits } from "@/lib/toFaDigits";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "@/services/client/fetchBook";
// import { Book } from "@/data/booksData";
// import { useLocalStorage } from "./useLocalStorage";

export const useBook = (
  defaultBookId: string = "706",
  defaultPage: number = 1,
  lastPage: number = 2,
) => {
  const [currentBookId, setCurrentBookId] = useQueryState(
    "book",
    parseAsString.withDefault(defaultBookId),
  );

  const changeBook = (newBookId: string) => {
    setCurrentBookId(newBookId);
    setCurrentPage(1);
  };

  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(defaultPage),
  );

  const { data: currentBookInfo } = useQuery({
    queryKey: ["bookInfo", currentBookId],
    queryFn: () => fetchBook(currentBookId),
  });

  const [pageInput, setPageInput] = useState<string>(toFaDigits(currentPage));
  const [pageInputError, setPageInputError] = useState(false);

  const onFocusPageNumber = useRef(currentPage);

  const { set: autoHideError } = useTimeoutFn(() => {
    setPageInputError(false);
  }, 300);

  const showInputError = () => {
    setPageInputError(true);
    autoHideError();
  };

  const setPageInputValue = (page: number) => {
    setPageInput(toFaDigits(page));
  };

  const isPageInRange = (page: number, min: number, max: number) => {
    return Number.isInteger(page) && page >= min && page <= max;
  };

  const parseValidPage = (page: string | number): number | null => {
    const min = 1;
    const max = currentBookInfo?.lastPage || 2;
    if (typeof page === "number") {
      return isPageInRange(page, min, max) ? page : null;
    }

    const num = Number(toEnDigits(page));
    return isPageInRange(num, min, max) ? num : null;
  };

  const goToPage = (page: string | number) => {
    const p = parseValidPage(page);
    if (p != null) {
      setPageInputValue(p);
      setCurrentPage(p);
    }
  };

  const goToPrevPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = Number(e.target.value);
    goToPage(newPage);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();

    if (input === "") {
      setPageInput("");
      return;
    }

    const newPage = parseValidPage(input);
    if (newPage === null) {
      showInputError();
      return;
    }
    setPageInputValue(newPage);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const newPage = parseValidPage(pageInput);
    if (newPage === null) {
      showInputError();
      return;
    }

    setPageInputValue(newPage);
    setCurrentPage(newPage);
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocusPageNumber.current = currentPage;
    e.target.select();
  };

  const onBlur = () => {
    if (pageInput === "") {
      const pageBeforeFocus = onFocusPageNumber.current;
      setPageInputValue(pageBeforeFocus);
      setCurrentPage(pageBeforeFocus); // maybe extra
      return;
    }

    const newPage = parseValidPage(pageInput);
    if (newPage === null) {
      setPageInputValue(currentPage);
      return;
    }

    setPageInputValue(newPage);
    setCurrentPage(newPage);
  };

  return {
    currentBookId,
    setCurrentBookId,
    changeBook,
    currentBookInfo,

    currentPage,
    pageInput,
    pageInputError,

    goToPage,
    goToPrevPage,
    goToNextPage,

    onSliderChange,
    onInputChange,
    onFocus,
    onBlur,
    onInputKeyDown,
  };

  // #1
  // useEffect(() => {
  //   setPageInputValue(currentPage);
  // }, [currentPage]);

  // #2
  // const [prevPage, setPrevPage] = useState(currentPage);
  // if (currentPage !== prevPage) {
  //   setPrevPage(currentPage);
  //   setPageInput(toFaDigits(currentPage));
  // }

  //   return {
  //   book: {
  //     currentBook,
  //     setCurrentBook,
  //   },
  //   page: {
  //     current: currentPage,
  //     goToPage,
  //     goToPrevPage,
  //     goToNextPage,
  //   },
  //   pageInput: {
  //     value: pageInput,
  //     error: pageInputError,
  //     onSliderChange,
  //     onInputChange,
  //     onFocus,
  //     onBlur,
  //     onInputKeyDown,
  //   },
  // };
};
