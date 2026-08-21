export type ArticleSeo = {
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  author: string;
  readingTime: string;
  keywords: string[];
  sources: Array<{ name: string; url: string }>;
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
};
