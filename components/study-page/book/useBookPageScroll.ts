import { useEffect, useRef } from "react";
import { useBookContext } from "./book-provider";

export const useBookPageScroll = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const { currentBookId, currentPage } = useBookContext();
  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({
        // behavior: "smooth",
        block: "start",
      });

      // pageRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentBookId, currentPage]);

  return { pageRef };
};
