import { QuizFiltersType } from "@/components/study-page/quiz/use-filters";
import { getOptionsFromDB } from "@/data/quizFilterOptionsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchQuizFilterData = async (filterId: string, quizFilters: QuizFiltersType) => {
  const options = await fakeFetch(
    () => getOptionsFromDB(filterId, quizFilters),
    //  { delay: 2000 }
  );
  return options ?? [];
};
