import { fetchFehrest } from "@/services/client/fetchFehrest";
import { useQuery } from "@tanstack/react-query";

export function useFehrestData(bookId: string | undefined) {
  return useQuery({
    queryKey: ["bookFehrest", bookId],
    queryFn: () => fetchFehrest(bookId!),
    enabled: Boolean(bookId),
  });
}
