import type { SelectInstance } from "react-select";
import { useStudyPageLayoutContext } from "../components/StudyPageLayoutProvider";
import type { FilterOption } from "../data/quizFilterOptionsData";
import { useEffect, useRef } from "react";
import useTimeoutFn from "./useTimeoutFn";

export const useQuizFilterFocus = () => {
  const { activeTab } = useStudyPageLayoutContext();
  const filterSelectRef = useRef<SelectInstance<FilterOption, false>>(null);

  const { set: focusOnSelector } = useTimeoutFn(() => {
    filterSelectRef.current?.focus();
  }, 420);

  useEffect(() => {
    if (activeTab === 1) focusOnSelector();
  }, [activeTab]);
  return { filterSelectRef };
};
