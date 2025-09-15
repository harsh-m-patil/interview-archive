import { useQuery } from "@tanstack/react-query";

export const useGroupDetails = (groupId: string) => {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => fetchGroupDetails(groupId),
    enabled: !!groupId,
    staleTime: 30000, // 30 seconds
  });
};

async function fetchGroupDetails(groupId: string) {
  const res = await fetch(`/api/groups/${groupId}`);
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to fetch group details");
  }

  return res.json();
}