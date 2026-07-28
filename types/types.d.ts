declare type Show = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: Genre[];
  status: string;
  runtime: number | null;
  averageRuntime: number;
  premiered: string;
  ended: string | null;
  officialSite: string | null;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number | null;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string | null;
  } | null;
  webChannel: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    } | null;
    officialSite: string | null;
  } | null;
  dvdCountry: {
    name: string;
    code: string;
    timezone: string;
  } | null;
  externals: {
    tvrage: number | null;
    thetvdb: number | null;
    imdb: string | null;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
      name: string;
    };
    nextepisode?: {
      href: string;
      name: string;
    };
  };
};

declare type Genre = string;

declare type RowProps = {
  genre: Genre;
  showsToFilter: Show[];
};

declare type ElementProps = {
  link: string;
  image: string;
  name: string;
  year: string;
  country: string | undefined;
  show: Show;
};

declare type SearchResultProps = {
  image: string;
  link: string;
  name: string;
  status: string;
  rating: number;
  year: string;
  genres: string[];
  description: string;
};

declare type SearchResultsProps = {
  searchWord: string;
  searchResults: Show[];
};

declare type CollectionElementProps = {
  name: string;
  image: string;
  numberOfShows: number;
};

declare type FilterResultProps = {
  image: string;
  link: string;
  name: string;
};

declare type FilterShowsPropsType = {
  name:
    | import("@/constants/constants").FilterTypes
    | import("@/constants/constants").QueryParams.SEARCH;
  applied: string[];
};

declare type FiltersModalProps = {
  filtersApplied: DefaultFiltersType;
  closeModal: () => void;
  filterShows: (filters: filterShowsProps[]) => void;
};

declare type DropdownMenuProps = {
  type: import("@/constants/constants").FilterTypes;
  options: string[];
  tickedOptions: string[];
  pickOption: (
    type: import("@/constants/constants").FilterTypes,
    option: string,
  ) => void;
};

declare type DropdownFiltersType = Record<
  import("@/constants/constants").FilterTypes,
  {
    value: string;
    dropdownOpen: boolean;
    picked: string[];
  }
>;

declare type DefaultFiltersType = Record<
  import("@/constants/constants").FilterTypes,
  {
    value: string;
    dropdownOpen: boolean;
    picked: string[];
    applied: string[];
  }
>;

declare type SearchBarProps = {
  search: (word: string) => void;
  clear: () => void;
};

declare type QueryParamsType = Record<
  | import("@/constants/constants").FilterTypes
  | import("@/constants/constants").QueryParams.SEARCH
  | string,
  string[]
>;
