import { ArrowLeft, Database, Compass, Workflow, ShieldCheck, Sparkles } from "lucide-react";

export function LightHero() {
  return (
    <section className="light-hero relative isolate overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
        <div className="relative z-10">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-bold text-sky-800">
            <span className="size-2 rounded-full bg-teal-500" aria-hidden />
            همراه تحول هوش مصنوعی سازمان شما
          </p>
          <h1 className="text-balance text-[2.35rem] font-black leading-[1.55] tracking-tight sm:text-5xl sm:leading-[1.5] xl:text-[3.5rem]">
            هوش مصنوعی برای سازمان شما،
            <span className="block text-gradient">از استراتژی تا اجرا</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-9 text-muted-foreground">
            Nexation به سازمان‌ها کمک می‌کند AI-Native شوند؛ از سنجش بلوغ و تدوین استراتژی تا طراحی و اجرای چت‌بات و ایجنت متناسب با نیاز واقعی کسب‌وکار.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a href="/ai-maturity-assessment" className="btn-glow inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-2xl bg-primary px-4 py-3 text-sm font-black text-white transition-transform hover:-translate-y-0.5">
              سنجش بلوغ AI <ArrowLeft aria-hidden className="size-4" />
            </a>
            <a href="#contact" className="inline-flex min-h-14 flex-1 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition-colors hover:border-primary hover:text-primary">
              درخواست دمو
            </a>
          </div>
          <p className="mt-4 text-xs leading-7 text-muted-foreground">از شناخت وضعیت امروز، تا انتخاب قدم بعدی.</p>
        </div>

        <figure className="ai-journey relative mx-auto w-full max-w-lg" aria-labelledby="journey-caption">
          <div className="journey-board rounded-[2rem] border border-white bg-white/85 p-5 sm:p-8">
            <figcaption id="journey-caption" className="mb-8 flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-slate-700">مسیر تحول سازمان شما</span>
              <span dir="ltr" className="rounded-full bg-sky-50 px-3 py-1 font-mono text-[10px] tracking-wider text-sky-700">AI NATIVE</span>
            </figcaption>
            <div className="relative">
              <div className="journey-connector absolute bottom-8 right-[1.6rem] top-8 w-px" aria-hidden />
              <ol className="relative space-y-4">
                {[
                  { icon: Compass, title: "استراتژی روشن", text: "مسئله درست، اولویت مشخص", color: "bg-blue-50 text-blue-700" },
                  { icon: Database, title: "داده آماده", text: "دانش و سامانه‌های سازمان", color: "bg-teal-50 text-teal-700" },
                  { icon: Workflow, title: "اجرای هدفمند", text: "چت‌بات و ایجنت اختصاصی", color: "bg-violet-50 text-violet-700" },
                ].map(({icon:Icon,title,text,color}) => (
                  <li key={title} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-3 py-4 shadow-sm sm:px-4">
                    <span className={"relative grid size-12 shrink-0 place-items-center rounded-2xl "+color}><Icon aria-hidden className="size-6" strokeWidth={1.7}/></span>
                    <div><h2 className="text-sm font-bold text-slate-800">{title}</h2><p className="mt-1 text-xs leading-6 text-slate-500">{text}</p></div>
                    <span className="mr-auto size-1.5 shrink-0 rounded-full bg-teal-400" aria-hidden />
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-blue-600 to-cyan-600 px-4 py-5 text-white">
              <img src="/nexation-favicon.png" alt="" width="42" height="42" className="rounded-xl bg-white p-1" />
              <div><p className="text-sm font-black">تکنولوژی، در خدمت کسب‌وکار</p><p className="mt-1 text-xs text-white/90">با همراهی تیم Nexation</p></div>
              <Sparkles aria-hidden className="mr-auto size-5 shrink-0 text-cyan-100" />
            </div>
          </div>
          <div className="journey-assurance mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-teal-100 bg-white px-4 py-2 text-xs font-medium text-teal-800 shadow-sm">
            <ShieldCheck aria-hidden className="size-4" /> طراحی متناسب با نیاز و محدودیت‌های شما
          </div>
        </figure>
      </div>
    </section>
  );
}

export function AssessmentCallout() {
  return (
    <section aria-labelledby="assessment-start-title" className="px-6 pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-7 rounded-[2rem] border border-blue-100 bg-gradient-to-l from-blue-50 via-white to-teal-50 p-7 sm:p-10 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-3 text-xs font-bold text-blue-700">نقطه شروع شما</p>
          <h2 id="assessment-start-title" className="text-2xl font-black leading-relaxed sm:text-3xl">سازمان شما در مسیر AI کجاست؟</h2>
          <p className="mt-3 max-w-2xl text-sm leading-8 text-muted-foreground">با سنجش بلوغ هوش مصنوعی، تصویری اولیه از نقاط قوت و شکاف‌های سازمان به دست بیاورید؛ مبنایی برای گفتگوی دقیق‌تر و انتخاب مسیر همکاری.</p>
        </div>
        <a href="/ai-maturity-assessment" className="inline-flex min-h-12 items-center justify-center gap-4 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-blue-700">شروع سنجش بلوغ <ArrowLeft aria-hidden className="size-4" /></a>
      </div>
    </section>
  );
}
