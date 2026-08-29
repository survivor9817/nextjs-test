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
        <Tabs.List
          className={cn(
            "relative z-10 -mb-px flex gap-1",
            "border-2 border-b-0 rounded-t-3xl bg-[#eee] border-[#bcbcbc] h-14 sm:rounded-b-3xl sm:border-b-2 sm:border-t-0 sm:rounded-t-none",
          )}
        >
          {TABS_CONFIG.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              className={cn(
                "flex h-14 w-full flex-col items-center justify-center px-2 sm:flex-row sm:gap-2",
                "text-sm font-normal text-muted-foreground outline-none select-none",
                "hover:text-foreground data-active:text-foreground",
                "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                // "border-2 border-b-0 rounded-t-3xl bg-[#eee] border-[#bcbcbc] h-14 sm:rounded-b-3xl sm:border-b-2 sm:border-t-0 sm:rounded-t-none",
              )}
            >
              <span className={cn("msr", tab.iconClass)}>{tab.icon}</span>
              <span className="text-sm sm:text-base">{tab.label}</span>
            </Tabs.Tab>
          ))}

          {/* both good. keep both for learning purposes */}
          {/* <Tabs.Indicator
            className={cn(
              "absolute top-2 z-[-1] h-[calc(100%-16px)] bg-background rounded-2xl shadow-sm",
              "transition-[left,width] duration-200 ease-out",
              // فرمول کلیدی: قرار دادن مرکز ایندیکیتور روی مرکز تب فعال
              // --active-tab-left: فاصله شروع تب از سمت چپ/راست
              // --active-tab-width: عرض تب
              // ما ایندیکیتور را دقیقاً در مرکز تب قرار می‌دهیم و سپس نیمی از عرض خود ایندیکیتور را عقب می‌کشیم
              "left-[calc(var(--active-tab-left)+var(--active-tab-width)/2)]",
              "w-[calc(var(--active-tab-width)-16px)]",
              "-translate-x-1/2",
            )}
          /> */}
          <Tabs.Indicator
            style={{
              // محاسبه مستقیم در JS برای اطمینان کامل
              left: `calc(var(--active-tab-left) + var(--active-tab-width) / 2)`,
              width: `calc(var(--active-tab-width) - 16px)`,
              transform: "translateX(-50%)",
            }}
            className={cn(
              "absolute top-1 sm:top-2 z-[-1] h-[calc(100%-8px)] sm:h-[calc(100%-16px)]",
              "bg-background rounded-lg sm:rounded-2xl shadow-sm",
              "transition-all duration-200 ease-out",
            )}
          />
        </Tabs.List>

        {/* Viewport */}
        <div className="relative min-h-0 flex-1 w-full overflow-hidden bg-background">
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
