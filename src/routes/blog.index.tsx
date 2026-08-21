import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/site";
import { articleSeoBySlug } from "@/lib/article-seo";
import type { Database } from "@/lib/database.types";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "بلاگ nexation | هوش مصنوعی و داده سازمانی" },
      {
        name: "description",
        content: "مقاله‌ها و بینش‌های کاربردی nexation درباره هوش مصنوعی، داده و تحول سازمانی.",
      },
      { property: "og:title", content: "بلاگ nexation | هوش مصنوعی و داده سازمانی" },
      {
        property: "og:description",
        content: "مقاله‌ها و بینش‌های کاربردی درباره هوش مصنوعی، داده و تحول سازمانی.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nexation.ir/blog" },
    ],
    links: [{ rel: "canonical", href: "https://nexation.ir/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void supabase
      .from("articles")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setArticles(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/90">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="text-lg font-black">
            nexation<span className="text-cyan">.</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            بازگشت به سایت
          </Link>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold text-cyan">دانش و تجربه</p>
        <h1 className="mt-3 text-4xl font-black md:text-6xl">بلاگ nexation</h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          مقاله‌ها و بینش‌های کاربردی درباره هوش مصنوعی، داده و تحول سازمانی.
        </p>

        {loading ? (
          <p className="mt-16 text-muted-foreground">در حال دریافت مقاله‌ها...</p>
        ) : articles.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground">
            هنوز مقاله‌ای منتشر نشده است.
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                to="/blog/$slug"
                params={{ slug: article.slug }}
                className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-cyan/40"
              >
                {articleSeoBySlug[article.slug]?.image && (
                  <img
                    src={articleSeoBySlug[article.slug].image}
                    alt={articleSeoBySlug[article.slug].imageAlt}
                    width={600}
                    height={315}
                    loading="lazy"
                    className="mb-6 aspect-[1200/630] w-full rounded-2xl object-cover"
                  />
                )}
                <time className="text-xs text-muted-foreground" dir="ltr">
                  {formatDate(article.published_at)}
                </time>
                <h2 className="mt-4 text-xl font-black group-hover:text-cyan">{article.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                  {article.excerpt}
                </p>
                <span className="mt-6 inline-block text-sm font-bold text-cyan">
                  مطالعه مقاله ←
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
