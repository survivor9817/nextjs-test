import { useEffect, useRef } from "react";
import { useStudyTabs } from "../tabs-provider";
import { useBookContext } from "../book/book-provider";

type Props = { answer: string | TrustedHTML };

const Answer = ({ answer }: Props) => {
  // const { answerContainerRef } = useAnswer();
  const answerContainerRef = useRef<HTMLDivElement>(null);
  const { goToPage, currentBookLastPage } = useBookContext();
  const { changeTab } = useStudyTabs();

  useEffect(() => {
    const container = answerContainerRef.current;
    if (!container) return;

    const goToQuestionRef = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".ref-page") as HTMLElement | null;
      if (target) {
        if (!currentBookLastPage) return;
        const refPageNumber = Number(target.dataset.refPage);
        if (!refPageNumber || isNaN(refPageNumber) || refPageNumber > currentBookLastPage) return;
        goToPage(refPageNumber);
        changeTab("book");
      }
    };

    container.addEventListener("click", goToQuestionRef);

    return () => container.removeEventListener("click", goToQuestionRef);
  }, [answer]);

  return (
    <div
      ref={answerContainerRef}
      className="text-[16px] py-4 px-4 text-justify leading-7"
      dangerouslySetInnerHTML={{ __html: answer }}
    />
  );
};

export default Answer;
