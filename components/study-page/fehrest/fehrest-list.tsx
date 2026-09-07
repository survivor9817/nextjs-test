"use client";
import FehrestItem from "./fehrest-item";
import ErrorFallback from "@/components/error-fallback";
import FehrestListSkeleton from "./fehrest-list-skeleton";
import { useFehrestList } from "./use-fehrest-list";
import { checkActive } from "./fehrest-utils";

const FehrestList = () => {
  const {
    currentFehrest,
    isLoading,
    error,
    refetch,
    hasSelectedBook,
    hasSelectedPage,
    currentSectionPage,
    handleSelect,
  } = useFehrestList();

  if (isLoading) return <FehrestListSkeleton />;

  if (error || !currentFehrest) {
    if (!hasSelectedBook) return <p className="text-center">کتابی را انتخاب کنید.</p>;
    return <ErrorFallback onRefetch={refetch} ErrorMsg="خطا در بارگذاری فهرست" />;
  }

  // if (!hasSelectedPage) return <p className="text-center">هنوز صفحه ای انتخاب نشده است.</p>;

  return (
    <ol className="mt-4 w-full max-w-80 min-w-0 wrap-break-word overflow-hidden">
      {currentFehrest.map((section) => (
        <FehrestItem
          key={section.page}
          section={section}
          isActive={currentSectionPage !== null && checkActive(currentSectionPage, section)}
          onClick={handleSelect}
          currentSectionPage={currentSectionPage}
        />
      ))}
    </ol>
  );
};

export default FehrestList;
