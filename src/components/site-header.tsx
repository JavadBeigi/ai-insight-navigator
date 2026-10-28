import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { agentService, chatbotService, consultingService, servicePath } from "@/lib/services";

const items = [
  { label: "مشاوره و استراتژی هوش مصنوعی", href: servicePath(consultingService), description: "ارزیابی آمادگی و طراحی نقشه راه" },
  { label: "طراحی و پیاده‌سازی ایجنت", href: servicePath(agentService), description: "اجرای فرایندها با کنترل و نظارت" },
  { label: "ساخت چت‌بات سازمانی", href: servicePath(chatbotService), description: "دستیار فارسی بر پایه دانش سازمان" },
  { label: "سنجش بلوغ هوش مصنوعی", href: "/ai-maturity-assessment", description: "شناخت وضعیت فعلی و فرصت‌های بهبود" },
];

function ServicesMenu() {
  const disclosure = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !disclosure.current?.contains(event.target)) {
        disclosure.current?.removeAttribute("open");
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && disclosure.current?.open) {
        disclosure.current.removeAttribute("open");
        disclosure.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <details
      ref={disclosure}
      className="group relative"
      onBlur={(event) => {
        if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) {
          event.currentTarget.removeAttribute("open");
        }
      }}
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-lg px-2 font-bold text-foreground transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan [&::-webkit-details-marker]:hidden">
        خدمات
        <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="absolute right-0 top-full z-[60] w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-cyan/20 bg-popover p-2 shadow-[0_18px_55px_rgba(22,48,80,0.14)]">
        <ul aria-label="خدمات Nexation" className="space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => disclosure.current?.removeAttribute("open")}
                className="block rounded-xl px-4 py-3 text-right transition-colors hover:bg-cyan/10 focus-visible:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
              >
                <span className="block text-sm font-bold leading-7 text-foreground">{item.label}</span>
                <span className="block text-xs leading-6 text-muted-foreground">{item.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header no-print sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <nav aria-label="ناوبری اصلی" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 px-4 py-2 sm:px-6 lg:flex-nowrap lg:gap-x-6">
        <a href="/" aria-label="Nexation — صفحه اصلی" className="flex shrink-0 items-center gap-2">
          <img src="/nexation-favicon.png" alt="" width="36" height="36" className="size-9 object-contain" />
          <span className="text-lg font-black tracking-tight">nexation<span className="text-cyan">.</span></span>
        </a>
        <div className="order-3 flex w-full flex-wrap items-center gap-x-3 text-sm font-medium text-muted-foreground sm:gap-x-5 lg:order-none lg:w-auto">
          <ServicesMenu />
          <a href="/about" className="inline-flex min-h-11 items-center hover:text-foreground">درباره ما</a>
          <a href="/#steps" className="inline-flex min-h-11 items-center hover:text-foreground">مسیر همکاری</a>
          <a href="/#contact" className="inline-flex min-h-11 items-center hover:text-foreground">تماس</a>
          <a href="/blog" className="inline-flex min-h-11 items-center hover:text-foreground">بلاگ</a>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <a href="/#contact" className="hidden h-10 w-40 items-center justify-center rounded-full border border-border px-4 text-sm font-bold transition-colors hover:border-cyan/40 hover:text-cyan sm:inline-flex">درخواست دمو</a>
          <a href="/ai-maturity-assessment" className="btn-glow inline-flex h-10 w-32 items-center justify-center rounded-full bg-primary px-3 text-sm font-black text-primary-foreground sm:w-40">سنجش بلوغ AI</a>
        </div>
      </nav>
    </header>
  );
}
