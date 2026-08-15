"use client";

import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";

import SearchBar from "./SearchBar/SearchBar.tsx";
import FIlteredShows from "./FilteredShows/FIlteredShows.tsx";
import Filters from "./FiltersSection/Filters.tsx";

import { getQueryClient } from "@/lib/getQueryClient.ts";

import "../../css/filters.css";

function ExploreDisplay({
  queryFilters,
  dehydratedState,
  searchParams,
}: ExploreDisplayProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <div className="filters">
          <div className="filters__display">
            <div className="filters__display__row1">
              <h1>
                <span>Shows</span>
              </h1>
              <Filters queryFilters={queryFilters} />
              <SearchBar />
            </div>
            <div className="separator"> </div>
            <FIlteredShows resolvedSearchParams={searchParams} />
          </div>
        </div>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default ExploreDisplay;
