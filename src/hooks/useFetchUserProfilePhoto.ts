import { fetchUserProfilePhoto } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const useFetchUserProfilePhoto = (enabled?: boolean) => {
  return useQuery({
    queryKey: ["userProfilePhoto"],
    queryFn: fetchUserProfilePhoto,
    enabled,
    staleTime: 60 * 60 * 1000, // 1 hours,
    cacheTime: 1.1 * 60 * 60 * 1000, // 1 hours 6 minutes,
  });
};

export default useFetchUserProfilePhoto;
