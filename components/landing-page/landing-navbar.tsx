"use client";
import AuthModalBtn from "./auth-modal-btn";

const LandingNavbar = () => {
  return (
    <>
      <div
        className="flex mx-2 justify-between gap-4 border-2 border-t-0 
                    rounded-b-3xl bg-[#eee] border-[#bcbcbc] h-14"
      >
        <div className="flex justify-center gap-4 mx-1">
          <a href="#" className="flex items-center mr-2 ">
            <i className="msr text-[32px]">school</i>

            <div className="text-2xl my-1 px-2 rounded-3xl border-[#bcbcbc] ">درس‌یاور</div>
          </a>
        </div>
        <div className="flex items-center gap-4 mx-1">
          <AuthModalBtn />
        </div>
      </div>
    </>
  );
};

export default LandingNavbar;
