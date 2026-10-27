// Anonymous local release checks. Never submits forms or writes to Production.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || "playwright");
const origin = process.env.SERVICE_QA_ORIGIN || "http://127.0.0.1:4173";
const paths = ["/services/enterprise-chatbot", "/services/ai-agent-development", "/services/ai-consulting"];
const output = "service-qa-output";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const reports = [];
try {
  for (const [name, width, height] of [["desktop",1440,1000],["mobile",390,844],["small-mobile",320,740]]) {
    const context = await browser.newContext({ viewport: { width, height }, locale: "fa-IR", reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", msg => { if (msg.type() === "error") errors.push(msg.text()); });
    for (const path of paths) {
      const response = await page.goto(origin + path, { waitUntil: "networkidle" });
      assert.equal(response.status(),200,path);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(),1);
      assert.equal(await page.locator('link[rel="canonical"]').count(),1);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),"https://nexation.ir"+path);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"),"index,follow");
      assert.ok((await page.title()).includes("Nexation"));
      const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.flatMap(node => { const s=JSON.parse(node.textContent); return s["@graph"] || [s]; }));
      assert.ok(schemas.some(s => s["@type"] === "Service" && s.url === "https://nexation.ir"+path));
      assert.ok(schemas.some(s => s["@type"] === "BreadcrumbList"));
      assert.ok(schemas.some(s => s["@type"] === "Organization" && s["@id"] === "https://nexation.ir/#organization"));
      assert.equal(await page.locator("details").count(),5);
      await page.locator("summary").first().focus();
      await page.keyboard.press("Enter");
      assert.equal(await page.locator("details").first().getAttribute("open"),"");
      await page.locator("summary").first().click();
      assert.equal(await page.locator("details").first().getAttribute("open"),null);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      assert.equal(overflow,false,path+" horizontal overflow at "+width);
      const brokenImages = await page.locator("img").evaluateAll(nodes => nodes.filter(n => !n.complete || n.naturalWidth === 0).map(n=>n.src));
      assert.deepEqual(brokenImages,[]);
      assert.ok(await page.locator('a[href="/#contact"]').count() >= 2);
      assert.ok(await page.locator('a[href="/ai-maturity-assessment"]').count() >= 2);
      await page.screenshot({path:output+"/"+path.split("/").at(-1)+"-"+name+".png",fullPage:true});
      reports.push({path,width,title:await page.title(),runtimeErrors:[...errors],horizontalOverflow:overflow});
    }
    await page.goto(origin, {waitUntil:"networkidle"});
    assert.equal(await page.locator("h1").count(),1);
    assert.ok(!(await page.title()).includes("پلتفرم"));
    for(const path of paths) assert.equal(await page.locator('#services a[href="'+path+'"]').count(),1);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    await page.screenshot({path:output+"/homepage-"+name+".png",fullPage:true});
    // Follow the real consultation path without submitting a customer request.
    await page.goto(origin+paths[0], {waitUntil:"networkidle"});
    await page.getByRole("link",{name:"بررسی نیاز سازمان شما",exact:true}).click();
    await page.locator('#contact input[type="tel"]').waitFor({state:"visible"});
    assert.equal(new URL(page.url()).hash,"#contact");
    await page.goto(origin+paths[0], {waitUntil:"networkidle"});
    await page.getByRole("link",{name:"سنجش بلوغ AI",exact:true}).click();
    assert.equal(new URL(page.url()).pathname,"/ai-maturity-assessment");
    assert.deepEqual(errors,[],name+" browser errors");
    await context.close();
  }
  const noJs = await browser.newContext({javaScriptEnabled:false});
  const crawler = await noJs.newPage();
  for(const path of paths) {
    await crawler.goto(origin+path);
    assert.equal(await crawler.locator("h1").count(),1,"SSR "+path);
    assert.equal(await crawler.locator("details").count(),5,"SSR FAQs "+path);
  }
  const sitemap = await (await fetch(origin+"/sitemap.xml")).text();
  for(const path of paths) assert.ok(sitemap.includes("https://nexation.ir"+path));
  await fs.writeFile(output+"/report.json",JSON.stringify({passed:true,reports},null,2));
  console.log(JSON.stringify({passed:true,viewports:3,servicePages:3,ssr:true,consultationNavigation:true,assessmentNavigation:true}));
} finally { await browser.close(); }
