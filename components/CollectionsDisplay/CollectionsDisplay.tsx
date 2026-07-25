"use client";

import { useState } from "react";

import CollectionElement from "./CollectionElement/CollectionElement.tsx";

import { images, movies } from "@/constants/constants.ts";
import "../../css/collections.css";

const sortShows: (shows: Show[]) => Record<string, Show[]> = (shows) => {
  const sortedShows = shows.reduce(
    (accumulator, currentShow) => {
      const showGenres = currentShow.genres;
      showGenres.map((genre) => {
        if (!accumulator[genre]) {
          // Initialize the array for this genre if it doesn't exist yet
          accumulator[genre] = [currentShow];
        } else {
          accumulator[genre].push(currentShow);
        }
      });
      return accumulator;
    },
    {} as Record<string, Show[]>,
  );
  return sortedShows;
};

function MainDisplay() {
  const [collections] = useState<Record<string, Show[]>>(sortShows(movies));

  const genres = Object.keys(collections);

  return (
    <div className="collections">
      <h1>Collections of movies & series</h1>
      <div className="collections__display">
        {genres.map((genre, index) => {
          return (
            <CollectionElement
              key={genre}
              name={genre}
              image={images[index]}
              numberOfShows={collections[genre].length}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MainDisplay;
