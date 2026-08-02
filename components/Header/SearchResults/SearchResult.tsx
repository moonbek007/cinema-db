import Image from "next/image";
import { useMemo, memo } from "react";
import { StarIcon } from "lucide-react";

import { getRawShowDescription } from "@/lib/utils";

function SearchResult({
  image,
  link,
  name,
  status,
  rating,
  year,
  genres,
  description,
}: SearchResultProps) {
  const newDescription = useMemo(
    () => getRawShowDescription(description),
    [description],
  );
  return (
    <>
      <div className="search-result__show">
        <Image
          src={image}
          alt=""
          className="search-result__show__image rounded-4xl"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="search-result__show__info">
          <div className="search-result__show__info__row1">
            <h2 className="search-result__show__info__title">
              <a href={link} target="_blank" rel="noreferrer">
                {name}
              </a>
            </h2>
            <p className="search-result__show__info__status">{status}</p>
          </div>
          <div className="search-result__show__info__row2 rounded-md">
            <p className="search-result__show__info__rating">
              <StarIcon className="search-result__show__info__rating__icon" />
              <span> {rating}</span>
            </p>
            <p className="search-result__show__info__period">
              {year && year.substring(0, 4)}
            </p>
            <p className="search-result__show__info__genres">
              {genres?.join(", ")}
            </p>
          </div>
          <div className="search-result__show__info__description">
            <p>{newDescription}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(SearchResult);
