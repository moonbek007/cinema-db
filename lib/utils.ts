import {
  defaultFilters,
  DropdownValues,
  FilterTypes,
  modalFilters,
  movies,
  QueryParams,
} from "@/constants/constants";

function loadFiltersModalFilters(filters: DefaultFiltersType) {
  const newFilters = { ...modalFilters };
  Object.entries(filters).forEach(([filterName, filterValues]) => {
    if (!!filterValues.applied.length) {
      newFilters[filterName as FilterTypes] = {
        ...newFilters[filterName as FilterTypes],
        value:
          filterValues.applied.length > 1
            ? `${filterValues.applied[0]} +${filterValues.applied.length - 1}`
            : filterValues.applied[0] || DropdownValues.ALL,
        picked: [...(filterValues?.applied as string[])],
      };
    }
  });
  return newFilters;
}

function loadFilters(
  filters: {
    name: FilterTypes | QueryParams.SEARCH;
    applied: string[];
  }[],
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

            if (show.network?.country.name === DropdownValues.UNITED_KINGDOM) {
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

export { loadFiltersModalFilters, loadFilters, loadFilteredShows };
