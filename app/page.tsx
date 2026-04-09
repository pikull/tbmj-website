import Link from "next/link";
import Image from "next/image";
import LinkSection from "@/components/LinkSection";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

type Article = {
  id: string;
  title: string;
  author: string;
  author_image: string | null;
  cover_image: string | null;
  read_time: number;
  published_at: string;
  views: number;
  likes: number;
  comments: number;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function HomePage() {
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(6);

  return (
    <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 py-16">
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--dark-green)] mb-6">
          Explore Biology Through Research
        </h1>
        <p className="text-lg md:text-2xl text-[var(--light-green)] leading-relaxed">
          A student-led platform dedicated to publishing research, mentoring
          young scientists, and creating opportunities in the biological sciences.
        </p>
      </section>

      {/* Quick links */}
      <section className="mb-16">
        <LinkSection
          title="Explore The BioMed Journal"
          links={[
            { label: "About Us", url: "/about" },
            { label: "Medium", url: "https://medium.com/@thebiomedjournal" },
            { label: "Substack", url: "https://substack.com/@thebiomedjournal" },
          ]}
        />
      </section>

      {/* Embedded article directory */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--dark-green)]">
            Latest Publishings
          </h2>
          <Link
            href="/articles"
            className="text-[var(--light-green)] font-medium hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {articles?.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="break-inside-avoid block mb-6 border border-[var(--light-green)]/20 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 bg-white"
            >
              {article.cover_image && (
                <div className="w-full aspect-video relative bg-gray-100">
                  <Image
                    src={article.cover_image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-5">
                <p className="text-sm text-[var(--light-green)] mb-2">
                  {formatDate(article.published_at)} · {article.read_time} min read
                </p>

                <h3 className="text-lg font-bold text-[var(--dark-green)] leading-snug mb-3">
                  {article.title}
                </h3>

                <div className="flex justify-between text-xs text-[var(--light-green)] border-t border-[var(--light-green)]/20 pt-3">
                  <span>{article.views} views</span>
                  <span>{article.comments} comments</span>
                  <span>{article.likes} ♥</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}