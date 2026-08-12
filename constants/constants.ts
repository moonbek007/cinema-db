export const genres: Genre[] = [
  "Adventure",
  "Crime",
  "Action",
  "Thriller",
  "Drama",
  "Science-Fiction",
  "Fantasy",
  "Comedy",
  "Horror",
  "Romance",
  "Mystery",
  "Anime",
  "History",
  "Family",
  "War",
];

export const collectionImages: Record<string, string> = {
  Drama: "/drama.avif",
  Adventure: "/adventure.jpg",
  Crime: "/crime.avif",
  Action: "/action.jpg",
  Thriller: "/thriller.avif",
  "Science-Fiction": "/science-fiction.avif",
  Fantasy: "/fantasy.jpg",
  Comedy: "/comedy.jpg",
  Horror: "/horror.avif",
  Mystery: "/mystery.jpg",
  Romance: "/romance.avif",
  Anime: "/anime.avif",
  Western: "/western.jpg",
  War: "/war.avif",
  Espionage: "/espionage.avif",
  Family: "/family.avif",
  Supernatural: "/supernatural.avif",
  Music: "/music.avif",
  Medical: "/medical.avif",
  Legal: "/legal.avif",
  Sports: "/sports.jpeg",
};

export const dropdownOptions = {
  Status: ["All", "Running", "Ended"],
  Language: ["All", "English", "Japanese"],
  Type: ["All", "Scripted", "Animation", "Talk Show", "Reality", "Documentary"],
  Country: ["All", "USA", "Canada", "Japan", "UK", "France", "Germany"],
  Rating: ["All", "+5.0", "+6.0", "+7.0", "+8.0", "+9.0"],
  Genre: ["All", ...genres],
};

export const enum FilterTypes {
  STATUS = "Status",
  LANGUAGE = "Language",
  TYPE = "Type",
  COUNTRY = "Country",
  RATING = "Rating",
  GENRE = "Genre",
}

export const enum DropdownValues {
  ALL = "All",
  USA = "USA",
  UNITED_STATES = "United States",
  UK = "UK",
  UNITED_KINGDOM = "United Kingdom",
}

export const enum ConstValues {
  ALL = "All",
}

export const enum QueryParams {
  RATING = "rating",
  STATUS = "status",
  LANGUAGE = "language",
  TYPE = "type",
  COUNTRY = "country",
  GENRE = "genre",
  SEARCH = "Search",
  PAGE = "Page",
}

export const defaultFilters: DefaultFiltersType = {
  Rating: { value: "All", dropdownOpen: false, picked: [], applied: [] },
  Status: { value: "All", dropdownOpen: false, picked: [], applied: [] },
  Type: { value: "All", dropdownOpen: false, picked: [], applied: [] },
  Country: { value: "All", dropdownOpen: false, picked: [], applied: [] },
  Language: { value: "All", dropdownOpen: false, picked: [], applied: [] },
  Genre: { value: "All", dropdownOpen: false, picked: [], applied: [] },
};

export const modalFilters: DropdownFiltersType = {
  Rating: { value: "All", dropdownOpen: false, picked: [] },
  Status: { value: "All", dropdownOpen: false, picked: [] },
  Type: { value: "All", dropdownOpen: false, picked: [] },
  Country: { value: "All", dropdownOpen: false, picked: [] },
  Language: { value: "All", dropdownOpen: false, picked: [] },
  Genre: { value: "All", dropdownOpen: false, picked: [] },
};

export const defaultPageValues: PageType = {
  previousPage: 1,
  currentPage: 1,
  nextPage: 1,
  totalPages: 1,
};

export const API_BASE_URL = "http://localhost:3000";

export const enum API_ENDPOINTS {
  COLLECTIONS = "/collections",
  SEARCH = "/movies/search",
  MOVIES_PREVIEW = "/genres/preview",
  MOVIES = "/movies",
}
