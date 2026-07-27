import Image from "next/image";
import Link from "next/link";

function FilterResult({ image, link, name }: FilterResultProps) {
  return (
    <div className="filter-result">
      <Link
        href={link}
        className="filter-result__link rounded-2xl"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src={image}
          alt="show image"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            position: "relative",
            zIndex: "1",
          }}
        />
        <p className="filter-result-title">{name}</p>
      </Link>
    </div>
  );
}

export default FilterResult;
