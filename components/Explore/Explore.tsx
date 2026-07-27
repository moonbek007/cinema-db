"use client";

import { useState } from "react";
import { SlidersHorizontalIcon } from "lucide-react";

import FilterResult from "./FilterResult.tsx";
import FiltersModal from "./FiltersSection/FiltersModal.tsx";
import SearchBar from "./SearchBar.tsx";

import { DropdownValues, FilterTypes, movies } from "@/constants/constants.ts";
import "../../css/filters.css";

function ExploreDisplay() {
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [filteredShows, setFilteredShows] = useState([...movies]);

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
  };

  const handleSearchShows = (searchWord: string) => {
    const shows = movies.filter((show) =>
      show.name.toLowerCase().includes(searchWord.toLowerCase()),
    );
    setFilteredShows([...shows]);
  };

  const handleClearSearchBar = () => {
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
              />
            )}
          </div>
          <SearchBar search={handleSearchShows} clear={handleClearSearchBar} />
        </div>
        <div className="separator"> </div>
        <div className="filters__display__results">
          {filteredShows.map((show) => {
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
