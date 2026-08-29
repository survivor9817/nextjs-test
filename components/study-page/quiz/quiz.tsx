import FilterSelect from "./filter-select";
import { useFilters } from "./use-filters";

const Quiz = () => {
  const { quizFilters, clearFilters, onChangeFilterSelect } = useFilters();
  return (
    <>
      <FilterSelect
        filterId="where"
        label="از کجای کتاب می‌خوای؟"
        quizFilters={quizFilters}
        onChange={onChangeFilterSelect}
        loadingMessage="در حال بارگذاری بخش‌های کتاب..."
      />
    </>
  );
};

export default Quiz;
