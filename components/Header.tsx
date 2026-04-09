import Link from "next/link";

const navItems = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/articles", name: "Articles" },
  { path: "/events", name: "Events" },
];

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[var(--dark-green)]/10 bg-[var(--light-green)]/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-screen-xl px-6 md:px-12 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold tracking-tight text-[var(--soft-white)]"
          >
            The BioMed Journal
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6 md:gap-8">
            {navItems.map(({ path, name }) => (
              <Link
                key={path}
                href={path}
                className="text-sm md:text-base font-medium text-[var(--soft-white)] hover:opacity-80 hover:underline underline-offset-4 transition-all duration-200"
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero title section */}
      <section className="w-full bg-[var(--soft-white)] border-b border-[var(--light-green)]/20">
        <div className="mx-auto max-w-screen-xl px-6 md:px-12 py-12 text-center">
          <h1 className="text-[42px] md:text-7xl font-bold tracking-tight text-[var(--dark-green)] leading-tight">
            The BioMed Journal
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[var(--light-green)] max-w-3xl mx-auto leading-relaxed">
            Student-led research, workshops, and opportunities in the biological sciences.
          </p>
        </div>
      </section>
    </>
  );
}