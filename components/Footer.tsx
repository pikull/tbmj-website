import Link from "next/link";

const navItems = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/articles", name: "Articles" },
  { path: "/events", name: "Events" },
];

export default function Header() {
  return (
    <footer className="bg-background-green px-6 md:px-12 py-6 group flex items-center gap-6 w-full">
      abc def
    </footer>
    // <header className="bg-background-green sticky top-0 z-50 px-6 md:px-12 py-6 group flex items-center gap-6 w-full">
    //   {navItems.map(({path, name}) => {
    //     return (
    //       <Link key={path} href={path} className="text-lg">
    //         {name}
    //       </Link>
    //     );
    //   })}
    // </header>
  );
}
