// import { useEffect, useMemo, useRef, useState } from "react";
// import ProgressBar from "./progress-bar";
// import { Label } from "@/components/ui/label";
// import QuestionTagBar from "./question-tag";
// import Question from "./question";
// import QuestionReactionMsgs from "./question-reaction-msgs";
// import Author from "./author";
// import ShowAnswerBtn from "./show-answer-btn";
// import QuestionDetails from "./question-details";
// import QuizReactionBtns from "./question-reaction-btns";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// import { toFaDigits } from "@/lib/toFaDigits";
// import { cn } from "@/lib/utils";
// import { useQuestionNavigation } from "./use-quiz-navigation";
// import { useQuizAnswer } from "./use-quiz-answer";
// import { useQuizReactions } from "../useQuizReactions";
// import { QuizSession } from "@/data/quizSessionsData";
// import { useQuestionData } from "./use-question-data";
// import Answer from "./answer";
// import IconBtn from "@/components/ui/icon-btn";
// import StopWatchDrawer from "./stop-watch-drawer";
// import QuizEndConfirm from "./quiz-end-confirm";
// import QuizResultsModal from "./quiz-results-modal";
// import { useSyncLastVisitedQuestion } from "./useSyncLastVisitedQuestion";
// import QuizActions from "./quiz-actions";
// import IconButton from "@/components/ui/icon-button";
// import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
// import { Timer } from "lucide-react";
// import StopWatch from "./stop-watch";

// /* ------------------------------------------------------------------ */
// /* ابزار اسکرول (بعداً می‌تونی جداش کنی: lib/scroll-to-reveal-bottom.ts) */
// /* ------------------------------------------------------------------ */

// const getScrollParent = (el: HTMLElement): HTMLElement | null => {
//   let parent = el.parentElement;
//   while (parent) {
//     const { overflowY } = getComputedStyle(parent);
//     if (/(auto|scroll)/.test(overflowY) && parent.scrollHeight > parent.clientHeight) {
//       return parent;
//     }
//     parent = parent.parentElement;
//   }
//   return null;
// };

// const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// type ScrollRevealOptions = {
//   delay?: number; // شروع نسبت به لحظهٔ کلیک (ms)
//   duration?: number; // مدت اسکرول (ms)
//   offsetBottom?: number; // فاصله از پایین (مثلاً ارتفاع نوار شناور)
//   maxDistance?: number; // سقف اسکرول به پیکسل
// };

// function scrollToRevealBottom(
//   el: HTMLElement,
//   { delay = 150, duration = 300, offsetBottom = 80, maxDistance = 100 }: ScrollRevealOptions = {},
// ) {
//   let rafId = 0;

//   const timeoutId = window.setTimeout(() => {
//     const parent = getScrollParent(el);
//     // ارتفاع نهایی کادر (بعد از نمایش پنل قابل خواندنه)
//     const finalHeight = el.scrollHeight + 4; // ۴ پیکسل برای border

//     const viewportBottom = parent ? parent.getBoundingClientRect().bottom : window.innerHeight;
//     const startScroll = parent ? parent.scrollTop : window.scrollY;

//     const finalBottom = el.getBoundingClientRect().top + finalHeight;
//     const delta = Math.min(maxDistance, Math.max(finalBottom - (viewportBottom - offsetBottom), 0));
//     if (delta <= 0) return;

//     const startTime = performance.now();
//     const step = (now: number) => {
//       const progress = Math.min((now - startTime) / duration, 1);
//       const value = startScroll + delta * easeInOutCubic(progress);
//       if (parent) parent.scrollTop = value;
//       else window.scrollTo(0, value);
//       if (progress < 1) rafId = requestAnimationFrame(step);
//     };
//     rafId = requestAnimationFrame(step);
//   }, delay);

//   // تابع لغو
//   return () => {
//     clearTimeout(timeoutId);
//     cancelAnimationFrame(rafId);
//   };
// }

