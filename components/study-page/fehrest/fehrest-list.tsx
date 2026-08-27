"use client";
import FehrestItem from "./fehrest-item";
import { FehrestSection } from "@/data/fehrestsData";
import ErrorFallback from "@/components/error-fallback";
import { useBookContext } from "@/providers/book-provider";
import { fetchFehrest } from "@/services/client/fetchFehrest";
import { useQuery } from "@tanstack/react-query";
import FehrestListSkeleton from "./fehrest-list-skeleton";

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

// type Props = {};

const FehrestList = () => {
  const { currentBookId, currentBookInfo, currentPage } = useBookContext();

  const {
    data: currentFehrest,
    isLoading,
    error,
    refetch: loadFehrest,
  } = useQuery({
    queryKey: ["bookFehrest", currentBookInfo],
    queryFn: () => fetchFehrest(currentBookInfo?.id || currentBookId),
  });

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

  return (
    <ol className="mt-4 w-full max-w-80 min-w-0 wrap-break-word overflow-hidden">
      {currentFehrest &&
        currentFehrest.map((section) => (
          <FehrestItem
            key={section.page}
            section={section}
            currentSectionPage={currentSectionPage}
          />
        ))}
    </ol>
  );
};

export default FehrestList;
