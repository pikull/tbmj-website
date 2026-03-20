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
      <header className="bg-[var(--light-green)] text-[var(--soft-white)] sticky top-0 z-50 px-6 md:px-12 py-6 group flex items-center gap-6 w-full">
        {navItems.map(({ path, name }) => {
          return (
            <Link
              key={path}
              href={path}
              className="text-lg hover:opacity-70 hover:underline transition-all duration-200"
            >
              {name}
            </Link>
          );
        })}
      </header>
      <h1 className="flex w-full flex-col mb-4 py-6 px-6 bg-[var(--soft-white)] text-[var(--dark-green)] text-5xl md:text-7xl font-extrabold text-center">
        The BioMed Journal
      </h1>
    </>
  );
}
