import FilterView from "./filter-view";
import ProgressBar from "./progress-bar";
import QuestionTagBar from "./question-tag-bar";
import ShowAnswerBtn from "./show-answer-btn";
import { useFilters } from "./use-filters";

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
      <div
        className="flex items-center w-full sm:w-85 h-16 border-2 rounded-full overflow-hidden transition-[border-radius] duration-400"
        style={{ borderRadius: true ? "150px 150px 25px 150px" : "150px" }}
      >
        <ShowAnswerBtn
          isAnswerVisible={false}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </>
  );
};

export default Quiz;
