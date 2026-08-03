import { useEffect, useState } from "react";

import SearchResult from "./SearchResult.tsx";

import {
  getNumberOfDescriptionWords,
  getRawShowDescription,
} from "@/lib/utils.ts";
import { ConstValues } from "@/constants/constants.ts";

import "../../../css/searchResults.css";

function SearchResults({
  searchWord,
  searchResults,
  screenWidth,
}: SearchResultsProps) {
  const [descriptionLength, setDescriptionLength] = useState(
    getNumberOfDescriptionWords(screenWidth),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleResize() {
      const newDescriptionLength = getNumberOfDescriptionWords(
        window.innerWidth,
      );
      if (newDescriptionLength === descriptionLength) return;
      setDescriptionLength(() => newDescriptionLength);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`search-results ${
        searchWord.length > 0 ? "search-results-open" : ""
      }`}
    >
      {searchResults.map((item) => {
        const newDescription =
          descriptionLength !== ConstValues.ALL
            ? getRawShowDescription(item.summary, descriptionLength)
            : getRawShowDescription(item.summary, 1280);
        return (
          <SearchResult
            image={item.image.medium}
            genres={item.genres}
            year={item.premiered}
            description={newDescription}
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
