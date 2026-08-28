"use client";

import { useCallback } from "react";
import { useQueryState, parseAsStringLiteral } from "nuqs";

export const TAB_VALUES = ["fehrest", "book", "quiz", "yavar", "menu"] as const;

export type TabValue = (typeof TAB_VALUES)[number];

export function isTabValue(value: unknown): value is TabValue {
  return typeof value === "string" && (TAB_VALUES as readonly string[]).includes(value);
}

const DEFAULT_TAB: TabValue = "book";

export const useStudyTabsState = () => {
  const [activeTab, setActiveTabRaw] = useQueryState(
    "tab",
    parseAsStringLiteral(TAB_VALUES).withDefault(DEFAULT_TAB).withOptions({ shallow: true }),
  );

  const changeTab = useCallback(
    (value: TabValue) => {
      setActiveTabRaw(value);
    },
    [setActiveTabRaw],
  );

  const activeIndex = TAB_VALUES.indexOf(activeTab);

  return {
    activeTab,
    changeTab,
    activeIndex,
  };
};
