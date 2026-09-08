import { useState, useRef, useEffect } from "react";
import { useTimeoutFn } from "../../../hooks/use-timeout-fn";
import { toFaDigits } from "@/lib/toFaDigits";
import { parseValidPage } from "./book-utils";

interface PageInputProps {
  currentPage: number;
  onPageConfirm: (page: number) => void;
  lastPage: number;
}

export const usePageInput = ({ currentPage, lastPage, onPageConfirm }: PageInputProps) => {
  const [pageInput, setPageInput] = useState<string>(toFaDigits(currentPage));
  const [pageInputError, setPageInputError] = useState(false);
  const onFocusPageNumber = useRef(currentPage);

  const { set: triggerErrorTimeout } = useTimeoutFn(() => {
    setPageInputError(false);
  }, 300);

  const showError = () => {
    setPageInputError(true);
    triggerErrorTimeout();
  };

  useEffect(() => {
    setPageInput(toFaDigits(currentPage));
  }, [currentPage]);

  const onSliderChange = (val: number | readonly number[]) => {
    const target = Array.isArray(val) ? val[0] : val;
    onPageConfirm(target);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();
    if (text === "") {
      setPageInput("");
      return;
    }
    const parsed = parseValidPage(text, 1, lastPage);
    if (parsed === null) {
      showError();
      return;
    }
    setPageInput(toFaDigits(parsed));
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const parsed = parseValidPage(pageInput, 1, lastPage);
    if (parsed === null) {
      showError();
      return;
    }
    onPageConfirm(parsed);
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocusPageNumber.current = currentPage;
    e.target.select();
  };

  const onBlur = () => {
    if (pageInput === "") {
      setPageInput(toFaDigits(onFocusPageNumber.current));
      return;
    }
    const parsed = parseValidPage(pageInput, 1, lastPage);
    if (parsed === null) {
      setPageInput(toFaDigits(currentPage));
      return;
    }
    onPageConfirm(parsed);
  };

  return {
    pageInput,
    pageInputError,
    handlers: {
      onInputChange,
      onInputKeyDown,
      onFocus,
      onBlur,
      onSliderChange,
    },
  };
};
