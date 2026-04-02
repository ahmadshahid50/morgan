import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-3 items-center px-6">
        <nav className="justify-self-start">
          <a
            href="#clinic"
            className="rounded-full px-3 py-2 text-sm font-semibold text-black transition-colors hover:bg-black/5 hover:text-black focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            Clinic
          </a>
        </nav>

        <a
          href="#clinic"
          className="group justify-self-center"
          aria-label="Go to clinic section"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="h-16 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </a>

        <nav className="justify-self-end">
          <a
            href="#coaching"
            className="rounded-full px-3 py-2 text-sm font-semibold text-black transition-colors hover:bg-black/5 hover:text-black focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            Coaching
          </a>
        </nav>
      </div>
    </header>
  );
}

