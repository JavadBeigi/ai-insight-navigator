import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AlertTriangle, ArrowLeft, CalendarRange, CheckCircle2, Download, Flame, Lightbulb, ShieldCheck, Target } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";
import {
  calculateMaturity,
  maturityDimensions,
  maturityQuestions,
  maturityScale,
  maturitySources,
} from "@/lib/ai-maturity";
import { supabase } from "@/lib/supabase";

type Stage = "intro" | "profile" | "questions" | "result";

export const Route = createFileRoute("/ai-maturity-assessment")({
  head: () => ({
    meta: [
      { title: "سنجش بلوغ هوش مصنوعی سازمان | nexation" },
      {
        name: "description",
        content: "ارزیابی بلوغ هوش مصنوعی سازمان در ۷ محور و دریافت امتیاز، نمودار و گزارش تحلیلی بر پایه چارچوب‌های معتبر جهانی.",
      },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: "سنجش بلوغ هوش مصنوعی سازمان | nexation" },
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
  const [assessmentToken, setAssessmentToken] = useState("");
  const [assessmentSaved, setAssessmentSaved] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<"idle" | "requesting" | "requested" | "checking" | "error">("idle");
  const [reportUnlocked, setReportUnlocked] = useState(false);
  const result = useMemo(() => calculateMaturity(answers), [answers]);
  const question = maturityQuestions[questionIndex];
  const dimension = maturityDimensions.find((item) => item.id === question?.dimension);

  useEffect(() => {
    const hashToken = new URLSearchParams(window.location.hash.slice(1)).get("token");
    const storedToken = window.localStorage.getItem("nexation_assessment_token");
    const token = hashToken || storedToken;
    if (!token) return;

    const restoreAssessment = async () => {
      const { data, error } = await supabase.rpc("get_ai_maturity_assessment", { p_access_token: token });
      if (error || !data) return;
      setAssessmentToken(token);
      setProfile({ organization: data.organization, industry: data.industry, role: data.respondent_role, phone: data.phone });
      setAnswers(data.answers as Record<string, number>);
      setAssessmentSaved(true);
      setPurchaseStatus(data.status === "payment_requested" || data.status === "paid" ? "requested" : "idle");
      setReportUnlocked(data.full_report_unlocked);
      setStage("result");
      window.localStorage.setItem("nexation_assessment_token", token);
    };
    void restoreAssessment();
  }, []);

  function submitProfile(event: FormEvent) {
    event.preventDefault();
    const token = crypto.randomUUID();
    setAssessmentToken(token);
    window.localStorage.setItem("nexation_assessment_token", token);
    setStage("questions");
  }

  function answerQuestion(value: number) {
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);
    if (questionIndex === maturityQuestions.length - 1) {
      setStage("result");
      void saveAssessment(nextAnswers);
    }
    else setQuestionIndex((current) => current + 1);
  }

  async function saveAssessment(nextAnswers: Record<string, number>) {
    const calculated = calculateMaturity(nextAnswers);
    const { error } = await supabase.from("ai_maturity_assessments").insert({
      access_token: assessmentToken,
      organization: profile.organization.trim(), industry: profile.industry.trim(),
      respondent_role: profile.role.trim(), phone: profile.phone.trim(), answers: nextAnswers,
      dimension_scores: calculated.dimensionScores.map(({ id, label, score }) => ({ id, label, score })),
      overall_score: calculated.score, maturity_level: calculated.level,
    });
    setAssessmentSaved(!error);
    if (error) setPurchaseStatus("error");
  }

  async function requestFullReport() {
    if (!assessmentSaved || !assessmentToken) return;
    setPurchaseStatus("requesting");
    const { data, error } = await supabase.rpc("request_ai_maturity_report", { p_access_token: assessmentToken });
    setPurchaseStatus(error || !data ? "error" : "requested");
  }

  async function checkPaymentStatus() {
    if (!assessmentToken) return;
    setPurchaseStatus("checking");
    const { data, error } = await supabase.rpc("get_ai_maturity_assessment", { p_access_token: assessmentToken });
    if (error) setPurchaseStatus("error");
    else if (data?.full_report_unlocked) { setReportUnlocked(true); setPurchaseStatus("requested"); }
    else setPurchaseStatus("requested");
  }

  return (
    <main className="min-h-screen bg-background text-foreground" dir="rtl">
      <style>{`@media print { @page { size: A4; margin: 12mm; } body { background: #fff !important; } .report-shell { color: #0f172a !important; background: #fff !important; } .report-shell * { print-color-adjust: exact; -webkit-print-color-adjust: exact; } .report-card { break-inside: avoid; border-color: #cbd5e1 !important; background: #fff !important; } .report-muted { color: #475569 !important; } .report-cover { min-height: 245mm; display: flex !important; break-after: page; } .no-print { display: none !important; } }`}</style>
      <header className="no-print border-b border-border bg-background/90 backdrop-blur">
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
        <section className="report-shell mx-auto max-w-6xl px-6 py-14">
          {reportUnlocked ? <div className="report-cover mb-14 flex min-h-[520px] flex-col items-center justify-center rounded-[2rem] border border-cyan/20 bg-gradient-to-br from-cyan/10 via-card to-primary/10 p-8 text-center">
            <img src="/favicon.png" alt="لوگوی nexation" className="size-20 object-contain" />
            <p className="mt-8 text-sm font-bold tracking-wide text-cyan">NEXATION AI MATURITY INDEX</p>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">گزارش بلوغ هوش مصنوعی</h1>
            <p className="mt-6 text-2xl font-black">{profile.organization}</p>
            <div className="report-muted mt-10 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              <span>صنعت: {profile.industry}</span><span>سمت: {profile.role}</span><span>نسخه آزمایشی خصوصی</span>
            </div>
          </div> : null}
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
              <div className="rounded-3xl border border-cyan/20 bg-cyan/5 p-7">
                <p className="text-sm font-bold text-cyan">گزارش کامل و نقشه راه اختصاصی</p>
                <h3 className="mt-2 text-xl font-black">برای مشاهده گزارش کامل، درخواست پرداخت ثبت کنید</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">درگاه آنلاین فعال نیست؛ تیم nexation برای هماهنگی مبلغ و پرداخت با شماره ثبت‌شده تماس می‌گیرد.</p>
                {purchaseStatus === "idle" || purchaseStatus === "error" ? <button type="button" disabled={!assessmentSaved} onClick={requestFullReport} className="mt-5 rounded-xl bg-primary px-6 py-3 text-sm font-black disabled:opacity-50">{assessmentSaved ? "درخواست گزارش کامل" : "در حال ثبت نتیجه..."}</button> : null}
                {purchaseStatus === "requesting" ? <p className="mt-4 text-sm text-cyan">در حال ثبت درخواست...</p> : null}
                {purchaseStatus === "requested" || purchaseStatus === "checking" ? <div className="mt-5"><p className="text-sm font-bold text-emerald-300">درخواست شما ثبت شد؛ پس از هماهنگی و تأیید پرداخت، گزارش باز می‌شود.</p><button type="button" onClick={checkPaymentStatus} disabled={purchaseStatus === "checking"} className="mt-4 rounded-xl border border-cyan/30 px-5 py-2.5 text-sm font-bold text-cyan">{purchaseStatus === "checking" ? "در حال بررسی..." : "بررسی وضعیت پرداخت"}</button></div> : null}
                {purchaseStatus === "error" ? <p className="mt-3 text-sm text-red-300">ثبت درخواست انجام نشد؛ لطفاً دوباره تلاش کنید.</p> : null}
              </div>
            </div>
          </div>
          {reportUnlocked ? <FullReport result={result} answers={answers} industry={profile.industry} organization={profile.organization} /> : null}
          <div className="no-print mt-10 text-center"><button onClick={() => { window.localStorage.removeItem("nexation_assessment_token"); window.history.replaceState(null, "", window.location.pathname); setAssessmentToken(""); setAssessmentSaved(false); setReportUnlocked(false); setPurchaseStatus("idle"); setAnswers({}); setQuestionIndex(0); setStage("intro"); }} className="text-sm text-cyan">شروع ارزیابی جدید</button></div>
        </section>
      )}
    </main>
  );
}

