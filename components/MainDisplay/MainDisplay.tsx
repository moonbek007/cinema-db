"use client";

import { useState } from "react";

import Row from "./Row/Row.tsx";

import { loadSortedShows } from "@/lib/utils.ts";

import "../../css/explore.css";

function MainDisplay() {
  const [shows] = useState<Record<string, Show[]>>(loadSortedShows());

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
