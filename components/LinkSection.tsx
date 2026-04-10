import Link from "next/link";

interface LinkItem {
  label: string;
  url: string;
}

interface LinkSectionProps {
  title: string;
  links: LinkItem[];
}

export default function LinkSection({ title, links }: LinkSectionProps) {
  return (
    <section className="mt-10 w-full flex flex-col items-center justify-center py-16 px-6 text-center text-[var(--soft-white)] bg-[var(--light-green)] rounded-3xl">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        {title}
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="px-8 py-3 rounded-full border-2 border-[var(--dark-green)] bg-[var(--dark-green)] font-semibold text-lg hover:bg-[var(--soft-white)] hover:text-[var(--dark-green)] transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
