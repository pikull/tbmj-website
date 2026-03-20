import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--light-green)] text-[var(--dark-green)] w-full mt-auto flex flex-col items-center py-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">
          {" "}
          &copy;{" "}
          <Link
            className="underline underline-offset-2 hover:underline-offset-4 transition-all duration-200"
            href="mailto:thebiomedjournal@gmail.com"
          >
            The BioMed Journal
          </Link>{" "}
          {new Date().getFullYear()}
        </span>

        <Link
          className="hover:opacity-70 transition-all duration-200"
          href="https://www.instagram.com/thebiomed_journal/"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}
