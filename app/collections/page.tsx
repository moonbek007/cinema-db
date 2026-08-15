import { dehydrate } from "@tanstack/react-query";

import CollectionsDisplay from "@/components/CollectionsDisplay/CollectionsDisplay";

import { fetchCollections } from "@/lib/utils";
import { getQueryClient } from "@/lib/getQueryClient";

export default async function Collections() {
  const queryClient = getQueryClient();

  // Prefetch using a dynamic key built directly from search parameters
  await queryClient.prefetchQuery({
    queryKey: ["collections", {}],
    queryFn: () => fetchCollections(),
  });

  const plainDehydratedState = dehydrate(queryClient);

  return (
    <>
      <CollectionsDisplay dehydratedState={plainDehydratedState} />
    </>
  );
}
