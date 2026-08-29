import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterOption = {
  value: string;
  label: string;
};

const mockOptions: FilterOption[] = [
  { value: "", label: "" },
  { value: "chapter1", label: "فصل اول" },
  { value: "chapter2", label: "فصل دوم" },
  { value: "chapter3", label: "فصل سوم" },
];

const QuizFilterSelectDemo = () => {
  const [selected, setSelected] = useState<FilterOption>(mockOptions[0]);
  const [isLoading, setIsLoading] = useState(false);
  const loadingMessage = "در حال بارگذاری بخش‌های کتاب...";
  const label = "از کجای کتاب می‌خوای؟";

  const handleValueChange = (value: string | null) => {
    const option = mockOptions.find((o) => o.value === value) ?? mockOptions[0];
    setSelected(option);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto mt-10">
      <label
        className={`absolute top-0 right-0 z-10 text-right pointer-events-none font-bold text-[#1a73e8] mx-3 my-3 px-1
        transform transition-all bg-white duration-300 ease-in-out 
        ${selected.value ? "text-[16px] -translate-y-full " : "text-[18px] translate-y-[0%]"}
        ${isLoading ? "opacity-50" : ""}`}
      >
        {label}
      </label>

      <Select
        name="Where"
        value={selected.value}
        onValueChange={handleValueChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full h-13 rounded-lg border-2 border-[rgb(200,200,200)] text-right justify-between font-bold text-[16px] cursor-pointer data-disabled:bg-[#f5f5f5] data-disabled:cursor-wait">
          <SelectValue placeholder={isLoading ? loadingMessage : ""} />
        </SelectTrigger>

        <SelectContent className="z-[9999]" alignItemWithTrigger={false}>
          {mockOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={!!!option.value}
              hidden={!!!option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <button
        type="button"
        onClick={() => setIsLoading((prev) => !prev)}
        className="mt-4 text-sm underline"
      >
        toggle loading (تست)
      </button>
    </div>
  );
};

export default QuizFilterSelectDemo;
