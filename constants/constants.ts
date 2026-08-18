export const mainGenres: Genre[] = [
  "Drama",
  "Thriller",
  "Crime",
  "Fantasy",
  "Action",
  "Horror",
  "Adventure",
  "Science-Fiction",
  "Comedy",
  "Anime",
];

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
  Drama: "https://i.postimg.cc/c49c3zvG/drama.avif",
  Adventure: "https://i.postimg.cc/Pf8H0GkN/adventure.jpg",
  Crime: "https://i.postimg.cc/gkNgDJBS/crime.avif",
  Action: "https://i.postimg.cc/15w9nkCP/action.jpg",
  Thriller: "https://i.postimg.cc/C5KqLFHw/thriller.avif",
  "Science-Fiction": "https://i.postimg.cc/6qpxjQnM/science-fiction.avif",
  Fantasy: "https://i.postimg.cc/26kq2zt6/fantasy.jpg",
  Comedy: "https://i.postimg.cc/Nf35Z8VM/comedy.jpg",
  Horror: "https://i.postimg.cc/FzfHB1Vf/horror.avif",
  Mystery: "https://i.postimg.cc/jSjtgDq5/mystery.jpg",
  Romance: "https://i.postimg.cc/9QDswZFZ/romance.avif",
  Anime: "https://i.postimg.cc/cCGbVbQP/anime.avif",
  Western: "https://i.postimg.cc/hvx1q4Sr/western.jpg",
  War: "https://i.postimg.cc/fy4Y54xT/war.avif",
  Espionage: "https://i.postimg.cc/tJ5768Db/espionage.avif",
  Family: "https://i.postimg.cc/26Yzx21D/family.avif",
  Supernatural: "https://i.postimg.cc/BQRfgMzD/supernatural.avif",
  Music: "https://i.postimg.cc/x1LhPYMn/music.avif",
  Medical: "https://i.postimg.cc/Vv3ZjHNb/medical.avif",
  Legal: "https://i.postimg.cc/fWGh78pX/legal.avif",
  Sports: "https://i.postimg.cc/857qMvHT/sports.jpg",
};

export const defaultImage = "https://i.postimg.cc/cCGbVbQP/anime.avif";

export const dropdownOptions = {
  Status: ["All", "Running", "Ended"],
  Language: ["All", "English", "French", "German", "Dutch", "Japanese"],
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

export const API_BASE_URL = "https://moonbek007-api-cinema-db.netlify.app/api/";

export const enum API_ENDPOINTS {
  COLLECTIONS = "/collections",
  SEARCH = "/movies/search",
  MOVIES_PREVIEW = "/genres/preview",
  MOVIES = "/movies",
}

export const enum ERROR_TYPES {
  SERVER_ERROR = "Server Error",
  NOT_FOUND = "Not Found",
  BAD_REQUEST = "Bad Request",
}
