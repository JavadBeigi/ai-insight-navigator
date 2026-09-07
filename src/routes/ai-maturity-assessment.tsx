import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";
import {
  calculateMaturity,
  maturityDimensions,
  maturityQuestions,
  maturityScale,
  maturitySources,
} from "@/lib/ai-maturity";

type Stage = "intro" | "profile" | "questions" | "result";

export const Route = createFileRoute("/ai-maturity-assessment")({
  head: () => ({
    meta: [
      { title: "سنجش بلوغ هوش مصنوعی سازمان | nexation" },
      {
        name: "description",
        content: "ارزیابی بلوغ هوش مصنوعی سازمان در ۷ محور و دریافت امتیاز، نمودار و گزارش تحلیلی بر پایه چارچوب‌های معتبر جهانی.",
      },
      { property: "og:title", content: "شاخص بلوغ هوش مصنوعی nexation" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nexation.ir/ai-maturity-assessment" },
    ],
    links: [{ rel: "canonical", href: "https://nexation.ir/ai-maturity-assessment" }],
  }),
  component: AiMaturityAssessment,
});

function AiMaturityAssessment() {
  const [stage, setStage] = useState<Stage>("intro");
  const [profile, setProfile] = useState({ organization: "", role: "", industry: "", phone: "" });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const result = useMemo(() => calculateMaturity(answers), [answers]);
  const question = maturityQuestions[questionIndex];
  const dimension = maturityDimensions.find((item) => item.id === question?.dimension);

  function submitProfile(event: FormEvent) {
    event.preventDefault();
    setStage("questions");
  }

  function answerQuestion(value: number) {
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);
    if (questionIndex === maturityQuestions.length - 1) setStage("result");
    else setQuestionIndex((current) => current + 1);
  }

  return (
    <main className="min-h-screen bg-background text-foreground" dir="rtl">
      <header className="border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-xl font-black">nexation<span className="text-cyan">.</span></Link>
          <span className="text-xs text-muted-foreground">AI Maturity Index</span>
        </div>
      </header>

      {stage === "intro" && (
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-4 py-2 text-xs font-bold text-cyan">
                <ShieldCheck className="size-4" /> مبتنی بر ۸ چارچوب و استاندارد معتبر
              </div>
              <h1 className="text-balance text-4xl font-black leading-tight md:text-6xl">بلوغ هوش مصنوعی سازمانتان را اندازه بگیرید</h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-muted-foreground">
                ارزیابی ساختاریافته ۳۵ سؤالی در هفت محور؛ برای تشخیص فاصله میان پایلوت‌های پراکنده و توانمندی AI مقیاس‌یافته.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="rounded-full border border-border px-4 py-2">حدود ۱۰ دقیقه</span>
                <span className="rounded-full border border-border px-4 py-2">امتیاز از ۱۰۰</span>
                <span className="rounded-full border border-border px-4 py-2">نتیجه اولیه رایگان</span>
              </div>
              <button onClick={() => setStage("profile")} className="btn-glow mt-10 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-4 font-bold">
                شروع ارزیابی <ArrowLeft className="size-5" />
              </button>
            </div>
            <div className="rounded-3xl border border-border bg-card p-7 shadow-2xl">
              <h2 className="text-xl font-black">محورهای ارزیابی</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {maturityDimensions.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 p-3">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-cyan/10 text-xs font-black text-cyan">{index + 1}</span>
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Methodology />
        </section>
      )}

      {stage === "profile" && (
        <section className="mx-auto max-w-xl px-6 py-16">
          <p className="text-sm font-bold text-cyan">مرحله اول</p>
          <h1 className="mt-3 text-3xl font-black">مشخصات ارزیابی</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">این اطلاعات برای شخصی‌سازی نتیجه اولیه استفاده می‌شود.</p>
          <form onSubmit={submitProfile} className="mt-8 space-y-5 rounded-3xl border border-border bg-card p-7">
            {[
              ["organization", "نام سازمان", "مثلاً شرکت نمونه"],
              ["industry", "صنعت", "مثلاً تولید، مالی یا انرژی"],
              ["role", "سمت پاسخ‌دهنده", "مثلاً مدیر فناوری"],
              ["phone", "شماره تلفن", "09xxxxxxxxx"],
            ].map(([key, label, placeholder]) => (
              <label key={key} className="block text-sm font-bold">{label}
                <input required value={profile[key as keyof typeof profile]} onChange={(event) => setProfile((current) => ({ ...current, [key]: event.target.value }))} placeholder={placeholder} dir={key === "phone" ? "ltr" : "rtl"} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:border-cyan" />
              </label>
            ))}
            <button className="w-full rounded-xl bg-primary px-6 py-4 font-black">ورود به پرسشنامه</button>
          </form>
        </section>
      )}

      {stage === "questions" && question && (
        <section className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{dimension?.label}</span><span dir="ltr">{questionIndex + 1} / {maturityQuestions.length}</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan transition-all" style={{ width: `${((questionIndex + 1) / maturityQuestions.length) * 100}%` }} /></div>
          <article className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-10">
            <h1 className="text-xl font-black leading-9 md:text-2xl">{question.prompt}</h1>
            <p className="mt-3 text-xs text-muted-foreground">وضعیت واقعی سازمان را انتخاب کنید، نه وضعیت مطلوب آینده.</p>
            <div className="mt-8 space-y-3">
              {maturityScale.map((option) => (
                <button key={option.value} onClick={() => answerQuestion(option.value)} className={`w-full rounded-2xl border p-4 text-right transition hover:border-cyan hover:bg-cyan/5 ${answers[question.id] === option.value ? "border-cyan bg-cyan/10" : "border-border"}`}>
                  <span className="font-black">{option.title}</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">{option.description}</span>
                </button>
              ))}
            </div>
            <div className="mt-7 flex items-center justify-between">
              <button disabled={questionIndex === 0} onClick={() => setQuestionIndex((current) => Math.max(0, current - 1))} className="text-sm text-muted-foreground disabled:opacity-30">سؤال قبلی</button>
              <span className="text-xs text-muted-foreground">منابع: {question.sources.join(" · ")}</span>
            </div>
          </article>
        </section>
      )}

      {stage === "result" && (
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="text-center">
            <CheckCircle2 className="mx-auto size-10 text-cyan" />
            <p className="mt-4 text-sm font-bold text-cyan">نتیجه اولیه {profile.organization}</p>
            <h1 className="mt-3 text-4xl font-black">سطح {result.level}: {result.levelName}</h1>
            <div className="mt-5 text-7xl font-black text-gradient" dir="ltr">{result.score}<span className="text-2xl">/100</span></div>
            {result.governanceCapApplied && <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-amber-300">به‌دلیل پایین‌بودن آمادگی حاکمیت و امنیت، سقف امتیاز کل اعمال شده است.</p>}
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-5 md:p-8">
              <h2 className="text-xl font-black">نمای کلی هفت محور</h2>
              <div className="mt-4 h-[360px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={result.dimensionScores} outerRadius="72%"><PolarGrid stroke="rgba(148,163,184,.25)" /><PolarAngleAxis dataKey="shortLabel" tick={{ fill: "#cbd5e1", fontSize: 12 }} /><Radar dataKey="score" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.28} /></RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-5">
              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-7"><p className="text-sm text-emerald-300">نقطه قوت اصلی</p><h2 className="mt-2 text-2xl font-black">{result.strongest.label}</h2></div>
              <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-7"><p className="text-sm text-amber-300">مهم‌ترین شکاف</p><h2 className="mt-2 text-2xl font-black">{result.weakest.label}</h2></div>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-7">
                <div className="select-none space-y-3 opacity-20 blur-[3px]"><div className="h-4 w-3/4 rounded bg-white" /><div className="h-4 w-full rounded bg-white" /><div className="h-4 w-5/6 rounded bg-white" /><div className="h-24 rounded-xl bg-white" /></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/45 text-center backdrop-blur-[1px]"><LockKeyhole className="size-8 text-cyan" /><h3 className="mt-3 text-lg font-black">تحلیل کامل و نقشه راه ۹۰روزه</h3><p className="mt-2 max-w-sm text-sm text-muted-foreground">امتیاز تمام زیرشاخص‌ها، ریسک‌ها، اقدامات اولویت‌دار و گزارش PDF پس از پرداخت فعال می‌شود.</p><button className="mt-5 rounded-xl bg-primary px-6 py-3 text-sm font-black">دریافت گزارش کامل</button><span className="mt-2 text-[11px] text-muted-foreground">اتصال درگاه پرداخت در مرحله بعد</span></div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center"><button onClick={() => { setAnswers({}); setQuestionIndex(0); setStage("intro"); }} className="text-sm text-cyan">شروع ارزیابی جدید</button></div>
        </section>
      )}
    </main>
  );
}

function Methodology() {
  return (
    <section className="mt-20 border-t border-border pt-10">
      <h2 className="text-2xl font-black">روش‌شناسی قابل ردیابی</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">سؤال‌ها بازنویسی مستقل nexation از قابلیت‌ها و نتایج عمومی چارچوب‌های زیر هستند؛ این ابزار وابسته، تأییدشده یا نماینده تجاری این مؤسسات نیست و جایگزین ممیزی ISO نمی‌شود.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {Object.values(maturitySources).map((source) => <a key={source.label} href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground hover:border-cyan hover:text-cyan">{source.label}</a>)}
      </div>
    </section>
  );
}
