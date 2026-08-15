import { useQuery } from "@tanstack/react-query";

import CollectionElement from "./CollectionElement/CollectionElement";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

import { fetchCollections, loadCollections } from "@/lib/utils";

const Collections = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["collections", {}],
    queryFn: () => fetchCollections(),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="collections flex">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="collections flex text-2xl">
        <Error />
      </div>
    );
  }

  const collections = loadCollections(data);

  return (
    <div className="collections">
      <h1>Collections of movies & series</h1>
      <div className="separator"> </div>
      <div className="collections__display">
        {collections.map((collection) => {
          return (
            <CollectionElement
              key={collection.name}
              name={collection.name}
              image={collection.image}
              numberOfShows={collection.count}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
