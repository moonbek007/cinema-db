import Image from "next/image";
import Link from "next/link";

function CollectionElement({
  name,
  image,
  numberOfShows,
}: CollectionElementProps) {
  return (
    <div className="collections__element rounded-2xl">
      <Link href={`/explore?genre=${name}`}>
        <Image
          src={image}
          alt="collection image"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: "1",
          }}
          className="rounded-2xl"
          loading="eager"
        />
        <p className="collections__element__title">{name}</p>
        <p className="collections__element__quantity py-1 px-2 rounded-full text-xs">
          {numberOfShows} shows
        </p>
      </Link>
    </div>
  );
}

export default CollectionElement;
