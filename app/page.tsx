import { dehydrate } from "@tanstack/react-query";

import MainDisplay from "@/components/MainDisplay/MainDisplay";

import { fetchMoviesPreview } from "@/lib/utils";
import { getQueryClient } from "@/lib/getQueryClient";

export default async function Home() {
  const queryClient = getQueryClient();

  // Prefetch using a dynamic key built directly from search parameters
  await queryClient.prefetchQuery({
    queryKey: ["moviesPreview", {}],
    queryFn: () => fetchMoviesPreview(),
  });

  const plainDehydratedState = dehydrate(queryClient);

  return (
    <>
      <MainDisplay dehydratedState={plainDehydratedState} />
    </>
  );
}
