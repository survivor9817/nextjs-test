"use client";
// src/components/HeroTypeWriter.tsx
import { TypingAnimation } from "../ui/typing-animation";

const HeroTypeWriter = () => {
  return (
    <div className="pt-20 pb-10 text-2xl md:text-3xl lg:text-4xl font-bold text-center">
      <div className="text-gray-800 ">با درس‌یاور،</div>

      <div className="">
        <span>از </span>

        <TypingAnimation
          words={["کتاب تست", "معلم خصوصی", "مشاور تحصیلی", "کتاب کاغذی", "ویدیوی آموزشی"]}
          loop
          className="leading-16 text-blue-600 dark:text-blue-400"
        />

        <span> بی‌نیازی!</span>
      </div>
    </div>
  );
};

export default HeroTypeWriter;
