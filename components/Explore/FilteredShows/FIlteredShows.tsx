"use client";

import { Suspense, useEffect } from "react";
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
import { ERROR_TYPES, QueryParams } from "@/constants/constants";

const FIlteredShows = ({ resolvedSearchParams }: FIlteredShowsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["shows", { ...resolvedSearchParams }],
    queryFn: () =>
      fetchFilteredShows(getQueryParamsValues(resolvedSearchParams)),
    retry: false,
  });

  useEffect(() => {
    if (!isError) return;

    const err = error as unknown as ErrorWithPayload;
    const page = searchParams.get(QueryParams.PAGE);
    if (err.status === 400) {
      if (!page) return;

      if (parseInt(page) < 1) {
        handleChangePage(1);
        return;
      }
      if (err.payload.totalPages && parseInt(page) > err.payload.totalPages) {
        handleChangePage(err.payload.totalPages);
        return;
      }
    }
  }, [isError]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    const err = error as unknown as ErrorWithPayload;
    let errorType: ERROR_TYPES;
    switch (err.status) {
      case 400:
        errorType = ERROR_TYPES.BAD_REQUEST;
        break;
      case 404:
        errorType = ERROR_TYPES.NOT_FOUND;
        break;
      case 500:
        errorType = ERROR_TYPES.SERVER_ERROR;
        break;
      default:
        errorType = ERROR_TYPES.SERVER_ERROR;
    }
    return <Error type={errorType} />;
  }

  const shows = getFilteredShows(
    searchParams.get(QueryParams.SEARCH),
    data.shows as Show[],
  );

  // Get page details from searchParams for the initial render
  const pageDetails = getPageDetails(
    searchParams.get(QueryParams.PAGE),
    data.count as number,
  );

  function handleChangePage(pageNumber: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(QueryParams.PAGE, `${pageNumber}`);

    router.push(`${pathname}?${params.toString()}`);
  }

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
