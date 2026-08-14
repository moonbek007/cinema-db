import { useQuery } from "@tanstack/react-query";

import Row from "./Row/Row";

import { fetchMoviesPreview, loadGenres } from "@/lib/utils";

const Genres = () => {
  const { data } = useQuery({
    queryKey: ["moviesPreview", {}],
    queryFn: () => fetchMoviesPreview(),
  });

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
};

export default Genres;
