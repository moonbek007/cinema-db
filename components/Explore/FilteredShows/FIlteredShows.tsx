"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import FilterResult from "../FilterResult";
import FilterResultFallback from "../FilterResultFallback";
import Pagination from "../Pagination";

import {
  fetchFilteredShows,
  getFilteredShows,
  getPageDetails,
  getPaginationIndecies,
  getQueryParamsValues,
} from "@/lib/utils";
import { QueryParams } from "@/constants/constants";

const FIlteredShows = ({ resolvedSearchParams }: FIlteredShowsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data } = useQuery({
    queryKey: ["shows", { ...resolvedSearchParams }],
    queryFn: () =>
      fetchFilteredShows(getQueryParamsValues(resolvedSearchParams)),
  });

  const shows = getFilteredShows(
    searchParams.get(QueryParams.SEARCH),
    data as Show[],
  );

  // Get page details from searchParams for the initial render
  const pageDetails = getPageDetails(
    searchParams.get(QueryParams.PAGE),
    shows.length,
  );

  const paginationIndecies = getPaginationIndecies(pageDetails, shows.length);

  const handleChangePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(QueryParams.PAGE, `${pageNumber}`);

    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  return (
    <>
      {!shows.length && (
        <div className="filters__display-empty">
          <p>
            No matching shows, please apply different filters or a search word.
          </p>
        </div>
      )}
      <div className="filters__display__results">
        {shows
          .slice(paginationIndecies.start, paginationIndecies.end + 1)
          .map((show) => {
            return (
              <Suspense key={show.id} fallback={<FilterResultFallback />}>
                <FilterResult
                  image={show.image ? show.image.medium : "/horror.avif"}
                  key={show.id}
                  link={show.url}
                  name={show.name}
                />
              </Suspense>
            );
          })}
      </div>
      {pageDetails.totalPages > 1 && (
        <Pagination page={pageDetails} changePage={handleChangePage} />
      )}
    </>
  );
};

export default FIlteredShows;
