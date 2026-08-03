import CollectionElement from "./CollectionElement/CollectionElement.tsx";

import { loadCollections } from "@/lib/utils.ts";

import "../../css/collections.css";

function CollectionsDisplay() {
  const collections = loadCollections();

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
}

export default CollectionsDisplay;
