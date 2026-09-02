import IconBtn from "@/components/ui/icon-btn";
import React from "react";
import StopWatchDrawer from "./stop-watch-drawer";

type Props = {
  isOnFirst: boolean;
  isOnLast: boolean;
  goToPrev: () => void;
  goToNext: () => void;
  openEndConfirm: () => void;
};

const QuizNavbar = ({ isOnFirst, isOnLast, goToPrev, goToNext, openEndConfirm }: Props) => {
  return (
    <div className="flex justify-between items-center h-12 mb-1">
      <div className="flex">
        <IconBtn
          icon={<span className="msr text-5xl">arrow_circle_left</span>}
          disabled={isOnFirst}
          onClick={goToPrev}
        />
        {/* <IconBtn icon={<span className="msr text-5xl">timer</span>} onClick={openStopwatch} /> */}
        {/* {stopwatch && <StopwatchModal onClose={closeStopwatch} />} */}
        <StopWatchDrawer />
      </div>

      <div className="flex">
        <IconBtn
          className={"text-red-700"}
          icon={<span className="msr text-5xl">power_settings_circle</span>}
          // onClick={openEndConfirm}
          onClick={openEndConfirm}
        />
        <IconBtn
          icon={<span className="msr text-5xl">arrow_circle_left</span>}
          disabled={isOnLast}
          onClick={goToNext}
        />
      </div>
    </div>
  );
};

export default QuizNavbar;
