import StudyTabs from "@/components/study-page/study-tabs";
import { BookProvider } from "@/providers/book-provider";

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
