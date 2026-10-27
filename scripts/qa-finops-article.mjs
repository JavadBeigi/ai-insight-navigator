// Local fixture QA only: never authenticates to or writes to Production.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || "playwright");
const slug = "ai-agent-finops-cost-per-outcome";
const source = await fs.readFile(`content/articles/${slug}.md`, "utf8");
const field = (name) => JSON.parse(source.match(new RegExp(`^${name}: (.+)$`, "m"))[1]);
const content = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").trim();
const article = {
  id: 11, slug, title: field("title"), excerpt: field("excerpt"), content,
  status: "published", // In-memory fixture; the Supabase row remains draft.
  published_at: "2026-10-27T09:00:00Z", created_at: "2026-10-27T09:00:00Z", updated_at: "2026-10-27T09:00:00Z",
};
const output = process.env.ARTICLE_QA_OUTPUT || "article-qa-output";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const reports = [];
try {
  for (const [name, width, height] of [["desktop", 1440, 1000], ["mobile", 390, 844]]) {
    const context = await browser.newContext({ viewport: { width, height }, locale: "fa-IR" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
    await page.route("**/rest/v1/**", async (route) => {
      const url = new URL(route.request().url());
      const payload = url.pathname.endsWith("/articles") ? article : [];
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(payload) });
    });
    await page.goto(`http://127.0.0.1:4173/blog/${slug}`, { waitUntil: "networkidle" });
    await page.getByRole("heading", { level: 1, name: article.title, exact: true }).waitFor();
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((image) => image.decode())); });
    const result = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      ogImage: document.querySelector('meta[property="og:image"]')?.content,
      h1: document.querySelectorAll("h1").length,
      headings: document.querySelectorAll("article h2, article h3").length,
      tables: document.querySelectorAll("article table").length,
      pdfButtons: document.querySelectorAll("[data-pdf-action] button").length,
      schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent)),
      sources: [...document.querySelectorAll('section[aria-labelledby="sources-title"] a')].map((a) => a.href),
      links: [...document.querySelectorAll("article a")].map((a) => a.getAttribute("href")),
      images: [...document.querySelectorAll("article img")].map((i) => ({ loaded: i.complete && i.naturalWidth > 0, alt: i.alt })),
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      font: getComputedStyle(document.querySelector("h1")).fontFamily,
      body: document.querySelector("article").textContent,
    }));
    assert.equal(result.h1, 1);
    assert.ok(result.headings >= 20);
    assert.equal(result.tables, 3);
    assert.equal(result.pdfButtons, 2);
    assert.equal(result.overflow, false, "Document must not overflow at mobile width");
    assert.ok(result.description?.length >= 100);
    assert.equal(result.canonical, `https://nexation.ir/blog/${slug}`);
    assert.equal(result.ogImage, `https://nexation.ir/blog/${slug}.webp`);
    assert.equal(result.sources.length, 5);
    assert.ok(result.images.every((i) => i.loaded && i.alt.length > 20));
    assert.ok(result.schemas.some((s) => s["@type"] === "BlogPosting" && s.headline === article.title));
    assert.ok(result.schemas.some((s) => s["@type"] === "FAQPage" && s.mainEntity.length === 3));
    for (const href of ["/blog/ai-agent-evaluation-enterprise-kpis", "/blog/rag-fine-tuning-ai-agent-decision-framework", "/blog/human-in-the-loop-ai-agent-approvals", "/ai-maturity-assessment"]) assert.ok(result.links.includes(href));
    assert.ok(!result.body.includes("╪"), "No mojibake in the new article");
    assert.deepEqual(errors, []);
    await page.screenshot({ path: path.join(output, `${name}-top.png`) });
    await page.getByRole("heading", { name: "مثال: مدل ارزان‌تر، نتیجه گران‌تر", exact: true }).scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(output, `${name}-example.png`) });
    await page.getByRole("heading", { name: "منابع معتبر این مقاله", exact: true }).scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(output, `${name}-sources.png`) });
    reports.push({ name, width, title: result.title, headings: result.headings, tables: result.tables, sources: result.sources, overflow: result.overflow, imageLoaded: result.images.every((i) => i.loaded), runtimeErrors: errors, font: result.font, fixtureOnly: true });
    await context.close();
  }
  await fs.writeFile(path.join(output, "qa.json"), JSON.stringify(reports, null, 2));
  console.log(JSON.stringify(reports, null, 2));
} finally {
  await browser.close();
}
