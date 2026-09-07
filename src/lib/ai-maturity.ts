export type MaturityDimensionId =
  | "strategy"
  | "value"
  | "data"
  | "technology"
  | "governance"
  | "people"
  | "scale";

export type MaturityQuestion = {
  id: string;
  dimension: MaturityDimensionId;
  prompt: string;
  sources: string[];
};

export const maturityDimensions = [
  { id: "strategy", label: "استراتژی و رهبری", shortLabel: "استراتژی", color: "#22d3ee" },
  { id: "value", label: "ارزش و سبد کاربردها", shortLabel: "ارزش", color: "#38bdf8" },
  { id: "data", label: "داده و دانش سازمانی", shortLabel: "داده", color: "#60a5fa" },
  { id: "technology", label: "فناوری و عملیات AI", shortLabel: "فناوری", color: "#818cf8" },
  { id: "governance", label: "حاکمیت، ریسک و امنیت", shortLabel: "حاکمیت", color: "#a78bfa" },
  { id: "people", label: "افراد و مدل عملیاتی", shortLabel: "افراد", color: "#c084fc" },
  { id: "scale", label: "پذیرش و مقیاس‌پذیری", shortLabel: "مقیاس", color: "#e879f9" },
] as const;

export const maturityScale = [
  { value: 1, title: "وجود ندارد", description: "فعالیت مشخصی وجود ندارد یا کاملاً موردی است." },
  { value: 2, title: "آزمایشی", description: "نمونه‌ها و پایلوت‌های پراکنده اجرا شده‌اند، اما روش مشترکی وجود ندارد." },
  { value: 3, title: "تعریف‌شده", description: "رویکرد مستند و مالک مشخص وجود دارد، اما اجرای آن هنوز کامل نیست." },
  { value: 4, title: "عملیاتی", description: "رویکرد در چند بخش اجرا، کنترل و با شاخص‌های مشخص اندازه‌گیری می‌شود." },
  { value: 5, title: "مقیاس‌یافته", description: "رویکرد در سطح سازمان نهادینه، قابل تکرار و به‌طور مستمر بهینه می‌شود." },
] as const;

