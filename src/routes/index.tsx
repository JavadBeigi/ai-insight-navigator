import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import { supabase } from "@/lib/supabase";
import { normalizeIranianPhone } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "nexation | پلتفرم هوش مصنوعی و BI سازمانی" },
      {
        name: "description",
        content:
          "nexation به سازمان‌ها کمک می‌کند AI-Native شوند: کشف داده، ایجنت‌های هوشمند، چت‌بات دیتا و گزارش‌سازی خودکار در یک پلتفرم.",
      },
      { property: "og:title", content: "nexation | پلتفرم هوش مصنوعی و BI سازمانی" },
      {
        property: "og:description",
        content:
          "با داده‌های سازمانتان چت کنید، ایجنت بسازید و در لحظه گزارش بگیرید. nexation، لبه‌ی هوش مصنوعی سازمانی.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const services = [
  {
    n: "01",
    title: "کشف و یکپارچه‌سازی دیتا",
    desc: "شناسایی داده‌های پراکنده در سازمان و اتصال به SQL، NoSQL، فایل‌ها و APIهای ابری در یک لایه معنایی.",
  },
  {
    n: "02",
    title: "ایجنت‌های هوشمند سازمانی",
    desc: "طراحی ایجنت‌های خودکار برای پایش فرآیندها، اجرای وظایف چندمرحله‌ای و تصمیم‌گیری داده‌محور.",
  },
  {
    n: "03",
    title: "چت‌بات با دیتای شما",
    desc: "پرسش به زبان طبیعی از دیتابیس و مستندات؛ پاسخ همراه با نمودار، جدول و منابع قابل استناد.",
  },
  {
    n: "04",
    title: "گزارش‌سازی خودکار",
    desc: "داشبوردهای زنده و گزارش‌های تحلیلی BI که در لحظه به‌روزرسانی می‌شوند و به تصمیم می‌رسانند.",
  },
  {
    n: "05",
    title: "استقرار امن و اختصاصی",
    desc: "پیاده‌سازی روی زیرساخت داخلی سازمان با کنترل کامل بر مدل، داده و دسترسی‌ها.",
  },
  {
    n: "06",
    title: "تبدیل به سازمان AI-Native",
    desc: "بازطراحی فرآیندها، آموزش تیم‌ها و ساخت نقشه راه برای ادغام هوش مصنوعی در عمق سازمان.",
  },
];

const steps = [
  { n: "01", t: "اتصال", d: "منابع داده را در چند دقیقه به پلتفرم متصل می‌کنیم." },
  { n: "02", t: "یادگیری", d: "لایه معنایی، ساختار داده و اصطلاحات سازمان شما را می‌فهمد." },
  { n: "03", t: "گفتگو", d: "تیم شما با دیتا چت می‌کند و در لحظه پاسخ می‌گیرد." },
  { n: "04", t: "خودکارسازی", d: "ایجنت‌ها گزارش‌ها و اقدامات تکراری را برعهده می‌گیرند." },
];

const metrics = [
  { v: "40%+", l: "بهبود بهره‌وری" },
  { v: "12ms", l: "میانگین تاخیر پاسخ" },
  { v: "150+", l: "پروژه موفق" },
  { v: "3.5×", l: "بازگشت سرمایه" },
];

