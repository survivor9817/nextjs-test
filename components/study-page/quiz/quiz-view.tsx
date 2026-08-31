import IconBtn from "@/components/ui/icon-btn";
import React from "react";
import ProgressBar from "./progress-bar";
import { Label } from "@/components/ui/label";
import QuestionTagBar from "./question-tag-bar";
import Question from "./question";
import QuestionReactionMsgs from "./question-reaction-msgs";
import Author from "./author";
import ShowAnswerBtn from "./show-answer-btn";
import QuestionDetails from "./question-details";
import QuizReactionBtns from "./question-reaction-btns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Answer from "./answer";
import { toFaDigits } from "@/lib/toFaDigits";
import { cn } from "@/lib/utils";
import { useQuestionNavigation } from "./use-quiz-navigaiton";

type Props = {};

const QuizView = (props: Props) => {
  const {
    currentQuestionIndex,
    lastQuestionIndex,
    isOnFirstQuestion,
    isOnLastQuestion,
    goToQuestion,
    goToPrevQuestion,
    goToNextQuestion,
    resetQuestionIndex,
  } = useQuestionNavigation(10);
  const progressLabel = `تمرین شماره ${toFaDigits(current + 1)} از ${toFaDigits(max + 1)}`;
  const questionDetails = `${source} - ${date} - ${toFaDigits(score)} نمره`;

  return (
    <div className="quiz-box flex flex-col p-2 overflow-hidden">
      {/* {endConfirmModal && (
        <QuizEndConfirm
          onAction={submitQuiz}
          // endLoading={endLoading}
          onClose={closeEndConfirm}
        />
      )}

      {resultsModal && quiz && (
        <QuizResultsModal
          // inja quiz id begir natije bede
          quizId={quiz.quizId}
          // yekaar kon be tedad idhaa niaazi nabashe
          questionIds={quiz.questionIds}
          onAction={terminateQuiz}
          onClose={closeResultsModal}
        />
      )} */}

      {/* Quiz card */}
      {/* <!-- Row 1 : Navigation Buttons of Quiz Section --> */}
      <div className="flex justify-between items-center h-12 mb-1">
        <div className="flex">
          <IconBtn
            icon={<span className="msr text-5xl">arrow_circle_left</span>}
            disabled={isOnFirstQuestion}
            onClick={goToPrevQuestion}
          />
          <IconBtn icon={<span className="msr text-5xl">timer</span>} onClick={openStopwatch} />
          {/* {stopwatch && <StopwatchModal onClose={closeStopwatch} />} */}
        </div>

        <div className="flex">
          <IconBtn
            className={"text-red-700"}
            icon={<span className="msr text-5xl">power_settings_circle</span>}
            onClick={openEndConfirm}
          />
          <IconBtn
            icon={<span className="msr text-5xl">arrow_circle_left</span>}
            disabled={isOnLastQuestion}
            onClick={goToNextQuestion}
          />
        </div>
      </div>

      {/* Question Box */}
      <div
        className="border-2 rounded-t-3xl rounded-b-2xl transition-[border-radius]"
        style={{ borderBottomLeftRadius: isAnswerVisible ? "6px" : "16px" }}
      >
        {/* <!-- Row 2 : Quiz Number and Tags --> */}
        <div className="relative h-14.5">
          <div className="absolute top-1/2 -translate-y-1/2 right-4.5 z-1 text-[16px]">
            <Label>{progressLabel}</Label>
          </div>

          {/* <QuizProgressLabel current={currentQuestionIndex} max={lastQuestionIndex} /> */}

          <QuestionTagBar tags={tags} />
        </div>

        {/* <!-- Row 3 : Quiz Number and Tags --> */}
        <ProgressBar value={36} />

        {/* <!-- Row 4 : Question Box --> */}
        <div className="relative min-h-30">
          <Question question={question} />
          <QuestionReactionMsgs msgs={msgsMeta} />
        </div>
      </div>

      {/* <!-- Row 5 : Middle Row : answerToggle-authorLink-userInputs --> */}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 my-2 w-full text-[16px]">
        <div
          className="flex items-center w-full sm:w-85 h-16 border-2 rounded-full overflow-hidden transition-[border-radius] duration-400"
          style={{ borderRadius: isAnswerVisible ? "150px 150px 25px 150px" : "150px" }}
        >
          {/* <ShowAnswerBtn onClick={toggleAnswer} isAnswerVisible={isAnswerVisible} /> */}
          <Collapsible open={isAnswerVisible} onOpenChange={toggleAnswer}>
            <CollapsibleTrigger render={<ShowAnswerBtn isAnswerVisible={isAnswerVisible} />} />
          </Collapsible>
          <Author author={author} />
        </div>

        {/* <div aria-hidden={isAnswerVisible} inert={isAnswerVisible ? true : undefined}></div> */}
        <div
          className="grid items-center overflow-hidden sm:w-85 h-16 border-2 rounded-full transition-[border-radius] duration-400"
          style={{ borderRadius: isAnswerVisible ? "25px 150px 150px 150px" : "150px" }}
        >
          <div
            className="grid grid-cols-2 w-[200%] justify-center content-center h-12 transition-transform duration-400 ease-in-out"
            style={{ transform: isAnswerVisible ? "translateX(50%)" : "translateX(0%)" }}
          >
            <QuestionDetails questionDetails={questionDetails} />
            <QuizReactionBtns btnsMeta={btnsMeta} onClick={onClickOnReactionBtn} />
          </div>
        </div>
      </div>

      {/* <!-- Row 6 : Answer Box --> */}

      <Collapsible open={isAnswerVisible} onOpenChange={toggleAnswer}>
        <CollapsibleContent
          className={cn(
            "flex flex-col gap-2 overflow-hidden transition-all duration-300",
            "h-(--collapsible-panel-height) data-starting-style:h-0 data-ending-style:h-0",
            "opacity-100 data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
          keepMounted
        >
          <Answer answer={answerContent} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default QuizView;
