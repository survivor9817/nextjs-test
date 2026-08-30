// ──────────────────────────────────────────────────────────────
//  فایل: StartQuizBtn.tsx
// ──────────────────────────────────────────────────────────────
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

/* ----------------------------------------------------------------
   Props
----------------------------------------------------------------- */
type StartQuizBtnProps = {
  /** نمایش یا مخفی شدن دکمه (برای انیمیشن) */
  show?: boolean;

  /** حالت Loading – آیکون spinner و متن جایگزین می‌شوند */
  loading?: boolean;

  /** حالت غیرفعال (به‌علاوه حالت loading) */
  disabled?: boolean;

  /** handler کلیک (اگر داخل فرم استفاده می‌کنید می‌توانید `type="submit"` بگذارید) */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /** نوع دکمه – پیش‌فرض "button" (می‌توانید "submit" هم بدهید) */
  type?: "button" | "submit";
};

/* ----------------------------------------------------------------
   کامپوننت
----------------------------------------------------------------- */
export const StartQuizBtn = ({
  show = true,
  loading = false,
  disabled = false,
  onClick,
  type = "button",
}: StartQuizBtnProps) => {
  const isDisabled = disabled || loading;

  return (
    <div
      className={cn(
        "absolute bottom-0 right-1/2 translate-x-1/2 flex items-center p-1.75 min-w-57.5 h-16 border-2 rounded-full z-4",
        "transition-[opacity,transform] duration-300 bg-white border-gray-300",
        show ? "visible opacity-100 translate-y-9" : "opacity-0 invisible",
      )}
    >
      <Button
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className="w-full h-full rounded-full bg-black text-white hover:bg-gray-800"
      >
        {loading ? (
          <>
            <Spinner />
            <span>در حال شروع تمرین ...</span>
          </>
        ) : (
          <span>شروع تمرین</span>
        )}
      </Button>
    </div>
  );
};

export default StartQuizBtn;
