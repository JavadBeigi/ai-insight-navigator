import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/site";
import type { Database } from "@/lib/database.types";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: "مقاله | بلاگ nexation" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `https://nexation.ir/blog/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `https://nexation.ir/blog/${params.slug}` }],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()
      .then(({ data }) => {
        setArticle(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return (
      <main className="min-h-screen bg-background p-10 text-center text-muted-foreground">
        در حال دریافت مقاله...
      </main>
    );
  if (!article)
    return (
      <main className="min-h-screen bg-background p-10 text-center text-foreground">
        <p>مقاله پیدا نشد.</p>
        <Link to="/blog" className="mt-5 inline-block text-cyan">
          بازگشت به بلاگ
        </Link>
      </main>
    );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link to="/" className="text-lg font-black">
            nexation<span className="text-cyan">.</span>
          </Link>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            همه مقاله‌ها
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-6 py-20">
        <time className="text-sm text-cyan" dir="ltr">
          {formatDate(article.published_at)}
        </time>
        <h1 className="mt-5 text-balance text-4xl font-black leading-tight md:text-6xl">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-7 text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
        )}
        <div className="mt-12 whitespace-pre-wrap border-t border-border pt-10 text-base leading-9 text-foreground/90">
          {article.content}
        </div>
      </article>
    </main>
  );
}
