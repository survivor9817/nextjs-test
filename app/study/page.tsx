// /app/study/page.tsx
import StudyTabs from "@/components/study-page/study-tabs";
import { BookProvider } from "@/components/study-page/book/book-provider";
import { Suspense } from "react";

const StudyPage = () => {
  return (
    <>
      {/* <BookProvider>
        <StudyTabs />
      </BookProvider> */}
      <Suspense fallback={null}>
        <BookProvider>
          <StudyTabs />
        </BookProvider>
      </Suspense>
    </>
  );
};

export default StudyPage;
