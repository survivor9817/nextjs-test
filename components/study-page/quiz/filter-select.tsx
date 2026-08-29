import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorFallback from "@/components/error-fallback";
import { useQuizFilterSelectData } from "./use-filters-data";
import { QuizFilterOption, QuizFiltersType } from "./use-filters";
import { FilterOption } from "@/data/quizFilterOptionsData";

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
  const { options, isLoading, error, loadOptions } = useQuizFilterSelectData(filterId, quizFilters);
  // const { filterSelectRef } = useQuizFilterFocus();

  const selectedValue = quizFilters[filterId]?.value ?? "";

  //   const handleValueChange = (value: string | null) => {
  //     const selectedOption = options?.find((option) => option.value === value) ?? null;
  //     onChange(filterId, selectedOption);
  //   };

  const handleValueChange = (value: string | null) => {
    console.log("value changed:", value, options);
    const selectedOption = options?.find((option) => option.value === value) ?? null;
    console.log("selectedOption:", selectedOption);
    onChange(filterId, selectedOption);
  };

  //   const handleValueChange = (value: string | null) => {
  //     if (!value) return; // اگر نال یا خالی بود استیت را تغییر نده

  //     const selectedOption = options?.find((option) => option.value === value) ?? null;
  //     onChange(filterId, selectedOption);
  //   };

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

      <Select
        name={filterId}
        value={selectedValue}
        onValueChange={handleValueChange}
        disabled={isLoading}
      >
        <SelectTrigger
          // ref={filterSelectRef}
          className="w-full h-[52px] rounded-lg border-2 border-[rgb(200,200,200)] text-right justify-between font-bold text-[16px] cursor-pointer data-[disabled]:bg-[#f5f5f5] data-[disabled]:cursor-wait"
        >
          <SelectValue placeholder={isLoading ? loadingMessage : ""} />
        </SelectTrigger>

        <SelectContent className="z-[9999]" alignItemWithTrigger={false}>
          {error ? (
            <div className="p-2">
              <ErrorFallback onRefetch={loadOptions} ErrorMsg="خطا در بارگذاری گزینه‌ها" />
            </div>
          ) : options && options.length > 0 ? (
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-sm text-muted-foreground text-right">گزینه‌ای موجود نیست</div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSelect;