// function scrollParentToTop(el: HTMLElement, { duration = 250 }: { duration?: number } = {}) {
//   let rafId = 0;
//   const parent = getScrollParent(el); // قبل از جمع شدن پنل پیدا می‌شه
//   const startScroll = parent ? parent.scrollTop : window.scrollY;
//   if (startScroll <= 0) return () => {};

//   const startTime = performance.now();
//   const step = (now: number) => {
//     const progress = Math.min((now - startTime) / duration, 1);
//     const target = startScroll * (1 - easeInOutCubic(progress));
//     // چون پنل در حال جمع شدنه، مرورگر scrollTop رو کلمپ می‌کنه؛
//     // با min از مقدار فعلی، حرکت هیچ‌وقت رو به پایین برنمی‌گرده
//     const current = parent ? parent.scrollTop : window.scrollY;
//     const value = Math.min(current, target);
//     if (parent) parent.scrollTop = value;
//     else window.scrollTo(0, value);
//     if (progress < 1) rafId = requestAnimationFrame(step);
//   };
//   rafId = requestAnimationFrame(step);

//   return () => cancelAnimationFrame(rafId);
// }

// /* ------------------------------------------------------------------ */

// type Props = {
//   quiz: QuizSession;
//   questionIds: string[];
//   isSubmitting?: boolean;
//   onSubmitQuiz: () => Promise<any>;
//   onTerminateQuiz: () => void;
// };

// const QuizView = ({
//   quiz,
//   questionIds,
//   isSubmitting = false,
//   onSubmitQuiz,
//   onTerminateQuiz,
// }: Props) => {
//   const totalQuestions = questionIds.length;

//   // ۱. محاسبه ایندکس اولیه بر اساس آخرین سوال مشاهده‌شده در سشن
//   const initialIndex = useMemo(() => {
//     if (!quiz.lastVisitedQuestion) return 0;
//     const foundIndex = questionIds.indexOf(quiz.lastVisitedQuestion);
//     return foundIndex !== -1 ? foundIndex : 0;
//   }, [quiz.lastVisitedQuestion, questionIds]);

//   const { currentIndex, lastIndex, isOnFirst, isOnLast, goToPrev, goToNext, goTo } =
//     useQuestionNavigation(0, totalQuestions, initialIndex);

//   const currentQuestionId = questionIds[currentIndex];

//   const { question, questionLoading, questionError, loadQuestion } = useQuestionData(
//     currentQuestionId,
//     quiz.quizId,
//   );

//   const {
//     id = "",
//     reactions: userReactions = {
//       isCorrect: false,
//       isIncorrect: false,
//       isLike: false,
//       isStar: false,
//       isReport: false,
//     },
//     tags = [],
//     questionContent = "",
//     author = "",
//     source = "",
//     date = "",
//     score = 0,
//     answerContent = "",
//   } = question || {};

//   // اصلاح برچسب بدون +1 اضافه برای کل سوالات
//   const progressLabel = `تمرین شماره ${toFaDigits(currentIndex + 1)} از ${toFaDigits(totalQuestions)}`;
//   const questionDetails = [source, date, score ? `${toFaDigits(score)} نمره` : null]
//     .filter(Boolean)
//     .join(" - ");
//   const progressBarLength = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

//   const { btnsMeta, msgsMeta, onClickOnReactionBtn } = useQuizReactions(
//     quiz.quizId,
//     id,
//     "123",
//     userReactions,
//   );

//   const {
//     answerContent: descriptiveAnswer,
//     isAnswerVisible,
//     toggleAnswer,
//   } = useQuizAnswer(answerContent, currentIndex);

//   // وضعیت مودال‌ها
//   const [isEndConfirmOpen, setIsEndConfirmOpen] = useState(false);
//   const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

//   // بررسی وضعیت پایان‌یافتگی آزمون
//   const isQuizCompleted = Boolean(quiz.endTime);

