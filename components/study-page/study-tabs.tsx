"use client";

import { ComponentType } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs } from "@base-ui/react/tabs";

import Fehrest from "./fehrest/fehrest";
import Book from "./book/book";
import Quiz from "./quiz/quiz";
import Yavar from "./yavar/yavar";
import Menu from "./menu/menu";
import { useStudyTabs, StudyTabsProvider } from "./tabs-provider";
import { TabValue, isTabValue } from "./use-study-tabs-state";

interface TabConfigItem {
  value: TabValue;
  icon: string;
  iconClass: string;
  label: string;
  Component: ComponentType;
}

const TABS_CONFIG: TabConfigItem[] = [
  {
    value: "fehrest",
    icon: "list",
    iconClass: "text-[34px] scale-x-[-1]",
    label: "فهرست",
    Component: Fehrest,
  },
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
  {
    value: "menu",
    icon: "menu",
    iconClass: "text-[28px]",
    label: "منو",
    Component: Menu,
  },
];

const StudyTabsView = () => {
  const { activeTab, changeTab, activeIndex } = useStudyTabs();

  return (
    <div className="w-full max-w-210 min-w-80 h-dvh mx-auto overflow-hidden flex">
      <Tabs.Root
        className="min-h-0 flex-1 flex flex-col-reverse sm:flex-col min-w-0"
        value={activeTab}
        onValueChange={(val) => {
          if (isTabValue(val)) {
            changeTab(val);
          }
        }}
      >
        {/* Tab List */}
        <Tabs.List className="relative z-10 -mb-px flex gap-1">
          {TABS_CONFIG.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              className={cn(
                "flex h-14 w-full flex-col items-center justify-center gap-0.5 px-2 sm:flex-row sm:gap-2",
                "text-sm font-normal text-muted-foreground outline-none select-none",
                "hover:text-foreground data-active:text-foreground",
                "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              )}
            >
              <span className={cn("msr", tab.iconClass)}>{tab.icon}</span>
              <span className="text-sm sm:text-base">{tab.label}</span>
            </Tabs.Tab>
          ))}

          <Tabs.Indicator
            className={cn(
              "absolute top-0 left-0 z-[-1] h-full bg-background",
              "border-t border-x border-border",
              "transition-[translate,width] duration-150 ease-in-out",
              "translate-x-(--active-tab-left) w-(--active-tab-width)",
            )}
          />
        </Tabs.List>

        {/* Viewport */}
        <div className="relative min-h-0 flex-1 w-full overflow-hidden border border-border bg-background">
          <div
            className="flex h-full transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          >
            {TABS_CONFIG.map(({ value, Component }) => (
              <Tabs.Panel
                key={value}
                value={value}
                keepMounted
                hidden={false}
                className={cn(
                  "flex h-full w-full min-w-full shrink-0 overflow-x-hidden overflow-y-auto",
                  "text-sm text-foreground outline-none",
                )}
                render={<ScrollArea className="h-full min-w-0" />}
              >
                <Component />
              </Tabs.Panel>
            ))}
          </div>
        </div>
      </Tabs.Root>
    </div>
  );
};

export default function StudyTabs() {
  return (
    <StudyTabsProvider>
      <StudyTabsView />
    </StudyTabsProvider>
  );
}
