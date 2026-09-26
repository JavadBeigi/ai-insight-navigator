import { createFileRoute } from "@tanstack/react-router";
import { Compass, Workflow, TrendingUp, ArrowUpLeft, Linkedin, UserRound } from "lucide-react";
import { aboutSchema, defaultAbout } from "@/lib/about";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/about")({
  loader: async () => {
    try {
      const { data } = await supabase
        .from("site_pages")
        .select("content")
        .eq("slug", "about")
        .maybeSingle();
      const parsed = aboutSchema.safeParse(data?.content);
      return parsed.success ? parsed.data : defaultAbout;
    } catch {
      return defaultAbout;
    }
  },
  head: () => ({
    meta: [
      { title: "درباره Nexation | از استراتژی AI تا تحول در عمل" },
      {
        name: "description",
        content:
          "با مأموریت Nexation آشنا شوید؛ سنجش بلوغ، مشاوره و استراتژی هوش مصنوعی، ساخت چت‌بات و ایجنت و همراهی سازمان‌ها در تحول AI-native.",
      },
      { property: "og:title", content: "Nexation؛ شریک تحول سازمان با هوش مصنوعی" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nexation.ir/about" },
      { property: "og:image", content: "https://nexation.ir/favicon.png" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://nexation.ir/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const content = Route.useLoaderData();
  const icons = [Compass, Workflow, TrendingUp];
  const visibleConsultants = content.consultants.filter((consultant) => consultant.visible);
  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": "https://nexation.ir/about#page",
            url: "https://nexation.ir/about",
            name: content.title,
            description: content.introduction,
            inLanguage: "fa-IR",
            mainEntity: {
              "@type": "Organization",
              name: "Nexation",
              url: "https://nexation.ir/",
              logo: "https://nexation.ir/favicon.png",
              sameAs: ["https://www.linkedin.com/company/nexationai/"],
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <header className="border-b border-border">
        <nav
          aria-label="ناوبری درباره ما"
          className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5"
        >
          <a
            href="/"
            className="flex items-center gap-2 text-xl font-black"
            aria-label="صفحه اصلی Nexation"
          >
            <img src="/favicon.png" alt="" className="size-10 object-contain" />
            nexation<span className="text-cyan">.</span>
          </a>
          <div className="flex flex-wrap gap-5 text-sm">
            <a href="/blog">بلاگ</a>
            <a href="/ai-maturity-assessment" className="text-cyan">
              سنجش بلوغ AI
            </a>
            <a href="/#contact">گفت‌وگو با ما</a>
          </div>
        </nav>
      </header>
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 md:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        />
        <p className="relative text-sm font-bold tracking-wide text-cyan">دربارهٔ NEXATION</p>
        <h1 className="relative mt-7 max-w-4xl text-balance text-4xl font-black leading-[1.5] md:text-6xl md:leading-[1.4]">
          {content.title}
        </h1>
        <p className="relative mt-8 max-w-3xl text-lg leading-9 text-muted-foreground">
          {content.introduction}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/#contact"
            className="inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-4 font-bold text-primary-foreground"
          >
            شروع گفت‌وگو
            <ArrowUpLeft size={20} />
          </a>
          <a href="#mission" className="rounded-xl border border-border px-6 py-4 font-bold">
            مأموریت ما
          </a>
        </div>
      </section>
      <section id="mission" className="scroll-mt-8 border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-[1fr_2fr] md:py-20">
          <div>
            <p className="text-sm text-cyan">چرایی کار ما</p>
            <h2 className="mt-3 text-3xl font-black">مأموریت Nexation</h2>
          </div>
          <div className="space-y-5 text-lg leading-10 text-muted-foreground">
            {content.mission.split(/\n\s*\n/).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-bold text-cyan">از شناخت مسئله تا نتیجه</p>
        <h2 className="mt-4 text-3xl font-black md:text-4xl">چطور همراه سازمان شما هستیم؟</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {content.services.map((service, i) => {
            const Icon = icons[i];
            return (
              <article key={i} className="rounded-3xl border border-border bg-card p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <Icon className="text-cyan" size={30} />
                  <span aria-hidden="true" className="text-3xl font-light text-muted-foreground/50">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-bold">{service.title}</h3>
                <p className="mt-5 leading-8 text-muted-foreground">{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>
      {visibleConsultants.length > 0 ? (
        <section className="border-y border-border bg-card/35">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-sm font-bold text-cyan">تجربه در کنار شما برای تحول</p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              مشاورانی که مسیر تحول را همراهی می‌کنند
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">
              تیم مشاوران Nexation، تجربهٔ استراتژی، فناوری و تحول سازمانی را کنار هم می‌آورد تا هوش
              مصنوعی از یک ایده به نتیجه‌ای قابل‌اندازه‌گیری تبدیل شود.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {visibleConsultants.map((consultant, index) => (
                <article
                  key={`${consultant.name}-${index}`}
                  className="group overflow-hidden rounded-3xl border border-border bg-background"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/20 to-cyan/10">
                    {consultant.imageUrl ? (
                      <img
                        src={consultant.imageUrl}
                        alt={`تصویر ${consultant.name}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <UserRound
                          aria-hidden="true"
                          className="text-cyan/70"
                          size={72}
                          strokeWidth={1.25}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-black">{consultant.name}</h3>
                        <p className="mt-2 text-sm font-bold text-cyan">{consultant.role}</p>
                      </div>
                      {consultant.linkedinUrl ? (
                        <a
                          href={consultant.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`لینکدین ${consultant.name}`}
                          className="rounded-lg border border-border p-2 text-muted-foreground transition hover:border-cyan hover:text-cyan"
                        >
                          <Linkedin size={18} />
                        </a>
                      ) : null}
                    </div>
                    <p className="mt-5 text-sm leading-7 text-muted-foreground">{consultant.bio}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {consultant.specialties.map((specialty, specialtyIndex) => (
                        <span
                          key={`${specialty}-${specialtyIndex}`}
                          className="rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1 text-xs text-cyan"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-cyan/20 bg-gradient-to-bl from-primary/15 to-cyan/5 p-8 md:p-14">
          <p className="font-bold text-cyan">افق مشترک ما</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-black leading-relaxed">
            {content.nativeTitle}
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-9 text-muted-foreground">
            {content.nativeDescription}
          </p>
        </div>
      </section>
      <section className="border-t border-border px-6 py-16 text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-black leading-relaxed">
          {content.ctaTitle}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
          {content.ctaDescription}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/ai-maturity-assessment"
            className="rounded-xl bg-primary px-7 py-4 font-bold text-primary-foreground"
          >
            سنجش بلوغ AI
          </a>
          <a href="/#contact" className="rounded-xl border border-border px-7 py-4 font-bold">
            درخواست جلسه مشاوره
          </a>
        </div>
      </section>
      <footer className="border-t border-border bg-card px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-5 text-sm text-muted-foreground">
          <span>nexation — از استراتژی تا تحول در عمل</span>
          <a
            href="https://www.linkedin.com/company/nexationai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nexation در لینکدین ↗
          </a>
          <a href="/">بازگشت به صفحه اصلی</a>
        </div>
      </footer>
    </main>
  );
}
