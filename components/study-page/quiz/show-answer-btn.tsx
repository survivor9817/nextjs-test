import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Button> & {
  isAnswerVisible: boolean;
};

const ShowAnswerBtn = ({ isAnswerVisible, className, ...props }: Props) => {
  return (
    <div
      className="shrink-0 w-full px-2 transition-[width] ease-in-out duration-400"
      style={{
        width: isAnswerVisible ? "120px" : "100%",
      }}
    >
      <Button
        {...props}
        className={cn(
          "shrink-0 w-full h-12 p-2 flex items-center justify-center",
          "bg-black text-white whitespace-nowrap overflow-hidden",
          "hover:bg-[#333] transition-[width,border-radius] duration-400 ease-in-out",
          className,
        )}
        style={{
          borderRadius: isAnswerVisible ? "150px 150px 25px 150px" : "150px",
        }}
      >
        {isAnswerVisible ? "بستن پاسخ" : "مشاهده پاسخ تشریحی"}
      </Button>
    </div>
  );
};

export default ShowAnswerBtn;
