"use client";

import Row from "./Row/Row.tsx";

import { loadGenres, loadSortedShows } from "@/lib/utils.ts";

import "../../css/explore.css";

function MainDisplay() {
  const shows = loadSortedShows();
  const genres = loadGenres();

  return (
    <div className="explore">
      {genres.map((genre, index) => {
        return <Row genre={genre} key={index} filteredShows={shows[genre]} />;
      })}
    </div>
  );
}

export default MainDisplay;
