import React from "react";

import Element from "./Element.tsx";

function Row({ genre, showsToFilter }: RowProps) {
  const [shows, setShows] = React.useState<Show[]>(showsToFilter);

  return (
    <>
      <div className="explore__row-header">
        <h1 className="explore__row-header__title">{genre.toUpperCase()}</h1>
      </div>
      <div className="explore__row-elements">
        {shows.map((show) => {
          return (
            <Element
              show={show}
              key={show.id}
              image={show.image.medium}
              name={show.name}
              link={show.url}
              year={show.premiered.substring(0, 4)}
              country={show?.network?.country?.name}
            />
          );
        })}
      </div>
    </>
  );
}

export default Row;
