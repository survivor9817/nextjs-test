import type { MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ScrollRow from "./horizontal-scroll";

type Props = {
  tags?: string[];
  isLoading?: boolean;
};

const SKELETON_COUNT = 6;

const QuestionTagRow = ({ tags, isLoading = false }: Props) => {
  if (!isLoading && !tags?.length) return null;

  return (
    <ScrollRow>
      <ul aria-busy={isLoading} className="inline-flex flex-row gap-2 mx-3 h-12 items-center">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <li
                key={i}
                className="h-6 w-15 shrink-0 animate-pulse rounded-full bg-gray-300 dark:bg-gray-400"
              />
            ))
          : tags!.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                // className="h-8 px-4 py-2 rounded-[48px] text-sm whitespace-nowrap cursor-pointer border-[#bcbcbc]"
                className="h-6 px-3 py-2"
                render={<li className="shrink-0" />}
              >
                {tag}
              </Badge>
            ))}
      </ul>
    </ScrollRow>
  );
};

export default QuestionTagRow;
