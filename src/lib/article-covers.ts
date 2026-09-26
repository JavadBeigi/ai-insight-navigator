const articleCovers: Record<string, { src: string; alt: string }> = {
  "rag-fine-tuning-ai-agent-decision-framework": {
    src: "/blog/rag-fine-tuning-ai-agent-decision-framework.png",
    alt: "تیم راهبرد و فناوری سازمان در حال مقایسه معماری RAG، Fine-tuning و AI Agent",
  },
  "human-in-the-loop-ai-agent-approvals": {
    src: "/blog/human-in-the-loop-ai-agent-approvals.png",
    alt: "╪»╪│╪¬ ╪º┘å╪│╪º┘å ╪»╪▒ ╪¡╪º┘ä ╪¿╪▒╪▒╪│█î ┌⌐┘å╪¬╪▒┘ä ╪¬╪ú█î█î╪» ┘ê ╪¬┘ê┘é┘ü █î┌⌐ ┌»╪▒╪»╪┤ΓÇî┌⌐╪º╪▒ ╪«┘ê╪»┌⌐╪º╪▒ ╪»╪▒ ╪º╪¬╪º┘é ╪╣┘à┘ä█î╪º╪¬",
  },
  "shadow-ai-governance-enterprise": {
    src: "/blog/shadow-ai-governance-enterprise.png",
    alt: "╪¬█î┘à ╪º┘à┘å█î╪¬ ┘ê ┘ü┘å╪º┘ê╪▒█î ╪│╪º╪▓┘à╪º┘å ╪»╪▒ ╪¡╪º┘ä ┌⌐╪┤┘ü ┘ê ┘à╪»█î╪▒█î╪¬ ╪º╪¿╪▓╪º╪▒┘ç╪º█î ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┘╛┘å┘ç╪º┘å",
  },
  "ai-agent-memory-governance": {
    src: "/blog/ai-agent-memory-governance.png",
    alt: "┘à╪¬╪«╪╡╪╡ ╪¡╪º┌⌐┘à█î╪¬ ╪»╪º╪»┘ç ╪»╪▒ ╪¡╪º┘ä ┘à╪»█î╪▒█î╪¬ ╪¡╪º┘ü╪╕┘ç ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ╪»╪▒ █î┌⌐ ┘à╪¡█î╪╖ ╪│╪º╪▓┘à╪º┘å█î",
  },
  "zero-trust-ai-agent-identity": {
    src: "/blog/zero-trust-ai-agent-identity.png",
    alt: "┌⌐╪º╪▒╪┤┘å╪º╪│ ╪º┘à┘å█î╪¬ ╪│╪º╪▓┘à╪º┘å█î ╪»╪▒ ╪¡╪º┘ä ┘╛╪º█î╪┤ ┘ç┘ê█î╪¬ ┘ê ╪»╪│╪¬╪▒╪│█î ╪º█î╪¼┘å╪¬ΓÇî┘ç╪º█î ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
  },
  "model-context-protocol-mcp-enterprise-guide": {
    src: "/blog/model-context-protocol-mcp-enterprise-guide.png",
    alt: "╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î ┘à╪¬╪╡┘ä ╪º╪▓ ╪╖╪▒█î┘é MCP ╪¿┘ç ╪»╪º╪»┘çΓÇî┘ç╪º ┘ê ╪º╪¿╪▓╪º╪▒┘ç╪º█î ╪│╪º╪▓┘à╪º┘å█î",
  },
  "ai-agent-evaluation-enterprise-kpis": {
    src: "/blog/ai-agent-evaluation-enterprise-kpis.png",
    alt: "╪¬█î┘à ╪│╪º╪▓┘à╪º┘å█î ╪»╪▒ ╪¡╪º┘ä ╪╖╪▒╪º╪¡█î ╪ó╪▓┘à┘ê┘åΓÇî┘ç╪º ┘ê ╪┤╪º╪«╪╡ΓÇî┘ç╪º█î ╪º╪▒╪▓█î╪º╪¿█î ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
  },
  "ai-agent-prompt-injection-security": {
    src: "/blog/ai-agent-prompt-injection-security.png",
    alt: "┌⌐╪º╪▒╪┤┘å╪º╪│╪º┘å ╪º┘à┘å█î╪¬ ╪│╪º█î╪¿╪▒█î ╪»╪▒ ╪¡╪º┘ä ╪¿╪▒╪▒╪│█î █î┌⌐ ╪▒╪«╪»╪º╪» ┘à╪▒╪¿┘ê╪╖ ╪¿┘ç ╪º█î╪¼┘å╪¬ ┘ç┘ê╪┤ ┘à╪╡┘å┘ê╪╣█î",
  },
};

export function getArticleCover(slug: string) {
  return articleCovers[slug] ?? null;
}