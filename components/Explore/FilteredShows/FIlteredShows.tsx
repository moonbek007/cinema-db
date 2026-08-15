"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import FilterResult from "../FilterResult";
import FilterResultFallback from "../FilterResultFallback";
import Pagination from "../Pagination";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

import {
  fetchFilteredShows,
  getFilteredShows,
  getPageDetails,
  getQueryParamsValues,
} from "@/lib/utils";
import { QueryParams } from "@/constants/constants";

const FIlteredShows = ({ resolvedSearchParams }: FIlteredShowsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["shows", { ...resolvedSearchParams }],
    queryFn: () =>
      fetchFilteredShows(getQueryParamsValues(resolvedSearchParams)),
    retry: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const shows = getFilteredShows(
    searchParams.get(QueryParams.SEARCH),
    data.shows as Show[],
  );

  console.log(data);

  // Get page details from searchParams for the initial render
  const pageDetails = getPageDetails(
    searchParams.get(QueryParams.PAGE),
    data.count as number,
  );
  // Bug when page number is greater than the totalPages on first render

  const handleChangePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(QueryParams.PAGE, `${pageNumber}`);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {/* Shows not being fetched / Server Error for All pages*/}
      {!shows.length && (
        <div className="filters__display-empty">
          <p>
            No matching shows, please apply different filters or a search word.
          </p>
        </div>
      )}
      <div className="filters__display__results">
        {shows.map((show) => {
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
