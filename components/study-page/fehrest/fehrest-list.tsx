"use client";
import FehrestItem from "./fehrest-item";
import { FehrestSection } from "@/data/fehrestsData";
import ErrorFallback from "@/components/error-fallback";
import { useBookContext } from "@/components/study-page/book/book-provider";
import { useStudyTabs } from "../tabs-provider";
import { fetchFehrest } from "@/services/client/fetchFehrest";
import { useQuery } from "@tanstack/react-query";
import FehrestListSkeleton from "./fehrest-list-skeleton";
import { useRef } from "react";

export const collectSectionPages = (fehrest: FehrestSection[]): number[] => {
  return fehrest.flatMap((s) => {
    const subsectionPages = s.sections ? collectSectionPages(s.sections) : [];
    return [s.page, ...subsectionPages];
  });
};

export const findSectionPage = (targetPage: number, sectionPages: number[]): number => {
  const smallerNumbers = sectionPages.filter((p) => p <= targetPage);
  const largestNumber = Math.max(...smallerNumbers);
  return largestNumber;
};

export const checkActive = (currentSectionPage: number, section: FehrestSection): boolean => {
  if (currentSectionPage === section.page) return true;
  return !!section.sections?.some((subsection) => {
    return checkActive(currentSectionPage, subsection);
  });
};

const FehrestList = () => {
  const { currentBookId, currentBookInfo, currentPage, goToPage } = useBookContext();
  const { changeTab } = useStudyTabs();

  const {
    data: currentFehrest,
    isLoading,
    error,
    refetch: loadFehrest,
  } = useQuery({
    queryKey: ["bookFehrest", currentBookInfo],
    queryFn: () => fetchFehrest(currentBookInfo?.id || currentBookId),
  });

  // this or use react-roving-tabindex
  // const listRef = useRef<HTMLOListElement>(null);
  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

  //   const buttons = Array.from(
  //     listRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [],
  //   );
  //   const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
  //   if (currentIndex === -1) return;

  //   e.preventDefault();

  //   const nextIndex =
  //     e.key === "ArrowDown"
  //       ? (currentIndex + 1) % buttons.length
  //       : (currentIndex - 1 + buttons.length) % buttons.length;

  //   buttons[nextIndex]?.focus();
  // };

  if (isLoading) return <FehrestListSkeleton />;

  if (error) {
    if (!currentBookInfo) return <p className="text-center">کتابی را انتخاب کنید.</p>;
    return <ErrorFallback onRefetch={loadFehrest} ErrorMsg="خطا در بارگذاری فهرست" />;
  }

  if (!currentFehrest) {
    if (!currentBookInfo) return <p className="text-center">کتابی را انتخاب کنید.</p>;
    return <ErrorFallback onRefetch={() => {}} ErrorMsg="خطا در بارگذاری فهرست" />;
  }

  if (!currentPage) return <p className="text-center">هنوز صفحه ای انتخاب نشده است.</p>;

  if (!currentFehrest) return <p className="text-center">فهرست موجود نیست.</p>;

  const titlePages = collectSectionPages(currentFehrest);
  const currentSectionPage = findSectionPage(+currentPage, titlePages);

  const handleSelect = (section: FehrestSection) => {
    goToPage(section.page);

    const hasSubSection = Boolean(section.sections?.length);
    const isActive = checkActive(currentSectionPage, section);
    if (!hasSubSection || isActive) changeTab("book");
  };

  return (
    <ol
      // ref={listRef}
      // onKeyDown={handleKeyDown}
      className="mt-4 w-full max-w-80 min-w-0 wrap-break-word overflow-hidden"
    >
      {currentFehrest &&
        currentFehrest.map((section) => {
          const isActive = checkActive(currentSectionPage, section);

          return (
            <FehrestItem
              key={section.page}
              section={section}
              currentSectionPage={currentSectionPage}
              onClick={handleSelect}
              isActive={isActive}
              checkActive={checkActive}
            />
          );
        })}
    </ol>
  );
};

export default FehrestList;
