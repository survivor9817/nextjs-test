import React from "react";
import { cn } from "@/lib/utils";

const QuizViewSkeleton = () => {
  return (
    <div className="quiz-box flex flex-col p-2 overflow-hidden animate-pulse">
      {/* Row 1 : Navigation Buttons */}
      <div className="flex justify-between items-center h-12 mb-1">
        <div className="flex gap-2">
          {/* Prev Button Skeleton */}
          <div className="size-12 rounded-full bg-muted" />
          {/* Stopwatch Skeleton */}
          <div className="size-12 rounded-full bg-muted" />
        </div>

        <div className="flex gap-2">
          {/* End Button Skeleton */}
          <div className="size-12 rounded-full bg-muted" />
          {/* Next Button Skeleton */}
          <div className="size-12 rounded-full bg-muted" />
        </div>
      </div>

      {/* Question Box */}
      <div className="border-2 rounded-t-3xl rounded-b-2xl overflow-hidden">
        {/* Progress Label + Tags */}
        <div className="relative h-14.5 flex items-center px-4.5">
          {/* Progress Label */}
          <div className="h-5 w-40 rounded-md bg-muted" />

          {/* Tags Skeleton */}
          <div className="absolute left-4 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-muted" />
            <div className="h-6 w-20 rounded-full bg-muted" />
            <div className="h-6 w-14 rounded-full bg-muted" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-muted/60">
          <div className="h-full w-1/3 bg-muted rounded-full" />
        </div>

        {/* Question Content */}
        <div className="relative min-h-30 p-4 space-y-3">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-[92%] rounded bg-muted" />
          <div className="h-4 w-[85%] rounded bg-muted" />
          <div className="h-4 w-[70%] rounded bg-muted" />

          {/* Reaction Messages Skeleton */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-muted/70" />
            <div className="h-6 w-20 rounded-full bg-muted/70" />
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 my-2 w-full">
        {/* Show Answer + Author */}
        <div className="flex items-center w-full sm:w-85 h-16 border-2 rounded-[150px] overflow-hidden px-2 gap-3">
          {/* Show Answer Button */}
          <div className="h-10 w-28 shrink-0 rounded-full bg-muted" />
          {/* Author */}
          <div className="flex items-center gap-2 flex-1">
            <div className="size-9 rounded-full bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
          </div>
        </div>

        {/* Question Details + Reaction Buttons */}
        <div className="grid items-center overflow-hidden sm:w-85 h-16 border-2 rounded-[150px]">
          <div className="flex items-center justify-between px-4 w-full">
            {/* Details */}
            <div className="h-4 w-36 rounded bg-muted" />
            {/* Reaction Buttons */}
            <div className="flex gap-2">
              <div className="size-9 rounded-full bg-muted" />
              <div className="size-9 rounded-full bg-muted" />
              <div className="size-9 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </div>

      {/* Answer Box (collapsed state) */}
      {/* اگر بخوای حالت باز هم نشون بده، این بخش رو فعال کن */}
      {/* <div className="mt-2 space-y-3 rounded-2xl border-2 p-4">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-[90%] rounded bg-muted" />
        <div className="h-4 w-[80%] rounded bg-muted" />
        <div className="h-4 w-[60%] rounded bg-muted" />
      </div> */}
    </div>
  );
};

export default QuizViewSkeleton;
