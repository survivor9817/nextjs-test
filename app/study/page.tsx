// /app/study/page.tsx
import StudyTabs from "@/components/study-page/study-tabs";
import { BookProvider } from "@/components/study-page/book/book-provider";

const StudyPage = () => {
  return (
    <>
      <BookProvider>
        <StudyTabs />
      </BookProvider>
    </>
  );
};

export default StudyPage;
