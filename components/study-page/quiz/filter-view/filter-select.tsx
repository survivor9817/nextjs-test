import { useFilterSelectData } from "./use-filter-select-data";
import { QuizFilterOption, QuizFiltersType } from "../use-filters";
import { useQuizFilterFocus } from "./use-quiz-filter-focus";
import { AsyncSelect } from "@/components/ui/async-select";

type Props = {
  filterId: "where" | "level" | "source";
  label: string;
  onChange: (id: "where" | "level" | "source", selectedOption: QuizFilterOption | null) => void;
  loadingMessage?: string;
  quizFilters: QuizFiltersType;
};

const FilterSelect = ({
  filterId,
  label,
  quizFilters,
  onChange,
  loadingMessage = "در حال بارگذاری گزینه‌ها...",
}: Props) => {
  const { options, isLoading, error, loadOptions } = useFilterSelectData(filterId, quizFilters);

  const { filterSelectRef } = useQuizFilterFocus();

  const selectedValue = quizFilters[filterId]?.value ?? "";

  const handleValueChange = (value: string | null) => {
    const selectedOption = options?.find((option) => option.value === value) ?? null;
    onChange(filterId, selectedOption);
  };

  return (
    <div className="relative">
      <label
        className={`absolute top-0 right-0 z-10 text-right pointer-events-none font-bold text-[#1a73e8] mx-3 my-3 px-1
        transform transition-all bg-white duration-300 ease-in-out 
        ${selectedValue ? "text-[16px] -translate-y-full " : "text-[18px] translate-y-[0%]"}
        ${isLoading ? "opacity-50" : ""}`}
      >
        {label}
      </label>

      <AsyncSelect
        name={filterId}
        value={selectedValue}
        options={options}
        isLoading={isLoading}
        error={error}
        onRetry={loadOptions}
        onValueChange={handleValueChange}
        triggerRef={filterSelectRef}
        loadingMessage={loadingMessage}
      />
    </div>
  );
};

export default FilterSelect;
