"use client";
import IconBtn from "@/components/ui/icon-btn";
import StopWatch from "./stop-watch";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Timer } from "lucide-react";
import IconButton from "@/components/ui/icon-button";

function StopWatchDrawer() {
  return (
    <ResponsiveDialog
      trigger={
        <IconButton
          icon={
            // <span className="msr text-5xl">timer</span>
            <Timer className="size-5" strokeWidth={3} />
          }
        />
      }
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
