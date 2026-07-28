"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontalIcon } from "lucide-react";

import FilterResult from "./FilterResult.tsx";
import FiltersModal from "./FiltersSection/FiltersModal.tsx";
import SearchBar from "./SearchBar.tsx";

import {
  defaultFilters,
  DropdownValues,
  FilterTypes,
  movies,
  QueryParams,
} from "@/constants/constants.ts";
import "../../css/filters.css";

function ExploreDisplay() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get filters from searchParams for the initial render
  const queryFilters: {
    name: FilterTypes;
    applied: string[];
  }[] = [];
  [...searchParams.entries()].forEach((param) => {
    queryFilters.push({
      name: param[0] as FilterTypes,
      applied: param[1].split("&"),
    });
  });

  const [filters, setFilters] = useState(
    loadFilters(queryFilters, defaultFilters),
  );
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [filteredShows, setFilteredShows] = useState([
    ...loadFilteredShows(queryFilters),
  ]);

  const updateQueryParam = (queryParams: queryParams) => {
    const params = new URLSearchParams(searchParams.toString());

    const queries = Object.keys(queryParams) as unknown as FilterTypes[];
    queries.forEach((query) => {
      const searchQuery = query; //.toLowerCase();
      if (!queryParams[query].length) {
        params.delete(searchQuery);
        return;
      }

      params.set(searchQuery, queryParams[query].join("&"));
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleCloseFiltersModal = () => {
    setFiltersModalOpen(() => false);
  };

  const handleFilterShows = (
    filters: {
      name: FilterTypes;
      applied: string[];
    }[],
  ) => {
    let newFilteredShows: Show[] = [...movies];
    let noFiltersApplied = true;

    filters.forEach((filter) => {
      if (!filter.applied.length) {
        return;
      }

      noFiltersApplied = false;

      newFilteredShows = [
        ...newFilteredShows.filter((show) => {
          switch (filter.name) {
            case FilterTypes.RATING:
              const rating = Math.floor(show.rating.average as number);
              const filterRating = parseInt(filter.applied[0].substring(1));
              return filterRating <= rating;

            case FilterTypes.COUNTRY:
              if (show.network?.country.name === DropdownValues.UNITED_STATES) {
                return filter.applied.includes(DropdownValues.USA);
              }

              if (
                show.network?.country.name === DropdownValues.UNITED_KINGDOM
              ) {
                return filter.applied.includes(DropdownValues.UK);
              }

              return filter.applied.includes(
                (!!show.network && show.network?.country.name) as string,
              );

            case FilterTypes.STATUS:
              return filter.applied.includes(show.status);

            case FilterTypes.LANGUAGE:
              return filter.applied.includes(show.language);

            case FilterTypes.TYPE:
              return filter.applied.includes(show.type);
            default:
              break;
          }
        }),
      ];
    });

    if (noFiltersApplied) {
      newFilteredShows = movies;
    }
    setFilteredShows(newFilteredShows);
    setFilters(loadFilters(filters, defaultFilters));

    updateQueryParam(
      filters.reduce<Record<FilterTypes, string[]>>(
        (accumulator, filter) => {
          accumulator[filter.name] = filter.applied;
          return accumulator;
        },
        { Status: [], Country: [], Language: [], Rating: [], Type: [] },
      ),
    );
  };

  function loadFilteredShows(
    filters: {
      name: FilterTypes | QueryParams.SEARCH;
      applied: string[];
    }[],
  ) {
    let newFilteredShows: Show[] = [...movies];
    let noFiltersApplied = true;

    filters.forEach((filter) => {
      if (!filter.applied.length) {
        return;
      }

      noFiltersApplied = false;

      newFilteredShows = [
        ...newFilteredShows.filter((show) => {
          switch (filter.name) {
            case FilterTypes.RATING:
              const rating = Math.floor(show.rating.average as number);
              const filterRating = parseInt(filter.applied[0].substring(1));
              return filterRating <= rating;

            case FilterTypes.COUNTRY:
              if (show.network?.country.name === DropdownValues.UNITED_STATES) {
                return filter.applied.includes(DropdownValues.USA);
              }

              if (
                show.network?.country.name === DropdownValues.UNITED_KINGDOM
              ) {
                return filter.applied.includes(DropdownValues.UK);
              }

              return filter.applied.includes(
                (!!show.network && show.network?.country.name) as string,
              );

            case FilterTypes.STATUS:
              return filter.applied.includes(show.status);

            case FilterTypes.LANGUAGE:
              return filter.applied.includes(show.language);

            case FilterTypes.TYPE:
              return filter.applied.includes(show.type);
            case QueryParams.SEARCH:
              return show.name
                .toLowerCase()
                .includes(filter.applied[0].toLowerCase());
            default:
              break;
          }
        }),
      ];
    });

    if (noFiltersApplied) {
      newFilteredShows = movies;
    }
    return newFilteredShows;
  }

  const updateSearchQueryParam = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(QueryParams.SEARCH, value);
    } else {
      params.delete(QueryParams.SEARCH);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSearchShows = (searchWord: string) => {
    updateSearchQueryParam(searchWord);
    const shows = movies.filter((show) =>
      show.name.toLowerCase().includes(searchWord.toLowerCase()),
    );
    setFilteredShows([...shows]);
  };

  const handleClearSearchBar = () => {
    updateSearchQueryParam("");
    setFilteredShows([...movies]);
  };

  return (
    <div className="filters">
      <div className="filters__display">
        <div className="filters__display__title">
          <h1>
            <span>Shows</span>
          </h1>
          <div className="filters__display__filters-btn-and-modal">
            <button
              className="filters__display__filters-btn"
              onClick={() => setFiltersModalOpen(!filtersModalOpen)}
            >
              <span>Filters</span>
              <SlidersHorizontalIcon />
            </button>
            {filtersModalOpen && (
              <FiltersModal
                closeModal={handleCloseFiltersModal}
                filterShows={handleFilterShows}
                filtersApplied={filters}
              />
            )}
          </div>
          <SearchBar search={handleSearchShows} clear={handleClearSearchBar} />
        </div>
        <div className="separator"> </div>
        <div className="filters__display__results">
          {filteredShows.slice(0, 20).map((show) => {
            return (
              <FilterResult
                image={show.image.medium}
                key={show.id}
                link={show.url}
                name={show.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ExploreDisplay;

function loadFilters(
  filters: {
    name: FilterTypes | QueryParams.SEARCH;
    applied: string[];
  }[],
  defaultFilters: DefaultFiltersType,
) {
  const newFilters = { ...defaultFilters };
  const filterNames = Object.keys(newFilters) as FilterTypes[];
  filterNames.forEach((filter) => {
    const appliedFilter = filters.find(
      (loadedFilter) => loadedFilter.name === filter,
    );
    if (!!appliedFilter) {
      newFilters[filter] = {
        ...newFilters[filter],
        value:
          appliedFilter.applied.length > 1
            ? `${appliedFilter.applied[0]} +${appliedFilter.applied.length - 1}`
            : appliedFilter.applied[0] || DropdownValues.ALL,
        applied: [...(appliedFilter?.applied as string[])],
      };
    }
  });
  return newFilters;
}
