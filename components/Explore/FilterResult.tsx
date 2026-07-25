import Image from "next/image";

function FilterResult({ image, link, name }: FilterResultProps) {
  return (
    <div className="filter-result">
      <a
        href={link}
        className="filter-result__link"
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
          className="rounded-2xl"
        />
      </a>
      <p className="filter-result-title">{name}</p>
    </div>
  );
}

export default FilterResult;
