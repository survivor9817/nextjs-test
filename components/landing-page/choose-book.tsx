"use client";
import { useChooseBook } from "@/hooks/use-choose-book";
import BookShelf from "./book-shelf";
import { Button } from "../ui/button";
import FieldSelect from "./field-select";

const ChooseBook = () => {
  const {
    grades,
    fields,
    selectedGrade,
    setSelectedGrade,
    selectedField,
    setSelectedField,
    filteredBooks,
  } = useChooseBook();

  return (
    <div className="mb-6">
      <div className="flex flex-col items-center justify-center mt-8">
        <p className="text-lg md:text-xl lg:text-2xl">کتابت رو بردار و خواندن رو شروع کن</p>

        <div className="grid grid-cols-3 flex-wrap justify-center gap-2 w-75 sm:w-90 md:w-110 my-4 ">
          {grades.map((grade) => (
            <Button
              key={grade.id}
              variant={selectedGrade.label === grade.label ? "default" : "secondary"}
              // variant={selectedGrade.label === grade.label ? "default" : "secondary"}
              className={"h-10"}
              onClick={() => setSelectedGrade(grade)}
            >
              {grade.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 my-2 mx-4">
        <span className="text-xl py-1">کتابخانه پایه {selectedGrade.label}</span>
        {selectedGrade.dore === "متوسطه دوم" ? (
          <FieldSelect
            fields={fields}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
          />
        ) : null}
      </div>

      <BookShelf books={filteredBooks} />
    </div>
  );
};

export default ChooseBook;
