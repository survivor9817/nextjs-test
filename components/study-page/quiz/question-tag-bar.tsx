import type { MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  tags: string[];
  loading?: boolean;
};

const QuestionTagBar = ({ tags, loading = false }: Props) => {
  const onMouseLeave = (e: MouseEvent) => {
    e.currentTarget.scrollTo({ left: 0 });
  };

  return (
    <div
      className={cn(
        "absolute left-0 top-1/2 -translate-y-1/2 max-w-34 hover:max-w-full",
        "bg-white rounded-full overflow-auto z-3",
        "transition-[max-width] duration-300 ease-in-out",
        "scrollbar-none [-ms-overflow-style:none]",
      )}
      onMouseLeave={onMouseLeave}
    >
      <ul className="inline-flex rounded-full flex-row gap-2 mx-2 h-12">
        {loading ? (
          <Badge
            render={<li className="shrink-0 first:w-30" />}
            className="cursor-pointer whitespace-nowrap rounded-[48px] bg-black px-4 py-2 text-[16px] text-white hover:bg-[#333] h-full"
          >
            <div className="animate-pulse h-4 md:h-5 flex-1 bg-gray-200 rounded dark:bg-gray-400" />
          </Badge>
        ) : (
          tags.map((tag) => (
            <Badge
              key={tag}
              render={<li className="shrink-0 first:w-30" />}
              className="cursor-pointer whitespace-nowrap rounded-[48px] bg-black px-4 py-2 text-[16px] text-white hover:bg-[#333] h-full"
            >
              {tag}
            </Badge>
          ))
        )}
      </ul>
    </div>
  );
};

export default QuestionTagBar;
