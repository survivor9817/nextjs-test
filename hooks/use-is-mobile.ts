// hooks/use-mobile.ts (یا داخل همان کامپوننت)
import { useMediaQuery } from "./use-media-query";

export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)", {
    defaultValue: false,
    initializeWithValue: false, // جلوگیری از خطای هیدریشن در Next.js SSR
  });
}
