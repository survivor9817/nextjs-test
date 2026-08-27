"use client";

import { useState, useCallback } from "react";
import { Tabs } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

// محتوای تب‌ها را مستقیم اینجا import کن
import Fehrest from "./fehrest/fehrest";
import Book from "./book/book";
// import Quiz from "./quiz/quiz";
// import Yavar from "./yavar/yavar";
// import Menu from "./menu/menu";

const TABS = [
  {
    value: "fehrest",
    icon: "list",
    iconClass: "text-[34px] scale-x-[-1]",
    label: "فهرست",
    content: <Fehrest />,
  },
  {
    value: "book",
    icon: "menu_book",
    iconClass: "text-[32px]",
    label: "کتاب",
    content: <Book />,
  },
  {
    value: "quiz",
    icon: "exercise",
    iconClass: "text-[32px] rotate-45",
    label: "تمرین",
    content: "<Quiz />",
  },
  {
    value: "yavar",
    icon: "school",
    iconClass: "text-[32px]",
    label: "یاور",
    content: "<Yavar />",
  },
  {
    value: "menu",
    icon: "menu",
    iconClass: "text-[28px]",
    label: "منو",
    content: "<Menu />",
  },
] as const;

type TabValue = (typeof TABS)[number]["value"];
const DEFAULT_TAB: TabValue = "book";

const StudyTabs = () => {
  const [value, setValue] = useState<TabValue>(DEFAULT_TAB);

  const activeIndex = TABS.findIndex((tab) => tab.value === value);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue as TabValue);
  }, []);

  return (
    <div className="w-full max-w-210 min-w-80 h-vh h-dvh mx-auto overflow-hidden flex">
      <Tabs.Root
        className="min-h-0 flex-1 flex flex-col-reverse sm:flex-col"
        value={value}
        onValueChange={handleChange}
      >
        {/* Tab List */}
        <Tabs.List className="relative z-10 -mb-px flex gap-1">
          {TABS.map((tab) => (
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
            {TABS.map((tab) => (
              <Tabs.Panel
                key={tab.value}
                value={tab.value}
                keepMounted
                hidden={false}
                className={cn(
                  "flex h-full w-full min-w-full shrink-0 overflow-x-hidden overflow-y-auto",
                  "text-sm text-foreground outline-none",
                  "focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-1",
                )}
                render={<ScrollArea className="h-full" />}
              >
                {tab.content}
              </Tabs.Panel>
            ))}
          </div>
        </div>
      </Tabs.Root>
    </div>
  );
};

export default StudyTabs;