const dimensionGuidance = {
  strategy: { diagnosis: "مسیر AI باید به اولویت‌های کسب‌وکار، بودجه و مسئولیت مدیران متصل شود.", actions: ["تعریف سه هدف تجاری زمان‌دار برای AI", "تعیین حامی اجرایی و مالک نقشه راه", "بازبینی فصلی سبد سرمایه‌گذاری AI"] },
  value: { diagnosis: "ارزش پروژه‌ها باید پیش از شروع و پس از استقرار با خط مبنا و KPI سنجیده شود.", actions: ["ساخت ماتریس ارزش، امکان‌پذیری و ریسک", "تعیین مالک کسب‌وکار برای هر کاربرد", "توقف پایلوت‌های فاقد شواهد ارزش"] },
  data: { diagnosis: "دسترسی، کیفیت، مالکیت و محدودیت داده باید برای کاربردهای اولویت‌دار روشن باشد.", actions: ["تعریف مالک و قرارداد کیفیت داده", "ثبت منشأ و محدودیت مجموعه‌داده‌ها", "اجرای کنترل دسترسی متناسب با حساسیت"] },
  technology: { diagnosis: "چرخه ساخت و بهره‌برداری AI به استانداردهای مشترک، پایش و قابلیت توقف نیاز دارد.", actions: ["تعریف الگوی معماری مرجع AI", "نسخه‌بندی مدل، Prompt و ارزیابی‌ها", "پایش کیفیت، هزینه، تأخیر و Drift"] },
  governance: { diagnosis: "حاکمیت باید موجودی AI، سطح ریسک، نظارت انسانی و پاسخ به رخداد را پوشش دهد.", actions: ["ایجاد رجیستری سامانه‌ها و مدل‌های AI", "طبقه‌بندی ریسک پیش از استقرار", "آزمون سناریوی رخداد و توقف اضطراری"] },
  people: { diagnosis: "مقیاس‌پذیری AI به نقش‌های روشن، تیم چندتخصصی و برنامه تغییر سازمانی وابسته است.", actions: ["تعریف ماتریس مهارت و مسئولیت", "آموزش نقش‌محور مدیران و کاربران", "تشکیل تیم محصول مشترک کسب‌وکار و فناوری"] },
  scale: { diagnosis: "عبور از پایلوت مستلزم اجزای قابل‌استفاده مجدد، سنجش پذیرش و یادگیری عملیاتی است.", actions: ["تعریف معیار عبور پایلوت به تولید", "ساخت اجزای مشترک و الگوهای تکرارپذیر", "سنجش استفاده واقعی، رضایت و اعتماد کاربران"] },
} satisfies Record<(typeof maturityDimensions)[number]["id"], { diagnosis: string; actions: string[] }>;

