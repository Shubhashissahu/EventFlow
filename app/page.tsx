import ExploreBtn from "./Components/explorebtn";
import EventCard from "./Components/Eventcard";
import "./globals.css";

const events = [
  {
    image: "/images/event1.jpg",
    title: "Event 1",
    slug: "event-1",
    location: "Mumbai, India",
    date: "2025-03-14",
  },
  {
    image: "/images/event2.jpg",
    title: "Event 2",
    slug: "event-2",
    location: "Bangalore, India",
    date: "2025-04-02",
  },
  {
    image: "/images/event3.jpg",
    title: "Event 3",
    slug: "event-3",
    location: "Delhi, India",
    date: "2025-05-18",
  },
];

export default function Home() {
  return (
    <main>

      {/* HERO SECTION */}
      <section className="h-screen w-full hero-gradient flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          The hub for every dev that you cannot miss
        </h1>

        <p className="mt-4 text-lg md:text-2xl text-white/80">
          Hackathon, meetup, and conference — all in one place
        </p>

        <ExploreBtn />
      </section>


      <section id="events" className="min-h-screen bg-[#0a0c10] text-white py-24">
  <div className="max-w-7xl mx-auto px-6">

    <h3 className="text-4xl font-bold mb-12">Featured Events</h3>

    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {events.map((event) => (
        <li key={event.title}>
          <EventCard {...event} />
        </li>
      ))}
    </ul>

  </div>
</section>



    </main>
  );
}
