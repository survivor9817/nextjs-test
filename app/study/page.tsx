import { getBookById, getBookSelectOptions, isValidBookId } from "@/data/booksData";
import { fakeFetch } from "@/lib/fakeFetch";
import { getFehrestById } from "@/data/fehrestsData";
import StudyTabs from "@/components/study-page/study-tabs";
import { BookProvider } from "@/providers/book-provider";
import { fetchBook } from "@/services/client/fetchBook";
import { fetchBookSelectOptions } from "@/services/client/fetchBookSelectOptions";
import { fetchFehrestListById } from "@/services/client/fetchFehrestListById";

type Props = {
  params: Promise<{
    book: string;
    page: string;
  }>;
};

const StudyPage = async ({ params }: Props) => {
  return (
    <>
      <BookProvider>
        <StudyTabs />
      </BookProvider>
    </>
  );
};

export default StudyPage;
