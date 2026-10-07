"use client";
import Link from "next/link";
import Logo from "../logo";
import { MenuButton } from "./menu/menu-sheet";

const StudyPageNavbar = () => {
  return (
    <>
      <div
        className="flex mx-1 justify-between gap-4 border-2 border-t-0 
                    rounded-b-3xl bg-[#eee] border-[#bcbcbc] h-14"
      >
        <div className="flex justify-center gap-4 mx-1">
          <Logo />
        </div>
        <div className="flex items-center gap-4 mx-1">
          <MenuButton />
        </div>
      </div>
    </>
  );
};

export default StudyPageNavbar;
