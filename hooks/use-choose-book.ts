import { useEffect, useState } from "react";
import { FIELDS, getBooks, Grade, GRADES, type Book, type Field } from "../data/booksData";

export const useChooseBook = () => {
  // no fetch
  const grades = GRADES;
  const fields = FIELDS;

  // no fetch
  const [selectedGrade, setSelectedGrade] = useState<Grade>(grades[0]);
  const [selectedField, setSelectedField] = useState<Field>(fields[0]);
  const filters = {
    gradeId: selectedGrade?.id,
    fieldId: selectedField.id,
    //   isAvailable: true
  };

  // fetch
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(getBooks({ gradeId: 7 }));

  useEffect(() => {
    // fetch
    const availables = getBooks({ ...filters, isAvailable: true });
    const unavailables = getBooks({ ...filters, isAvailable: false });
    const filteredBooks = [...availables, ...unavailables];

    setFilteredBooks(filteredBooks);
  }, [selectedGrade, selectedField]);

  return {
    grades,
    fields,
    selectedGrade,
    setSelectedGrade,
    selectedField,
    setSelectedField,
    filteredBooks,
  };
};
