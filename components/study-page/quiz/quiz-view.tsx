import IconBtn from "@/components/ui/icon-btn";
import React from "react";
import ProgressBar from "./progress-bar";
import { Label } from "@/components/ui/label";
import QuestionTagBar from "./question-tag-bar";

type Props = {};

const quizView = (props: Props) => {
  //   const progressLabel = `تمرین شماره ${toFaNums(current + 1)} از ${toFaNums(max + 1)}`;

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
            // loading={prevLoading}
            // disabled={nextLoading || isFirstQuestion}
            // onClick={goToPrevQuestion}
          />
          <IconBtn
            icon={"timer"}
            //    onClick={openStopwatch}
          />
          {/* {stopwatch && <StopwatchModal onClose={closeStopwatch} />} */}
        </div>

        <div className="flex">
          <IconBtn
            className={"text-red-700"}
            i={"power_settings_circle"}
            // onClick={openEndConfirm}
          />
          <IconBtn
            i={"arrow_circle_left"}
            loading={nextLoading}
            disabled={prevLoading || isLastQuestion}
            // onClick={goToNextQuestion}
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
          <QuizReactionMessages msgs={msgsMeta} />
        </div>
      </div>

      {/* <!-- Row 5 : Middle Row : answerToggle-authorLink-userInputs --> */}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 my-2 w-full text-[16px]">
        <div
          className="flex items-center w-full sm:w-85 h-16 border-2 rounded-full overflow-hidden transition-[border-radius] duration-400"
          style={{ borderRadius: isAnswerVisible ? "150px 150px 25px 150px" : "150px" }}
        >
          <ShowAnswerBtn onClick={toggleAnswer} isAnswerVisible={isAnswerVisible} />
          <Author author={author} />
        </div>

        <div
          className="grid items-center overflow-hidden sm:w-85 h-16 border-2 rounded-full transition-[border-radius] duration-400"
          style={{ borderRadius: isAnswerVisible ? "25px 150px 150px 150px" : "150px" }}
        >
          <div
            className="grid grid-cols-2 w-[200%] justify-center content-center h-12 transition-transform duration-400 ease-in-out"
            style={{ transform: isAnswerVisible ? "translateX(50%)" : "translateX(0%)" }}
          >
            <QuestionDetails source={source} date={date} score={score} />
            <QuizReactionButtons btnsMeta={btnsMeta} onClick={onClickOnReactionBtn} />
          </div>
        </div>
      </div>

      {/* <!-- Row 6 : Answer Box --> */}
      <Collapsible isExpanded={isAnswerVisible}>
        <Answer answer={answerContent} />
      </Collapsible>
    </div>
  );
};

export default quiz - view;
