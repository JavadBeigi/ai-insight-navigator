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
  "rag-fine-tuning-ai-agent-decision-framework": {
    metaTitle: "RAG یا Fine-tuning یا AI Agent؟ راهنمای انتخاب | nexation",
    metaDescription:
      "برای مسئله سازمانی خود RAG، Fine-tuning، Workflow یا AI Agent انتخاب کنیم؟ چارچوب تصمیم، ماتریس مقایسه، سناریو و نقشه اجرای مرحله‌ای را بخوانید.",
    image: "https://nexation.ir/blog/rag-fine-tuning-ai-agent-decision-framework.png",
    imageAlt: "تیم راهبرد و فناوری سازمان در حال مقایسه معماری RAG، Fine-tuning و AI Agent",
    author: "تیم nexation",
    readingTime: "۱۴ دقیقه مطالعه",
    keywords: [
      "RAG یا Fine-tuning یا AI Agent",
      "معماری هوش مصنوعی سازمانی",
      "انتخاب RAG",
      "Fine-tuning سازمانی",
      "Agentic RAG",
      "طراحی AI Agent",
    ],
    sources: [
      {
        name: "OpenAI — Model optimization",
        url: "https://developers.openai.com/api/docs/guides/model-optimization",
      },
      {
        name: "OpenAI — Retrieval and semantic search",
        url: "https://developers.openai.com/api/docs/guides/retrieval",
      },
      {
        name: "Anthropic — Building effective agents",
        url: "https://www.anthropic.com/engineering/building-effective-agents",
      },
      {
        name: "Microsoft — AI technology overview",
        url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/ai-overview",
      },
      {
        name: "Microsoft — Develop an agentic RAG solution",
        url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-agentic",
      },
      {
        name: "Google Cloud — Deploy and operate generative AI applications",
        url: "https://docs.cloud.google.com/architecture/deploy-operate-generative-ai-applications",
      },
    ],
    relatedLinks: [
      { title: "ایجنت هوش مصنوعی چیست؟ راهنمای سازمانی", href: "/blog/ai-agent-enterprise-guide" },
      {
        title: "ارزیابی ایجنت و KPIهای سازمانی",
        href: "/blog/ai-agent-evaluation-enterprise-kpis",
      },
      {
        title: "MCP چیست؟ اتصال ایجنت به ابزارهای سازمانی",
        href: "/blog/model-context-protocol-mcp-enterprise-guide",
      },
      {
        title: "تأیید انسانی ایجنت هوش مصنوعی",
        href: "/blog/human-in-the-loop-ai-agent-approvals",
      },
      { title: "سنجش بلوغ هوش مصنوعی سازمان", href: "/ai-maturity-assessment" },
    ],
    faqs: [
      {
        question: "برای اطلاعات اختصاصی سازمان RAG بهتر است یا Fine-tuning؟",
        answer:
          "اگر اطلاعات مرتب تغییر می‌کند یا باید منبع پاسخ مشخص باشد، RAG معمولاً نقطه شروع مناسب‌تری است. Fine-tuning بیشتر برای تثبیت رفتار، قالب یا یک وظیفه تخصصی با نمونه‌های باکیفیت کاربرد دارد.",
      },
      {
        question: "چه زمانی به AI Agent نیاز داریم؟",
        answer:
          "وقتی مسیر انجام کار از قبل ثابت نیست، سیستم باید بر اساس نتایج میانی ابزار و قدم بعدی را انتخاب کند و معیار پایان روشنی وجود دارد. برای فرایندهای ثابت، Workflow معمولاً قابل‌کنترل‌تر است.",
      },
      {
        question: "آیا Agentic RAG همیشه از RAG استاندارد بهتر است؟",
        answer:
          "خیر. Agentic RAG برای پرسش‌های چندمرحله‌ای و چندمنبعی انعطاف بیشتری دارد، اما هزینه، زمان پاسخ و ریسک انتخاب ابزار را افزایش می‌دهد. برای یک جست‌وجوی مستقیم، RAG استاندارد گزینه ساده‌تر است.",
      },
    ],
  },
  "human-in-the-loop-ai-agent-approvals": {
    metaTitle: "╪¬╪ú█î█î╪» ╪º┘å╪│╪º┘å█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î╪¢ ╪▒╪º┘ç┘å┘à╪º█î HITL | nexation",
    metaDescription:
      "╪¬╪ú█î█î╪» ╪º┘å╪│╪º┘å█î ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º ╪▒╪º ┌⌐╪¼╪º ┘ê ┌å┌»┘ê┘å┘ç ╪º╪¼╪▒╪º ┌⌐┘å█î┘à╪ƒ ╪▒╪º┘ç┘å┘à╪º█î ┘à╪▒╪▓ ╪º╪«╪¬█î╪º╪▒╪î ╪╡┘ü ╪¬╪ú█î█î╪»╪î ╪º╪╣╪¬╪¿╪º╪▒╪│┘å╪¼█î ╪»┘ê╪¿╪º╪▒┘ç╪î ╪¬┘ê┘é┘ü ╪º┘à┘å ┘ê KPI┘ç╪º█î HITL ╪│╪º╪▓┘à╪º┘å█î.",
    image: "https://nexation.ir/blog/human-in-the-loop-ai-agent-approvals.png",
    imageAlt: "╪»╪│╪¬ ╪º┘å╪│╪º┘å ╪»╪▒ ╪¡╪º┘ä ╪¿╪▒╪▒╪│█î ┌⌐┘å╪¬╪▒┘ä ╪¬╪ú█î█î╪» ┘ê ╪¬┘ê┘é┘ü █î┌⌐ ┌»╪▒╪»╪┤ΓÇî┌⌐╪º╪▒ ╪«┘ê╪»┌⌐╪º╪▒ ╪»╪▒ ╪º╪¬╪º┘é ╪╣┘à┘ä█î╪º╪¬",
    author: "╪¬█î┘à nexation",
    readingTime: "█▒█╖ ╪»┘é█î┘é┘ç ┘à╪╖╪º┘ä╪╣┘ç",
    keywords: [
      "╪¬╪ú█î█î╪» ╪º┘å╪│╪º┘å█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
      "Human-in-the-loop",
      "HITL ╪º█î╪¼┘å╪¬ ╪│╪º╪▓┘à╪º┘å█î",
      "┘à╪▒╪▓ ╪º╪«╪¬█î╪º╪▒ ╪º█î╪¼┘å╪¬",
      "╪¬╪ú█î█î╪» ╪º┘é╪»╪º┘à ╪º█î╪¼┘å╪¬",
    ],
    sources: [
      {
        name: "NIST ΓÇö AI RMF Core╪î Govern 3.2",
        url: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/",
      },
      {
        name: "OpenAI Agents SDK ΓÇö Human-in-the-loop",
        url: "https://openai.github.io/openai-agents-python/human_in_the_loop/",
      },
      {
        name: "OpenAI Agents SDK ΓÇö Guardrails",
        url: "https://openai.github.io/openai-agents-python/guardrails/",
      },
      {
        name: "Microsoft Agent Framework ΓÇö Human-in-the-loop workflows",
        url: "https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop",
      },
      {
        name: "Anthropic ΓÇö Trustworthy agents in practice",
        url: "https://www.anthropic.com/research/trustworthy-agents",
      },
    ],
    relatedLinks: [
      { title: "┘ç┘ê█î╪¬ ╪º█î╪¼┘å╪¬ ┘ê ┘à╪╣┘à╪º╪▒█î Zero Trust", href: "/blog/zero-trust-ai-agent-identity" },
      { title: "╪º╪▒╪▓█î╪º╪¿█î ╪º█î╪¼┘å╪¬ ┘ê KPI┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î", href: "/blog/ai-agent-evaluation-enterprise-kpis" },
      { title: "╪º┘à┘å█î╪¬ ╪º█î╪¼┘å╪¬ ╪»╪▒ ╪¿╪▒╪º╪¿╪▒ Prompt Injection", href: "/blog/ai-agent-prompt-injection-security" },
      { title: "╪│┘å╪¼╪┤ ╪¿┘ä┘ê╪║ AI ╪│╪º╪▓┘à╪º┘å", href: "/ai-maturity-assessment" },
    ],
    faqs: [
      {
        question: "╪¬╪ú█î█î╪» ╪º┘å╪│╪º┘å█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ╪»╪▒ ┌⌐╪»╪º┘à ┘å┘é╪╖┘ç ┘ä╪º╪▓┘à ╪º╪│╪¬╪ƒ",
        answer:
          "╪¿╪▒╪º█î ╪º┘é╪»╪º┘àΓÇî┘ç╪º█î ╪¡╪│╪º╪│╪î ╪¬╪ú█î█î╪» ╪¿╪º█î╪» ╪»╪▒ ┘ä╪º█î┘ç ╪º╪¼╪▒╪º█î ╪º╪¿╪▓╪º╪▒ ┘ê ┘╛█î╪┤ ╪º╪▓ ╪º█î╪¼╪º╪» ╪º╪½╪▒ ┘ê╪º┘é╪╣█î ╪º┘å╪¼╪º┘à ╪┤┘ê╪»╪¢ ┘å┘ç ┘ü┘é╪╖ ╪¿┘çΓÇî╪╡┘ê╪▒╪¬ ╪»╪│╪¬┘ê╪▒ ╪»╪º╪«┘ä Prompt.",
      },
      {
        question: "╪ó█î╪º ┘ç┘à┘ç ╪º┘é╪»╪º┘àΓÇî┘ç╪º█î ╪º█î╪¼┘å╪¬ ╪¿╪º█î╪» ╪¬╪ú█î█î╪» ╪┤┘ê┘å╪»╪ƒ",
        answer:
          "╪«█î╪▒. ╪│╪º╪▓┘à╪º┘å ╪¿╪º█î╪» ╪º┘é╪»╪º┘àΓÇî┘ç╪º ╪▒╪º ╪¿╪▒ ╪º╪│╪º╪│ ╪»╪º╪»┘ç╪î ╪»╪º┘à┘å┘ç ╪»╪│╪¬╪▒╪│█î╪î ┘╛█î╪º┘à╪» ┘ê ╪¿╪▒┌»╪┤╪¬ΓÇî┘╛╪░█î╪▒█î ╪¿┘ç ┘à╪¼╪º╪▓ ╪«┘ê╪»┌⌐╪º╪▒╪î ┘å█î╪º╪▓┘à┘å╪» ╪¬╪ú█î█î╪» ┘ê ┘à┘à┘å┘ê╪╣ ╪¬┘é╪│█î┘à ┌⌐┘å╪».",
      },
      {
        question: "╪º┌»╪▒ ╪º╪╖┘ä╪º╪╣╪º╪¬ ┘╛╪│ ╪º╪▓ ╪¬╪ú█î█î╪» ╪¬╪║█î█î╪▒ ┌⌐┘å╪» ┌å┘ç ╪¿╪º█î╪» ┌⌐╪▒╪»╪ƒ",
        answer:
          "┘╛█î╪┤ ╪º╪▓ ╪º╪¼╪▒╪º╪î ┘╛╪º╪▒╪º┘à╪¬╪▒┘ç╪º ┘ê ┘ê╪╢╪╣█î╪¬ ╪»┘ê╪¿╪º╪▒┘ç ╪º╪╣╪¬╪¿╪º╪▒╪│┘å╪¼█î ╪┤┘ê┘å╪»╪¢ ╪º┌»╪▒ ╪¬╪║█î█î╪▒ ┘à╪╣┘å╪º╪»╪º╪▒ ╪▒╪« ╪»╪º╪»┘ç╪î ╪¬╪ú█î█î╪» ┘é╪¿┘ä█î ╪¿╪º╪╖┘ä ┘ê ╪»╪▒╪«┘ê╪º╪│╪¬ ╪¬╪º╪▓┘ç ╪╡╪º╪»╪▒ ╪┤┘ê╪».",
      },
      {
        question: "╪»╪▒ ╪╡┘ê╪▒╪¬ ┘╛╪º╪│╪« ┘å╪»╪º╪»┘å ╪¬╪ú█î█î╪»┌⌐┘å┘å╪»┘ç ┌å┘ç ┘à█îΓÇî╪┤┘ê╪»╪ƒ",
        answer:
          "╪º┘é╪»╪º┘à ╪¡╪│╪º╪│ ┘å╪¿╪º█î╪» ╪«┘ê╪»┌⌐╪º╪▒ ╪º╪¼╪▒╪º ╪┤┘ê╪»╪¢ ╪»╪▒╪«┘ê╪º╪│╪¬ ╪¿╪º█î╪» ┘à┘å┘é╪╢█î ┘ê ╪»╪▒ ╪╡┘ê╪▒╪¬ ┘å█î╪º╪▓ ╪¿┘ç ┘à╪│╪ª┘ê┘ä ┘╛╪┤╪¬█î╪¿╪º┘å ╪º╪▒╪¼╪º╪╣ ╪┤┘ê╪».",
      },
    ],
  },
  "shadow-ai-governance-enterprise": {
    metaTitle: "Shadow AI ╪»╪▒ ╪│╪º╪▓┘à╪º┘å╪¢ ╪▒╪º┘ç┘å┘à╪º█î ┌⌐╪┤┘ü ┘ê ╪¡╪º┌⌐┘à█î╪¬ | nexation",
    metaDescription:
      "Shadow AI ┌å█î╪│╪¬ ┘ê ┌å┌»┘ê┘å┘ç ╪º╪¿╪▓╪º╪▒┘ç╪º ┘ê ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º█î ┘╛┘å┘ç╪º┘å ╪▒╪º ┘à╪»█î╪▒█î╪¬ ┌⌐┘å█î┘à╪ƒ ╪▒╪º┘ç┘å┘à╪º█î ╪╣┘à┘ä█î ┘à┘ê╪¼┘ê╪»█î AI╪î ╪╖╪¿┘é┘çΓÇî╪¿┘å╪»█î ╪▒█î╪│┌⌐╪î ╪│█î╪º╪│╪¬ ┘ê ╪¿╪▒┘å╪º┘à┘ç 30 ╪▒┘ê╪▓┘ç.",
    image: "https://nexation.ir/blog/shadow-ai-governance-enterprise.png",
    imageAlt: "╪¬█î┘à ╪º┘à┘å█î╪¬ ┘ê ┘ü┘å╪º┘ê╪▒█î ╪│╪º╪▓┘à╪º┘å ╪»╪▒ ╪¡╪º┘ä ┌⌐╪┤┘ü ┘ê ┘à╪»█î╪▒█î╪¬ ╪º╪¿╪▓╪º╪▒┘ç╪º█î ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┘╛┘å┘ç╪º┘å",
    author: "╪¬█î┘à nexation",
    readingTime: "15 ╪»┘é█î┘é┘ç ┘à╪╖╪º┘ä╪╣┘ç",
    keywords: ["Shadow AI ╪»╪▒ ╪│╪º╪▓┘à╪º┘å", "┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┘╛┘å┘ç╪º┘å", "╪¡╪º┌⌐┘à█î╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î", "┘å╪┤╪¬ ╪»╪º╪»┘ç AI", "┘à┘ê╪¼┘ê╪»█î ╪│╪º┘à╪º┘å┘çΓÇî┘ç╪º█î AI"],
    sources: [
      { name: "NIST ΓÇö AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
      { name: "NIST AIRC ΓÇö AI RMF Core", url: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/" },
      { name: "NIST ΓÇö Generative AI Profile", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" },
      { name: "Microsoft ΓÇö Shadow AI in Microsoft 365 admin center", url: "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/agent-shadow-ai?view=o365-worldwide" },
      { name: "Microsoft ΓÇö Prevent data leak to shadow AI", url: "https://learn.microsoft.com/en-us/purview/deploymentmodels/depmod-data-leak-shadow-ai-intro" },
    ],
    relatedLinks: [
      { title: "┘ç┘ê█î╪¬ ╪º█î╪¼┘å╪¬ ┘ê ┘à╪╣┘à╪º╪▒█î Zero Trust", href: "/blog/zero-trust-ai-agent-identity" },
      { title: "╪º╪▒╪▓█î╪º╪¿█î ╪º█î╪¼┘å╪¬ ┘ê KPI┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î", href: "/blog/ai-agent-evaluation-enterprise-kpis" },
      { title: "╪º┘à┘å█î╪¬ ╪º█î╪¼┘å╪¬ ╪»╪▒ ╪¿╪▒╪º╪¿╪▒ Prompt Injection", href: "/blog/ai-agent-prompt-injection-security" },
      { title: "╪│┘å╪¼╪┤ ╪¿┘ä┘ê╪║ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ╪│╪º╪▓┘à╪º┘å", href: "/ai-maturity-assessment" },
    ],
    faqs: [
      { question: "Shadow AI ┌å█î╪│╪¬╪ƒ", answer: "┘ç╪▒ ╪º╪¿╪▓╪º╪▒╪î ┘à╪»┘ä╪î API █î╪º ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┌⌐┘ç ╪«╪º╪▒╪¼ ╪º╪▓ ╪»█î╪»╪î ┘à╪º┘ä┌⌐█î╪¬ █î╪º ┌⌐┘å╪¬╪▒┘ä ╪▒╪│┘à█î ╪│╪º╪▓┘à╪º┘å ╪º╪│╪¬┘ü╪º╪»┘ç ╪┤┘ê╪»╪î Shadow AI ┘à╪¡╪│┘ê╪¿ ┘à█îΓÇî╪┤┘ê╪»." },
      { question: "╪ó█î╪º ╪¿╪º█î╪» ┘ç┘à┘ç ╪º╪¿╪▓╪º╪▒┘ç╪º█î Shadow AI ╪▒╪º ┘à╪│╪»┘ê╪» ┌⌐╪▒╪»╪ƒ", answer: "╪«█î╪▒. ╪º╪│╪¬┘ü╪º╪»┘çΓÇî┘ç╪º ╪¿╪º█î╪» ╪¿╪▒ ╪º╪│╪º╪│ ╪¡╪│╪º╪│█î╪¬ ╪»╪º╪»┘ç╪î ╪»╪º┘à┘å┘ç ╪»╪│╪¬╪▒╪│█î ┘ê ┘╛█î╪º┘à╪» ╪╖╪¿┘é┘çΓÇî╪¿┘å╪»█î ╪┤┘ê┘å╪» ┘ê ╪¿╪▒╪º█î ┘å█î╪º╪▓┘ç╪º█î ┘à╪╣╪¬╪¿╪▒╪î ╪¼╪º█î┌»╪▓█î┘å ╪º┘à┘å ┘ê ┘é╪º╪¿┘ä ╪º╪│╪¬┘ü╪º╪»┘ç ┘ü╪▒╪º┘ç┘à ╪┤┘ê╪»." },
      { question: "╪º┘ê┘ä█î┘å ╪º┘é╪»╪º┘à ╪¿╪▒╪º█î ┌⌐┘å╪¬╪▒┘ä Shadow AI ┌å█î╪│╪¬╪ƒ", answer: "╪│╪º╪«╪¬ ┘à┘ê╪¼┘ê╪»█î ╪¿╪»┘ê┘å ╪│╪▒╪▓┘å╪┤ ╪º╪▓ ╪º╪¿╪▓╪º╪▒┘ç╪º╪î ┌⌐╪º╪▒╪¿╪▒╪º┘å╪î ╪»╪º╪»┘çΓÇî┘ç╪º╪î ╪º╪¬╪╡╪º┘äΓÇî┘ç╪º ┘ê ┘à╪º┘ä┌⌐╪º┘å╪î ╪│┘╛╪│ ╪º┘ê┘ä┘ê█î╪¬ΓÇî╪¿┘å╪»█î ┘à┘ê╪º╪▒╪» ┘╛╪▒╪▒█î╪│┌⌐ ╪º╪│╪¬." },
      { question: "╪¬┘ü╪º┘ê╪¬ Shadow AI ┘ê Shadow IT ┌å█î╪│╪¬╪ƒ", answer: "Shadow AI ╪▓█î╪▒┘à╪¼┘à┘ê╪╣┘çΓÇî╪º█î ┘╛█î┌å█î╪»┘çΓÇî╪¬╪▒ ╪º╪▓ Shadow IT ╪º╪│╪¬╪¢ ╪▓█î╪▒╪º ╪╣┘ä╪º┘ê┘ç ╪¿╪▒ ┘å╪▒┘àΓÇî╪º┘ü╪▓╪º╪▒ ┘ê ╪»╪º╪»┘ç╪î ╪▒┘ü╪¬╪º╪▒ ╪º╪¡╪¬┘à╪º┘ä█î ┘à╪»┘ä ┘ê ╪º╪«╪¬█î╪º╪▒ ╪º┘é╪»╪º┘à ╪º█î╪¼┘å╪¬ ┘å█î╪▓ ╪¿╪º█î╪» ┘à╪»█î╪▒█î╪¬ ╪┤┘ê╪»." },
    ],
  },
  "ai-agent-memory-governance": {
    metaTitle: "╪¡╪º┘ü╪╕┘ç ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î╪¢ ╪º┘à┘å█î╪¬ ┘ê ╪¡╪▒█î┘à ╪«╪╡┘ê╪╡█î | nexation",
    metaDescription:
      "╪¡╪º┘ü╪╕┘ç ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ╪▒╪º ┌å┌»┘ê┘å┘ç ╪º┘à┘å ╪╖╪▒╪º╪¡█î ┌⌐┘å█î┘à╪ƒ ╪▒╪º┘ç┘å┘à╪º█î Scope╪î TTL╪î ╪¡╪▒█î┘à ╪«╪╡┘ê╪╡█î╪î ╪¡╪░┘ü ╪»╪º╪»┘ç ┘ê ┘à┘é╪º╪¿┘ä┘ç ╪¿╪º Memory Poisoning ╪▒╪º ╪¿╪«┘ê╪º┘å█î╪».",
    image: "https://nexation.ir/blog/ai-agent-memory-governance.png",
    imageAlt: "┘à╪¬╪«╪╡╪╡ ╪¡╪º┌⌐┘à█î╪¬ ╪»╪º╪»┘ç ╪»╪▒ ╪¡╪º┘ä ┘à╪»█î╪▒█î╪¬ ╪¡╪º┘ü╪╕┘ç ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ╪»╪▒ █î┌⌐ ┘à╪¡█î╪╖ ╪│╪º╪▓┘à╪º┘å█î",
    author: "╪¬█î┘à nexation",
    readingTime: "█▒█╖ ╪»┘é█î┘é┘ç ┘à╪╖╪º┘ä╪╣┘ç",
    keywords: ["╪¡╪º┘ü╪╕┘ç ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î", "╪º┘à┘å█î╪¬ ╪¡╪º┘ü╪╕┘ç AI Agent", "Memory Governance", "Memory Poisoning", "╪¡╪▒█î┘à ╪«╪╡┘ê╪╡█î ╪º█î╪¼┘å╪¬"],
    sources: [
      { name: "Microsoft ΓÇö Manage AI memory safety in agentic systems", url: "https://learn.microsoft.com/en-us/security/zero-trust/sfi/manage-agentic-memory-safety" },
      { name: "Microsoft ΓÇö AI memory and context poisoning", url: "https://learn.microsoft.com/en-us/security/zero-trust/catalog-ai-attack-techniques/ai-memory-context-poisoning" },
      { name: "Google Cloud ΓÇö Set up Memory Bank", url: "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/memory-bank/set-up" },
      { name: "OpenAI API ΓÇö Data controls and retention", url: "https://platform.openai.com/docs/models/default-usage-policies-by-endpoint" },
      { name: "NIST ΓÇö Generative AI Profile", url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence" },
    ],
    relatedLinks: [
      { title: "Shadow AI ╪»╪▒ ╪│╪º╪▓┘à╪º┘å╪¢ ┌⌐╪┤┘ü ╪º╪¿╪▓╪º╪▒┘ç╪º█î ┘╛┘å┘ç╪º┘å ┘ê ╪¡╪º┌⌐┘à█î╪¬", href: "/blog/shadow-ai-governance-enterprise" },
      { title: "┘ç┘ê█î╪¬ ╪º█î╪¼┘å╪¬ ┘ê ┘à╪╣┘à╪º╪▒█î Zero Trust", href: "/blog/zero-trust-ai-agent-identity" },
      { title: "Prompt Injection ┌å█î╪│╪¬╪ƒ ╪º┘à┘å█î╪¬ ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î", href: "/blog/ai-agent-prompt-injection-security" },
      { title: "MCP ┌å█î╪│╪¬╪ƒ ╪º╪¬╪╡╪º┘ä ╪º█î╪¼┘å╪¬ ╪¿┘ç ╪º╪¿╪▓╪º╪▒┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î", href: "/blog/model-context-protocol-mcp-enterprise-guide" },
      { title: "╪º╪▒╪▓█î╪º╪¿█î ╪º█î╪¼┘å╪¬╪¢ Evals ┘ê KPI┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î", href: "/blog/ai-agent-evaluation-enterprise-kpis" },
    ],
    faqs: [
      { question: "╪ó█î╪º ╪¬╪º╪▒█î╪«┌å┘ç ┌å╪¬ ┘ç┘à╪º┘å ╪¡╪º┘ü╪╕┘ç ╪º█î╪¼┘å╪¬ ╪º╪│╪¬╪ƒ", answer: "╪¬╪º╪▒█î╪«┌å┘ç ┌å╪¬ █î┌⌐█î ╪º╪▓ ┘à┘å╪º╪¿╪╣ ╪¡╪º┘ü╪╕┘ç ┌⌐┘ê╪¬╪º┘çΓÇî┘à╪»╪¬ ╪º╪│╪¬╪¢ ╪¡╪º┘ü╪╕┘ç ╪º█î╪¼┘å╪¬ ┘à█îΓÇî╪¬┘ê╪º┘å╪» ╪«┘ä╪º╪╡┘çΓÇî┘ç╪º╪î ╪¬╪▒╪¼█î╪¡╪º╪¬╪î ┘ê╪º┘é╪╣█î╪¬ΓÇî┘ç╪º ┘ê ┘ê╪╢╪╣█î╪¬ ┌»╪▒╪»╪┤ΓÇî┌⌐╪º╪▒ ╪▒╪º ╪¿╪▒╪º█î ╪º╪│╪¬┘ü╪º╪»┘çΓÇî┘ç╪º█î ╪¿╪╣╪»█î ┘å┌»┘ç ╪»╪º╪▒╪»." },
      { question: "Memory Poisoning ┌å█î╪│╪¬╪ƒ", answer: "╪ó┘ä┘ê╪»┌»█î ╪¡╪º┘ü╪╕┘ç ╪▓┘à╪º┘å█î ╪▒╪« ┘à█îΓÇî╪»┘ç╪» ┌⌐┘ç ╪»╪º╪»┘ç █î╪º ╪»╪│╪¬┘ê╪▒ ┘à╪«╪▒╪¿ ╪»╪▒ ╪¡╪º┘ü╪╕┘ç ┘à╪º┘å╪»┌»╪º╪▒ ╪┤┘ê╪» ┘ê ╪¿╪╣╪»╪º┘ï ╪▒┘ü╪¬╪º╪▒╪î ╪¿╪º╪▓█î╪º╪¿█î █î╪º ╪º┘å╪¬╪«╪º╪¿ ╪º╪¿╪▓╪º╪▒ ╪º█î╪¼┘å╪¬ ╪▒╪º ┘à┘å╪¡╪▒┘ü ┌⌐┘å╪»." },
      { question: "╪ó█î╪º Vector Store ╪¿╪º█î╪» ╪¿╪▒╪º█î ┘ç╪▒ ┌⌐╪º╪▒╪¿╪▒ ╪¼╪»╪º ╪¿╪º╪┤╪»╪ƒ", answer: "┘ä╪▓┘ê┘à█î ┘å╪»╪º╪▒╪» ╪▓█î╪▒╪│╪º╪«╪¬ ┘ü█î╪▓█î┌⌐█î ┌⌐╪º┘à┘ä╪º┘ï ╪¼╪»╪º ╪¿╪º╪┤╪»╪î ╪º┘à╪º Scope ┘ê ┌⌐┘å╪¬╪▒┘ä ╪»╪│╪¬╪▒╪│█î ╪¿╪º█î╪» ┘╛█î╪┤ ╪º╪▓ ╪¼╪│╪¬ΓÇî┘ê╪¼┘ê╪î ╪¼╪»╪º╪│╪º╪▓█î ┘é╪╖╪╣█î ┌⌐╪º╪▒╪¿╪▒ ┘ê Tenant ╪▒╪º ╪¬╪╢┘à█î┘å ┌⌐┘å╪»." },
      { question: "TTL ┘à┘å╪º╪│╪¿ ╪¿╪▒╪º█î ╪¡╪º┘ü╪╕┘ç ╪º█î╪¼┘å╪¬ ┌å┘é╪»╪▒ ╪º╪│╪¬╪ƒ", answer: "TTL ╪½╪º╪¿╪¬ ┘ê╪¼┘ê╪» ┘å╪»╪º╪▒╪»╪¢ ╪¿╪º█î╪» ╪¿╪▒ ╪º╪│╪º╪│ ┘ç╪»┘ü╪î ╪¡╪│╪º╪│█î╪¬╪î ╪º┘ä╪▓╪º┘à ┘é╪º┘å┘ê┘å█î ┘ê ┘å█î╪º╪▓ ╪¿┘ç ╪¬╪º╪▓┌»█î ╪¬╪╣█î█î┘å ╪┤┘ê╪» ┘ê ╪¡╪º┘ü╪╕┘ç ╪º╪│╪¬┘å╪¬╪º╪¼█î ┘à╪╣┘à┘ê┘ä╪º┘ï ╪╣┘à╪▒ ┌⌐┘ê╪¬╪º┘çΓÇî╪¬╪▒█î ╪»╪º╪┤╪¬┘ç ╪¿╪º╪┤╪»." },
    ],
  },
  "zero-trust-ai-agent-identity": {
    metaTitle: "┘ç┘ê█î╪¬ ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┘ê ┘à╪╣┘à╪º╪▒█î Zero Trust | nexation",
    metaDescription:
      "┌å┌»┘ê┘å┘ç ╪¿╪▒╪º█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┘ç┘ê█î╪¬ ┘à╪│╪¬┘é┘ä╪î ┘à╪¼┘ê╪▓ ┌⌐┘à█î┘å┘ç ┘ê ╪¬┘ê┌⌐┘å ┌⌐┘ê╪¬╪º┘çΓÇî╪╣┘à╪▒ ╪¿╪│╪º╪▓█î┘à╪ƒ ┘à╪╣┘à╪º╪▒█î Zero Trust ┘ê ┌å┌⌐ΓÇî┘ä█î╪│╪¬ Production ╪▒╪º ╪¿╪«┘ê╪º┘å█î╪».",
    image: "https://nexation.ir/blog/zero-trust-ai-agent-identity.png",
    imageAlt: "┌⌐╪º╪▒╪┤┘å╪º╪│ ╪º┘à┘å█î╪¬ ╪│╪º╪▓┘à╪º┘å█î ╪»╪▒ ╪¡╪º┘ä ┘╛╪º█î╪┤ ┘ç┘ê█î╪¬ ┘ê ╪»╪│╪¬╪▒╪│█î ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º█î ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
    author: "╪¬█î┘à nexation",
    readingTime: "█▒█╢ ╪»┘é█î┘é┘ç ┘à╪╖╪º┘ä╪╣┘ç",
    keywords: [
      "┘ç┘ê█î╪¬ ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
      "Zero Trust ╪¿╪▒╪º█î AI Agent",
      "┌⌐┘à╪¬╪▒█î┘å ╪»╪│╪¬╪▒╪│█î",
      "╪º┘à┘å█î╪¬ ╪º█î╪¼┘å╪¬ ╪│╪º╪▓┘à╪º┘å█î",
      "┘à╪¼┘ê╪▓ ╪º█î╪¼┘å╪¬",
      "Agent Identity",
    ],
    sources: [
      {
        name: "NIST ΓÇö SP 800-207 Zero Trust Architecture",
        url: "https://csrc.nist.gov/pubs/sp/800/207/final",
      },
      {
        name: "NIST ΓÇö SP 800-207A: Access Control in Cloud-Native Applications",
        url: "https://csrc.nist.gov/pubs/sp/800/207/a/final",
      },
      {
        name: "Microsoft ΓÇö Least privilege for AI agents",
        url: "https://learn.microsoft.com/en-us/security/zero-trust/sfi/least-privilege-for-ai-agents",
      },
      {
        name: "Microsoft ΓÇö Secure agents: Identity, access, and data protection",
        url: "https://learn.microsoft.com/en-us/agents/center-of-excellence/secure-agents",
      },
      {
        name: "OpenAI ΓÇö Workspace agents for business",
        url: "https://openai.com/business/workspace-agents/",
      },
    ],
    relatedLinks: [
      {
        title: "Shadow AI ╪»╪▒ ╪│╪º╪▓┘à╪º┘å╪¢ ┌⌐╪┤┘ü ╪º╪¿╪▓╪º╪▒┘ç╪º█î ┘╛┘å┘ç╪º┘å ┘ê ╪¡╪º┌⌐┘à█î╪¬",
        href: "/blog/shadow-ai-governance-enterprise",
      },
      {
        title: "Prompt Injection ┌å█î╪│╪¬╪ƒ ╪º┘à┘å█î╪¬ ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
        href: "/blog/ai-agent-prompt-injection-security",
      },
      {
        title: "MCP ┌å█î╪│╪¬╪ƒ ╪º╪¬╪╡╪º┘ä ╪º█î╪¼┘å╪¬ ╪¿┘ç ╪º╪¿╪▓╪º╪▒┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/model-context-protocol-mcp-enterprise-guide",
      },
      {
        title: "╪º╪▒╪▓█î╪º╪¿█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î╪¢ Evals ┘ê KPI┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/ai-agent-evaluation-enterprise-kpis",
      },
      {
        title: "╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┌å█î╪│╪¬╪ƒ ╪▒╪º┘ç┘å┘à╪º█î AI Agent ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/ai-agent-enterprise-guide",
      },
    ],
    faqs: [
      {
        question: "╪ó█î╪º ┘ç╪▒ ╪º█î╪¼┘å╪¬ ╪│╪º╪▓┘à╪º┘å█î ╪¿┘ç ┘ç┘ê█î╪¬ ┘à╪│╪¬┘é┘ä ┘å█î╪º╪▓ ╪»╪º╪▒╪»╪ƒ",
        answer:
          "╪¿┘ä┘ç. ┘ç┘ê█î╪¬ █î┌⌐╪¬╪º ╪º┘à┌⌐╪º┘å ╪º┘å╪¬╪│╪º╪¿ ╪╣┘à┘ä╪î ┘à╪¡╪»┘ê╪»┌⌐╪▒╪»┘å ┘à╪¼┘ê╪▓╪î ╪¿╪º╪▓╪¿█î┘å█î ┘ê ┘é╪╖╪╣ ╪»╪│╪¬╪▒╪│█î ┘ç┘à╪º┘å ╪º█î╪¼┘å╪¬ ╪▒╪º ╪¿╪»┘ê┘å ╪º╪«╪¬┘ä╪º┘ä ╪»╪▒ ╪│╪º█î╪▒ ╪╣╪º┘à┘äΓÇî┘ç╪º ┘ü╪▒╪º┘ç┘à ┘à█îΓÇî┌⌐┘å╪».",
      },
      {
        question: "╪ó█î╪º ┘å┘ê╪┤╪¬┘å ┘à╪¡╪»┘ê╪»█î╪¬ ╪»╪▒ Prompt ╪¿╪▒╪º█î ┌⌐┘å╪¬╪▒┘ä ╪»╪│╪¬╪▒╪│█î ┌⌐╪º┘ü█î ╪º╪│╪¬╪ƒ",
        answer:
          "╪«█î╪▒. Prompt ╪▒╪º┘ç┘å┘à╪º█î ╪▒┘ü╪¬╪º╪▒ ┘à╪»┘ä ╪º╪│╪¬╪¢ ┘à╪¼┘ê╪▓ ╪¿╪º█î╪» ╪»╪▒ Gateway╪î Policy Engine █î╪º ╪│╪º┘à╪º┘å┘ç ┘à┘é╪╡╪» ╪¿┘çΓÇî╪╡┘ê╪▒╪¬ ┘é╪╖╪╣█î ╪º╪¼╪▒╪º ╪┤┘ê╪».",
      },
      {
        question: "╪¬┘ü╪º┘ê╪¬ ┘ç┘ê█î╪¬ ┘à╪│╪¬┘é┘ä ┘ê On-Behalf-Of ┌å█î╪│╪¬╪ƒ",
        answer:
          "╪»╪▒ ┘ç┘ê█î╪¬ ┘à╪│╪¬┘é┘ä╪î ╪╣╪º┘à┘ä ╪¿╪º ╪º╪«╪¬█î╪º╪▒ ╪│╪▒┘ê█î╪│ ╪«┘ê╪» ╪╣┘à┘ä ┘à█îΓÇî┌⌐┘å╪»╪¢ ╪»╪▒ On-Behalf-Of╪î ╪º╪«╪¬█î╪º╪▒ ╪º╪▓ ┌⌐╪º╪▒╪¿╪▒ ┘à█îΓÇî╪ó█î╪» ┘ê ┘à╪¡╪»┘ê╪»█î╪¬ΓÇî┘ç╪º█î ┘ç┘à╪º┘å ┌⌐╪º╪▒╪¿╪▒ ╪¿╪º█î╪» ╪¡┘ü╪╕ ╪┤┘ê╪».",
      },
      {
        question: "┌⌐╪»╪º┘à ╪╣┘à┘ä█î╪º╪¬ ╪º█î╪¼┘å╪¬ ╪¿┘ç ╪¬╪ú█î█î╪» ╪º┘å╪│╪º┘å█î ┘å█î╪º╪▓ ╪»╪º╪▒╪»╪ƒ",
        answer:
          "╪º╪▒╪│╪º┘ä ╪¿█î╪▒┘ê┘å█î╪î ┘╛╪▒╪»╪º╪«╪¬╪î ╪¡╪░┘ü╪î ╪¬╪║█î█î╪▒ ┘à╪¼┘ê╪▓╪î ╪º┘å╪¬╪┤╪º╪▒ ╪╣┘à┘ê┘à█î ┘ê ╪º┘å╪¬┘é╪º┘ä ╪»╪º╪»┘ç ╪¡╪│╪º╪│ ╪¿╪º█î╪» ┘à╪¬┘å╪º╪│╪¿ ╪¿╪º ╪▒█î╪│┌⌐ ╪»╪▒ ┘å┘é╪╖┘ç ╪º╪½╪▒ ╪¬╪ú█î█î╪» ╪┤┘ê┘å╪».",
      },
    ],
  },
  "model-context-protocol-mcp-enterprise-guide": {
    metaTitle: "MCP ┌å█î╪│╪¬╪ƒ ╪º╪¬╪╡╪º┘ä ╪º█î╪¼┘å╪¬ ╪¿┘ç ╪º╪¿╪▓╪º╪▒┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î | nexation",
    metaDescription:
      "┘╛╪▒┘ê╪¬┌⌐┘ä MCP ┌å┌»┘ê┘å┘ç ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ╪▒╪º ╪¿┘ç ╪»╪º╪»┘ç ┘ê ╪º╪¿╪▓╪º╪▒┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î ┘à╪¬╪╡┘ä ┘à█îΓÇî┌⌐┘å╪»╪ƒ ┘à╪╣┘à╪º╪▒█î╪î ┌⌐╪º╪▒╪¿╪▒╪»╪î ╪º┘à┘å█î╪¬ ┘ê ┘å┘é╪┤┘ç ╪▒╪º┘ç ╪º╪│╪¬┘é╪▒╪º╪▒ MCP ╪▒╪º ╪¿╪«┘ê╪º┘å█î╪».",
    image: "https://nexation.ir/blog/model-context-protocol-mcp-enterprise-guide.png",
    imageAlt: "╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┘à╪¬╪╡┘ä ╪º╪▓ ╪╖╪▒█î┘é MCP ╪¿┘ç ╪»╪º╪»┘çΓÇî┘ç╪º ┘ê ╪º╪¿╪▓╪º╪▒┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
    author: "╪¬█î┘à nexation",
    readingTime: "█▒█╢ ╪»┘é█î┘é┘ç ┘à╪╖╪º┘ä╪╣┘ç",
    keywords: [
      "┘╛╪▒┘ê╪¬┌⌐┘ä MCP",
      "MCP ┌å█î╪│╪¬",
      "Model Context Protocol",
      "╪º╪¬╪╡╪º┘ä ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
      "╪│╪▒┘ê╪▒ MCP",
      "MCP ╪│╪º╪▓┘à╪º┘å█î",
    ],
    sources: [
      {
        name: "Model Context Protocol ΓÇö Architecture",
        url: "https://modelcontextprotocol.io/specification/2025-06-18/architecture",
      },
      {
        name: "Model Context Protocol ΓÇö 2026-07-28 Specification",
        url: "https://blog.modelcontextprotocol.io/posts/2026-07-28/",
      },
      {
        name: "Anthropic ΓÇö Introducing the Model Context Protocol",
        url: "https://www.anthropic.com/news/model-context-protocol",
      },
      {
        name: "OpenAI Agents SDK ΓÇö Model context protocol",
        url: "https://openai.github.io/openai-agents-python/mcp/",
      },
      {
        name: "OWASP ΓÇö MCP Security Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/MCP_Security_Cheat_Sheet.html",
      },
      {
        name: "Microsoft Learn ΓÇö Secure your Azure MCP Server deployment",
        url: "https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/security",
      },
    ],
    relatedLinks: [
      {
        title: "╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┌å█î╪│╪¬╪ƒ ╪▒╪º┘ç┘å┘à╪º█î AI Agent ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/ai-agent-enterprise-guide",
      },
      {
        title: "Prompt Injection ┌å█î╪│╪¬╪ƒ ╪º┘à┘å█î╪¬ ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
        href: "/blog/ai-agent-prompt-injection-security",
      },
      {
        title: "╪º╪▒╪▓█î╪º╪¿█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î╪¢ Evals ┘ê KPI┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/ai-agent-evaluation-enterprise-kpis",
      },
      {
        title: "╪│╪º╪«╪¬╪º╪▒ ╪│╪º╪▓┘à╪º┘å█î ┘ä┘ê╪▓█îΓÇî╪┤┌⌐┘ä ┘ê ┘å┘é╪┤ ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º",
        href: "/blog/diamond-shaped-agentic-organization",
      },
    ],
    faqs: [
      {
        question: "╪ó█î╪º MCP ╪¼╪º█î┌»╪▓█î┘å API ┘à█îΓÇî╪┤┘ê╪»╪ƒ",
        answer:
          "╪«█î╪▒. ╪│╪▒┘ê╪▒ MCP ┘à╪╣┘à┘ê┘ä╪º┘ï ╪º╪▓ API┘ç╪º█î ┘à┘ê╪¼┘ê╪» ╪º╪│╪¬┘ü╪º╪»┘ç ┘à█îΓÇî┌⌐┘å╪» ┘ê ╪ó┘åΓÇî┘ç╪º ╪▒╪º ╪¿╪º ┘é╪▒╪º╪▒╪»╪º╪»█î ╪º╪│╪¬╪º┘å╪»╪º╪▒╪» ╪¿╪▒╪º█î ╪¿╪▒┘å╪º┘à┘çΓÇî┘ç╪º ┘ê ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º█î ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ╪º╪▒╪º╪ª┘ç ┘à█îΓÇî╪»┘ç╪».",
      },
      {
        question: "╪ó█î╪º MCP ╪¼╪º█î┌»╪▓█î┘å RAG ╪º╪│╪¬╪ƒ",
        answer:
          "╪«█î╪▒. RAG ╪▒┘ê╪┤ ╪¿╪º╪▓█î╪º╪¿█î ╪º╪╖┘ä╪º╪╣╪º╪¬ ╪º╪│╪¬╪¢ MCP ┘à█îΓÇî╪¬┘ê╪º┘å╪» ╪»╪│╪¬╪▒╪│█î ╪¿┘ç ┘à┘å╪¿╪╣ ╪¼╪│╪¬ΓÇî┘ê╪¼┘ê █î╪º ╪º╪¿╪▓╪º╪▒ RAG ╪▒╪º ╪º╪│╪¬╪º┘å╪»╪º╪▒╪» ┌⌐┘å╪».",
      },
      {
        question: "╪ó█î╪º ┘à█îΓÇî╪¬┘ê╪º┘å ╪¿┘ç ┘ç╪▒ ╪│╪▒┘ê╪▒ ╪╣┘à┘ê┘à█î MCP ╪º╪╣╪¬┘à╪º╪» ┌⌐╪▒╪»╪ƒ",
        answer:
          "╪«█î╪▒. ┘à┘å╪┤╪ú╪î ┌⌐╪»╪î ┘ê╪º╪¿╪│╪¬┌»█îΓÇî┘ç╪º╪î ╪▒┘ü╪¬╪º╪▒ ╪┤╪¿┌⌐┘ç ┘ê ╪│╪╖╪¡ ╪»╪│╪¬╪▒╪│█î ╪│╪▒┘ê╪▒ ╪¿╪º█î╪» ╪¿╪▒╪▒╪│█î ┘ê ┘à╪¼┘ê╪▓ ╪ó┘å ╪¿┘ç ╪¡╪»╪º┘é┘ä ┘ä╪º╪▓┘à ┘à╪¡╪»┘ê╪» ╪┤┘ê╪».",
      },
      {
        question: "╪¿╪▒╪º█î ╪┤╪▒┘ê╪╣ ┘╛╪▒┘ê┌ÿ┘ç MCP ┌å┘å╪» Tool ┌⌐╪º┘ü█î ╪º╪│╪¬╪ƒ",
        answer:
          "╪¿╪▒╪º█î █î┌⌐ ┘╛╪º█î┘ä┘ê╪¬ ╪│╪º╪▓┘à╪º┘å█î╪î ╪»┘ê █î╪º ╪│┘ç ╪º╪¿╪▓╪º╪▒ ┘à╪¡╪»┘ê╪» ┘ê ┘╛╪▒┌⌐╪º╪▒╪¿╪▒╪» ╪¿┘ç╪¬╪▒ ╪º╪▓ █î┌⌐ ┌⌐╪º╪¬╪º┘ä┘ê┌» ╪¿╪▓╪▒┌» ╪º╪│╪¬╪¢ ╪│┘╛╪│ ╪»╪º┘à┘å┘ç ╪¿╪▒ ╪º╪│╪º╪│ ┘å╪¬╪º█î╪¼ ┘ê╪º┘é╪╣█î ┌»╪│╪¬╪▒╪┤ ┘à█îΓÇî█î╪º╪¿╪».",
      },
    ],
  },
  "ai-agent-evaluation-enterprise-kpis": {
    metaTitle: "╪º╪▒╪▓█î╪º╪¿█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î╪¢ Evals ┘ê KPI ╪│╪º╪▓┘à╪º┘å█î | nexation",
    metaDescription:
      "┌å┌»┘ê┘å┘ç ╪ó┘à╪º╪»┌»█î Production ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ╪▒╪º ╪¿╪│┘å╪¼█î┘à╪ƒ ╪╖╪▒╪º╪¡█î Evals╪î ╪¬╪¡┘ä█î┘ä ┘à╪│█î╪▒ ╪º╪¼╪▒╪º╪î KPI┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î ┘ê ┘à╪╣█î╪º╪▒┘ç╪º█î Go/No-Go ╪▒╪º ╪¿█î╪º┘à┘ê╪▓█î╪».",
    image: "https://nexation.ir/blog/ai-agent-evaluation-enterprise-kpis.png",
    imageAlt: "╪¬█î┘à ╪│╪º╪▓┘à╪º┘å█î ╪»╪▒ ╪¡╪º┘ä ╪╖╪▒╪º╪¡█î ╪ó╪▓┘à┘ê┘åΓÇî┘ç╪º ┘ê ╪┤╪º╪«╪╡ΓÇî┘ç╪º█î ╪º╪▒╪▓█î╪º╪¿█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
    author: "╪¬█î┘à nexation",
    readingTime: "█▒█╡ ╪»┘é█î┘é┘ç ┘à╪╖╪º┘ä╪╣┘ç",
    keywords: [
      "╪º╪▒╪▓█î╪º╪¿█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
      "AI Agent Evals",
      "KPI ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
      "╪¬╪│╪¬ ╪º█î╪¼┘å╪¬ ╪│╪º╪▓┘à╪º┘å█î",
      "┘╛╪º█î╪┤ ╪º█î╪¼┘å╪¬ ╪»╪▒ Production",
    ],
    sources: [
      {
        name: "NIST ΓÇö AI Risk Management Framework Core",
        url: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/",
      },
      {
        name: "Anthropic ΓÇö Demystifying evals for AI agents",
        url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
      },
      {
        name: "OpenAI ΓÇö How evals drive the next chapter in AI for businesses",
        url: "https://openai.com/index/evals-drive-next-chapter-of-ai/",
      },
      {
        name: "Google Cloud ΓÇö A methodical approach to agent evaluation",
        url: "https://cloud.google.com/blog/topics/developers-practitioners/a-methodical-approach-to-agent-evaluation",
      },
      {
        name: "Google Cloud ΓÇö KPIs that matter for production AI agents",
        url: "https://cloud.google.com/transform/the-kpis-that-actually-matter-for-production-ai-agents",
      },
    ],
    relatedLinks: [
      {
        title: "╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┌å█î╪│╪¬╪ƒ ╪▒╪º┘ç┘å┘à╪º█î AI Agent ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/ai-agent-enterprise-guide",
      },
      {
        title: "Prompt Injection ┌å█î╪│╪¬╪ƒ ╪º┘à┘å█î╪¬ ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
        href: "/blog/ai-agent-prompt-injection-security",
      },
      {
        title: "╪│╪º╪«╪¬╪º╪▒ ╪│╪º╪▓┘à╪º┘å█î ┘ä┘ê╪▓█îΓÇî╪┤┌⌐┘ä ┘ê ┘å┘é╪┤ ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º",
        href: "/blog/diamond-shaped-agentic-organization",
      },
      {
        title: "MCP ┌å█î╪│╪¬╪ƒ ╪º╪¬╪╡╪º┘ä ╪º█î╪¼┘å╪¬ ╪¿┘ç ╪º╪¿╪▓╪º╪▒┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/model-context-protocol-mcp-enterprise-guide",
      },
    ],
    faqs: [
      {
        question: "┌å┘å╪» ╪│┘å╪º╪▒█î┘ê ╪¿╪▒╪º█î ╪┤╪▒┘ê╪╣ Eval ┌⌐╪º┘ü█î ╪º╪│╪¬╪ƒ",
        answer:
          "╪¿╪º ┘à╪¼┘à┘ê╪╣┘çΓÇî╪º█î ┌⌐┘ê┌å┌⌐ ╪º┘à╪º ┘å┘à╪º█î┘å╪»┘ç ╪º╪▓ ┌⌐╪º╪▒┘ç╪º█î ┘ê╪º┘é╪╣█î╪î ┘à┘ê╪º╪▒╪» ┘à╪▒╪▓█î ┘ê ╪«╪╖╪º┘ç╪º█î ┘╛╪▒╪º╪½╪▒ ╪┤╪▒┘ê╪╣ ┌⌐┘å█î╪» ┘ê ╪ó┘å ╪▒╪º ╪¿╪º ╪▒╪«╪»╪º╪»┘ç╪º█î Production ┌»╪│╪¬╪▒╪┤ ╪»┘ç█î╪».",
      },
      {
        question: "╪ó█î╪º LLM ┘à█îΓÇî╪¬┘ê╪º┘å╪» ╪«┘ê╪»╪┤ ╪▒╪º ╪º╪▒╪▓█î╪º╪¿█î ┌⌐┘å╪»╪ƒ",
        answer:
          "╪¿╪▒╪º█î ╪¿╪▒╪«█î ┘à╪╣█î╪º╪▒┘ç╪º█î ┌⌐█î┘ü█î ╪¿┘ä┘ç╪î ╪º┘à╪º ╪»╪º┘ê╪▒ ┘à╪»┘ä ╪¿╪º█î╪» rubric ╪▒┘ê╪┤┘å ╪»╪º╪┤╪¬┘ç ╪¿╪º╪┤╪» ┘ê ╪¿╪º ┘é╪╢╪º┘ê╪¬ ┘à╪¬╪«╪╡╪╡ ╪º┘å╪│╪º┘å█î ┌⌐╪º┘ä█î╪¿╪▒┘ç ╪┤┘ê╪».",
      },
      {
        question: "╪¬┘ü╪º┘ê╪¬ KPI ┘ê Eval ┌å█î╪│╪¬╪ƒ",
        answer:
          "Eval ╪▒┘ü╪¬╪º╪▒ ╪º█î╪¼┘å╪¬ ╪▒╪º ╪»╪▒ ╪│┘å╪º╪▒█î┘ê┘ç╪º█î ┌⌐┘å╪¬╪▒┘äΓÇî╪┤╪»┘ç ┘à█îΓÇî╪│┘å╪¼╪»╪¢ KPI ╪╣┘à┘ä┌⌐╪▒╪» ┘ê╪º┘é╪╣█î ┘ê ╪º╪½╪▒ ┌⌐╪│╪¿ΓÇî┘ê┌⌐╪º╪▒█î ╪ó┘å ╪▒╪º ╪»╪▒ ╪╖┘ê┘ä ╪▓┘à╪º┘å ╪»┘å╪¿╪º┘ä ┘à█îΓÇî┌⌐┘å╪».",
      },
      {
        question: "┌å┘ç ╪▓┘à╪º┘å█î ╪¿╪º█î╪» ╪º█î╪¼┘å╪¬ ╪▒╪º ┘à╪¬┘ê┘é┘ü ┌⌐╪▒╪»╪ƒ",
        answer:
          "╪╣╪¿┘ê╪▒ ╪«╪╖╪º█î ╪¿╪¡╪▒╪º┘å█î ╪º╪▓ ╪ó╪│╪¬╪º┘å┘ç╪î ┘å╪¿┘ê╪» trace ┌⌐╪º┘ü█î╪î ┘ç╪▓█î┘å┘ç █î╪º latency ╪║█î╪▒╪╣╪º╪»█î ┘ê ╪▒┘ü╪¬╪º╪▒ ┌⌐┘å╪¬╪▒┘äΓÇî┘å╪┤╪»┘ç╪î ╪º╪▓ ┘à╪╣█î╪º╪▒┘ç╪º█î ╪¬┘ê┘é┘ü ┘ç╪│╪¬┘å╪».",
      },
    ],
  },
  "ai-agent-prompt-injection-security": {
    metaTitle: "Prompt Injection ┌å█î╪│╪¬╪ƒ ╪º┘à┘å█î╪¬ ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î | nexation",
    metaDescription:
      "Prompt Injection ┌å┌»┘ê┘å┘ç ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ╪▒╪º ┘ü╪▒█î╪¿ ┘à█îΓÇî╪»┘ç╪»╪ƒ ╪¬┘ü╪º┘ê╪¬ ╪¡┘à┘ä┘ç ┘à╪│╪¬┘é█î┘à ┘ê ╪║█î╪▒┘à╪│╪¬┘é█î┘à ┘ê ╪▒╪º┘ç┌⌐╪º╪▒┘ç╪º█î ┘à╪¡╪º┘ü╪╕╪¬ ╪º╪▓ ╪º╪╖┘ä╪º╪╣╪º╪¬ ╪│╪º╪▓┘à╪º┘å ╪▒╪º ╪¿╪«┘ê╪º┘å█î╪».",
    image: "https://nexation.ir/blog/ai-agent-prompt-injection-security.png",
    imageAlt: "┌⌐╪º╪▒╪┤┘å╪º╪│╪º┘å ╪º┘à┘å█î╪¬ ╪│╪º█î╪¿╪▒█î ╪»╪▒ ╪¡╪º┘ä ╪¿╪▒╪▒╪│█î █î┌⌐ ╪▒╪«╪»╪º╪» ┘à╪▒╪¿┘ê╪╖ ╪¿┘ç ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
    author: "╪¬█î┘à nexation",
    readingTime: "█▒█▓ ╪»┘é█î┘é┘ç ┘à╪╖╪º┘ä╪╣┘ç",
    keywords: [
      "Prompt Injection",
      "╪º┘à┘å█î╪¬ ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
      "╪º┘à┘å█î╪¬ AI Agent",
      "╪¬╪▓╪▒█î┘é ╪»╪│╪¬┘ê╪▒",
      "┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ╪│╪º╪▓┘à╪º┘å█î",
    ],
    sources: [
      {
        name: "NIST ΓÇö Artificial Intelligence Risk Management Framework: Generative AI Profile",
        url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf",
      },
      {
        name: "NIST ΓÇö Strengthening AI Agent Hijacking Evaluations",
        url: "https://www.nist.gov/news-events/news/2025/01/technical-blog-strengthening-ai-agent-hijacking-evaluations",
      },
      {
        name: "Anthropic ΓÇö Mitigating the Risk of Prompt Injections in Browser Use",
        url: "https://www.anthropic.com/research/prompt-injection-defenses",
      },
      {
        name: "OpenAI ΓÇö A Practical Guide to Building AI Agents",
        url: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/",
      },
    ],
    relatedLinks: [
      {
        title: "╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┌å█î╪│╪¬╪ƒ ╪▒╪º┘ç┘å┘à╪º█î ┌⌐╪º╪▒╪¿╪▒╪» AI Agent ╪»╪▒ ╪│╪º╪▓┘à╪º┘åΓÇî┘ç╪º",
        href: "/blog/ai-agent-enterprise-guide",
      },
      {
        title: "╪º╪▒╪▓█î╪º╪¿█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î╪¢ Evals ┘ê KPI┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/ai-agent-evaluation-enterprise-kpis",
      },
      {
        title: "╪│╪º╪«╪¬╪º╪▒ ╪│╪º╪▓┘à╪º┘å█î ┘ä┘ê╪▓█îΓÇî╪┤┌⌐┘ä ┘ê ┘å┘é╪┤ ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º",
        href: "/blog/diamond-shaped-agentic-organization",
      },
      {
        title: "MCP ┌å█î╪│╪¬╪ƒ ╪º╪¬╪╡╪º┘ä ╪º█î╪¼┘å╪¬ ╪¿┘ç ╪º╪¿╪▓╪º╪▒┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/model-context-protocol-mcp-enterprise-guide",
      },
    ],
  },
  "ai-agent-enterprise-guide": {
    metaTitle: "╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┌å█î╪│╪¬╪ƒ ╪▒╪º┘ç┘å┘à╪º█î AI Agent ╪│╪º╪▓┘à╪º┘å█î | nexation",
    metaDescription:
      "╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┌å┌»┘ê┘å┘ç ╪¿╪º ┘à╪»┘ä╪î ╪º╪¿╪▓╪º╪▒ ┘ê ╪»╪º╪»┘ç ┘ê╪╕╪º█î┘ü ┌å┘å╪»┘à╪▒╪¡┘ä┘çΓÇî╪º█î ╪▒╪º ╪º┘å╪¼╪º┘à ┘à█îΓÇî╪»┘ç╪»╪ƒ ┘à╪╣┘à╪º╪▒█î╪î ┌⌐╪º╪▒╪¿╪▒╪»┘ç╪º╪î ╪º┘à┘å█î╪¬ ┘ê ┘à╪│█î╪▒ ╪º╪│╪¬┘é╪▒╪º╪▒ AI Agent ╪│╪º╪▓┘à╪º┘å█î ╪▒╪º ╪¿╪«┘ê╪º┘å█î╪».",
    image: "https://nexation.ir/blog/ai-agent-enterprise-guide.png",
    imageAlt: "╪¬╪╡┘ê█î╪▒ ┘à┘ü┘ç┘ê┘à█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┘à╪¬╪╡┘ä ╪¿┘ç ╪»╪º╪»┘ç╪î ╪º╪│┘å╪º╪»╪î ╪¬╪¡┘ä█î┘ä ┘ê ╪º╪¿╪▓╪º╪▒┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
    author: "╪¬█î┘à nexation",
    readingTime: "█▒█▓ ╪»┘é█î┘é┘ç ┘à╪╖╪º┘ä╪╣┘ç",
    keywords: [
      "╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
      "AI Agent",
      "╪º█î╪¼┘å╪¬ ╪│╪º╪▓┘à╪º┘å█î",
      "╪╣╪º┘à┘ä ┘ç┘ê╪┤┘à┘å╪»",
      "╪º╪¬┘ê┘à╪º╪│█î┘ê┘å ╪│╪º╪▓┘à╪º┘å█î",
      "┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ╪│╪º╪▓┘à╪º┘å█î",
    ],
    sources: [
      {
        name: "OpenAI ΓÇö A practical guide to building AI agents",
        url: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/",
      },
      {
        name: "Anthropic ΓÇö Building effective agents",
        url: "https://www.anthropic.com/engineering/building-effective-agents",
      },
      {
        name: "Google Cloud ΓÇö What are AI agents?",
        url: "https://cloud.google.com/discover/what-are-ai-agents",
      },
      {
        name: "Google Search Central ΓÇö Creating helpful, reliable, people-first content",
        url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
      },
    ],
    relatedLinks: [
      {
        title: "╪º┘à┘å█î╪¬ Prompt Injection ╪»╪▒ ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º█î ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
        href: "/blog/ai-agent-prompt-injection-security",
      },
      {
        title: "╪º╪▒╪▓█î╪º╪¿█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î╪¢ Evals ┘ê KPI┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/ai-agent-evaluation-enterprise-kpis",
      },
      {
        title: "╪│╪º╪«╪¬╪º╪▒ ╪│╪º╪▓┘à╪º┘å█î ┘ä┘ê╪▓█îΓÇî╪┤┌⌐┘ä ┘ê ┘å┘é╪┤ ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º",
        href: "/blog/diamond-shaped-agentic-organization",
      },
      {
        title: "MCP ┌å█î╪│╪¬╪ƒ ╪º╪¬╪╡╪º┘ä ╪º█î╪¼┘å╪¬ ╪¿┘ç ╪º╪¿╪▓╪º╪▒┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/model-context-protocol-mcp-enterprise-guide",
      },
    ],
  },
  "diamond-shaped-agentic-organization": {
    metaTitle: "╪│╪º╪«╪¬╪º╪▒ ╪│╪º╪▓┘à╪º┘å█î ┘ä┘ê╪▓█îΓÇî╪┤┌⌐┘ä ┘ê ┘å┘é╪┤ ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º | nexation",
    metaDescription:
      "╪│╪º╪«╪¬╪º╪▒ ╪│╪º╪▓┘à╪º┘å█î ┘ä┘ê╪▓█îΓÇî╪┤┌⌐┘ä ┌å┌»┘ê┘å┘ç ╪¿╪º ╪¬█î┘àΓÇî┘ç╪º█î ╪º┘å╪│╪º┘å ┘ê ╪º█î╪¼┘å╪¬ ╪│╪º╪«╪¬┘ç ┘à█îΓÇî╪┤┘ê╪»╪ƒ ┘å┘é╪┤ ┘ä╪º█î┘çΓÇî┘ç╪º╪î ┘à╪▓╪º█î╪º╪î ╪▒█î╪│┌⌐ΓÇî┘ç╪º ┘ê ┘å┘é╪┤┘ç ╪▒╪º┘ç ╪╖╪▒╪º╪¡█î ╪│╪º╪▓┘à╪º┘å ╪╣╪º┘à┘äΓÇî┘à╪¡┘ê╪▒ ╪▒╪º ╪¿╪«┘ê╪º┘å█î╪».",
    image: "https://nexation.ir/blog/diamond-shaped-agentic-organization.png",
    imageAlt: "╪│╪º╪«╪¬╪º╪▒ ╪│╪º╪▓┘à╪º┘å█î ┘ä┘ê╪▓█îΓÇî╪┤┌⌐┘ä ╪¿╪º ┘à╪»█î╪▒╪º┘å╪î ┘à╪¬╪«╪╡╪╡╪º┘å ╪º┘å╪│╪º┘å█î ┘ê ╪┤╪¿┌⌐┘ç ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º█î ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
    author: "╪¬█î┘à nexation",
    readingTime: "█▒█┤ ╪»┘é█î┘é┘ç ┘à╪╖╪º┘ä╪╣┘ç",
    keywords: [
      "╪│╪º╪«╪¬╪º╪▒ ╪│╪º╪▓┘à╪º┘å█î ┘ä┘ê╪▓█î ╪┤┌⌐┘ä",
      "╪│╪º╪▓┘à╪º┘å ╪╣╪º┘à┘äΓÇî┘à╪¡┘ê╪▒",
      "╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ╪»╪▒ ╪│╪º╪▓┘à╪º┘å",
      "╪¬█î┘à ╪º┘å╪│╪º┘å ┘ê ╪º█î╪¼┘å╪¬",
      "╪│╪º╪«╪¬╪º╪▒ ╪│╪º╪▓┘à╪º┘å█î ╪ó█î┘å╪»┘ç",
      "Agentic Organization",
    ],
    sources: [
      {
        name: "PwC ΓÇö Agentic AI workforce redesign",
        url: "https://www.pwc.com/us/en/tech-effect/ai-analytics/agentic-ai-workforce-redesign.html",
      },
      {
        name: "Microsoft ΓÇö 2025 Work Trend Index: The Frontier Firm",
        url: "https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born",
      },
      {
        name: "McKinsey ΓÇö The agentic organization",
        url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-agentic-organization-contours-of-the-next-paradigm-for-the-ai-era",
      },
      {
        name: "Deloitte ΓÇö Rethinking operating models for humans with agents",
        url: "https://www.deloitte.com/us/en/insights/topics/talent/operating-models-for-humans-ai-agents.html",
      },
      {
        name: "NIST ΓÇö AI Risk Management Framework Playbook: Govern",
        url: "https://airc.nist.gov/airmf-resources/playbook/govern/",
      },
    ],
    relatedLinks: [
      {
        title: "╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┌å█î╪│╪¬╪ƒ ╪▒╪º┘ç┘å┘à╪º█î ┌⌐╪º╪▒╪¿╪▒╪» AI Agent ╪»╪▒ ╪│╪º╪▓┘à╪º┘åΓÇî┘ç╪º",
        href: "/blog/ai-agent-enterprise-guide",
      },
      {
        title: "╪º╪▒╪▓█î╪º╪¿█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î╪¢ Evals ┘ê KPI┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/ai-agent-evaluation-enterprise-kpis",
      },
      {
        title: "╪º┘à┘å█î╪¬ Prompt Injection ╪»╪▒ ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º█î ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
        href: "/blog/ai-agent-prompt-injection-security",
      },
      {
        title: "MCP ┌å█î╪│╪¬╪ƒ ╪º╪¬╪╡╪º┘ä ╪º█î╪¼┘å╪¬ ╪¿┘ç ╪º╪¿╪▓╪º╪▒┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
        href: "/blog/model-context-protocol-mcp-enterprise-guide",
      },
    ],
    faqs: [
      {
        question: "╪ó█î╪º ╪│╪º╪▓┘à╪º┘å ┘ä┘ê╪▓█îΓÇî╪┤┌⌐┘ä █î╪╣┘å█î ╪¼╪º█î┌»╪▓█î┘å█î ┌⌐╪º╪▒┌⌐┘å╪º┘å ╪¿╪º ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î╪ƒ",
        answer:
          "╪«█î╪▒. ╪º█î┘å ┘à╪»┘ä ╪»╪▒╪¿╪º╪▒┘ç ╪¬╪║█î█î╪▒ ╪¬╪▒┌⌐█î╪¿ ┌⌐╪º╪▒ ╪º╪│╪¬╪¢ ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º ╪¿╪«╪┤█î ╪º╪▓ ╪º╪¼╪▒╪º ╪▒╪º ╪º┘å╪¼╪º┘à ┘à█îΓÇî╪»┘ç┘å╪» ┘ê ╪º┘å╪│╪º┘åΓÇî┘ç╪º ╪▒┘ê█î ┘ç╪»┘üΓÇî┌»╪░╪º╪▒█î╪î ┘é╪╢╪º┘ê╪¬╪î ╪º╪▒╪¬╪¿╪º╪╖╪î ╪¡┘ä ╪º╪│╪¬╪½┘å╪º ┘ê ┘╛╪º╪│╪«ΓÇî┌»┘ê█î█î ┘à╪¬┘à╪▒┌⌐╪▓ ┘à█îΓÇî╪┤┘ê┘å╪».",
      },
      {
        question: "╪ó█î╪º ┘ç┘à┘ç ╪│╪º╪▓┘à╪º┘åΓÇî┘ç╪º ╪¿╪º█î╪» ┘ä┘ê╪▓█îΓÇî╪┤┌⌐┘ä ╪┤┘ê┘å╪»╪ƒ",
        answer:
          "╪«█î╪▒. ╪│╪º╪«╪¬╪º╪▒ ┘à┘å╪º╪│╪¿ ╪¿┘ç ╪╡┘å╪╣╪¬╪î ╪▒█î╪│┌⌐╪î ┘å┘ê╪╣ ╪»╪º┘å╪┤╪î ╪º┘ç┘à█î╪¬ ╪ó┘à┘ê╪▓╪┤ ┘å█î╪▒┘ê┘ç╪º█î ╪¼┘ê╪º┘å ┘ê ╪¿┘ä┘ê╪║ ╪»╪º╪»┘ç ╪¿╪│╪¬┌»█î ╪»╪º╪▒╪» ┘ê ┌»╪º┘ç█î ┘à╪»┘ä ╪│╪º╪╣╪¬ΓÇî╪┤┘å█î █î╪º ╪┤╪¿┌⌐┘çΓÇî╪º█î ┘à┘å╪º╪│╪¿ΓÇî╪¬╪▒ ╪º╪│╪¬.",
      },
      {
        question: "┘à╪»█î╪▒ ╪º█î╪¼┘å╪¬ ┌å┘ç ┌⌐╪º╪▒█î ╪º┘å╪¼╪º┘à ┘à█îΓÇî╪»┘ç╪»╪ƒ",
        answer:
          "┘à╪»█î╪▒ █î╪º ╪▒╪º┘ç╪¿╪▒ ╪º█î╪¼┘å╪¬ ┘ç╪»┘ü ┘ê ┘à╪¡╪»┘ê╪»█î╪¬ ╪▒╪º ╪¬╪╣█î█î┘å ┘à█îΓÇî┌⌐┘å╪»╪î ┌⌐╪º╪▒ ╪▒╪º ┘à█î╪º┘å ╪╣╪º┘à┘äΓÇî┘ç╪º█î ╪¬╪«╪╡╪╡█î ╪¬┘é╪│█î┘à ┘à█îΓÇî┌⌐┘å╪»╪î ┌⌐█î┘ü█î╪¬ ┘ê ┘ç╪▓█î┘å┘ç ╪▒╪º ┘à█îΓÇî╪│┘å╪¼╪» ┘ê ┘à┘ê╪º╪▒╪» ┘╛╪▒╪▒█î╪│┌⌐ ╪▒╪º ╪¿┘ç ┘à╪│╪ª┘ê┘ä ╪º┘å╪│╪º┘å█î ╪º╪▒╪¼╪º╪╣ ┘à█îΓÇî╪»┘ç╪».",
      },
      {
        question: "╪º╪▓ ┌⌐╪»╪º┘à ┘ê╪º╪¡╪» ╪│╪º╪▓┘à╪º┘å ╪¿╪▒╪º█î ╪º╪¼╪▒╪º█î ╪ó╪▓┘à╪º█î╪┤█î ╪┤╪▒┘ê╪╣ ┌⌐┘å█î┘à╪ƒ",
        answer:
          "█î┌⌐ ┘ü╪▒╪º█î┘å╪» ┘╛╪▒╪¬┌⌐╪▒╪º╪▒╪î ┘é╪º╪¿┘ä ╪º┘å╪»╪º╪▓┘çΓÇî┌»█î╪▒█î ┘ê ┌⌐┘àΓÇî╪▒█î╪│┌⌐ ╪¿╪º ╪»╪º╪»┘ç ┘å╪│╪¿╪¬╪º┘ï ┘à┘å╪╕┘à ╪º┘å╪¬╪«╪º╪¿ ┌⌐┘å█î╪»╪¢ ┘à╪º┘å┘å╪» ┌»╪▓╪º╪▒╪┤ΓÇî╪»┘ç█î ╪»╪º╪«┘ä█î╪î ╪╖╪¿┘é┘çΓÇî╪¿┘å╪»█î ╪»╪▒╪«┘ê╪º╪│╪¬ΓÇî┘ç╪º █î╪º ┌⌐┘å╪¬╪▒┘ä ╪º┘ê┘ä█î┘ç ┘à╪║╪º█î╪▒╪¬ΓÇî┘ç╪º.",
      },
    ],
  },
};