//   // کلیک روی دکمه قرمز خاموش
//   const handlePowerButtonClick = () => {
//     if (isQuizCompleted) {
//       // اگر قبلاً ثبت شده، مستقیم کارنامه را باز کن
//       setIsResultsModalOpen(true);
//     } else {
//       // اگر هنوز باز است، اول تاییدیه بگیر
//       setIsEndConfirmOpen(true);
//     }
//   };

//   // تایید پایان آزمون در مودال تایید
//   const handleConfirmEnd = async () => {
//     try {
//       await onSubmitQuiz();
//       setIsEndConfirmOpen(false);
//       setIsResultsModalOpen(true); // بلافاصله باز کردن کارنامه
//     } catch (err) {
//       console.error("خطا در اتمام آزمون:", err);
//     }
//   };

//   // کلیک روی "مرور دوباره" در کارنامه
//   const handleReviewAgain = () => {
//     setIsResultsModalOpen(false);
//   };

//   // کلیک روی "اتمام تمرین" در کارنامه (خروج قطعی)
//   const handleFinalTerminate = () => {
//     setIsResultsModalOpen(false);
//     onTerminateQuiz();
//   };

//   // اسکرول نرم هنگام باز شدن پاسخ
//   const answerRef = useRef<HTMLDivElement>(null);
//   const cancelScrollRef = useRef<(() => void) | null>(null);

//   const handleOpenChange = (open: boolean) => {
//     toggleAnswer();
//     cancelScrollRef.current?.();
//     cancelScrollRef.current = null;

//     if (!answerRef.current) return;

//     cancelScrollRef.current = open
//       ? scrollToRevealBottom(answerRef.current, {
//           delay: 150,
//           duration: 300,
//           offsetBottom: 80,
//           maxDistance: 100,
//         })
//       : scrollParentToTop(answerRef.current, { duration: 250 });
//   };

//   useEffect(() => () => cancelScrollRef.current?.(), []);

//   useSyncLastVisitedQuestion(quiz.quizId, currentQuestionId, quiz.userId, quiz.bookId);

//   return (
//     <Collapsible open={isAnswerVisible} onOpenChange={handleOpenChange}>
//       <QuizEndConfirm
//         isOpen={isEndConfirmOpen}
//         isLoading={isSubmitting}
//         onConfirm={handleConfirmEnd}
//         onClose={() => setIsEndConfirmOpen(false)}
//       />

//       {/* مودال کارنامه نتیجه */}
//       <QuizResultsModal
//         isOpen={isResultsModalOpen}
//         quizId={quiz.quizId}
//         onReview={handleReviewAgain}
//         onTerminate={handleFinalTerminate}
//         onClose={() => setIsResultsModalOpen(false)}
//       />

//       <div className="quiz-box flex flex-col p-2 overflow-hidden">
//         {/* نوار شناور پایین */}
//         <div className="flex justify-center items-center py-2 absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
//           <QuizActions
//             currentQuestion={currentIndex + 1}
//             totalQuestions={totalQuestions}
//             isQuizCompleted={isQuizCompleted}
//             onPrev={goToPrev}
//             onNext={goToNext}
//             onPowerClick={handlePowerButtonClick}
//             onGoToQuestion={(n) => goTo(n - 1)}
//           />
//         </div>

//         {/* نوار ابزار بالا */}
//         <div className="flex justify-between items-center h-12 mb-1">
//           <div className="flex">
//             <IconBtn
//               icon={<span className="msr text-5xl">arrow_circle_right</span>}
//               disabled={isOnFirst}
//               onClick={goToPrev}
//             />
//             <ResponsiveDialog
//               trigger={
//                 <IconBtn
//                   icon={
//                     <span className="msr text-5xl">timer</span>
//                     // <Timer className="size-5" strokeWidth={3} />
//                   }
//                 />
//               }
//               title="کرنومتر"
//               description="ابزار ثبت و اندازه‌گیری زمان"
//             >
//               <div className="flex flex-col items-center justify-center py-2">
//                 <StopWatch />
//               </div>
//             </ResponsiveDialog>{" "}
//           </div>

