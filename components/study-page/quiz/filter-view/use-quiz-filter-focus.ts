// import { useEffect, useRef } from "react";
// import { useTimeoutFn } from "@/hooks/useTimeoutFn";
// import { useStudyTabs } from "../tabs-provider";

// export const useQuizFilterFocus = () => {
//   const { activeTab } = useStudyTabs();
//   const filterSelectRef = useRef<HTMLButtonElement>(null);

//   const { set: focusOnSelector } = useTimeoutFn(() => {
//     filterSelectRef.current?.focus();
//   }, 500);

//   useEffect(() => {
//     if (activeTab === "quiz") focusOnSelector();
//   }, [activeTab]);
//   return { filterSelectRef };
// };

// use-quiz-filter-focus.ts
import { useEffect, useRef } from "react";
import { useTimeoutFn } from "@/hooks/use-timeout-fn";
import { useStudyTabs } from "../../tabs-provider";

export const useQuizFilterFocus = () => {
  const { activeTab } = useStudyTabs();
  const filterSelectRef = useRef<HTMLButtonElement>(null);

  const { set: focusOnSelector } = useTimeoutFn(() => {
    const el = filterSelectRef.current;
    if (!el) return;

    el.focus();
    el.setAttribute("data-force-focus", "true");

    const clear = () => el.removeAttribute("data-force-focus");
    el.addEventListener("blur", clear, { once: true });
  }, 500);

  useEffect(() => {
    if (activeTab === "quiz") focusOnSelector();
  }, [activeTab]);

  return { filterSelectRef };
};
