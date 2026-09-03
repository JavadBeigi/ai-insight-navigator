const articleCovers: Record<string, { src: string; alt: string }> = {
  "model-context-protocol-mcp-enterprise-guide": {
    src: "/blog/model-context-protocol-mcp-enterprise-guide.png",
    alt: "ایجنت هوش مصنوعی متصل از طریق MCP به داده‌ها و ابزارهای سازمانی",
  },
  "ai-agent-evaluation-enterprise-kpis": {
    src: "/blog/ai-agent-evaluation-enterprise-kpis.png",
    alt: "تیم سازمانی در حال طراحی آزمون‌ها و شاخص‌های ارزیابی ایجنت هوش مصنوعی",
  },
  "ai-agent-prompt-injection-security": {
    src: "/blog/ai-agent-prompt-injection-security.png",
    alt: "کارشناسان امنیت سایبری در حال بررسی یک رخداد مربوط به ایجنت هوش مصنوعی",
  },
};

export function getArticleCover(slug: string) {
  return articleCovers[slug] ?? null;
}
