# Nexation SEO: service intent and landing pages
Date: 2026-10-27. Scope: weeks 1–2 approved by the owner.

## Keyword ownership
| Canonical page | Primary intent | Supporting Persian queries |
|---|---|---|
| / | Nexation brand + enterprise AI delivery | تحول هوش مصنوعی سازمانی، خدمات هوش مصنوعی |
| /services/enterprise-chatbot | ساخت چت‌بات سازمانی | چت‌بات فارسی، چت‌بات با داده سازمان، طراحی چت‌بات |
| /services/ai-agent-development | طراحی ایجنت هوش مصنوعی | ساخت AI Agent، پیاده‌سازی ایجنت سازمانی |
| /services/ai-consulting | مشاوره هوش مصنوعی | استراتژی هوش مصنوعی، نقشه راه AI، تحول سازمانی |
| /ai-maturity-assessment | سنجش بلوغ هوش مصنوعی | ارزیابی آمادگی سازمان برای AI |
| /blog/ai-agent-enterprise-guide | Informational: ایجنت هوش مصنوعی چیست | کاربرد ایجنت در سازمان |

These are intent-based targets, not verified high-volume keyword estimates. Search Console impressions are this site's visibility, not market search volume. No ranking or traffic promise is made.

## Baseline
Search Console, available dates 2026-08-19 through 2026-10-25: 15 clicks, 1,485 impressions, approximately 1% CTR, average position 9.4. Of 773 visible query rows, 757 matched ^ai[0-9]+$; these account for 1,341 of the 1,432 impressions attributed to reported queries. Their origin is unknown. Keep this segment separate when judging relevant visibility; filtered rows omit anonymized queries.

## Implementation
- Homepage title, description, hero, cooperation process and Organization schema reflect consulting and custom implementation rather than a self-service platform.
- Three substantive service pages: suitability, practical scenarios, deliverables, process, safeguards, cost factors, five real FAQs, related articles.
- Service and BreadcrumbList structured data match visible content. No fabricated reviews, prices, certifications, ROI or FAQ rich-result promises.
- Homepage service cards and footer link to actual canonical pages; service pages cross-link and connect to the existing consultation form and maturity assessment.
- Canonical URLs, index/follow, social metadata, Persian headings and sitemap updated.
- Existing article, admin, assessment and payment behavior preserved. Examples are explicitly illustrative.

## Release verification
CI checks TypeScript and production build. Browser QA covers desktop (1440), mobile (390), small mobile (320), no-JavaScript SSR, canonical/schema, FAQ keyboard interaction, overflow, image loading, navigation to consultation/assessment and runtime errors. Also inspect Vercel Preview and Production before calling the release complete.

## Measurement
After Google recrawls, compare non-brand relevant queries and each service URL over equivalent 28-day periods, alongside consultation requests. Segment out the unexplained numeric query pattern. New pages need discovery and indexing before performance can be assessed; do not change slugs repeatedly.
