import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { QuizFiltersType } from "./use-filters";

export const useQuizFiltersProgressiveDisclosure = (quizFilters: QuizFiltersType) => {
  const quizFilterBoxRef = useRef<HTMLDivElement>(null);
  const [quizFilterBoxHeight, setFiltersHeight] = useState<number>(110);

  // const showLevel = quizFilters.where?.value !== null;
  // const showSource = quizFilters.level?.value !== null;
  // const showBtn = quizFilters.source?.value !== null;

  const showLevel = Boolean(quizFilters.where?.value);
  const showSource = Boolean(quizFilters.level?.value);
  const showBtn = Boolean(quizFilters.source?.value);

  useEffect(() => {
    setFiltersHeight(110);
  }, [Boolean(quizFilters.book?.value)]); // book id ro az contextesh bardari ke behtare ke daaghaan

  useLayoutEffect(() => {
    const el = quizFilterBoxRef.current;
    if (el) setFiltersHeight(el.scrollHeight + (showBtn ? 24 : 0));
  }, [showLevel, showSource, showBtn]);

  // // ✅ جایگزین useLayoutEffect
  // useEffect(() => {
  //   const el = quizFilterBoxRef.current;
  //   if (!el) return;

  //   const measureHeight = () => {
  //     setFiltersHeight(el.scrollHeight + (showBtn ? 24 : 0));
  //   };

  //   // اول بارگذاری
  //   // measureHeight();

  //   // برای مطمئن شدن از رندر کامل
  //   requestAnimationFrame(measureHeight);
  // }, [showLevel, showSource, showBtn]);

  return {
    showLevel,
    showSource,
    showBtn,
    quizFilterBoxRef,
    quizFilterBoxHeight,
  };
};

// import { useLayoutEffect, useEffect, useRef, useState } from "react";
// import { QuizFiltersType } from "./use-filters";

// const INITIAL_HEIGHT = 110;
// const MIN_WIDTH = 260;
// const MAX_WIDTH = 460; // معادل max-w-115 (28.75rem)

// export const useQuizFiltersProgressiveDisclosure = (quizFilters: QuizFiltersType) => {
//   const quizFilterBoxRef = useRef<HTMLDivElement>(null);
//   const [quizFilterBoxHeight, setFiltersHeight] = useState<number>(INITIAL_HEIGHT);
//   const [quizFilterBoxWidth, setFiltersWidth] = useState<number>(MIN_WIDTH);

//   const showLevel = Boolean(quizFilters.where?.value);
//   const showSource = Boolean(quizFilters.level?.value);
//   const showBtn = Boolean(quizFilters.source?.value);

//   const visibleCount = 1 + Number(showLevel) + Number(showSource) + Number(showBtn);

//   useEffect(() => {
//     setFiltersHeight(INITIAL_HEIGHT);
//     setFiltersWidth(MIN_WIDTH);
//   }, [quizFilters.book?.value]);

//   useLayoutEffect(() => {
//     const el = quizFilterBoxRef.current;
//     if (!el) return;

//     setFiltersHeight(el.scrollHeight + (showBtn ? 24 : 0));

//     const step = (MAX_WIDTH - MIN_WIDTH) / 3; // where→level→source سه پله
//     const targetWidth = Math.min(MIN_WIDTH + step * (visibleCount - 1), MAX_WIDTH);
//     setFiltersWidth(targetWidth);
//   }, [showLevel, showSource, showBtn, visibleCount]);

//   return {
//     showLevel,
//     showSource,
//     showBtn,
//     quizFilterBoxRef,
//     quizFilterBoxHeight,
//     quizFilterBoxWidth,
//   };
// };
