import { Button } from "@/components/ui/button"; // یا هر نامی که برای دکمه پایه Shadcn استفاده می‌کنی
import { Loader2 } from "lucide-react";

type Props = {
  className?: string;
  icon: string;
  isDisabled?: boolean;
  iconClassName?: string;
  onClick?: () => void;
  isLoading?: boolean;
  iconSize?: string;
};

const IconBtn = ({
  className,
  icon,
  iconClassName = "",
  isDisabled = false,
  isLoading = false,
  onClick = undefined,
  iconSize = "48px",
}: Props) => {
  return (
    <>
      {isLoading ? (
        <Button
          disabled
          className={`size-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 ${
            className || ""
          }`}
          aria-label="در حال بارگذاری"
        >
          <Loader2 className="animate-spin size-6" />
        </Button>
      ) : (
        <Button
          className={`flex justify-center items-center rounded-full transition-all ${
            className || ""
          }`}
          disabled={isDisabled}
          onClick={onClick}
        >
          <i
            style={{ fontSize: iconSize }}
            className={`msr bg-transparent transition-transform duration-100 ease-in-out rounded-full select-none tap-highlight-transparent outline-none hover:scale-[1.07] active:scale-[0.95] focus:outline-none ${
              iconClassName || ""
            }`}
          >
            {icon}
          </i>
        </Button>
      )}
    </>
  );
};

export default IconBtn;
