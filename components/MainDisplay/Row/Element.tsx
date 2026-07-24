import Image from "next/image";
import Link from "next/link";

function Element({ link, image, name, year, country }: ElementProps) {
  return (
    <div className="element hover:bg-sky-950 p-4 rounded-2xl">
      <Link href={link} target="_blank" rel="noreferrer">
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
        <div className="element__info">
          <h4 className="element__info__title">{name}</h4>
          <h5 className="element__info__year-country">
            {year}, {country}
          </h5>
        </div>
      </Link>
    </div>
  );
}

export default Element;
