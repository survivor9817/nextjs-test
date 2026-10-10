import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  tag?: string | null;
  isLoading?: boolean;
};

const QuestionTag = ({ tag, isLoading = false }: Props) => {
  if (!isLoading && !tag) return null;

  return (
    <>
      {isLoading ? (
        <div
          aria-busy="true"
          className="h-8 w-28 animate-pulse rounded-full bg-gray-300 dark:bg-gray-400"
        />
      ) : (
        <Badge
          variant="secondary"
          className="h-8 rounded-[48px] border-[#bcbcbc] px-4 py-2 text-sm"
        >
          <span className="truncate">{tag}</span>
        </Badge>
      )}
    </>
  );
};

export default QuestionTag;
