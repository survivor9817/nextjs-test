import { useEffect, useRef } from "react";
import { useBookContext } from "../components/BookProvider";

export const useBookPageScroll = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const { currentBook, currentPage } = useBookContext();
  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({
        // behavior: "smooth",
        block: "start",
      });

      // pageRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentBook, currentPage]);

  return { pageRef };
};
