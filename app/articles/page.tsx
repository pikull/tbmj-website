"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

type Article = {
  id: string;
  title: string;
  content: string;
  cover_image: string | null;
  author: string;
  author_image: string | null;
  category: string;
  volume_issue: string | null;
  published_at: string;
  read_time: number;
  views: number;
  likes: number;
  comments: number;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ArticlesDirectory() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("published_at", { ascending: false });
      
      if (!error && data) {
        const articlesData = data as Article[];
        setArticles(articlesData);
        
        // Extract unique categories from articles
        const uniqueCategories = Array.from(
          new Set(articlesData.map((article) => article.category))
        );
        setCategories(uniqueCategories);
      }
    };
    fetchArticles();
  }, []);

  // Filter articles by category and search query
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    
    let filtered = articles;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      );
    }

    // Filter by search query
    if (query) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query)
      );
    }

    setFilteredArticles(filtered);
  }, [searchQuery, selectedCategory, articles]);

  return (
    <div className="mx-auto max-w-screen-xl px-6 md:px-12 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--dark-green)] text-center mb-8">
        Articles
      </h1>

      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search articles by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-3 border-2 border-[var(--light-green)] rounded-lg focus:outline-none focus:border-[var(--dark-green)] text-gray-800 placeholder-gray-500"
        />
      </div>

      {/* Category Filter Tabs */}
      {categories.length > 0 && (
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === null
                ? "bg-[var(--dark-green)] text-white shadow-md"
                : "bg-[var(--soft-white)] text-[var(--dark-green)] border-2 border-[var(--light-green)] hover:border-[var(--dark-green)]"
            }`}
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-[var(--dark-green)] text-white shadow-md"
                  : "bg-[var(--soft-white)] text-[var(--dark-green)] border-2 border-[var(--light-green)] hover:border-[var(--dark-green)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {filteredArticles.map((article) => (
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
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-[var(--light-green)]">
            {searchQuery || selectedCategory
              ? "No articles match your filters."
              : "No articles found."}
          </p>
        </div>
      )}
    </div>
  );
}