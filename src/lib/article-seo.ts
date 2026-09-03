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
  "model-context-protocol-mcp-enterprise-guide": {
    metaTitle: "MCP چیست؟ اتصال ایجنت به ابزارهای سازمانی | nexation",
    metaDescription:
      "پروتکل MCP چگونه ایجنت هوش مصنوعی را به داده و ابزارهای سازمانی متصل می‌کند؟ معماری، کاربرد، امنیت و نقشه راه استقرار MCP را بخوانید.",
    image: "https://nexation.ir/blog/model-context-protocol-mcp-enterprise-guide.png",
    imageAlt: "ایجنت هوش مصنوعی متصل از طریق MCP به داده‌ها و ابزارهای سازمانی",
    author: "تیم nexation",
    readingTime: "۱۶ دقیقه مطالعه",
    keywords: [
      "پروتکل MCP",
      "MCP چیست",
      "Model Context Protocol",
      "اتصال ایجنت هوش مصنوعی",
      "سرور MCP",
      "MCP سازمانی",
    ],
    sources: [
      {
        name: "Model Context Protocol — Architecture",
        url: "https://modelcontextprotocol.io/specification/2025-06-18/architecture",
      },
      {
        name: "Model Context Protocol — 2026-07-28 Specification",
        url: "https://blog.modelcontextprotocol.io/posts/2026-07-28/",
      },
      {
        name: "Anthropic — Introducing the Model Context Protocol",
        url: "https://www.anthropic.com/news/model-context-protocol",
      },
      {
        name: "OpenAI Agents SDK — Model context protocol",
        url: "https://openai.github.io/openai-agents-python/mcp/",
      },
      {
        name: "OWASP — MCP Security Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/MCP_Security_Cheat_Sheet.html",
      },
      {
        name: "Microsoft Learn — Secure your Azure MCP Server deployment",
        url: "https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/security",
      },
    ],
    relatedLinks: [
      {
        title: "ایجنت هوش مصنوعی چیست؟ راهنمای AI Agent سازمانی",
        href: "/blog/ai-agent-enterprise-guide",
      },
      {
        title: "Prompt Injection چیست؟ امنیت ایجنت هوش مصنوعی",
        href: "/blog/ai-agent-prompt-injection-security",
      },
      {
        title: "ارزیابی ایجنت هوش مصنوعی؛ Evals و KPIهای سازمانی",
        href: "/blog/ai-agent-evaluation-enterprise-kpis",
      },
      {
        title: "ساختار سازمانی لوزی‌شکل و نقش ایجنت‌ها",
        href: "/blog/diamond-shaped-agentic-organization",
      },
    ],
    faqs: [
      {
        question: "آیا MCP جایگزین API می‌شود؟",
        answer:
          "خیر. سرور MCP معمولاً از APIهای موجود استفاده می‌کند و آن‌ها را با قراردادی استاندارد برای برنامه‌ها و ایجنت‌های هوش مصنوعی ارائه می‌دهد.",
      },
      {
        question: "آیا MCP جایگزین RAG است؟",
        answer:
          "خیر. RAG روش بازیابی اطلاعات است؛ MCP می‌تواند دسترسی به منبع جست‌وجو یا ابزار RAG را استاندارد کند.",
      },
      {
        question: "آیا می‌توان به هر سرور عمومی MCP اعتماد کرد؟",
        answer:
          "خیر. منشأ، کد، وابستگی‌ها، رفتار شبکه و سطح دسترسی سرور باید بررسی و مجوز آن به حداقل لازم محدود شود.",
      },
      {
        question: "برای شروع پروژه MCP چند Tool کافی است؟",
        answer:
          "برای یک پایلوت سازمانی، دو یا سه ابزار محدود و پرکاربرد بهتر از یک کاتالوگ بزرگ است؛ سپس دامنه بر اساس نتایج واقعی گسترش می‌یابد.",
      },
    ],
  },
  "ai-agent-evaluation-enterprise-kpis": {
    metaTitle: "ارزیابی ایجنت هوش مصنوعی؛ Evals و KPI سازمانی | nexation",
    metaDescription:
      "چگونه آمادگی Production ایجنت هوش مصنوعی را بسنجیم؟ طراحی Evals، تحلیل مسیر اجرا، KPIهای سازمانی و معیارهای Go/No-Go را بیاموزید.",
    image: "https://nexation.ir/blog/ai-agent-evaluation-enterprise-kpis.png",
    imageAlt: "تیم سازمانی در حال طراحی آزمون‌ها و شاخص‌های ارزیابی ایجنت هوش مصنوعی",
    author: "تیم nexation",
    readingTime: "۱۵ دقیقه مطالعه",
    keywords: [
      "ارزیابی ایجنت هوش مصنوعی",
      "AI Agent Evals",
      "KPI ایجنت هوش مصنوعی",
      "تست ایجنت سازمانی",
      "پایش ایجنت در Production",
    ],
    sources: [
      {
        name: "NIST — AI Risk Management Framework Core",
        url: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/",
      },
      {
        name: "Anthropic — Demystifying evals for AI agents",
        url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
      },
      {
        name: "OpenAI — How evals drive the next chapter in AI for businesses",
        url: "https://openai.com/index/evals-drive-next-chapter-of-ai/",
      },
      {
        name: "Google Cloud — A methodical approach to agent evaluation",
        url: "https://cloud.google.com/blog/topics/developers-practitioners/a-methodical-approach-to-agent-evaluation",
      },
      {
        name: "Google Cloud — KPIs that matter for production AI agents",
        url: "https://cloud.google.com/transform/the-kpis-that-actually-matter-for-production-ai-agents",
      },
    ],
    relatedLinks: [
      {
        title: "ایجنت هوش مصنوعی چیست؟ راهنمای AI Agent سازمانی",
        href: "/blog/ai-agent-enterprise-guide",
      },
      {
        title: "Prompt Injection چیست؟ امنیت ایجنت هوش مصنوعی",
        href: "/blog/ai-agent-prompt-injection-security",
      },
      {
        title: "ساختار سازمانی لوزی‌شکل و نقش ایجنت‌ها",
        href: "/blog/diamond-shaped-agentic-organization",
      },
      {
        title: "MCP چیست؟ اتصال ایجنت به ابزارهای سازمانی",
        href: "/blog/model-context-protocol-mcp-enterprise-guide",
      },
    ],
    faqs: [
      {
        question: "چند سناریو برای شروع Eval کافی است؟",
        answer:
          "با مجموعه‌ای کوچک اما نماینده از کارهای واقعی، موارد مرزی و خطاهای پراثر شروع کنید و آن را با رخدادهای Production گسترش دهید.",
      },
      {
        question: "آیا LLM می‌تواند خودش را ارزیابی کند؟",
        answer:
          "برای برخی معیارهای کیفی بله، اما داور مدل باید rubric روشن داشته باشد و با قضاوت متخصص انسانی کالیبره شود.",
      },
      {
        question: "تفاوت KPI و Eval چیست؟",
        answer:
          "Eval رفتار ایجنت را در سناریوهای کنترل‌شده می‌سنجد؛ KPI عملکرد واقعی و اثر کسب‌وکاری آن را در طول زمان دنبال می‌کند.",
      },
      {
        question: "چه زمانی باید ایجنت را متوقف کرد؟",
        answer:
          "عبور خطای بحرانی از آستانه، نبود trace کافی، هزینه یا latency غیرعادی و رفتار کنترل‌نشده، از معیارهای توقف هستند.",
      },
    ],
  },
  "ai-agent-prompt-injection-security": {
    metaTitle: "Prompt Injection چیست؟ امنیت ایجنت هوش مصنوعی | nexation",
    metaDescription:
      "Prompt Injection چگونه ایجنت هوش مصنوعی را فریب می‌دهد؟ تفاوت حمله مستقیم و غیرمستقیم و راهکارهای محافظت از اطلاعات سازمان را بخوانید.",
    image: "https://nexation.ir/blog/ai-agent-prompt-injection-security.png",
    imageAlt: "کارشناسان امنیت سایبری در حال بررسی یک رخداد مربوط به ایجنت هوش مصنوعی",
    author: "تیم nexation",
    readingTime: "۱۲ دقیقه مطالعه",
    keywords: [
      "Prompt Injection",
      "امنیت ایجنت هوش مصنوعی",
      "امنیت AI Agent",
      "تزریق دستور",
      "هوش مصنوعی سازمانی",
    ],
    sources: [
      {
        name: "NIST — Artificial Intelligence Risk Management Framework: Generative AI Profile",
        url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf",
      },
      {
        name: "NIST — Strengthening AI Agent Hijacking Evaluations",
        url: "https://www.nist.gov/news-events/news/2025/01/technical-blog-strengthening-ai-agent-hijacking-evaluations",
      },
      {
        name: "Anthropic — Mitigating the Risk of Prompt Injections in Browser Use",
        url: "https://www.anthropic.com/research/prompt-injection-defenses",
      },
      {
        name: "OpenAI — A Practical Guide to Building AI Agents",
        url: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/",
      },
    ],
    relatedLinks: [
      {
        title: "ایجنت هوش مصنوعی چیست؟ راهنمای کاربرد AI Agent در سازمان‌ها",
        href: "/blog/ai-agent-enterprise-guide",
      },
      {
        title: "ارزیابی ایجنت هوش مصنوعی؛ Evals و KPIهای سازمانی",
        href: "/blog/ai-agent-evaluation-enterprise-kpis",
      },
      {
        title: "ساختار سازمانی لوزی‌شکل و نقش ایجنت‌ها",
        href: "/blog/diamond-shaped-agentic-organization",
      },
      {
        title: "MCP چیست؟ اتصال ایجنت به ابزارهای سازمانی",
        href: "/blog/model-context-protocol-mcp-enterprise-guide",
      },
    ],
  },
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
    relatedLinks: [
      {
        title: "امنیت Prompt Injection در ایجنت‌های هوش مصنوعی",
        href: "/blog/ai-agent-prompt-injection-security",
      },
      {
        title: "ارزیابی ایجنت هوش مصنوعی؛ Evals و KPIهای سازمانی",
        href: "/blog/ai-agent-evaluation-enterprise-kpis",
      },
      {
        title: "ساختار سازمانی لوزی‌شکل و نقش ایجنت‌ها",
        href: "/blog/diamond-shaped-agentic-organization",
      },
      {
        title: "MCP چیست؟ اتصال ایجنت به ابزارهای سازمانی",
        href: "/blog/model-context-protocol-mcp-enterprise-guide",
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
      {
        title: "ارزیابی ایجنت هوش مصنوعی؛ Evals و KPIهای سازمانی",
        href: "/blog/ai-agent-evaluation-enterprise-kpis",
      },
      {
        title: "امنیت Prompt Injection در ایجنت‌های هوش مصنوعی",
        href: "/blog/ai-agent-prompt-injection-security",
      },
      {
        title: "MCP چیست؟ اتصال ایجنت به ابزارهای سازمانی",
        href: "/blog/model-context-protocol-mcp-enterprise-guide",
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
