"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontalIcon, StarIcon } from "lucide-react";
import dynamic from "next/dynamic";

import { getNumberOfFiltersApplied, loadFilters } from "@/lib/utils";

import { FilterTypes, QueryParams } from "@/constants/constants";

const FiltersModal = dynamic(() => import("./FiltersModal.tsx"));

const Filters = ({ queryFilters }: FiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = loadFilters(queryFilters);

  const numberOfFiltersApplied = getNumberOfFiltersApplied(queryFilters);

  const [filtersModalOpen, setFiltersModalOpen] = useState(false);

  const handleCloseFiltersModal = () => {
    setFiltersModalOpen(() => false);
  };

  const updateQueryParam = (queryParams: QueryParamsType) => {
    const params = new URLSearchParams(searchParams.toString());

    const queries = Object.keys(queryParams) as FilterTypes[];
    queries.forEach((query) => {
      const searchQuery = query;
      if (!queryParams[query].length) {
        params.delete(searchQuery);
        return;
      }

      params.set(searchQuery, queryParams[query].join("&"));
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterShows = (newFilters: FilterShowsPropsType[]) => {
    const transformedFilters = Object.entries(filters).reduce<QueryParamsType>(
      (accumulator, [filterName, filterValues]) => {
        accumulator[filterName] = filterValues.applied;
        return accumulator;
      },
      {
        Status: [],
        Country: [],
        Language: [],
        Rating: [],
        Type: [],
        Search: [],
        Page: ["1"],
      },
    );

    const transofrmedNewFilters = newFilters.reduce<QueryParamsType>(
      (accumulator, filter) => {
        accumulator[filter.name] = filter.applied;
        return accumulator;
      },
      {
        Status: [],
        Country: [],
        Language: [],
        Rating: [],
        Type: [],
        Search: [],
        Page: ["1"],
      },
    );

    if (
      JSON.stringify(transformedFilters) ===
      JSON.stringify(transofrmedNewFilters)
    )
      return;

    const searchWordsArray = searchParams.get(QueryParams.SEARCH)
      ? [searchParams.get(QueryParams.SEARCH) as string]
      : [];

    updateQueryParam(
      newFilters.reduce<QueryParamsType>(
        (accumulator, filter) => {
          accumulator[filter.name] = filter.applied;
          return accumulator;
        },
        {
          Status: [],
          Country: [],
          Language: [],
          Rating: [],
          Type: [],
          Search: searchWordsArray,
          Page: ["1"],
        },
      ),
    );
  };

  return (
    <div className="filters__display__filters-btn-and-modal">
      <button
        className="filters__display__filters-btn"
        onClick={() => setFiltersModalOpen(!filtersModalOpen)}
      >
        {numberOfFiltersApplied > 0 ? (
          <>
            <span className="filters-label">Filters: </span>
            <StarIcon />
            <span> {numberOfFiltersApplied}</span>
          </>
        ) : (
          <>
            <span>Filters</span>
            <SlidersHorizontalIcon />
          </>
        )}
      </button>
      {filtersModalOpen && (
        <FiltersModal
          closeModal={handleCloseFiltersModal}
          filterShows={handleFilterShows}
          filtersApplied={filters}
        />
      )}
    </div>
  );
};

export default Filters;
