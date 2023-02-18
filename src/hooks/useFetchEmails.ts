import { fetchEmails } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const useFetchEmails = () => {
  return useQuery({
    queryKey: ["emails"],
    queryFn: fetchEmails,
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
};

export default useFetchEmails;
