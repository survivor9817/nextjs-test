import FilterSelect from "./filter-select";
import FilterView from "./filter-view";
import { QuizFilterOption, useFilters } from "./use-filters";

const Quiz = () => {
  const { quizFilters, clearFilters, onChangeFilterSelect } = useFilters();
  return (
    <>
      <div className="p-29">
        <FilterView
          quizFilters={quizFilters}
          onChangeFilterSelect={onChangeFilterSelect}
          startQuizLoading={false}
          startQuiz={() => {}}
        />
      </div>
    </>
  );
};

export default Quiz;
