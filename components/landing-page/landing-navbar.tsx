"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./logo";

const LandingNavbar = () => {
  return (
    <>
      <div
        className="flex mx-2 justify-between gap-4 border-2 border-t-0 
                    rounded-b-3xl bg-[#eee] border-[#bcbcbc] h-14"
      >
        <div className="flex justify-center gap-4 mx-1">
          <Logo />
        </div>
        <div className="flex items-center gap-4 mx-1">
          <Button
            nativeButton={false}
            render={<Link href="/sign-in">ورود / ثبت‌نام</Link>}
            variant={"unstyled"}
            className="h-11 border-2 border-[#bcbcbc] hover:bg-[#ddd] px-4 transition-colors duration-200 ease-in-out text-sm"
          />
        </div>
      </div>
    </>
  );
};

export default LandingNavbar;