export const maturitySources = {
  NIST: { label: "NIST AI RMF", url: "https://airc.nist.gov/airmf-resources/airmf/" },
  MS: { label: "Microsoft AI Readiness", url: "https://learn.microsoft.com/en-us/assessments/94f1c697-9ba7-4d47-ad83-7c6bd94b1505/" },
  AWS: { label: "AWS GenAI Maturity Model", url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-gen-ai-maturity-model/overview.html" },
  GARTNER: { label: "Gartner AI Maturity Model", url: "https://www.gartner.com/en/chief-information-officer/research/ai-maturity-model-toolkit" },
  MCK: { label: "McKinsey AI Quotient", url: "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/rewired-and-running-ahead-digital-and-ai-leaders-are-leaving-the-rest-behind" },
  DELOITTE: { label: "Deloitte AI Readiness Framework", url: "https://www.deloitte.com/us/en/industries/government-public/about/enterprise-ai-for-government.html" },
  ACCENTURE: { label: "Accenture–SEI AI Adoption Maturity Model", url: "https://newsroom.accenture.com/news/2026/accenture-and-the-carnegie-mellon-university-software-engineering-institute-launch-ai-adoption-maturity-model-to-help-organizations-scale-ai-with-predictable-outcomes" },
  ISO: { label: "ISO/IEC 42001", url: "https://www.iso.org/standard/42001" },
} as const;

export const maturityQuestions: MaturityQuestion[] = [
  { id: "s1", dimension: "strategy", prompt: "چشم‌انداز استفاده از هوش مصنوعی تا چه حد به اهداف و اولویت‌های کلان سازمان متصل شده است؟", sources: ["MS", "MCK", "AWS"] },
  { id: "s2", dimension: "strategy", prompt: "حمایت مدیران ارشد، بودجه و مسئول پاسخ‌گو برای برنامه AI تا چه حد مشخص و پایدار است؟", sources: ["GARTNER", "ACCENTURE", "ISO"] },
  { id: "s3", dimension: "strategy", prompt: "نقشه راه AI تا چه حد شامل اهداف زمان‌دار، وابستگی‌ها و معیارهای تصمیم‌گیری است؟", sources: ["MS", "DELOITTE", "AWS"] },
  { id: "s4", dimension: "strategy", prompt: "تصمیم‌های سرمایه‌گذاری AI تا چه حد در سطح کسب‌وکار و فناوری به‌صورت مشترک گرفته می‌شوند؟", sources: ["MCK", "ACCENTURE"] },
  { id: "s5", dimension: "strategy", prompt: "سازمان تا چه حد روند اجرای استراتژی AI را بازبینی و با تغییر شرایط اصلاح می‌کند؟", sources: ["NIST", "ISO"] },

  { id: "v1", dimension: "value", prompt: "کاربردهای AI تا چه حد از مسائل واقعی و نتایج قابل‌اندازه‌گیری کسب‌وکار آغاز می‌شوند؟", sources: ["AWS", "GARTNER", "DELOITTE"] },
  { id: "v2", dimension: "value", prompt: "فرایند شناسایی و اولویت‌بندی کاربردها تا چه حد ارزش، امکان‌پذیری و ریسک را هم‌زمان می‌سنجد؟", sources: ["NIST", "MCK", "AWS"] },
  { id: "v3", dimension: "value", prompt: "برای پروژه‌های AI تا چه حد مالک کسب‌وکار، Baseline و KPI پیش از اجرا تعیین می‌شود؟", sources: ["GARTNER", "ACCENTURE"] },
  { id: "v4", dimension: "value", prompt: "منافع مالی و غیرمالی راهکارهای AI تا چه حد پس از استقرار اندازه‌گیری و گزارش می‌شوند؟", sources: ["NIST", "MCK", "DELOITTE"] },
  { id: "v5", dimension: "value", prompt: "پروژه‌های کم‌اثر تا چه حد به‌موقع متوقف و منابع به کاربردهای ارزشمندتر منتقل می‌شوند؟", sources: ["GARTNER", "AWS"] },

  { id: "d1", dimension: "data", prompt: "داده‌های موردنیاز کاربردهای AI تا چه حد شناسایی، مالک‌گذاری و قابل دسترس شده‌اند؟", sources: ["MS", "AWS", "DELOITTE"] },
  { id: "d2", dimension: "data", prompt: "کیفیت، کامل‌بودن، تازگی و Lineage داده تا چه حد با معیارهای قابل‌اندازه‌گیری کنترل می‌شود؟", sources: ["NIST", "MS"] },
  { id: "d3", dimension: "data", prompt: "طبقه‌بندی، مجوز دسترسی، حریم خصوصی و مدت نگهداری داده‌های AI تا چه حد اجرا می‌شود؟", sources: ["NIST", "ISO", "ACCENTURE"] },
  { id: "d4", dimension: "data", prompt: "زیرساخت داده تا چه حد برای اشتراک امن، بازیابی دانش و مقیاس کاربردهای AI آماده است؟", sources: ["MS", "MCK", "AWS"] },
  { id: "d5", dimension: "data", prompt: "سوگیری، نمایندگی گروه‌ها و محدودیت‌های Dataset تا چه حد پیش از استفاده مستند و پایش می‌شوند؟", sources: ["NIST", "ACCENTURE"] },

  { id: "t1", dimension: "technology", prompt: "معماری AI تا چه حد استاندارد، ماژولار و قابل اتصال به سامانه‌های اصلی سازمان است؟", sources: ["MS", "AWS", "MCK"] },
  { id: "t2", dimension: "technology", prompt: "انتخاب مدل و ابزار تا چه حد براساس کیفیت، هزینه، تأخیر، امنیت و محدودیت کاربرد انجام می‌شود؟", sources: ["NIST", "MS"] },
  { id: "t3", dimension: "technology", prompt: "چرخه توسعه، آزمون، نسخه‌بندی و استقرار مدل‌ها و Promptها تا چه حد خودکار و قابل بازتولید است؟", sources: ["AWS", "ACCENTURE", "GARTNER"] },
  { id: "t4", dimension: "technology", prompt: "عملکرد، هزینه، Drift، خطا و رخدادهای AI در محیط عملیاتی تا چه حد پایش می‌شوند؟", sources: ["NIST", "AWS", "ISO"] },
  { id: "t5", dimension: "technology", prompt: "برای ایجنت‌ها، دسترسی ابزار، حافظه، Trace، Evals و توقف اضطراری تا چه حد کنترل شده است؟", sources: ["NIST", "MS", "AWS"] },

  { id: "g1", dimension: "governance", prompt: "سازمان تا چه حد موجودی به‌روز از سامانه‌ها، مدل‌ها و کاربردهای AI همراه با مالک آن‌ها دارد؟", sources: ["NIST", "ISO", "MS"] },
  { id: "g2", dimension: "governance", prompt: "نقش‌ها، سیاست‌ها و مرجع تصمیم‌گیری برای حاکمیت AI تا چه حد تعریف و اجرا شده‌اند؟", sources: ["NIST", "ISO", "ACCENTURE"] },
  { id: "g3", dimension: "governance", prompt: "ارزیابی ریسک AI تا چه حد پیش از استقرار و متناسب با اثر کاربرد انجام می‌شود؟", sources: ["NIST", "ISO", "GARTNER"] },
  { id: "g4", dimension: "governance", prompt: "کنترل‌های امنیت، حریم خصوصی، Human Oversight و مدیریت رخداد تا چه حد آزموده و مستند هستند؟", sources: ["NIST", "MS", "ACCENTURE"] },
  { id: "g5", dimension: "governance", prompt: "ریسک تأمین‌کنندگان، مدل‌های ثالث و الزامات قانونی AI تا چه حد در خرید و قراردادها مدیریت می‌شود؟", sources: ["NIST", "ISO", "DELOITTE"] },

  { id: "p1", dimension: "people", prompt: "مهارت‌های موردنیاز نقش‌های مدیریتی، کسب‌وکار، داده، فنی و کنترل ریسک تا چه حد مشخص شده‌اند؟", sources: ["MS", "MCK", "ACCENTURE"] },
  { id: "p2", dimension: "people", prompt: "آموزش AI تا چه حد نقش‌محور، مستمر و همراه با ارزیابی یادگیری است؟", sources: ["AWS", "ACCENTURE", "DELOITTE"] },
  { id: "p3", dimension: "people", prompt: "تیم‌های AI تا چه حد میان کسب‌وکار، فناوری، داده، حقوقی و امنیت همکاری ساختاریافته دارند؟", sources: ["NIST", "AWS", "MCK"] },
  { id: "p4", dimension: "people", prompt: "مدل عملیاتی AI تا چه حد مالکیت محصول، مسئولیت تصمیم و مسیر Escalation را روشن می‌کند؟", sources: ["GARTNER", "MCK", "ISO"] },
  { id: "p5", dimension: "people", prompt: "اثرات AI بر مشاغل، فرایندها و پذیرش کارکنان تا چه حد ارزیابی و مدیریت می‌شود؟", sources: ["NIST", "ACCENTURE", "DELOITTE"] },

  { id: "a1", dimension: "scale", prompt: "راهکارهای AI تا چه حد از پایلوت عبور کرده و در فرایندهای واقعی و پایدار استفاده می‌شوند؟", sources: ["AWS", "GARTNER", "MCK"] },
  { id: "a2", dimension: "scale", prompt: "الگوها، اجزای مشترک و پلتفرم‌های قابل استفاده مجدد تا چه حد توسعه پروژه‌های جدید را سریع می‌کنند؟", sources: ["AWS", "ACCENTURE"] },
  { id: "a3", dimension: "scale", prompt: "پذیرش کاربران تا چه حد با شاخص استفاده واقعی، رضایت، اعتماد و تغییر رفتار سنجیده می‌شود؟", sources: ["GARTNER", "DELOITTE", "MCK"] },
  { id: "a4", dimension: "scale", prompt: "سازمان تا چه حد از بازخورد عملیاتی و رخدادها برای بهبود مستمر مدل و فرایند استفاده می‌کند؟", sources: ["NIST", "ISO", "AWS"] },
  { id: "a5", dimension: "scale", prompt: "توانمندی AI تا چه حد در چند واحد سازمانی با کنترل، کیفیت و ارزش قابل تکرار گسترش یافته است؟", sources: ["GARTNER", "MCK", "ACCENTURE"] },
];

export function calculateMaturity(answers: Record<string, number>) {
  const dimensionScores = maturityDimensions.map((dimension) => {
    const questions = maturityQuestions.filter((question) => question.dimension === dimension.id);
    const values = questions.map((question) => answers[question.id] ?? 1);
    const score = Math.round(((values.reduce((sum, value) => sum + value, 0) - values.length) / (values.length * 4)) * 100);
    return { ...dimension, score };
  });
  const rawScore = Math.round(dimensionScores.reduce((sum, item) => sum + item.score, 0) / dimensionScores.length);
  const governanceScore = dimensionScores.find((item) => item.id === "governance")?.score ?? 0;
  const score = governanceScore < 40 ? Math.min(rawScore, 60) : rawScore;
  const level = score <= 20 ? 1 : score <= 40 ? 2 : score <= 60 ? 3 : score <= 80 ? 4 : 5;
  const levelNames = ["آغاز مسیر", "آزمایش", "استقرار کنترل‌شده", "مقیاس سازمانی", "سازمان AI-Native"];
  const sorted = [...dimensionScores].sort((a, b) => b.score - a.score);
  return { score, rawScore, governanceCapApplied: score !== rawScore, level, levelName: levelNames[level - 1], dimensionScores, strongest: sorted[0], weakest: sorted.at(-1)! };
}
