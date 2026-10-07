import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { toFaDigits } from "@/lib/toFaDigits";
import { FehrestSection } from "@/data/fehrestsData";
import { Button } from "@/components/ui/button";
import { checkActive } from "./fehrest-utils";

type Props = {
  section: FehrestSection;
  currentSectionPage: number | null;
  isActive: boolean;
  onClick: (section: FehrestSection) => void;
};

const FehrestItem = ({ section, currentSectionPage, onClick, isActive }: Props) => {
  const isHighlighted = isActive ? "bg-[#e1a3c1]" : "hover:bg-[#e1a3c175]";
  const hasSubSection = section.sections && section.sections?.length > 0;

  const shouldClose = !hasSubSection || isActive;

  return (
    <li>
      <Button
        variant={"unstyled"}
        data-close-fehrest={shouldClose ? "true" : undefined}
        className={`flex justify-between items-center gap-2 w-full min-w-0 text-start font-semibold py-1.25 px-2 pl-1 my-1 rounded cursor-pointer transition-colors duration-300 ${isHighlighted}`}
        onClick={() => onClick(section)}
      >
        <span className="min-w-0 flex-1 truncate my-auto text-sm leading-6" title={section.title}>
          {section.title}
        </span>
        <span className="flex justify-center w-7 shrink-0 h-full p-1 border-2 rounded text-xs">
          {toFaDigits(section.page)}
        </span>
      </Button>

      {hasSubSection && (
        <Collapsible open={isActive}>
          <CollapsibleContent
            render={<ol />}
            className="border-r-2 pr-1 mr-3 overflow-hidden h-(--collapsible-panel-height) transition-all duration-300 data-starting-style:h-0 data-ending-style:h-0"
          >
            {section.sections?.map((subSection) => (
              <FehrestItem
                key={subSection.title}
                section={subSection}
                isActive={
                  currentSectionPage !== null && checkActive(currentSectionPage, subSection)
                }
                onClick={() => onClick(subSection)}
                currentSectionPage={currentSectionPage}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </li>
  );
};

export default FehrestItem;
