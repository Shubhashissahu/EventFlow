'use client';

export default function ExploreBtn() {
  return (
    <button
      className="btn-primary mt-7 mx-auto"
      onClick={() => {
        document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Explore events
    </button>
  );
}
