import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/site";
import { getArticleCover } from "@/lib/article-covers";
import type { Database } from "@/lib/database.types";

type Article = Database["public"]["Tables"]["articles"]["Row"];

function ArticleContent({ content }: { content: string }) {
  const blocks = content.trim().split(/\n{2,}/);

  return (
    <div className="mt-12 border-t border-border pt-10 text-base leading-9 text-foreground/90">
      {blocks.map((block, index) => {
        const text = block.trim();

        if (text.startsWith("### ")) {
          return (
            <h3 key={index} className="mb-4 mt-9 text-xl font-black leading-9 text-foreground md:text-2xl">
              {text.slice(4)}
            </h3>
          );
        }

        if (text.startsWith("## ")) {
          return (
            <h2 key={index} className="mb-5 mt-12 text-2xl font-black leading-10 text-foreground md:text-3xl">
              {text.slice(3)}
            </h2>
          );
        }

        const lines = text.split("\n").map((line) => line.trim());
        if (lines.every((line) => line.startsWith("• "))) {
          return (
            <ul key={index} className="mb-7 list-disc space-y-2 pr-6 marker:text-cyan">
              {lines.map((line) => (
                <li key={line}>{line.slice(2)}</li>
              ))}
            </ul>
          );
        }

        if (/^https?:\/\/\S+$/.test(text)) {
          return (
            <a
              key={index}
              href={text}
              target="_blank"
              rel="noreferrer"
              className="mb-5 block break-all text-cyan hover:underline"
              dir="ltr"
            >
              {text}
            </a>
          );
        }

        return (
          <p key={index} className="mb-7 whitespace-pre-line">
            {text}
          </p>
        );
      })}
    </div>
  );
}

export const Route = createFileRoute("/blog/$slug")({ component: ArticlePage });

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

  const cover = getArticleCover(article.slug);

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
        {cover && (
          <img
            src={cover.src}
            alt={cover.alt}
            className="mt-10 aspect-[3/2] w-full rounded-3xl object-cover"
          />
        )}
        <ArticleContent content={article.content} />
      </article>
    </main>
  );
}
