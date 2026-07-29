"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontalIcon, StarIcon } from "lucide-react";

import FilterResult from "./FilterResult.tsx";
import SearchBar from "./SearchBar.tsx";
import Pagination from "./Pagination.tsx";

const FiltersModal = dynamic(() => import("./FiltersSection/FiltersModal.tsx"));

import {
  DropdownValues,
  FilterTypes,
  movies,
  QueryParams,
} from "@/constants/constants.ts";
import {
  loadFilters,
  loadFilteredShows,
  getNumberOfFiltersApplied,
  getPageDetails,
  getPaginationIndecies,
} from "@/lib/utils.ts";

import "../../css/filters.css";
import FilterResultFallback from "./FilterResultFallback.tsx";
import dynamic from "next/dynamic";

function ExploreDisplay() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get filters from searchParams for the initial render
  const queryFilters: FilterShowsPropsType[] = [];
  [...searchParams.entries()].forEach((param) => {
    queryFilters.push({
      name: param[0] as FilterTypes,
      applied: param[1].split("&"),
    });
  });

  const [filters, setFilters] = useState({ ...loadFilters(queryFilters) });
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [numberOfFiltersApplied, setNumberOfFiltersApplied] = useState(
    getNumberOfFiltersApplied(queryFilters),
  );

  const [filteredShows, setFilteredShows] = useState([
    ...loadFilteredShows(queryFilters),
  ]);

  // Get page details from searchParams for the initial render
  const initialPageDetails = getPageDetails(
    searchParams.get(QueryParams.PAGE),
    filteredShows.length,
  );

  const [page, setPage] = useState<PageType>({
    ...initialPageDetails,
  });
  const [paginationIndecies, setPaginationIndecies] =
    useState<PaginationIndeciesType>({
      ...getPaginationIndecies(initialPageDetails, filteredShows.length),
    });

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

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleCloseFiltersModal = () => {
    setFiltersModalOpen(() => false);
  };

  const handleFilterShows = (filters: FilterShowsPropsType[]) => {
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
            case FilterTypes.GENRE:
              let genreFound = false;
              filter.applied.forEach((f) => {
                if (show.genres.includes(f)) genreFound = true;
              });
              return genreFound;
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

    // Update page details and pagination indecies
    const newPageDetails = getPageDetails(null, newFilteredShows.length);
    setPage({ ...newPageDetails });
    setPaginationIndecies({
      ...getPaginationIndecies(newPageDetails, newFilteredShows.length),
    });

    setNumberOfFiltersApplied(getNumberOfFiltersApplied(filters));
    setFilteredShows(newFilteredShows);
    setFilters(loadFilters(filters));

    updateQueryParam(
      filters.reduce<QueryParamsType>(
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
      ),
    );
  };

  const handleSearchShows = (searchWord: string) => {
    handleFilterShows([
      ...Object.entries(filters).reduce<FilterShowsPropsType[]>(
        (accumulator, [filterName, filterValues]) => {
          accumulator.push({
            name: filterName as FilterTypes,
            applied: [...filterValues.applied],
          });
          return accumulator;
        },
        [],
      ),
      {
        name: QueryParams.SEARCH,
        applied: searchWord.length ? [searchWord] : [],
      },
    ]);
  };

  const handleClearSearchBar = () => {
    handleFilterShows([
      ...Object.entries(filters).reduce<Array<FilterShowsPropsType>>(
        (accumulator, [filterName, filterValues]) => {
          accumulator.push({
            name: filterName as FilterTypes,
            applied: [...filterValues.applied],
          });
          return accumulator;
        },
        [],
      ),
      {
        name: QueryParams.SEARCH,
        applied: [],
      },
    ]);
  };

  const handleChangePage = (pageNumber: number) => {
    setPage(getPageDetails(`${pageNumber}`, filteredShows.length));
    setPaginationIndecies(
      getPaginationIndecies(
        getPageDetails(`${pageNumber}`, filteredShows.length),
        filteredShows.length,
      ),
    );

    const params = new URLSearchParams(searchParams.toString());
    params.set(QueryParams.PAGE, `${pageNumber}`);

    router.replace(`${pathname}?${params.toString()}`);
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
              {numberOfFiltersApplied > 0 ? (
                <>
                  <span>Filters: </span>
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
          <SearchBar search={handleSearchShows} clear={handleClearSearchBar} />
        </div>
        <div className="separator"> </div>
        <div className="filters__display__results">
          {filteredShows
            .slice(paginationIndecies.start, paginationIndecies.end + 1)
            .map((show) => {
              return (
                <Suspense key={show.id} fallback={<FilterResultFallback />}>
                  <FilterResult
                    image={show.image.medium}
                    key={show.id}
                    link={show.url}
                    name={show.name}
                  />
                </Suspense>
              );
            })}
        </div>
        {page.totalPages > 1 && (
          <Pagination page={page} changePage={handleChangePage} />
        )}
      </div>
    </div>
  );
}

export default ExploreDisplay;
