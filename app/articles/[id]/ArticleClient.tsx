"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

type Article = {
  id: string;
  title: string;
  content: string;
  author: string;
  author_image: string | null;
  cover_image: string | null;
  category: string;
  volume_issue: string | null;
  read_time: number;
  published_at: string;
  views: number;
  likes: number;
  comments: number;
};

type Comment = {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Cookie utility functions
const cookieUtils = {
  set: (name: string, value: string, days: number = 30) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
  },

  get: (name: string): string | null => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(nameEQ)) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  },

  has: (name: string): boolean => {
    return cookieUtils.get(name) !== null;
  },
};

export default function ArticleClient({ article }: { article: Article }) {
  const [views, setViews] = useState(article.views);
  const [likes, setLikes] = useState(article.likes);
  const [commentsCount, setCommentsCount] = useState(article.comments);
  const [comments, setComments] = useState<Comment[]>([]);
  const [liked, setLiked] = useState(false);
  const [authorInput, setAuthorInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [viewIncremented, setViewIncremented] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after mount to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Increment view count on load (only once per user/browser)
  useEffect(() => {
    if (!isClient || viewIncremented) return;

    const incrementViews = async () => {
      try {
        // Create a unique cookie name for this article
        const cookieName = `viewed_article_${article.id}`;

        console.log("Checking if article was viewed before...");

        // Check if user has already viewed this article
        if (cookieUtils.has(cookieName)) {
          console.log("Article already viewed by this user, skipping view count increment");
          setViewIncremented(true);
          return;
        }

        console.log("New view detected, incrementing view count");

        // Increment the view count
        const { error: incrementError } = await supabase.rpc(
          "increment_article_views",
          { article_id: article.id }
        );

        if (incrementError) {
          console.error("Error incrementing views:", incrementError.message);
          setViewIncremented(true);
          return;
        }

        // Fetch updated article data
        const { data: updatedArticle, error: fetchError } = await supabase
          .from("articles")
          .select("views")
          .eq("id", article.id)
          .single();

        if (!fetchError && updatedArticle) {
          console.log("Views updated successfully to:", updatedArticle.views);
          setViews(updatedArticle.views);

          // Set cookie to mark as viewed (expires in 30 days)
          cookieUtils.set(cookieName, "true", 30);
        }

        setViewIncremented(true);
      } catch (err) {
        console.error("Unexpected error incrementing views:", err);
        setViewIncremented(true);
      }
    };

    incrementViews();
  }, [article.id, viewIncremented, isClient]);

  // Fetch existing comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("Fetching comments for article:", article.id);
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("article_id", article.id)
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching comments:", error.message);
          return;
        }

        console.log("Comments fetched:", data);
        if (data) setComments(data as Comment[]);
      } catch (err) {
        console.error("Unexpected error fetching comments:", err);
      }
    };

    fetchComments();
  }, [article.id]);

  // Check if user has already liked this article on mount
  useEffect(() => {
    if (!isClient) return;

    const likeCookieName = `liked_article_${article.id}`;
    if (cookieUtils.has(likeCookieName)) {
      setLiked(true);
    }
  }, [article.id, isClient]);

  // Handle like button (only once per user)
  const handleLike = async () => {
    if (liked) {
      alert("You've already liked this article");
      return;
    }

    try {
      console.log("Liking article:", article.id);

      const { error } = await supabase.rpc(
        "increment_article_likes",
        { article_id: article.id }
      );

      if (error) {
        console.error("Error updating likes:", error.message);
        alert("Failed to register like: " + error.message);
        return;
      }

      // Fetch updated article data
      const { data: updatedArticle, error: fetchError } = await supabase
        .from("articles")
        .select("likes")
        .eq("id", article.id)
        .single();

      if (!fetchError && updatedArticle) {
        console.log("Likes updated successfully to:", updatedArticle.likes);
        setLikes(updatedArticle.likes);

        // Set cookie to mark as liked
        const likeCookieName = `liked_article_${article.id}`;
        cookieUtils.set(likeCookieName, "true", 365); // 1 year expiry for likes

        setLiked(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Failed to register like: " + String(err));
    }
  };

  // Handle submitting a comment
  const handleCommentSubmit = async () => {
    if (!authorInput.trim() || !commentInput.trim()) {
      alert("Please enter both a name and comment");
      return;
    }

    try {
      console.log("Submitting comment for article:", article.id);
      const { data, error } = await supabase
        .from("comments")
        .insert({
          article_id: article.id,
          author_name: authorInput,
          content: commentInput,
        })
        .select();

      if (error) {
        console.error("Error posting comment:", error.message);
        alert("Failed to post comment: " + error.message);
        return;
      }

      if (data && data.length > 0) {
        console.log("Comment posted successfully");
        setComments((prev) => [...prev, data[0] as Comment]);
        setCommentInput("");
        setAuthorInput("");

        // Use the increment function instead of manual update
        const { error: rpcError } = await supabase.rpc(
          "increment_article_comments",
          { article_id: article.id }
        );

        if (rpcError) {
          console.error("Error updating comment count:", rpcError.message);
        } else {
          // Fetch updated comment count
          const { data: updatedArticle } = await supabase
            .from("articles")
            .select("comments")
            .eq("id", article.id)
            .single();

          if (updatedArticle) {
            console.log("Comment count updated successfully");
            setCommentsCount(updatedArticle.comments);
          }
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Failed to post comment: " + String(err));
    }
  };

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="mx-auto max-w-screen-lg px-8 py-10">
      <Link
        href="/articles"
        className="text-sm text-[var(--light-green)] hover:text-[var(--dark-green)] mb-6 inline-block"
      >
        ← Back to Articles
      </Link>

      {article.cover_image && (
        <div className="w-full rounded-lg overflow-hidden mb-8 bg-gray-100">
          <Image
            src={article.cover_image}
            alt={article.title}
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      )}

      <div className="mb-8">
        {article.volume_issue && (
          <p className="text-sm text-[var(--light-green)] mb-2">{article.volume_issue}</p>
        )}

        <h1 className="font-bold text-3xl md:text-4xl text-[var(--dark-green)] mb-4 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-3">
          {article.author_image ? (
            <Image
              src={article.author_image}
              alt={article.author}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[var(--light-green)] flex items-center justify-center text-white font-bold">
              {article.author[0]}
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-[var(--dark-green)]">{article.author}</p>
            <p className="text-xs text-[var(--light-green)]">
              {formatDate(article.published_at)} · {article.read_time} min read
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-4 text-sm text-[var(--light-green)]">
          <span>{views.toLocaleString()} views</span>
          <span>{commentsCount.toLocaleString()} comments</span>
          <button
            onClick={handleLike}
            disabled={liked}
            className={`flex items-center gap-1 transition ${
              liked
                ? "opacity-50 cursor-default"
                : "hover:scale-105 hover:text-[var(--dark-green)] cursor-pointer"
            }`}
            title={liked ? "You've already liked this article" : "Like this article"}
          >
            {likes} <span className="text-red-400">♥</span>
          </button>
        </div>
      </div>

      <hr className="border-[var(--light-green)] opacity-30 mb-8" />

      <article className="prose prose-lg max-w-none prose-headings:text-[var(--dark-green)] prose-headings:font-bold prose-p:text-[var(--dark-green)] prose-p:leading-relaxed prose-img:mx-auto prose-img:rounded-lg prose-a:text-[var(--light-green)] prose-a:underline hover:prose-a:text-[var(--dark-green)]">
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--light-green)] underline hover:text-[var(--dark-green)] transition-colors"
              />
            ),
          }}
        >
          {article.content}
        </ReactMarkdown>
      </article>

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 text-[var(--dark-green)]">Comments</h2>

        {/* Add comment form */}
        <div className="flex flex-col gap-4 mb-8 p-4 bg-[var(--soft-white)] rounded-lg border border-[var(--light-green)]/20">
          <input
            type="text"
            placeholder="Your name (anonymous)"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            className="border border-[var(--light-green)] rounded px-3 py-2 w-full focus:outline-none focus:border-[var(--dark-green)]"
          />
          <textarea
            placeholder="Write a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="border border-[var(--light-green)] rounded px-3 py-2 w-full min-h-24 focus:outline-none focus:border-[var(--dark-green)] resize-none"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-[var(--light-green)] hover:bg-[var(--dark-green)] text-white px-4 py-2 rounded font-semibold transition-colors"
          >
            Post Comment
          </button>
        </div>

        {/* Display comments */}
        {comments.length > 0 ? (
          <div className="flex flex-col gap-4">
            {comments.map((c) => (
              <div key={c.id} className="border-l-2 border-[var(--light-green)] pl-4 py-2">
                <p className="font-semibold text-[var(--dark-green)]">{c.author_name}</p>
                <p className="text-[var(--dark-green)] mt-1">{c.content}</p>
                <p className="text-xs text-[var(--light-green)] mt-2">
                  {new Date(c.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--light-green)] text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}