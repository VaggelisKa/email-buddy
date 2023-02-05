import { fetchEmails } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const useFetchEmails = () => {
  return useQuery({
    queryKey: ["emails"],
    queryFn: fetchEmails,
  });
};

export default useFetchEmails;
