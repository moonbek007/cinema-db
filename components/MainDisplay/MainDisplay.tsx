"use client";

import { useState } from "react";

import Row from "./Row/Row.tsx";

import { movies } from "@/constants/constants.ts";
import "../../css/explore.css";

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
  const [shows, setShows] = useState<Record<string, Show[]>>(sortShows(movies));

  const genres = Object.keys(shows);

  return (
    <div className="explore">
      {genres.map((genre, index) => {
        return <Row genre={genre} key={index} showsToFilter={shows[genre]} />;
      })}
    </div>
  );
}

export default MainDisplay;