const dimensionUseCases = {
  strategy: ["دستیار تصمیم‌یار مدیران برای تحلیل سناریو", "رصد هوشمند KPIهای تحول AI"],
  value: ["موتور اولویت‌بندی فرصت‌های AI", "پایش خودکار منافع و ROI پروژه‌ها"],
  data: ["جست‌وجوی سازمانی مبتنی بر RAG", "دستیار کیفیت و طبقه‌بندی داده"],
  technology: ["پلتفرم ارزیابی و پایش مدل‌ها", "دستیار توسعه نرم‌افزار با کنترل سازمانی"],
  governance: ["رجیستری و داشبورد ریسک سامانه‌های AI", "کنترل دسترسی و ثبت رخداد ایجنت‌ها"],
  people: ["دستیار یادگیری نقش‌محور کارکنان", "همیار مدیریت دانش و فرایندها"],
  scale: ["مرکز خدمات مشترک ایجنت‌های سازمانی", "اتوماسیون فرایندهای پرتکرار با Human-in-the-loop"],
} satisfies Record<(typeof maturityDimensions)[number]["id"], string[]>;

function getIndustryUseCases(industry: string) {
  if (/تولید|صنعت|کارخانه/i.test(industry)) return ["نگهداری پیش‌بینانه تجهیزات", "کنترل کیفیت بصری خط تولید", "بهینه‌سازی موجودی و برنامه‌ریزی تولید"];
  if (/بانک|مالی|بیمه|سرمایه/i.test(industry)) return ["کشف تقلب و ناهنجاری تراکنش‌ها", "دستیار تحلیل ریسک و اعتبار", "اتوماسیون بررسی اسناد و خسارت"];
  if (/انرژی|نفت|گاز|برق/i.test(industry)) return ["پیش‌بینی تقاضا و مصرف انرژی", "پایش هوشمند دارایی‌های حیاتی", "دستیار ایمنی و تحلیل رخداد"];
  if (/فروش|خرده|بازرگانی/i.test(industry)) return ["پیش‌بینی تقاضا و بهینه‌سازی موجودی", "دستیار فروش و خدمات مشتری", "شخصی‌سازی پیشنهاد محصول"];
  return ["دستیار دانش سازمانی", "اتوماسیون هوشمند اسناد و مکاتبات", "تحلیل پیش‌بینانه شاخص‌های عملیاتی"];
}

