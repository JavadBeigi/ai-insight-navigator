import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { servicePages, servicePath, type ServiceContent } from "@/lib/services";

const button = "inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";
const card = "rounded-3xl border border-border bg-card p-6 sm:p-8";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} aria-labelledby={id + "-title"} className="scroll-mt-24 border-t border-border py-14 sm:py-20">
    <h2 id={id + "-title"} className="mb-8 text-2xl font-black leading-relaxed sm:text-3xl">{title}</h2>
    {children}
  </section>;
}

export function ServicePage({ service }: { service: ServiceContent }) {
  const url = "https://nexation.ir" + servicePath(service);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": url + "#service", name: service.title, description: service.description,
        url, serviceType: service.label, provider: { "@id": "https://nexation.ir/#organization" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "خانه", item: "https://nexation.ir/" },
        { "@type": "ListItem", position: 2, name: service.label, item: url },
      ] },
    ],
  };
  return <div className="min-h-screen bg-background text-foreground">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <SiteHeader />
    <main id="main-content" className="mx-auto max-w-7xl px-5 sm:px-8">
      <nav aria-label="مسیر صفحه" className="flex flex-wrap gap-2 pt-7 text-xs text-muted-foreground"><a href="/" className="hover:text-cyan">خانه</a><span aria-hidden> / </span><span aria-current="page">{service.label}</span></nav>
      <section className="grid items-center gap-10 py-14 lg:grid-cols-[1.4fr_1fr] lg:py-20">
        <div>
          <p className="mb-4 text-sm font-bold text-cyan">{service.eyebrow}</p>
          <h1 className="max-w-3xl text-balance text-3xl font-black leading-[1.6] sm:text-5xl sm:leading-[1.5]">{service.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-9 text-muted-foreground">{service.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/#contact" className={button + " bg-primary text-primary-foreground hover:bg-primary/90"}>بررسی نیاز سازمان شما</a>
            <a href="/ai-maturity-assessment" className={button + " border border-cyan/30 hover:border-cyan"}>سنجش بلوغ AI</a>
          </div>
        </div>
        <aside className="relative rounded-3xl border border-cyan/30 bg-cyan/5 p-7 sm:p-10">
          <span className="mb-7 block h-1 w-14 rounded-full bg-cyan" aria-hidden />
          <h2 className="text-xl font-black">خروجی مورد انتظار</h2>
          <p className="mt-4 text-lg leading-9">{service.outcome}</p>
          <div className="mt-7 border-t border-cyan/20 pt-5 text-sm leading-7 text-muted-foreground">دامنه پروژه، مسئولیت‌ها و معیار پذیرش پیش از اجرا با سازمان شما توافق می‌شود.</div>
        </aside>
      </section>
      <nav aria-label="بخش‌های صفحه" className="mb-10 flex flex-wrap gap-3 text-sm">
        {[["applications","کاربردها"],["deliverables","خروجی همکاری"],["process","مراحل اجرا"],["cost","هزینه و دامنه"],["faq","پرسش‌های متداول"]].map(([id,label]) => <a key={id} href={"#" + id} className="rounded-full border border-border px-4 py-2 hover:border-cyan hover:text-cyan">{label}</a>)}
      </nav>
      <Section id="applications" title="این خدمت برای چه نیازهایی مناسب است؟">
        <p className="mb-8 max-w-4xl leading-9 text-muted-foreground">{service.audience}</p>
        <div className="grid gap-5 md:grid-cols-3">{service.scenarios.map(item => <article className={card} key={item.title}><h3 className="mb-4 text-lg font-bold">{item.title}</h3><p className="text-sm leading-8 text-muted-foreground">{item.text}</p></article>)}</div>
        <p className="mt-5 text-xs leading-6 text-muted-foreground">این‌ها نمونه کاربردهای قابل بررسی‌اند؛ انتخاب نهایی به داده، زیرساخت و فرایند سازمان بستگی دارد.</p>
      </Section>
      <Section id="deliverables" title="در پایان همکاری چه چیزی تحویل می‌گیرید؟">
        <ul className="grid gap-4 md:grid-cols-2">{service.deliverables.map((text,i) => <li key={text} className="flex items-start gap-4 rounded-2xl border border-border p-5"><span className="font-mono text-lg font-bold text-cyan" aria-hidden>{String(i+1).padStart(2,"0")}</span><span className="leading-8">{text}</span></li>)}</ul>
      </Section>
      <Section id="process" title="مسیر اجرا؛ از شناخت تا تصمیم برای گسترش">
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{service.process.map((item,i) => <li key={item.title} className={card}><span className="text-sm font-bold text-cyan">مرحله {i+1}</span><h3 className="my-4 text-lg font-bold">{item.title}</h3><p className="text-sm leading-8 text-muted-foreground">{item.text}</p></li>)}</ol>
      </Section>
      <Section id="quality" title="امنیت، کیفیت و مسئولیت‌پذیری">
        <ul className="grid gap-4 md:grid-cols-2">{service.safeguards.map(text => <li key={text} className="flex gap-3 rounded-2xl bg-cyan/5 p-5 leading-8"><span aria-hidden className="text-cyan">✓</span>{text}</li>)}</ul>
      </Section>
      <Section id="cost" title="هزینه و دامنه پروژه چگونه مشخص می‌شود؟">
        <div className="grid gap-8 lg:grid-cols-2"><p className="leading-9 text-muted-foreground">{service.cost}</p><ul className={card + " space-y-4"}>{service.factors.map(text => <li className="flex gap-3 text-sm leading-7" key={text}><span aria-hidden className="text-cyan">•</span>{text}</li>)}</ul></div>
      </Section>
      <Section id="faq" title="پرسش‌های متداول">
        <div className="max-w-4xl space-y-4">{service.faqs.map(item => <details key={item.question} className="rounded-2xl border border-border bg-card px-5 sm:px-7"><summary className="cursor-pointer py-6 font-bold leading-8 focus-visible:outline-cyan">{item.question}</summary><p className="border-t border-border py-6 text-sm leading-8 text-muted-foreground">{item.answer}</p></details>)}</div>
      </Section>
      <Section id="resources" title="برای تصمیم دقیق‌تر بخوانید">
        <div className="grid gap-4 md:grid-cols-3">{service.articles.map(item => <a href={item.href} key={item.href} className={card + " flex items-center justify-between gap-4 font-bold leading-8 transition-colors hover:border-cyan/50 hover:text-cyan"}>{item.title}<span aria-hidden>←</span></a>)}</div>
      </Section>
      <section aria-labelledby="next-step" className="mb-14 rounded-3xl border border-cyan/30 bg-gradient-to-l from-primary/10 to-cyan/5 p-7 text-center sm:p-12">
        <p className="text-sm font-bold text-cyan">قدم بعدی</p><h2 id="next-step" className="mt-3 text-2xl font-black leading-relaxed sm:text-3xl">نیاز سازمانتان را به یک پروژه مشخص تبدیل کنیم</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-muted-foreground">از مسئله، وضعیت داده و محدودیت‌های شما شروع می‌کنیم تا مسیر مناسب همکاری روشن شود.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><a href="/#contact" className={button + " bg-primary text-primary-foreground"}>درخواست جلسه مشاوره</a><a href="/ai-maturity-assessment" className={button + " border border-border"}>شروع سنجش بلوغ AI</a></div>
      </section>
    </main>
    <footer className="border-t border-border bg-card/40 px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
        <div><a href="/" className="text-2xl font-black">nexation<span className="text-cyan">.</span></a><p className="mt-4 max-w-xl text-sm leading-8 text-muted-foreground">همراه سازمان‌ها در استراتژی و تحول هوش مصنوعی؛ از سنجش بلوغ و مشاوره تا طراحی و اجرای چت‌بات و ایجنت.</p><a className="mt-4 inline-block text-sm text-cyan" href="https://www.linkedin.com/company/nexationai/">Nexation در لینکدین</a></div>
        <nav aria-label="خدمات مرتبط" className="flex flex-col items-start gap-4 text-sm"><h2 className="font-bold">خدمات Nexation</h2>{servicePages.map(item => <a key={item.slug} href={servicePath(item)} aria-current={item.slug === service.slug ? "page" : undefined} className="text-muted-foreground hover:text-cyan">{item.label}</a>)}<a href="/ai-maturity-assessment" className="text-muted-foreground hover:text-cyan">سنجش بلوغ هوش مصنوعی</a></nav>
      </div>
    </footer>
  </div>;
}

