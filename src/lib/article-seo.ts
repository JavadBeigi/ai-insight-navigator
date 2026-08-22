export type ArticleSeo = {
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  author: string;
  readingTime: string;
  keywords: string[];
  sources: Array<{ name: string; url: string }>;
  relatedLinks?: Array<{ title: string; href: string }>;
  faqs?: Array<{ question: string; answer: string }>;
};

export const articleSeoBySlug: Record<string, ArticleSeo> = {
  "ai-agent-enterprise-guide": {
    metaTitle: "ایجنت هوش مصنوعی چیست؟ راهنمای AI Agent سازمانی | nexation",
    metaDescription:
      "ایجنت هوش مصنوعی چگونه با مدل، ابزار و داده وظایف چندمرحله‌ای را انجام می‌دهد؟ معماری، کاربردها، امنیت و مسیر استقرار AI Agent سازمانی را بخوانید.",
    image: "https://nexation.ir/blog/ai-agent-enterprise-guide.png",
    imageAlt: "تصویر مفهومی ایجنت هوش مصنوعی متصل به داده، اسناد، تحلیل و ابزارهای سازمانی",
    author: "تیم nexation",
    readingTime: "۱۲ دقیقه مطالعه",
    keywords: [
      "ایجنت هوش مصنوعی",
      "AI Agent",
      "ایجنت سازمانی",
      "عامل هوشمند",
      "اتوماسیون سازمانی",
      "هوش مصنوعی سازمانی",
    ],
    sources: [
      {
        name: "OpenAI — A practical guide to building AI agents",
        url: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/",
      },
      {
        name: "Anthropic — Building effective agents",
        url: "https://www.anthropic.com/engineering/building-effective-agents",
      },
      {
        name: "Google Cloud — What are AI agents?",
        url: "https://cloud.google.com/discover/what-are-ai-agents",
      },
      {
        name: "Google Search Central — Creating helpful, reliable, people-first content",
        url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
      },
    ],
  },
  "diamond-shaped-agentic-organization": {
    metaTitle: "ساختار سازمانی لوزی‌شکل و نقش ایجنت‌ها | nexation",
    metaDescription:
      "ساختار سازمانی لوزی‌شکل چگونه با تیم‌های انسان و ایجنت ساخته می‌شود؟ نقش لایه‌ها، مزایا، ریسک‌ها و نقشه راه طراحی سازمان عامل‌محور را بخوانید.",
    image: "https://nexation.ir/blog/diamond-shaped-agentic-organization.png",
    imageAlt: "ساختار سازمانی لوزی‌شکل با مدیران، متخصصان انسانی و شبکه ایجنت‌های هوش مصنوعی",
    author: "تیم nexation",
    readingTime: "۱۴ دقیقه مطالعه",
    keywords: [
      "ساختار سازمانی لوزی شکل",
      "سازمان عامل‌محور",
      "ایجنت هوش مصنوعی در سازمان",
      "تیم انسان و ایجنت",
      "ساختار سازمانی آینده",
      "Agentic Organization",
    ],
    sources: [
      {
        name: "PwC — Agentic AI workforce redesign",
        url: "https://www.pwc.com/us/en/tech-effect/ai-analytics/agentic-ai-workforce-redesign.html",
      },
      {
        name: "Microsoft — 2025 Work Trend Index: The Frontier Firm",
        url: "https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born",
      },
      {
        name: "McKinsey — The agentic organization",
        url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-agentic-organization-contours-of-the-next-paradigm-for-the-ai-era",
      },
      {
        name: "Deloitte — Rethinking operating models for humans with agents",
        url: "https://www.deloitte.com/us/en/insights/topics/talent/operating-models-for-humans-ai-agents.html",
      },
      {
        name: "NIST — AI Risk Management Framework Playbook: Govern",
        url: "https://airc.nist.gov/airmf-resources/playbook/govern/",
      },
    ],
    relatedLinks: [
      {
        title: "ایجنت هوش مصنوعی چیست؟ راهنمای کاربرد AI Agent در سازمان‌ها",
        href: "/blog/ai-agent-enterprise-guide",
      },
    ],
    faqs: [
      {
        question: "آیا سازمان لوزی‌شکل یعنی جایگزینی کارکنان با هوش مصنوعی؟",
        answer:
          "خیر. این مدل درباره تغییر ترکیب کار است؛ ایجنت‌ها بخشی از اجرا را انجام می‌دهند و انسان‌ها روی هدف‌گذاری، قضاوت، ارتباط، حل استثنا و پاسخ‌گویی متمرکز می‌شوند.",
      },
      {
        question: "آیا همه سازمان‌ها باید لوزی‌شکل شوند؟",
        answer:
          "خیر. ساختار مناسب به صنعت، ریسک، نوع دانش، اهمیت آموزش نیروهای جوان و بلوغ داده بستگی دارد و گاهی مدل ساعت‌شنی یا شبکه‌ای مناسب‌تر است.",
      },
      {
        question: "مدیر ایجنت چه کاری انجام می‌دهد؟",
        answer:
          "مدیر یا راهبر ایجنت هدف و محدودیت را تعیین می‌کند، کار را میان عامل‌های تخصصی تقسیم می‌کند، کیفیت و هزینه را می‌سنجد و موارد پرریسک را به مسئول انسانی ارجاع می‌دهد.",
      },
      {
        question: "از کدام واحد سازمان برای اجرای آزمایشی شروع کنیم؟",
        answer:
          "یک فرایند پرتکرار، قابل اندازه‌گیری و کم‌ریسک با داده نسبتاً منظم انتخاب کنید؛ مانند گزارش‌دهی داخلی، طبقه‌بندی درخواست‌ها یا کنترل اولیه مغایرت‌ها.",
      },
    ],
  },
};
