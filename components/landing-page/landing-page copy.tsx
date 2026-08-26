import LandingNavbar from "@/components/landing-page/landing-navbar";
import HeroTypeWriter from "@/components/landing-page/hero-typewriter";
import ChooseBook from "@/components/landing-page/choose-book";
import ArrowDown from "./arrow-down";

const LandingPage = () => {
  return (
    <div className="flex flex-row justify-center">
      <div className="min-w-75 max-w-4xl w-200 ">
        <LandingNavbar />

        <HeroTypeWriter />

        <div className="flex justify-center gap-6">
          <ArrowDown className="size-12 sm:size-18" />
          <ArrowDown className="size-12 sm:size-18" />
          <ArrowDown className="size-12 sm:size-18" />
        </div>

        <ChooseBook />
        {/* <ChooseBook2 /> */}
      </div>
    </div>
  );
};

export default LandingPage;
