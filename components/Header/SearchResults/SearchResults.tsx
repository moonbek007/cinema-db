import { Suspense, useEffect, useState } from "react";

import SearchResult from "./SearchResult.tsx";

import {
  getNumberOfDescriptionWords,
  getRawShowDescription,
} from "@/lib/utils.ts";
import { ConstValues } from "@/constants/constants.ts";

import "../../../css/searchResults.css";
import SearchResultFallback from "./fallback.tsx";
import clsx from "clsx";

function SearchResults({
  searchWord,
  searchResults,
  screenWidth,
  isLoading,
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
      className={clsx(`search-results`, {
        "search-results-open": searchWord.length,
        "search-results-empty": !searchResults.length && !isLoading,
      })}
    >
      {isLoading ? (
        <SearchResultFallback />
      ) : !searchResults.length || typeof searchResults === "string" ? (
        <p className="text-gray-100 text-xl text-center py-3 px-1.5 2xl:text-2xl 2xl:py-4 2xl:px-2.5">
          No matching results found
        </p>
      ) : (
        searchResults.map((item) => {
          const newDescription = !item.summary
            ? item.summary
            : descriptionLength !== ConstValues.ALL
              ? getRawShowDescription(item.summary, descriptionLength)
              : getRawShowDescription(item.summary, 1280);
          return (
            <Suspense key={item.id} fallback={<SearchResultFallback />}>
              <SearchResult
                image={item?.image ? item.image.medium : "/horror.avif"}
                genres={item.genres}
                year={item.premiered}
                description={newDescription}
                link={item.url}
                name={item.name}
                rating={(item?.rating?.average as number) ?? "N/A"}
                key={item.id}
                status={item.status}
              />
            </Suspense>
          );
        })
      )}
    </div>
  );
}

export default SearchResults;
