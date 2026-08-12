import Link from "next/link";

import Element from "./Element.tsx";

function Row({ genre, filteredShows: shows }: RowProps) {
  return (
    <>
      <div className="explore__row-header">
        <h1 className="explore__row-header__title">
          <Link href={`/explore?Genre=${genre}`}>{genre}</Link>
        </h1>
      </div>
      <div className="explore__row-elements">
        {shows.map((show) => {
          return (
            <Element
              show={show}
              key={show.id}
              image={show?.image ? show.image.medium : "/horror.avif"}
              name={show.name}
              link={show.url}
              year={show?.premiered?.substring(0, 4)}
              country={show?.network?.country?.name}
            />
          );
        })}
      </div>
    </>
  );
}

export default Row;
