import { cn } from "@/lib/utils";
import StartQuizBtn from "./start-quiz-btn";
import { QuizFiltersType, QuizFilterOption } from "../use-filters";
import FilterSelect from "./filter-select";
import { useProgressiveDisclosure } from "./use-progressive-disclosure";

type Props = {
  quizFilters: QuizFiltersType;
  onChangeFilterSelect: (
    id: "where" | "level" | "source",
    selectedOption: QuizFilterOption | null,
  ) => void;
  startQuizLoading: boolean;
  startQuiz: () => void | Promise<unknown>; // اصلاح تایپ برای پذیرش هر نوع خروجی
};

const FilterView = ({ quizFilters, onChangeFilterSelect, startQuizLoading, startQuiz }: Props) => {
  // const { quizFilterBoxRef: containerRef, quizFilterBoxHeight: height, showLevel, showSource, showBtn } =
  //   useQuizFiltersProgressiveDisclosure(quizFilters);

  const {
    containerRef,
    containerHeight,
    isStepVisible,
    visibility: [showWhere, showLevel, showSource, showBtn],
  } = useProgressiveDisclosure({
    // ترتیب وابستگی فیلترها از بالا به پایین:
    conditions: [
      quizFilters.where?.value, // مرحله 0: همیشه هست، پر شد -> مرحله 1 باز می‌شود
      quizFilters.level?.value, // مرحله 1: پر شد -> مرحله 2 باز می‌شود
      quizFilters.source?.value, // مرحله 2: پر شد -> دکمه ثبت باز می‌شود
      true, // مرحله 3: دکمه اقدام نهایی
    ],
    initialHeight: 110,
    extraHeight: 24,
    resetKey: quizFilters.book?.value, // هنگام تغییر کتاب، کانتینر بسته یا ریست شود
  });

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ height: containerHeight }}
      className="relative flex flex-col gap-8 border-2 border-gray-300 rounded-4xl w-full max-w-115 mt-18 max-h-80 mx-2
                 transition-[height] ease-in-out duration-300" // min-h-90
    >
      <div className="absolute -top-5 right-8 text-2xl bg-white px-2">تمرین جدید</div>

      <div
        ref={containerRef}
        className={cn(
          "flex flex-col gap-7 overflow-hidden w-full h-full px-6 pb-8",
          showLevel ? "pt-10" : "pt-8",
        )}
      >
        {/* mishe bad az baste shodane menu yek filter, agar oon filtere khali nist shode, check konim ke aya filter badish khalie yaa na.
        agar khalie va componentesh load nashode, loadesh kone */}
        <FilterSelect
          filterId="where"
          label="از کجای کتاب باشه؟"
          quizFilters={quizFilters}
          onChange={onChangeFilterSelect}
          loadingMessage="در حال بارگذاری بخش‌های کتاب..."
        />
        {showLevel && (
          <FilterSelect
            filterId="level"
            label="در چه سطحی باشند؟"
            quizFilters={quizFilters}
            onChange={onChangeFilterSelect}
            loadingMessage="در حال بارگذاری سطوح..."
          />
        )}
        {showSource && (
          <FilterSelect
            filterId="source"
            label="از چه منبعی باشند؟"
            quizFilters={quizFilters}
            onChange={onChangeFilterSelect}
            // avalin gozine haa: soalate ghalat, soalate nazade.
            loadingMessage="در حال بارگذاری منابع..."
          />
        )}
      </div>

      <StartQuizBtn show={showBtn} loading={startQuizLoading} type="button" onClick={startQuiz} />
    </form>
  );
};

export default FilterView;
