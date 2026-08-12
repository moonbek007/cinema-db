import Row from "./Row/Row.tsx";

import { fetchMoviesPreview, loadGenres } from "@/lib/utils.ts";

import "../../css/explore.css";

async function MainDisplay() {
  const data = await fetchMoviesPreview();
  const genres = loadGenres(data);

  return (
    <div className="explore">
      {genres.map((genre) => {
        return (
          <Row
            genre={genre.name}
            key={genre.name}
            filteredShows={genre.shows}
          />
        );
      })}
    </div>
  );
}

export default MainDisplay;
