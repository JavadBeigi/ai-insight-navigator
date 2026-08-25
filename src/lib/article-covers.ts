const articleCovers: Record<string, { src: string; alt: string }> = {
  "ai-agent-prompt-injection-security": {
    src: "/blog/ai-agent-prompt-injection-security.png",
    alt: "کارشناسان امنیت سایبری در حال بررسی یک رخداد مربوط به ایجنت هوش مصنوعی",
  },
};

export function getArticleCover(slug: string) {
  return articleCovers[slug] ?? null;
}
