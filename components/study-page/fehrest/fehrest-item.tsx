import { toFaDigits } from "@/lib/toFaDigits";
import { FehrestSection } from "@/data/fehrestsData";

type Props = {
  section: FehrestSection;
  currentSectionPage: number;
  isActive: boolean;
  onClick: (section: FehrestSection) => void;
  checkActive: (currentSectionPage: number, section: FehrestSection) => boolean;
};

const FehrestItem = ({ section, currentSectionPage, onClick, isActive, checkActive }: Props) => {
  const expandedClass = isActive ? "max-h-screen" : "max-h-0";
  const isHighlighted = isActive ? "bg-[#e1a3c1]" : "hover:bg-[#e1a3c175]";
  const hasSubSection = section.sections && section.sections?.length > 0;
  const subitems = hasSubSection && (
    <ol
      className={`border-r-2 pr-1 mb-2 mr-3 overflow-hidden transition-[max-height] duration-300 ease-in-out ${expandedClass}`}
    >
      {section.sections?.map((subSection) => {
        return (
          <FehrestItem
            key={subSection.title}
            section={subSection}
            currentSectionPage={currentSectionPage}
            onClick={() => onClick(subSection)}
            isActive={checkActive(currentSectionPage, subSection)}
            checkActive={checkActive}
          />
        );
      })}
    </ol>
  );

  return (
    <li className="">
      <div
        className={`flex justify-between font-semibold py-1.25 px-2 pl-1 my-1 rounded cursor-pointer transition-colors duration-300 ${isHighlighted}`}
        onClick={() => onClick(section)}
      >
        <span className="h-full w-full my-auto text-sm">{section.title}</span>
        <span className="flex justify-center w-7 h-full p-1 border-2 rounded text-xs">
          {toFaDigits(section.page)}
        </span>
      </div>

      {subitems}
    </li>
  );
};

export default FehrestItem;
