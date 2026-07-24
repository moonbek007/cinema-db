import Image from "next/image";
import { StarIcon } from "lucide-react";

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
          style={{ width: "30%", height: "auto" }}
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
              {year.substring(0, 4)}
            </p>
            <p className="search-result__show__info__genres">
              {genres?.join(", ")}
            </p>
          </div>
          <div
            className="search-result__show__info__description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
