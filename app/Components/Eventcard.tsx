import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
}

const EventCard = ({ title, image, slug, location, date }: Props) => {
  return (
    <Link href={`/events/${slug}`} className="event-card block">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          width={500}
          height={350}
          className="event-card-img"
        />
      </div>

      <div className="mt-4 space-y-1">
        <p className="event-card-title">{title}</p>
        <p className="text-sm text-gray-400">{location}</p>
        <p className="text-sm text-gray-500">{new Date(date).toDateString()}</p>
      </div>
    </Link>
  );
};

export default EventCard;
