import { Linkedin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer no-print relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute -bottom-48 -right-32 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-0 size-72 rounded-full bg-cyan/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 md:pt-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="/" className="inline-flex items-center gap-3" aria-label="صفحه اصلی nexation">
              <img src="/favicon.png" alt="" aria-hidden="true" className="size-12 object-contain" />
              <span className="text-2xl font-black tracking-tight">
                nexation<span className="text-cyan">.</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-8 text-muted-foreground">
              راهکارهای اختصاصی هوش مصنوعی برای سازمان‌هایی که می‌خواهند فرایندهای هوشمندتر،
              تصمیم‌های سریع‌تر و آینده‌ای AI-Native بسازند.
            </p>
            <a
              href="https://www.linkedin.com/company/nexationai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="صفحه Nexation در لینکدین"
              title="Nexation در لینکدین"
              className="mt-6 inline-flex size-11 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/5 text-cyan transition-colors hover:bg-cyan/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
            >
              <Linkedin aria-hidden="true" className="size-5" />
            </a>
          </div>

          <div>
            <h2 className="text-sm font-black text-foreground">راهکارها</h2>
            <nav className="mt-5 flex flex-col gap-4 text-sm text-muted-foreground" aria-label="راهکارهای nexation">
              <a href="/services/ai-agent-development" className="transition-colors hover:text-cyan">طراحی ایجنت هوش مصنوعی</a>
              <a href="/services/enterprise-chatbot" className="transition-colors hover:text-cyan">ساخت چت‌بات سازمانی</a>
              <a href="/services/ai-consulting" className="transition-colors hover:text-cyan">مشاوره و استراتژی AI</a>
              <a href="/ai-maturity-assessment" className="transition-colors hover:text-cyan">سنجش بلوغ AI</a>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-black text-foreground">دسترسی سریع</h2>
            <nav className="mt-5 flex flex-col gap-4 text-sm text-muted-foreground" aria-label="دسترسی سریع">
              <a href="/#steps" className="transition-colors hover:text-cyan">مسیر همکاری</a>
              <a href="/about" className="transition-colors hover:text-cyan">درباره ما</a>
              <a href="/blog" className="transition-colors hover:text-cyan">بلاگ</a>
              <a href="/#contact" className="transition-colors hover:text-cyan">تماس با ما</a>
              <a href="tel:+989918418624" aria-label="تماس با Nexation: 09918418624" className="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg text-cyan transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan">
                <Phone aria-hidden="true" className="size-4" />
                <span dir="ltr">09918418624</span>
              </a>
            </nav>
          </div>


        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 nexation. همه حقوق محفوظ است.</p>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            <span>ساخت راهکارهای AI-Native برای سازمان‌ها</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
