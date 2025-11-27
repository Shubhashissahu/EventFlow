import Link from "next/link";
import Image from "next/image";
import logo from "../icons/logo.png";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-transparent backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src={logo}
              alt="EventFlow logo"
              width={32}
              height={32}
              className="cursor-pointer"
            />
          </Link>
          <span className="text-xl font-semibold text-white">Event-flow</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8 text-white">
          <li>
            <Link href="/" className="hover:text-primary transition">Home</Link>
          </li>
          <li>
            <Link href="/events" className="hover:text-primary transition">Events</Link>
          </li>
          <li>
            <Link href="/create-event" className="hover:text-primary transition">
              Create Event
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
