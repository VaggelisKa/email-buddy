import { fetchEmails } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const useFetchEmails = (enabled?: boolean) => {
  return useQuery({
    queryKey: ["emails"],
    queryFn: fetchEmails,
    enabled,
  });
};

export default useFetchEmails;
