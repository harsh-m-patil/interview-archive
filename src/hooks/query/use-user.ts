import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: getUser,
    staleTime: Infinity,
  });
};

const getUser = async () => {
  const res = await fetch("api/session");
  if (res.ok) {
    const data = await res.json();
    return data.user;
  }

  return null;
};
