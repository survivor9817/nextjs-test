"use client";
import IconBtn from "@/components/ui/icon-btn";
import StopWatch from "./stop-watch";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";

function StopWatchDrawer() {
  return (
    <ResponsiveDialog
      trigger={<IconBtn icon={<span className="msr text-5xl">timer</span>} />}
      title="کرنومتر"
      description="ابزار ثبت و اندازه‌گیری زمان"
    >
      <div className="flex flex-col items-center justify-center py-2">
        <StopWatch />
      </div>
    </ResponsiveDialog>
  );
}

export default StopWatchDrawer;
