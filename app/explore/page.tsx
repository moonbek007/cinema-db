import { dehydrate } from "@tanstack/react-query";

import ExploreDisplay from "@/components/Explore/Explore";

import { getQueryClient } from "@/lib/getQueryClient";
import {
  fetchFilteredShows,
  getQueryParamsValues,
  getSearchParams,
} from "@/lib/utils";

import { FilterTypes } from "@/constants/constants";

export default async function Explore({ searchParams }: ExplorePageProps) {
  const resolvedSearchParams = getSearchParams(await searchParams);

  // Get filters from searchParams for the initial render
  const queryFilters: FilterShowsPropsType[] = [];
  [...Object.entries(resolvedSearchParams)].forEach((param) => {
    queryFilters.push({
      name: param[0] as FilterTypes,
      applied: param[1].split("&"),
    });
  });

  const queryClient = getQueryClient();

  // Prefetch using a dynamic key built directly from search parameters
  await queryClient.prefetchQuery({
    queryKey: ["shows", { ...resolvedSearchParams }],
    queryFn: () =>
      fetchFilteredShows(getQueryParamsValues(resolvedSearchParams)),
  });

  const plainDehydratedState = dehydrate(queryClient);

  return (
    <>
      <ExploreDisplay
        queryFilters={queryFilters}
        searchParams={resolvedSearchParams}
        dehydratedState={plainDehydratedState}
      />
    </>
  );
}
