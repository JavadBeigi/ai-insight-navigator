import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/site";
import { articleSeoBySlug } from "@/lib/article-seo";
import type { Database } from "@/lib/database.types";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const seo = articleSeoBySlug[params.slug];
    const canonicalUrl = `https://nexation.ir/blog/${params.slug}`;
    const title = seo?.metaTitle ?? "مقاله | بلاگ nexation";
    const description = seo?.metaDescription ?? "مقاله‌های nexation درباره هوش مصنوعی و داده.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonicalUrl },
        ...(seo ? [{ property: "og:image", content: seo.image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
  component: ArticlePage,
});

function ArticleBody({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\s*\n/);

  return (
    <div className="mt-12 border-t border-border pt-10 text-base leading-9 text-foreground/90">
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) {
          return (
            <h3 key={index} className="mb-4 mt-10 text-2xl font-black text-foreground">
              {block.slice(4)}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="mb-5 mt-14 text-3xl font-black text-foreground">
              {block.slice(3)}
            </h2>
          );
        }

        const lines = block.split("\n");
        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={index} className="my-6 list-disc space-y-2 pr-6 marker:text-cyan">
              {lines.map((line) => (
                <li key={line}>{line.slice(2)}</li>
              ))}
            </ul>
          );
        }
        if (lines.every((line) => /^\d+\.\s/.test(line))) {
          return (
            <ol key={index} className="my-6 list-decimal space-y-2 pr-6 marker:text-cyan">
              {lines.map((line) => (
                <li key={line}>{line.replace(/^\d+\.\s/, "")}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={index} className="my-5">
            {block}
          </p>
        );
      })}
    </div>
  );
}

function ArticlePage() {
  const { slug } = Route.useParams();
  const seo = articleSeoBySlug[slug];
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

  const canonicalUrl = `https://nexation.ir/blog/${article.slug}`;
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: seo?.metaDescription ?? article.excerpt,
    image: seo?.image,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { "@type": "Organization", name: seo?.author ?? "nexation" },
    publisher: {
      "@type": "Organization",
      name: "nexation",
      logo: { "@type": "ImageObject", url: "https://nexation.ir/favicon.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    keywords: seo?.keywords.join(", "),
    inLanguage: "fa-IR",
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
        <div className="flex flex-wrap items-center gap-3 text-sm text-cyan">
          <span>{seo?.author ?? "تیم nexation"}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={article.published_at ?? undefined} dir="ltr">
            {formatDate(article.published_at)}
          </time>
          {seo?.readingTime && (
            <>
              <span aria-hidden="true">•</span>
              <span>{seo.readingTime}</span>
            </>
          )}
        </div>
        <h1 className="mt-5 text-balance text-4xl font-black leading-tight md:text-6xl">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-7 text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
        )}
        {seo?.image && (
          <img
            src={seo.image}
            alt={seo.imageAlt}
            width={1200}
            height={630}
            className="mt-10 aspect-[1200/630] w-full rounded-3xl border border-border object-cover"
          />
        )}
        <ArticleBody content={article.content} />

        {seo?.sources.length ? (
          <section className="mt-14 border-t border-border pt-10" aria-labelledby="sources-title">
            <h2 id="sources-title" className="text-2xl font-black">
              منابع معتبر این مقاله
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {seo.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan underline-offset-4 hover:underline"
                  >
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <aside className="mt-14 rounded-3xl border border-cyan/30 bg-cyan/5 p-8">
          <h2 className="text-2xl font-black">ایجنت مناسب سازمان شما از کجا شروع می‌شود؟</h2>
          <p className="mt-3 leading-8 text-muted-foreground">
            در یک جلسه مشاوره، فرایند، منابع داده، ریسک‌ها و مسیر ساخت نمونه اولیه را بررسی می‌کنیم.
          </p>
          <a
            href="/#contact"
            className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
          >
            درخواست مشاوره رایگان
          </a>
        </aside>
      </article>
    </main>
  );
}
