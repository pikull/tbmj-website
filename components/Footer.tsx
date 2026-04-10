import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-[var(--dark-green)]/10 bg-[var(--light-green)] text-[var(--dark-green)]">
      <div className="mx-auto max-w-screen-xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left side */}
        <div className="text-sm text-center md:text-left">
          <span>
            &copy;{" "}
            <Link
              href="mailto:thebiomedjournal@gmail.com"
              className="font-semibold underline underline-offset-2 hover:underline-offset-4 transition-all duration-200"
            >
              The BioMed Journal
            </Link>{" "}
            {new Date().getFullYear()}
          </span>
        </div>

        {/* Center */}
        <div className="text-sm font-medium tracking-wide">
          ISSN: 3069-0773
        </div>

        {/* Right side */}
        <Link
          href="https://www.instagram.com/thebiomed_journal/"
          target="_blank"
          className="hover:opacity-70 transition-all duration-200 hover:scale-110"
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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