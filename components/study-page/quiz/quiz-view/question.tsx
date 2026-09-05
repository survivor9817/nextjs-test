import ErrorFallback from "@/components/error-fallback";

type Props = {
  question: string | TrustedHTML;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
};

const Question = ({ question, isLoading, error, refetch }: Props) => {
  if (isLoading) {
    return (
      <div className="animate-pulse text-[16px] py-4 px-4 text-justify leading-7">
        <div className="space-y-2">
          <div className="h-4 md:h-5 flex-1 mr-4 bg-gray-200 rounded dark:bg-gray-400" />
          <div className="h-4 md:h-5 flex-1 bg-gray-200 rounded dark:bg-gray-400" />
          <div className="h-4 md:h-5 flex-1 bg-gray-200 rounded dark:bg-gray-400" />
          <div className="h-4 md:h-5 w-5/6 bg-gray-200 rounded dark:bg-gray-400" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-[16px] py-4 px-4 text-justify leading-7">
        <div className="h-full grid place-items-center">
          <ErrorFallback onRefetch={refetch} />
        </div>
      </div>
    );
  }

  const questionText = typeof question === "string" ? question : String(question);

  return (
    <div className="text-[16px] py-4 px-4 text-justify leading-7">
      <div dangerouslySetInnerHTML={{ __html: questionText }} />
    </div>
  );
};

export default Question;
