import { CollapsibleContent, Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import Answer from "./answer";
import FilterView from "./filter-view";
import ProgressBar from "./progress-bar";
import QuestionTagBar from "./question-tag-bar";
import ShowAnswerBtn from "./show-answer-btn";
import { useFilters } from "./use-filters";
import { useState } from "react";
import StopWatch from "./stop-watch";
import StopWatchDrawer from "./stop-watch-drawer";

const Quiz = () => {
  const { quizFilters, clearFilters, onChangeFilterSelect } = useFilters();
  const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false);
  return (
    <>
      <QuestionTagBar tags={["some", "how"]} />
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
      </div>
      <div
        className="flex items-center w-full sm:w-85 h-16 border-2 rounded-full overflow-hidden transition-[border-radius] duration-400"
        style={{ borderRadius: false ? "150px 150px 25px 150px" : "150px" }}
      >
        <ShowAnswerBtn
          isAnswerVisible={false}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>

      <Collapsible open={isAnswerVisible} onOpenChange={setIsAnswerVisible}>
        <CollapsibleTrigger render={<ShowAnswerBtn isAnswerVisible={isAnswerVisible} />} />
      </Collapsible>
      <Collapsible open={isAnswerVisible} onOpenChange={setIsAnswerVisible}>
        <CollapsibleContent
          keepMounted
          className={
            // "flex h-(--collapsible-panel-height) flex-col gap-2 overflow-hidden transition-all duration-300 data-ending-style:h-0 data-starting-style:h-0 border-2 mt-5"
            "flex h-(--collapsible-panel-height) flex-col gap-2 overflow-hidden transition-all duration-300 opacity-100 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:h-0 data-starting-style:h-0 border-2 mt-5"
          }
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aut, ducimus aspernatur
          neque delectus excepturi accusantium unde exercitationem officiis vero impedit dolore
          corporis maiores, aperiam ratione itaque eius illo optio eum? Magnam quam recusandae
          commodi impedit suscipit quis, qui odit, in molestiae quo laborum ex enim eum, error
          delectus fuga!
        </CollapsibleContent>
      </Collapsible>

      <StopWatchDrawer />
    </>
  );
};

export default Quiz;
