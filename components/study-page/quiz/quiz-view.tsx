import IconBtn from "@/components/ui/icon-btn";
import React, { useState } from "react";
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
import StopWatchDrawer from "./stop-watch-drawer";
import { useQuizAnswer } from "./use-quiz-answer";
import { useQuizReactions } from "./useQuizReactions";
import { QuizSession } from "@/data/quizSessionsData";
import { useQuestionData } from "./useQuestionData";

type Props = {
  quiz: QuizSession;
  questionIds: string[];
  submitLoading: boolean;
  submitResult: string;
};
// {
//   openEndConfirm,
//   endConfirmModal,
//   submitQuiz,
//   closeEndConfirm,
//   resultsModal,
//   terminateQuiz,
//   closeResultsModal,
// }
const QuizView = ({ quiz, questionIds }: Props) => {
  const totalQuestions = questionIds.length;

  const {
    currentQuestionIndex,
    // lastQuestionIndex,
    isOnFirstQuestion,
    isOnLastQuestion,
    // goToQuestion,
    goToPrevQuestion,
    goToNextQuestion,
    // resetQuestionIndex,
  } = useQuestionNavigation(0, totalQuestions, 0);

  const currentQuestionId = questionIds[currentQuestionIndex];

  const { question, questionLoading, questionError, loadQuestion } = useQuestionData(
    currentQuestionId,
    quiz.quizId,
  );

  const { id, reactions, tags, questionContent, author, source, date, score, answerContent } =
    question;

  const progressLabel = `تمرین شماره ${toFaDigits(currentQuestionIndex + 1)} از ${toFaDigits(totalQuestions + 1)}`;
  const questionDetails = `${source} - ${date} - ${toFaDigits(score)} نمره`;

  const { btnsMeta, msgsMeta, onClickOnReactionBtn } = useQuizReactions(
    quiz.quizId,
    id,
    "123",
    reactions,
  );

  const {
    answerContent: descriptiveAnswer,
    isAnswerVisible,
    toggleAnswer,
  } = useQuizAnswer(answerContent, currentQuestionIndex);

  const [isEndConfirmOpen, setIsEndConfirmOpen] = useState(false);

  const handleConfirmEnd = () => {
    setIsEndConfirmOpen(false);
    // submitQuiz()
  };

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
          {/* <IconBtn icon={<span className="msr text-5xl">timer</span>} onClick={openStopwatch} /> */}
          {/* {stopwatch && <StopwatchModal onClose={closeStopwatch} />} */}
          <StopWatchDrawer />
        </div>

        <div className="flex">
          <IconBtn
            className={"text-red-700"}
            icon={<span className="msr text-5xl">power_settings_circle</span>}
            // onClick={openEndConfirm}
            onClick={() => setIsEndConfirmOpen(true)}
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
        className={cn(
          "border-2 rounded-t-3xl rounded-b-2xl transition-[border-radius]",
          isAnswerVisible ? "rounded-bl-1.5" : "rounded-bl-2xl",
        )}
        // style={{ borderBottomLeftRadius: isAnswerVisible ? "6px" : "16px" }}
      >
        {/* <!-- Row 2 : Quiz Number and Tags --> */}
        <div className="relative h-14.5">
          <div className="absolute top-1/2 -translate-y-1/2 right-4.5 z-1 text-[16px]">
            <Label>{progressLabel}</Label>
          </div>

          {/* <QuizProgressLabel current={currentQuestionIndex} max={lastQuestionIndex} /> */}

          <QuestionTagBar tags={tags} loading={questionLoading} />
        </div>

        {/* <!-- Row 3 : Quiz Number and Tags --> */}
        <ProgressBar value={36} />

        {/* <!-- Row 4 : Question Box --> */}
        <div className="relative min-h-30">
          <Question
            question={questionContent}
            isLoading={questionLoading}
            error={questionError}
            refetch={loadQuestion}
          />
          <QuestionReactionMsgs msgs={msgsMeta} />
        </div>
      </div>

      {/* <!-- Row 5 : Middle Row : answerToggle-authorLink-userInputs --> */}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 my-2 w-full text-[16px]">
        <div
          className={cn(
            "flex items-center w-full sm:w-85 h-16 border-2 overflow-hidden transition-[border-radius] duration-400",
            isAnswerVisible ? "rounded-[150px_150px_25px_150px]" : "rounded-[150px]",
          )}
          // className="flex items-center w-full sm:w-85 h-16 border-2 rounded-full overflow-hidden transition-[border-radius] duration-400"
          // style={{ borderRadius: isAnswerVisible ? "150px 150px 25px 150px" : "150px" }}
        >
          {/* <ShowAnswerBtn onClick={toggleAnswer} isAnswerVisible={isAnswerVisible} /> */}
          <Collapsible open={isAnswerVisible} onOpenChange={toggleAnswer}>
            <CollapsibleTrigger
              render={
                <ShowAnswerBtn isAnswerVisible={isAnswerVisible} disabled={questionLoading} />
              }
            />
          </Collapsible>
          <Author author={author} />
        </div>

        {/* <div aria-hidden={isAnswerVisible} inert={isAnswerVisible ? true : undefined}></div> */}
        <div
          className={cn(
            "grid items-center overflow-hidden sm:w-85 h-16 border-2 transition-[border-radius] duration-400",
            isAnswerVisible ? "rounded-[25px_150px_150px_150px]" : "rounded-[150px]",
          )}
          // className="grid items-center overflow-hidden sm:w-85 h-16 border-2 rounded-full transition-[border-radius] duration-400"
          // style={{ borderRadius: isAnswerVisible ? "25px 150px 150px 150px" : "150px" }}
        >
          <div
            className={cn(
              "grid grid-cols-2 w-[200%] justify-center content-center h-12 transition-transform duration-400 ease-in-out",
              isAnswerVisible ? "translate-x-[50%]" : "translate-x-0",
            )}
            // className="grid grid-cols-2 w-[200%] justify-center content-center h-12 transition-transform duration-400 ease-in-out"
            // style={{ transform: isAnswerVisible ? "translateX(50%)" : "translateX(0%)" }}
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
          <Answer answer={descriptiveAnswer} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default QuizView;
