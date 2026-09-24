import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <a href="/" className="flex items-center mr-2 ">
      <i className="msr text-[32px]">school</i>

      <div className="text-2xl my-1 px-2 rounded-3xl border-[#bcbcbc] ">درس‌یاور</div>
    </a>
  );
};

export default Logo;
