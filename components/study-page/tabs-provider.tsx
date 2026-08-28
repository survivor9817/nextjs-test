"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useStudyTabsState } from "./use-study-tabs-state";

export type StudyTabsContextValue = ReturnType<typeof useStudyTabsState>;

export const useStudyTabs = (): StudyTabsContextValue => {
  const context = useContext(StudyTabsContext);
  if (!context) {
    throw new Error("useStudyTabs must be used within a StudyTabsProvider");
  }
  return context;
};

const StudyTabsContext = createContext<StudyTabsContextValue | null>(null);

export const StudyTabsProvider = ({ children }: { children: ReactNode }) => {
  const state = useStudyTabsState();

  return <StudyTabsContext.Provider value={state}>{children}</StudyTabsContext.Provider>;
};
