"use client";

import { useCallback, type ComponentType } from "react";
import { useQueryState, parseAsStringLiteral } from "nuqs";
import Book from "./book/book";
import Quiz from "./quiz/quiz";
import Yavar from "./yavar/yavar";

export const TABS_CONFIG = [
  {
    value: "book",
    icon: "menu_book",
    iconClass: "text-[32px]",
    label: "کتاب",
    Component: Book,
  },
  {
    value: "quiz",
    icon: "exercise",
    iconClass: "text-[32px] rotate-45",
    label: "تمرین",
    Component: Quiz,
  },
  {
    value: "yavar",
    icon: "school",
    iconClass: "text-[32px]",
    label: "یاور",
    Component: Yavar,
  },
] as const satisfies readonly {
  value: string;
  icon: string;
  iconClass: string;
  label: string;
  Component: ComponentType;
}[];

export type TabValue = (typeof TABS_CONFIG)[number]["value"];

export const TAB_VALUES = TABS_CONFIG.map((t) => t.value) as unknown as readonly [
  TabValue,
  ...TabValue[],
];

export function isTabValue(value: unknown): value is TabValue {
  return typeof value === "string" && (TAB_VALUES as readonly string[]).includes(value);
}

const DEFAULT_TAB: TabValue = "book";

export const useStudyTabsState = () => {
  const [activeTab, setActiveTabRaw] = useQueryState(
    "tab",
    parseAsStringLiteral(TAB_VALUES)
      .withDefault(DEFAULT_TAB)
      .withOptions({ shallow: true, history: "replace" }),
  );

  const changeTab = useCallback(
    (value: TabValue) => {
      setActiveTabRaw(value);
    },
    [setActiveTabRaw],
  );

  const activeIndex = TABS_CONFIG.findIndex((t) => t.value === activeTab);

  return { activeTab, changeTab, activeIndex };
};
