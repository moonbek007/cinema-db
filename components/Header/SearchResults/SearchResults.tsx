import SearchResult from "./SearchResult.tsx";

import "../../../css/searchResults.css";

function SearchResults({ searchWord, searchResults }: SearchResultsProps) {
  return (
    <div
      className={`search-results ${
        searchWord.length > 0 ? "search-results-open" : ""
      }`}
    >
      {searchResults.map((item) => {
        return (
          <SearchResult
            image={item.image.medium}
            genres={item.genres}
            year={item.premiered}
            description={item.summary}
            link={item.url}
            name={item.name}
            rating={(item?.rating?.average as number) ?? "N/A"}
            key={item.id}
            status={item.status}
          />
        );
      })}
    </div>
  );
}

export default SearchResults;
