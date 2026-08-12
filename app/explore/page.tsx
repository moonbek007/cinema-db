import { Suspense } from "react";

import ExploreDisplay from "@/components/Explore/Explore";
import ExploreFallback from "@/components/Explore/ExploreFallback";

import { fetchFilteredShows, getQueryParamsValues } from "@/lib/utils";
import { FilterTypes } from "@/constants/constants";

export default async function Explore({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const resolvedSearchParams = await searchParams;

  // Get filters from searchParams for the initial render
  const queryFilters: FilterShowsPropsType[] = [];
  [...Object.entries(searchParams)].forEach((param) => {
    queryFilters.push({
      name: param[0] as FilterTypes,
      applied: param[1].split("&"),
    });
  });

  // Fetch Shows using query params
  const shows = await fetchFilteredShows(
    getQueryParamsValues(resolvedSearchParams),
  );
  return (
    <>
      <Suspense fallback={<ExploreFallback />}>
        <ExploreDisplay queryFilters={queryFilters} shows={shows} />
      </Suspense>
    </>
  );
}
