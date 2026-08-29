import { useQuery } from "@tanstack/react-query";
import { useBookContext } from "../book/book-provider";
import BookSelect from "./book-select";
import FehrestList from "./fehrest-list";
import { fetchBookSelectOptions } from "@/services/client/fetchBookSelectOptions";

type Props = {};

const Fehrest = (props: Props) => {
  return (
    <div>
      <header className="flex justify-center min-w-0">
        <BookSelect />
      </header>
      <div className="w-full flex justify-center">
        <FehrestList />
      </div>
    </div>
  );
};

export default Fehrest;
