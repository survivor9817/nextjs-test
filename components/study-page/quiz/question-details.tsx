import { toFaDigits } from "@/lib/toFaDigits";

type Props = {
  questionDetails: string;
};

const QuestionDetails = ({ questionDetails }: Props) => {
  return (
    <div className="flex justify-center items-center h-full border-2 rounded-full mx-2 bg-black text-white text-center">
      {/* {"نمره تاریخ منبع"} */}
      {questionDetails}
    </div>
  );
};

export default QuestionDetails;
