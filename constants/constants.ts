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
];

export const images = [
  "/drama.avif",
  "/crime.avif",
  "/thriller.avif",
  "/adventure.jpg",
  "/fantasy.jpg",
  "/science-fiction.avif",
  "/action.jpg",
  "/anime.avif",
  "/western.jpg",
  "/mystery.jpg",
  "/medical.avif",
  "/war.avif",
  "/comedy.jpg",
  "/history.jpg",
  "/family.avif",
  "/espionage.avif",
  "/supernatural.avif",
  "/horror.avif",
  "/romance.avif",
  "/legal.avif",
  "/sports.jpeg",
  "/music.avif",
];

export const dropdownOptions = {
  Status: ["All", "Running", "Ended"],
  Language: ["All", "English", "Japanese"],
  Type: ["All", "Scripted", "Animation", "Talk Show", "Reality", "Documentary"],
  Country: ["All", "USA", "Canada", "Japan", "UK", "France", "Germany"],
  Rating: ["All", "+5.0", "+6.0", "+7.0", "+8.0", "+9.0"],
  Genre: [
    "All",
    "Drama",
    "Crime",
    "Comedy",
    "Action",
    "Thriller",
    "Romance",
    "Science-Fiction",
    "Adventure",
    "Family",
    "Horror",
    "Fantasy",
    "Supernatural",
  ],
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
