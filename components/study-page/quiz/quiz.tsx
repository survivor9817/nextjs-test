import FilterView from "./filter-view";
import { QuizFilterOption, useFilters } from "./use-filters";

const Quiz = () => {
  const { quizFilters, clearFilters, onChangeFilterSelect } = useFilters();
  return (
    <>
      <FilterView
        quizFilters={quizFilters}
        onChangeFilterSelect={onChangeFilterSelect}
        startQuizLoading={false}
        startQuiz={() => {}}
      />
    </>
  );
};

export default Quiz;
