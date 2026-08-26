import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "@/data/booksData";
import { Dispatch, SetStateAction } from "react";

type Props = {
  fields: Field[];
  selectedField: Field;
  setSelectedField: Dispatch<SetStateAction<Field>>;
};

const FieldSelect = ({ fields, selectedField, setSelectedField }: Props) => {
  return (
    <Select
      items={fields}
      value={selectedField}
      onValueChange={(value) => {
        if (value !== null) {
          setSelectedField(value);
        }
      }}
    >
      <SelectTrigger className="w-full max-w-26">
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          <SelectLabel>رشته تحصیلی</SelectLabel>
          {fields.map((field) => (
            <SelectItem key={field.value} value={field}>
              {field.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default FieldSelect;
