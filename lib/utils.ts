import {
  API_BASE_URL,
  API_ENDPOINTS,
  collectionImages,
  ConstValues,
  defaultFilters,
  defaultPageValues,
  DropdownValues,
  FilterTypes,
  genres,
  modalFilters,
  QueryParams,
} from "@/constants/constants";
import { movies } from "@/constants/movies";

function loadGenres(
  genresData: { name: string; count: number; shows: Show[] }[],
) {
  const gData = genresData.reduce<Record<string, Show[]>>(
    (accumulator, genre) => {
      accumulator[genre.name] = genre.shows;
      return accumulator;
    },
    {},
  );
  return [
    ...genres.map((genre) => {
      return { name: genre, shows: gData[genre] };
    }),
  ];
}

function loadCollections(
  collectionsData: { name: string; count: number }[],
): CollectionData[] {
  const cData = collectionsData.reduce<Record<string, number>>(
    (accumulator, collection) => {
      accumulator[collection.name] = collection.count;
      return accumulator;
    },
    {},
  );

  return Object.entries(collectionImages).reduce<CollectionData[]>(
    (accumulator, [collectionName, collectionImage]) => {
      accumulator = [
        ...accumulator,
        {
          name: collectionName,
          count: cData[collectionName],
          image: collectionImage,
        },
      ];
      return accumulator;
    },
    [],
  );
}

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
    name: FilterTypes | QueryParams.SEARCH | QueryParams.PAGE;
    applied: string[];
  }[],
) {
  let newFilteredShows: Show[] = [...movies];
  let noFiltersApplied = true;

  filters.forEach((filter) => {
    if (!filter.applied.length || filter.name === QueryParams.PAGE) {
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
  return newFilteredShows;
}

function getElementYearAndCountry(year?: string, country?: string) {
  if (year) {
    if (country) return `${year}, ${country}`;
    return year;
  }
  if (country) return country;
  return "";
}

function getNumberOfFiltersApplied(
  filters: {
    name: FilterTypes | QueryParams.SEARCH | QueryParams.PAGE;
    applied: string[];
  }[],
) {
  let numberOfFiltersApplied = 0;
  filters.forEach((filter) => {
    if (filter.name === QueryParams.SEARCH || filter.name === QueryParams.PAGE)
      return;
    if (!!filter.applied.length) numberOfFiltersApplied += 1;
  });
  return numberOfFiltersApplied;
}

function getPageDetails(
  pageQuery: string | null,
  numberOfShows: number,
): PageType {
  const totalPages = Math.ceil(numberOfShows / 20);
  if (totalPages === 1) return { ...defaultPageValues };

  if (!pageQuery)
    return {
      ...defaultPageValues,
      nextPage: defaultPageValues.currentPage + 1,
      totalPages: totalPages,
    };

  const newPageValues = { ...defaultPageValues };
  newPageValues.totalPages = totalPages;
  if (pageQuery) {
    const pageNumber = parseInt(pageQuery);
    if (pageNumber >= totalPages) {
      newPageValues.currentPage = totalPages;
      newPageValues.nextPage = totalPages;
    } else {
      newPageValues.currentPage = pageNumber;
      newPageValues.nextPage = pageNumber + 1;
    }

    if (newPageValues.currentPage - 1 < 1) {
      newPageValues.previousPage = 1;
    } else {
      newPageValues.previousPage = newPageValues.currentPage - 1;
    }
  } else {
    if (totalPages > 1) {
      newPageValues.nextPage = newPageValues.currentPage + 1;
    }
  }
  return newPageValues;
}

function getPaginationIndecies(pageDetails: PageType, numberOfShows: number) {
  const indecies: PaginationIndeciesType = { start: 0, end: numberOfShows - 1 };
  indecies.start = (pageDetails.currentPage - 1) * 20;
  indecies.end =
    pageDetails.currentPage * 20 - 1 > numberOfShows - 1
      ? numberOfShows - 1
      : pageDetails.currentPage * 20 - 1;
  return indecies;
}

function getRawShowDescription(
  description: string,
  numberOfWords: number | ConstValues.ALL,
) {
  const descriptionWords = description.split(" ").map((word) => {
    const newWord = word.replace(/<\/?([a-zA-Z]+)([^>]*)*>/g, "");
    return newWord;
  });

  if (numberOfWords && numberOfWords !== ConstValues.ALL) {
    if (descriptionWords.length > numberOfWords)
      return descriptionWords.slice(0, numberOfWords).join(" ") + " ...";
  }
  return descriptionWords.join(" ");
}

function getNumberOfDescriptionWords(
  screenWidth: number,
): number | ConstValues.ALL {
  if (screenWidth < 425) return 40;
  if (screenWidth < 640) return 50;
  if (screenWidth < 768) return 60;
  if (screenWidth < 1024) return 75;
  if (screenWidth < 1280) return 110;
  return ConstValues.ALL;
}

const getQueryParamsValues = (queryParams: Record<string, string>) => {
  const params = new URLSearchParams();

  const queries = Object.entries(queryParams);
  queries.forEach(([queryName, queryValue]) => {
    params.set(queryName, queryValue);
  });

  return params;
};

async function fetchCollections() {
  const data = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COLLECTIONS}`);

  if (!data.ok) throw new Error("Failed to fetch collections");

  return data.json();
}

async function fetchSearchResults(searchValue: string) {
  const data = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.SEARCH}?name=${searchValue}`,
  );

  if (!data.ok) return "Failed to fetch search results";

  return data.json();
}

async function fetchMoviesPreview() {
  const data = await fetch(`${API_BASE_URL}${API_ENDPOINTS.MOVIES_PREVIEW}`);

  if (!data.ok) return "Failed to fetch movies preview";

  return data.json();
}

async function fetchFilteredShows(queries: URLSearchParams) {
  const data = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.MOVIES}?${queries.toString()}`,
  );

  if (!data.ok) return "Failed to fetch filtered shows";

  return data.json();
}

export {
  loadGenres,
  loadCollections,
  loadFiltersModalFilters,
  loadFilters,
  loadFilteredShows,
  getElementYearAndCountry,
  getNumberOfFiltersApplied,
  getPageDetails,
  getPaginationIndecies,
  getRawShowDescription,
  getNumberOfDescriptionWords,
  getQueryParamsValues,
  fetchCollections,
  fetchSearchResults,
  fetchMoviesPreview,
  fetchFilteredShows,
};
