// useBookSelectData.ts
import { useQuery } from "@tanstack/react-query";
import { fetchBookSelectOptions } from "@/services/client/fetchBookSelectOptions";

// export const useBookSelectData = (userId:string) => {
export const useBookSelectData = () => {
  const {
    data: BookSelectData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBookSelectOptions,
  });

  return { BookSelectData, isLoading, error, loadBookSelectData: refetch };
};
