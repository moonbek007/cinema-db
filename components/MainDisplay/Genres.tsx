import { useQuery } from "@tanstack/react-query";

import Row from "./Row/Row";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

import { fetchMoviesPreview, loadGenres } from "@/lib/utils";

const Genres = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["moviesPreview", {}],
    queryFn: () => fetchMoviesPreview(),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="explore flex">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="explore flex text-2xl">
        <Error />
      </div>
    );
  }

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