//           <div className="flex">
//             <IconBtn
//               className="text-red-700"
//               icon={<span className="msr text-5xl">power_settings_circle</span>}
//               onClick={handlePowerButtonClick}
//             />
//             <IconBtn
//               icon={<span className="msr text-5xl">arrow_circle_left</span>}
//               disabled={isOnLast}
//               onClick={goToNext}
//             />
//           </div>
//         </div>

//         {/* جعبه سوال */}
//         <div
//           className={cn(
//             "border-2 rounded-t-3xl rounded-b-2xl transition-[border-radius] border-[#bcbcbc]",
//             isAnswerVisible ? "rounded-bl-[6px]" : "rounded-bl-2xl",
//           )}
//         >
//           <div className="relative h-12">
//             <div className="absolute top-1/2 -translate-y-1/2 right-4.5 z-1 text-[16px]">
//               <Label>{progressLabel}</Label>
//             </div>
//             <QuestionTagBar tags={tags || []} />
//           </div>

//           <ProgressBar value={progressBarLength} />

//           <div className="relative min-h-30">
//             <Question
//               question={questionContent}
//               isLoading={questionLoading}
//               error={questionError}
//               refetch={loadQuestion}
//             />
//             <QuestionReactionMsgs msgs={msgsMeta} />
//           </div>
//         </div>

//         {/* سطر میانی دکمه پاسخ و مشخصات */}
//         <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 my-2 w-full text-[16px]">
//           <div
//             className={cn(
//               "flex items-center w-full sm:w-85 h-16 border-2 border-[#bcbcbc] overflow-hidden transition-[border-radius] duration-400",
//               isAnswerVisible ? "rounded-[150px_150px_25px_150px]" : "rounded-[150px]",
//             )}
//           >
//             <CollapsibleTrigger
//               render={
//                 <ShowAnswerBtn
//                   isAnswerVisible={isAnswerVisible}
//                   disabled={!questionContent || questionLoading}
//                 />
//               }
//             />
//             <Author author={author || ""} />
//           </div>

//           <div
//             className={cn(
//               "grid items-center sm:w-85 h-16 max-h-16 overflow-hidden border-2 border-[#bcbcbc]",
//               "transition-[border-radius] duration-400",
//               isAnswerVisible ? "rounded-[25px_150px_150px_150px]" : "rounded-[150px]",
//             )}
//           >
//             <div
//               className={cn(
//                 "grid grid-cols-2 w-[200%] justify-center h-full max-h-12",
//                 "transition-transform duration-400 ease-in-out",
//                 isAnswerVisible ? "translate-x-[50%]" : "translate-x-0",
//               )}
//             >
//               <QuestionDetails questionDetails={questionDetails} />
//               <QuizReactionBtns btnsMeta={btnsMeta} onClick={onClickOnReactionBtn} />
//             </div>
//           </div>
//         </div>

//         {/* جعبه پاسخ تشریحی */}
//         <CollapsibleContent
//           ref={answerRef}
//           className={cn(
//             "flex flex-col gap-2 overflow-hidden",
//             "max-h-(--collapsible-panel-height) data-starting-style:max-h-0 data-ending-style:max-h-0",
//             "opacity-100 data-starting-style:opacity-0 data-ending-style:opacity-0",
//             "border-2 border-[#bcbcbc] rounded-[16px_6px_28px_28px] mb-4 leading-[1.6] text-justify pb-12 min-h-32.5 relative",
//             "transition-[max-height,opacity] duration-400 ease-in-out",
//           )}
//           keepMounted
//         >
//           <Answer answer={descriptiveAnswer} />
//         </CollapsibleContent>

//         <div className="mb-14" />
//       </div>
//     </Collapsible>
//   );
// };

// export default QuizView;
