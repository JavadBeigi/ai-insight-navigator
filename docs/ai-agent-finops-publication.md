# AI agent FinOps article publication record

- Slug: `ai-agent-finops-cost-per-outcome`
- Supabase article ID: 11; keep `draft` until all release gates pass.
- Baseline main: `5cdba77363fea9aa98dfd744794248e796c2b10e`.
- Scope: outcome-level cost, full cost boundary, budget enforcement, bounded loops, original illustrative arithmetic and 30-day implementation plan.
- Duplication audit: ten Supabase articles plus main article files and the pending incident-response article PR #41; no duplicate topic/title.
- Five primary sources are listed in `src/lib/article-seo.ts`. Reviewed 2026-10-27; no quoted passages, vendor prices or unverified savings percentages.
- The numbered source references distinguish sourced product facts from Nexation's proposed framework.
- Fixed a pre-existing stray `<` that made `public/sitemap.xml` invalid; added the article URL and updated the blog listing date.

## Cover provenance

Original synthetic editorial still-life, generated with the built-in image generation tool (not third-party stock). It is not a photograph of an actual Nexation deployment or a client result. No third-party logos or identifiable people were requested. The final workspace asset is `public/blog/ai-agent-finops-cost-per-outcome.webp` (1536 × 1024, optimized WebP).

Prompt: "Use case: photorealistic-natural. Asset type: original editorial cover for a Persian enterprise AI article about AI agent unit economics and cost control. A believable overhead still-life photograph on a light warm-grey office worktable: a compact mechanical desk calculator, an open accounting notebook with abstract faint lines (no legible text), a small grouping of translucent blue and amber glass counting pieces organized across three blank workflow cards connected with thin lines, with one completed green check marker and a few unused pieces. Convey measuring resources against completed work, not financial speculation. Natural side daylight, tactile paper and glass detail, restrained editorial magazine photography, wide horizontal 3:2 composition, uncluttered, professional and realistic. No people, no robots, no brains, no holograms, no glowing circuitry, no money/currency symbols, no readable text, no logos, no watermark. Distinct from corporate team-at-laptop stock photos."

## Release gates

1. CI TypeScript check and build must pass for the final head revision.
2. Isolated fixture QA checks desktop/mobile, schema, internal links, source links, cover load and PDF button presence. It does not prove live database access or replace Preview QA.
3. Review screenshots from the QA artifact.
4. Vercel Preview must be inspected with authorized access. A Vercel login screen is not a successful Preview check; do not bypass deployment protection.
5. Do not merge until all checks pass and Preview is verified.
6. After merge, verify Production assets, then publish article ID 11 and verify its live page, image, metadata and links. The live article cannot render publicly while its database row remains draft.

Local Bun install was blocked by a Windows temporary-directory `EBADF` error despite scoped temp/cache paths; the unchanged frozen lockfile is tested on GitHub's Linux runner instead. No dependency versions were changed.