function FullReport({ result, answers, industry, organization }: { result: ReturnType<typeof calculateMaturity>; answers: Record<string, number>; industry: string; organization: string }) {
  const priorities = [...result.dimensionScores].sort((a, b) => a.score - b.score).slice(0, 3);
  const targetScore = 80;
  const criticalRisks = maturityQuestions
    .filter((question) => (answers[question.id] ?? 1) <= 2)
    .sort((a, b) => (answers[a.id] ?? 1) - (answers[b.id] ?? 1))
    .slice(0, 6);
  const suggestedUseCases = [...new Set([...getIndustryUseCases(industry), ...priorities.flatMap((priority) => dimensionUseCases[priority.id])])].slice(0, 6);
  const roadmap = [
    { period: "روز ۱ تا ۳۰", title: "هم‌راستاسازی و کنترل", detail: priorities[0] ? dimensionGuidance[priorities[0].id].actions[0] : "تعریف خط مبنا" },
    { period: "روز ۳۱ تا ۶۰", title: "اجرای اقدام‌های اولویت‌دار", detail: priorities[1] ? dimensionGuidance[priorities[1].id].actions[0] : "اجرای برنامه بهبود" },
    { period: "روز ۶۱ تا ۹۰", title: "اندازه‌گیری و تثبیت", detail: priorities[2] ? dimensionGuidance[priorities[2].id].actions[0] : "اندازه‌گیری نتایج" },
  ];

  return (
    <section className="mt-10 space-y-8" aria-labelledby="full-report-heading">
      <div>
        <p className="text-sm font-bold text-cyan">تحلیل تفصیلی</p>
        <h2 id="full-report-heading" className="mt-2 text-3xl font-black">گزارش کامل بلوغ هوش مصنوعی</h2>
      </div>

      <section className="report-card rounded-3xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-center gap-3"><Flame className="size-6 text-orange-300" /><h3 className="text-xl font-black">Heatmap زیرشاخص‌ها</h3></div>
        <p className="report-muted mt-2 text-sm leading-7 text-muted-foreground">هر خانه نماینده یکی از ۳۵ سؤال است؛ قرمز یعنی شکاف جدی و سبز یعنی قابلیت تثبیت‌شده.</p>
        <div className="mt-6 space-y-5">
          {maturityDimensions.map((dimension) => {
            const questions = maturityQuestions.filter((item) => item.dimension === dimension.id);
            return <div key={dimension.id}><div className="mb-2 flex items-center justify-between text-xs"><span className="font-bold">{dimension.label}</span><span className="report-muted text-muted-foreground">۵ زیرشاخص</span></div><div className="grid grid-cols-5 gap-2" dir="ltr">{questions.map((item, index) => { const value = answers[item.id] ?? 1; const hue = ((value - 1) / 4) * 120; return <div key={item.id} title={item.prompt} className="flex h-12 items-center justify-center rounded-lg border border-white/10 font-mono text-xs font-black text-white" style={{ backgroundColor: `hsl(${hue} 68% 38%)` }}>{index + 1}</div>; })}</div></div>;
          })}
        </div>
        <div className="report-muted mt-5 flex justify-between text-xs text-muted-foreground"><span>شکاف بحرانی</span><span>قابلیت مقیاس‌یافته</span></div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {result.dimensionScores.map((item) => (
          <article key={item.id} className="report-card rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-4"><h3 className="font-black">{item.label}</h3><span className="font-mono text-lg font-black text-cyan" dir="ltr">{item.score}/100</span></div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan" style={{ width: `${item.score}%` }} /></div>
            <p className="report-muted mt-4 text-sm leading-7 text-muted-foreground">{dimensionGuidance[item.id].diagnosis}</p>
          </article>
        ))}
      </div>

      <section className="report-card rounded-3xl border border-border bg-card p-6 md:p-8">
        <h3 className="text-xl font-black">شکاف وضع موجود تا هدف پیشنهادی</h3>
        <p className="report-muted mt-2 text-sm text-muted-foreground">هدف عملیاتی اولیه برای {organization}: امتیاز ۸۰ از ۱۰۰ در هر محور.</p>
        <div className="mt-6 space-y-5">{result.dimensionScores.map((item) => { const gap = Math.max(0, targetScore - item.score); return <div key={item.id}><div className="mb-2 flex items-center justify-between gap-4 text-sm"><span className="font-bold">{item.label}</span><span className="font-mono" dir="ltr">{item.score} → {targetScore} <b className="text-amber-300">(+{gap})</b></span></div><div className="relative h-3 overflow-hidden rounded-full bg-white/10"><div className="absolute inset-y-0 left-0 rounded-full bg-cyan" style={{ width: `${item.score}%` }} /><div className="absolute inset-y-0 border-l-2 border-dashed border-white" style={{ left: `${targetScore}%` }} /></div></div>; })}</div>
      </section>

      <section className="report-card rounded-3xl border border-red-400/20 bg-card p-6 md:p-8">
        <div className="flex items-center gap-3"><AlertTriangle className="size-6 text-red-300" /><h3 className="text-xl font-black">ریسک‌های بحرانی</h3></div>
        {criticalRisks.length > 0 ? <div className="mt-6 grid gap-3 md:grid-cols-2">{criticalRisks.map((risk) => { const dimension = maturityDimensions.find((item) => item.id === risk.dimension); return <article key={risk.id} className="rounded-2xl border border-red-400/15 bg-red-400/5 p-4"><p className="text-xs font-bold text-red-300">{dimension?.label} · امتیاز پاسخ {answers[risk.id] ?? 1} از ۵</p><p className="report-muted mt-2 text-sm leading-7 text-muted-foreground">{risk.prompt}</p></article>; })}</div> : <p className="report-muted mt-4 text-sm leading-7 text-muted-foreground">براساس پاسخ‌ها، زیرشاخصی با امتیاز بحرانی ۱ یا ۲ ثبت نشده است؛ پایش مستمر همچنان ضروری است.</p>}
      </section>

      <section className="report-card rounded-3xl border border-violet-400/20 bg-card p-6 md:p-8">
        <div className="flex items-center gap-3"><Lightbulb className="size-6 text-violet-300" /><h3 className="text-xl font-black">Use Caseهای پیشنهادی</h3></div>
        <p className="report-muted mt-2 text-sm leading-7 text-muted-foreground">پیشنهاد اولیه با توجه به صنعت «{industry}» و سه محور دارای بیشترین شکاف؛ انتخاب نهایی نیازمند بررسی داده، ارزش و ریسک است.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{suggestedUseCases.map((useCase, index) => <article key={useCase} className="rounded-2xl border border-border bg-background/40 p-5"><span className="text-xs font-black text-violet-300">USE CASE {index + 1}</span><h4 className="mt-2 font-black leading-7">{useCase}</h4></article>)}</div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="report-card rounded-3xl border border-amber-400/20 bg-card p-6 md:p-8">
          <div className="flex items-center gap-3"><Target className="size-6 text-amber-300" /><h3 className="text-xl font-black">سه اولویت پیشنهادی</h3></div>
          <div className="mt-6 space-y-5">
            {priorities.map((priority, index) => (
              <div key={priority.id} className="rounded-2xl border border-border bg-background/50 p-5">
                <p className="text-xs font-bold text-amber-300">اولویت {index + 1} · امتیاز {priority.score}</p>
                <h4 className="mt-2 font-black">{priority.label}</h4>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">{dimensionGuidance[priority.id].actions.map((action) => <li key={action}>• {action}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className="report-card rounded-3xl border border-cyan/20 bg-card p-6 md:p-8">
          <div className="flex items-center gap-3"><CalendarRange className="size-6 text-cyan" /><h3 className="text-xl font-black">نقشه راه پیشنهادی ۹۰روزه</h3></div>
          <div className="mt-6 space-y-4">{roadmap.map((phase) => <div key={phase.period} className="rounded-2xl border border-border p-5"><p className="text-xs font-bold text-cyan">{phase.period}</p><h4 className="mt-2 font-black">{phase.title}</h4><p className="mt-2 text-sm leading-7 text-muted-foreground">{phase.detail}</p></div>)}</div>
        </section>
      </div>

      {result.governanceCapApplied ? <div className="flex gap-4 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-5"><AlertTriangle className="mt-1 size-5 shrink-0 text-amber-300" /><div><h3 className="font-black">هشدار حاکمیتی</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">پیش از گسترش کاربردهای پراثر، موجودی AI، ارزیابی ریسک، نظارت انسانی و برنامه پاسخ به رخداد را تکمیل کنید.</p></div></div> : null}

      <section className="report-card rounded-3xl border border-cyan/25 bg-gradient-to-l from-cyan/10 to-primary/10 p-7 text-center md:p-10">
        <h3 className="text-2xl font-black">گام بعدی را با nexation طراحی کنید</h3>
        <p className="report-muted mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">در یک جلسه مشاوره، نتایج خوداظهاری را اعتبارسنجی می‌کنیم و Use Caseها، ریسک‌ها و نقشه راه اجرایی سازمان شما را دقیق‌تر می‌سازیم.</p>
        <div className="no-print mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={() => window.print()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan/30 bg-background px-6 py-3 font-black"><Download className="size-5" /> دانلود یا ذخیره PDF</button><a href="https://nexation.ir/#contact" className="rounded-xl bg-primary px-6 py-3 font-black">درخواست جلسه مشاوره</a></div>
        <p className="hidden text-sm font-bold print:block">برای رزرو جلسه: nexation.ir</p>
      </section>

      <p className="report-muted text-xs leading-6 text-muted-foreground">این گزارش یک غربالگری مدیریتی مبتنی بر پاسخ‌های خوداظهاری است و جایگزین ارزیابی میدانی، ممیزی یا مشاوره تخصصی نیست.</p>
    </section>
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
