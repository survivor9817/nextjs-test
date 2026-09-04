type Props = {
  questionDetails: string;
};

const QuestionDetails = ({ questionDetails }: Props) => {
  const isEmpty = !questionDetails?.trim();

  return (
    <div className="flex justify-center items-center h-full max-h-full border-2 rounded-full mx-2 bg-black text-white text-center">
      {isEmpty ? (
        <span className="animate-pulse h-4 w-full mx-10 md:h-5 bg-gray-200 rounded dark:bg-gray-400" />
      ) : (
        <span>{questionDetails}</span>
      )}
    </div>
  );
};

export default QuestionDetails;