function Landing() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <LogosStrip />
      <Services />
      <ChatDemo />
      <Steps />
      <DashboardShowcase />
      <Metrics />
      <CTA />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <a href="#" className="flex items-center gap-2">
            <img
              src="/favicon.png"
              alt=""
              aria-hidden="true"
              className="size-9 shrink-0 object-contain"
            />
            <span className="text-lg font-black tracking-tight">
              nexation<span className="text-cyan">.</span>
            </span>
          </a>
          <div className="hidden gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#services" className="transition-colors hover:text-foreground">
              سرویس‌ها
            </a>
            <a href="#platform" className="transition-colors hover:text-foreground">
              پلتفرم
            </a>
            <a href="#steps" className="transition-colors hover:text-foreground">
              مسیر همکاری
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              تماس
            </a>
            <a href="/blog" className="transition-colors hover:text-foreground">
              بلاگ
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/admin"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground md:inline"
          >
            ورود مدیر
          </a>
          <a
            href="#contact"
            className="btn-glow rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            دموی رایگان
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-24">
      <div className="mesh-bg absolute inset-0 opacity-40" aria-hidden />
      <div
        className="glow-orb absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="animate-stream mb-8 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-cyan" />
          </span>
          نسل جدید هوش سازمانی — AI Native
        </div>

        <h1 className="animate-stream mx-auto mb-8 max-w-4xl text-balance text-5xl font-black leading-[1.1] tracking-tight md:text-7xl [animation-delay:100ms]">
          دیتای سازمان شما،
          <br />
          <span className="text-gradient">هوشمندتر از همیشه</span>
        </h1>

        <p className="animate-stream mx-auto mb-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg [animation-delay:200ms]">
          nexation به سازمان‌ها کمک می‌کند از لایه‌های پنهان دیتای خود تصمیم‌های استراتژیک بسازند —
          با ایجنت‌های اختصاصی، چت‌بات‌های داده‌محور و گزارش‌سازی خودکار.
        </p>

        <div className="animate-stream flex flex-col items-center justify-center gap-3 sm:flex-row [animation-delay:300ms]">
          <a
            href="#contact"
            className="btn-glow w-full rounded-xl bg-foreground px-8 py-4 text-sm font-bold text-background transition-transform hover:scale-[1.02] sm:w-auto"
          >
            مشاوره رایگان
          </a>
          <a
            href="#platform"
            className="w-full rounded-xl border border-border bg-white/[0.03] px-8 py-4 text-sm font-bold transition-colors hover:bg-white/[0.06] sm:w-auto"
          >
            مشاهده دموی زنده ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function LogosStrip() {
  const clients = [
    { name: "مپنا", logo: "/clients/mapna.png", className: "h-10 w-24" },
    {
      name: "سپاهان باتری",
      logo: "/clients/sepahan-battery.png",
      className: "h-10 w-20",
    },
    { name: "سابیر تجهیزات", logo: "/clients/sabir.png", className: "h-14 w-24 rounded bg-white p-1" },
    {
      name: "فرانگر",
      logo: "/clients/faranegar.svg",
      className: "h-10 w-24 brightness-0 invert",
    },
  ];

  const clientGroup = (ariaHidden = false) => (
    <div className="clients-marquee-group flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {clients.map((client) => (
        <div
          key={client.name}
          dir="rtl"
          className="flex min-w-48 items-center justify-center gap-4 rounded-2xl border border-white/5 bg-white/[0.025] px-6 py-4 text-muted-foreground transition-colors hover:border-primary/25 hover:text-foreground"
        >
          <img
            src={client.logo}
            alt={ariaHidden ? "" : `لوگوی ${client.name}`}
            className={`${client.className} shrink-0 object-contain opacity-80`}
          />
          <span className="whitespace-nowrap text-base font-bold">{client.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden border-y border-border bg-white/[0.02] py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          اعتماد سازمان‌های پیشرو
        </p>
      </div>
      <div dir="ltr" className="clients-marquee flex w-max">
        {clientGroup()}
        {clientGroup(true)}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan">سرویس‌ها</span>
          <h2 className="mt-3 text-balance text-4xl font-black leading-tight md:text-5xl">
            هر آن‌چه یک سازمان AI-Native نیاز دارد
          </h2>
          <p className="mt-4 text-muted-foreground">
            از کشف داده تا استقرار ایجنت — یک تیم، یک پلتفرم، یک زبان مشترک با دیتای شما.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.n}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/40 hover:-translate-y-1"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-primary/0 to-cyan/0 opacity-0 transition-opacity group-hover:opacity-100 group-hover:from-primary/10 group-hover:to-cyan/10" />
              <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-white/5 font-mono text-sm font-bold text-cyan transition-colors group-hover:bg-cyan group-hover:text-background">
                {s.n}
              </div>
              <h3 className="mb-3 text-xl font-bold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-cyan opacity-0 transition-opacity group-hover:opacity-100">
                بیشتر بدانید <span aria-hidden>←</span>
              </div>
              {i === 0 && (
                <div className="pointer-events-none absolute -bottom-20 -left-20 size-40 rounded-full bg-primary/20 blur-3xl" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const streamText =
  "تحلیل انجام شد. فروش ماه گذشته با رشد 12.4% نسبت به هدف فصل، رکورد جدیدی ثبت کرده است. تمرکز رشد روی دسته «خدمات ابری» بوده.";

function ChatDemo() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    let raf: number | undefined;
    const tick = () => {
      i += 1;
      setTyped(streamText.slice(0, i));
      if (i < streamText.length) {
        raf = window.setTimeout(tick, 28) as unknown as number;
      } else {
        raf = window.setTimeout(() => {
          i = 0;
          setTyped("");
          tick();
        }, 4000) as unknown as number;
      }
    };
    const start = window.setTimeout(tick, 500);
    return () => {
      window.clearTimeout(start);
      if (raf) window.clearTimeout(raf);
    };
  }, []);

  const bars = [42, 58, 71, 55, 88, 74, 96];

  return (
    <section id="platform" className="relative py-28">
      <div className="glow-orb absolute right-0 top-1/3 h-[400px] w-[400px]" aria-hidden />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan">
              چت‌بات دیتا
            </span>
            <h2 className="mt-3 text-balance text-4xl font-black leading-tight md:text-5xl">
              با دیتاتان گفتگو کنید. پاسخ را ببینید.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              به جای ساخت گزارش‌های ایستا، سوال بپرسید. لایه معنایی nexation زبان کسب‌وکار شما را
              می‌فهمد و پاسخ را همراه با نمودار، منبع و توضیح ارائه می‌دهد.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "پرسش به فارسی طبیعی و محاوره‌ای",
                "اتصال زنده به SQL، NoSQL و APIهای سازمانی",
                "پاسخ همراه با نمودار، جدول و منبع داده",
                "استقرار امن روی زیرساخت داخلی",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-foreground/90">
                  <span className="grid size-5 place-items-center rounded-full bg-cyan/20 text-[10px] text-cyan">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-primary/20 via-transparent to-cyan/20 blur-2xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <div className="flex items-center justify-between border-b border-border bg-white/[0.03] px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-destructive/50" />
                  <span className="size-2.5 rounded-full bg-yellow-400/50" />
                  <span className="size-2.5 rounded-full bg-mint/50" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  neuros://console
                </span>
                <span className="text-[10px] font-bold text-cyan">● زنده</span>
              </div>

              <div className="space-y-5 p-6">
                <div className="flex items-start justify-end gap-3">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-none border border-border bg-white/[0.04] px-4 py-3 text-sm">
                    فروش ماه گذشته را با هدف فصل مقایسه کن و نمودار رشد را نشان بده.
                  </div>
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/20 text-xs font-bold text-primary">
                    شما
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-cyan/20 font-mono text-[10px] font-bold text-cyan">
                    AI
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="rounded-2xl rounded-tl-none border border-cyan/15 bg-white/[0.03] px-4 py-3 text-sm leading-loose">
                      <p className="min-h-[3.5em]">
                        {typed}
                        <span className="animate-cursor mr-0.5 inline-block h-4 w-[2px] translate-y-[3px] bg-cyan" />
                      </p>

                      <div className="mt-5 flex h-32 items-end gap-2">
                        {bars.map((h, idx) => (
                          <div
                            key={idx}
                            className="flex-1 rounded-t-md bg-gradient-to-t from-primary/40 to-cyan"
                            style={{
                              height: `${h}%`,
                              opacity: 0.35 + (idx / bars.length) * 0.65,
                              transformOrigin: "bottom",
                              animation: `bar-rise 0.9s ${idx * 0.08}s ease-out both`,
                            }}
                          />
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between px-1 font-mono text-[10px] text-muted-foreground">
                        <span>فروردین</span>
                        <span>خرداد</span>
                        <span>شهریور</span>
                        <span>مهر</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px] text-cyan">
                      <span className="size-1.5 animate-pulse rounded-full bg-cyan" />
                      اتصال به انبار داده • 34,820 رکورد
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section id="steps" className="border-y border-border bg-white/[0.02] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan">مسیر همکاری</span>
          <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
            از داده‌ی خام تا سازمان AI-Native
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-cyan">{s.n}</span>
                {i < steps.length - 1 && (
                  <span className="text-xl text-muted-foreground/40" aria-hidden>
                    ←
                  </span>
                )}
              </div>
              <h3 className="mb-2 text-lg font-bold">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardShowcase() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan">
              داشبورد BI
            </span>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              کل سازمان، در یک نگاه
            </h2>
            <p className="mt-5 text-muted-foreground">
              داشبورد زنده‌ای که هر ویجت آن نقطه‌ی شروع یک مکالمه است. کلیک کنید، سوال بپرسید،
              عمیق‌تر شوید.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Realtime", "Predictive", "RTL Native", "On-Prem"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-white/[0.04] px-3 py-1 font-mono text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative lg:col-span-3">
            <div
              className="absolute -inset-6 rounded-[32px] bg-gradient-to-tl from-cyan/20 to-primary/20 blur-3xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
              <img
                src={dashboardPreview}
                alt="داشبورد هوشمند BI nexation"
                width={1600}
                height={1200}
                loading="lazy"
                className="w-full"
              />
            </div>
            <div className="absolute -bottom-6 right-6 hidden rounded-2xl border border-cyan/30 bg-card px-5 py-4 shadow-xl md:block">
              <div className="font-black text-3xl text-cyan">+40%</div>
              <div className="text-xs text-muted-foreground">بهره‌وری عملیاتی</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  return (
    <section className="border-y border-border bg-white/[0.02] py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.l} className="text-center">
            <div className="text-4xl font-black text-gradient md:text-5xl">{m.v}</div>
            <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {m.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitDemoRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedPhone = normalizeIranianPhone(phone);
    if (!/^09[0-9]{9}$/.test(normalizedPhone)) {
      setErrorMessage("شماره موبایل معتبر وارد کنید و دوباره تلاش کنید.");
      setStatus("error");
      return;
    }

    setStatus("saving");
    const { error } = await supabase.from("demo_requests").insert({ phone: normalizedPhone });
    if (error) {
      console.error("Demo request submission failed", error);
      setErrorMessage("ثبت درخواست انجام نشد. لطفاً چند لحظه دیگر دوباره تلاش کنید.");
      setStatus("error");
      return;
    }

    setPhone("");
    setErrorMessage("");
    setStatus("success");
  }

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div
        className="glow-orb absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-balance text-4xl font-black leading-tight md:text-5xl">
          آماده‌اید سازمانتان را <span className="text-gradient">هوشمند</span> کنید؟
        </h2>
        <p className="mt-5 text-muted-foreground">
          شماره موبایل‌تان را وارد کنید تا برای هماهنگی یک جلسه‌ی مشاوره‌ی رایگان 30 دقیقه‌ای با شما
          تماس بگیریم.
        </p>
        <form
          onSubmit={submitDemoRequest}
          className="mx-auto mt-10 flex max-w-lg flex-col gap-2 rounded-2xl border border-border bg-card p-2 sm:flex-row"
        >
          <input
            type="tel"
            required
            inputMode="numeric"
            autoComplete="tel"
            placeholder="09123456789"
            dir="ltr"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
              if (status !== "idle") {
                setStatus("idle");
                setErrorMessage("");
              }
            }}
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-left font-mono text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={status === "saving"}
            className="btn-glow rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            {status === "saving" ? "در حال ثبت..." : "درخواست دمو"}
          </button>
        </form>
        {status === "success" && (
          <p className="mt-4 text-sm text-emerald-300">
            درخواست شما ثبت شد؛ به‌زودی با شما تماس می‌گیریم.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-300">{errorMessage}</p>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <img
            src="/favicon.png"
            alt=""
            aria-hidden="true"
            className="size-8 shrink-0 object-contain"
          />
          <span className="text-sm font-black">
            nexation<span className="text-cyan">.</span>
          </span>
          <span className="mr-2 text-xs text-muted-foreground">© 1404 همه‌ی حقوق محفوظ است.</span>
        </div>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            حریم خصوصی
          </a>
          <a href="#" className="hover:text-foreground">
            قوانین
          </a>
          <a href="#" className="hover:text-foreground">
            لینکدین
          </a>
          <a href="#" className="hover:text-foreground">
            تماس
          </a>
          <a href="/blog" className="hover:text-foreground">
            بلاگ
          </a>
        </div>
      </div>
    </footer>
  );
}
