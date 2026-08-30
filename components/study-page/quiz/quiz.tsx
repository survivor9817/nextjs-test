import FilterView from "./filter-view";
import ProgressBar from "./progress-bar";
import QuestionTagBar from "./question-tag-bar";
import { QuizFilterOption, useFilters } from "./use-filters";

const Quiz = () => {
  const { quizFilters, clearFilters, onChangeFilterSelect } = useFilters();
  return (
    <>
      <div className="flex justify-center">
        <FilterView
          quizFilters={quizFilters}
          onChangeFilterSelect={onChangeFilterSelect}
          startQuizLoading={false}
          startQuiz={() => {}}
        />
      </div>
      <div className="my-8">
        <ProgressBar value={80} />
        <QuestionTagBar tags={["some", "how"]} />
      </div>
    </>
  );
};

export default Quiz;
