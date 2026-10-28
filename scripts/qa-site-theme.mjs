// Isolated browser fixtures only. No production reads, login or writes.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const origin = 'http://127.0.0.1:4173';
const output = 'service-qa-output/site-theme';
await fs.mkdir(output, { recursive: true });
const slug = 'ai-agent-finops-cost-per-outcome';
const source = await fs.readFile(`content/articles/${slug}.md`, 'utf8');
const field = name => JSON.parse(source.match(new RegExp(`^${name}: (.+)$`, 'm'))[1]);
const article = { id: 11, slug, title: field('title'), excerpt: field('excerpt'), content: source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim(), status: 'published', published_at: '2026-10-27T09:00:00Z', updated_at: '2026-10-27T09:00:00Z', created_at: '2026-10-27T09:00:00Z' };
const questionSource = await fs.readFile('src/lib/ai-maturity.ts','utf8');
const answers = Object.fromEntries([...questionSource.matchAll(/id: "([svdtgpa][1-5])", dimension:/g)].map((m,i) => [m[1], 1+i%5]));
assert.equal(Object.keys(answers).length,35);
const assessment = { id: 1, organization: 'سازمان نمونه آزمایشی', industry: 'تولید', respondent_role: 'مدیر فناوری', phone: '09000000000', answers, status: 'payment_requested', full_report_unlocked: false, overall_score: 50, maturity_level: 3, created_at: article.created_at };
const user = { id: '00000000-0000-0000-0000-000000000001', aud: 'authenticated', role: 'authenticated', email: 'qa@example.test' };
const fakeJwt = Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})).toString('base64url')+'.'+Buffer.from(JSON.stringify({sub:user.id,exp:Math.floor(Date.now()/1000)+3600})).toString('base64url')+'.fixture';
const browser = await chromium.launch({headless:true});
const reports=[];
try {
 for(const [name,width,height] of [['desktop',1440,1000],['tablet',1024,800],['mobile',390,844],['small-mobile',320,740]]) {
  const context=await browser.newContext({viewport:{width,height},locale:'fa-IR',reducedMotion:'reduce'});
  const page=await context.newPage();
  let fullReport=false;
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('http://127.0.0.1:54321/**',async route=>{
   const url=new URL(route.request().url());
   let payload=[];
   if(url.pathname.endsWith('/articles')) payload=url.searchParams.has('slug')?article:[article];
   if(url.pathname.endsWith('/admin_users')) payload={user_id:user.id};
   if(url.pathname.endsWith('/ai_maturity_assessments')) payload=[assessment];
   if(url.pathname.endsWith('/rpc/get_ai_maturity_assessment')) payload={...assessment,full_report_unlocked:fullReport};
   if(url.pathname.endsWith('/site_pages')) payload=null;
   if(url.pathname.endsWith('/auth/v1/token')) payload={access_token:fakeJwt,refresh_token:'fixture-only',token_type:'bearer',expires_in:3600,user};
   if(url.pathname.endsWith('/auth/v1/user')) payload=user;
   await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(payload)});
  });
  async function check(label,{chrome=true}={}) {
   await page.evaluate(()=>document.fonts.ready);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
   if(overflow) console.log(label, await page.locator('body *').evaluateAll(ns=>ns.filter(n=>n.getBoundingClientRect().right>innerWidth+1||n.getBoundingClientRect().left< -1).slice(0,12).map(n=>({tag:n.tagName,cls:n.className,text:n.textContent.slice(0,60)}))));
   assert.equal(overflow,false,`${label} overflow ${width}`);
   assert.equal(await page.locator('html').evaluate(n=>getComputedStyle(n).colorScheme),'light');
   if(chrome) {
    assert.equal(await page.locator('.site-header').count(),1);
    assert.equal(await page.locator('.site-footer').count(),1);
    assert.equal(await page.locator('.site-footer a[href="tel:+989918418624"]').count(),1);
    assert.equal(await page.locator('.site-footer a[href="/#contact"]').count(),1);
   }
   await page.screenshot({path:`${output}/${label}-${name}.png`});
   reports.push({label,width,overflow,fixtureOnly:true});
  }
  for(const [label,path,ready] of [['about','/about','h1'],['blog','/blog','.blog-page .group'],['article',`/blog/${slug}`,'.article-print-root']]) {
   await page.goto(origin+path,{waitUntil:'networkidle'});
   await page.locator(ready).first().waitFor();
   await check(label);
   if(label==='article') {
    assert.equal(await page.locator('[data-pdf-action] button').count(),2);
    await page.locator('article table').first().scrollIntoViewIfNeeded();
    await check('article-table');
    await page.emulateMedia({media:'print'});
    assert.equal(await page.locator('.site-header').isVisible(),false);
    assert.equal(await page.locator('.site-footer').isVisible(),false);
    assert.equal(await page.locator('[data-pdf-action] button').first().isVisible(),false);
    if(name==='desktop') await page.pdf({path:output+'/article.pdf',format:'A4',printBackground:true});
    await page.emulateMedia({media:'screen'});
   }
  }
  await page.goto(origin+'/ai-maturity-assessment',{waitUntil:'networkidle'});
  await check('assessment-intro');
  await page.getByRole('button',{name:/شروع ارزیابی/}).click();
  await check('assessment-profile');
  for(const [label,value] of [['نام سازمان','سازمان نمونه'],['صنعت','تولید'],['سمت پاسخ‌دهنده','مدیر'],['شماره تلفن','09000000000']]) await page.getByLabel(label,{exact:true}).fill(value);
  await page.getByRole('button',{name:'ورود به پرسشنامه'}).click();
  await check('assessment-question');
  await page.goto(origin+'/ai-maturity-assessment#token=fixture-only',{waitUntil:'networkidle'});
  await page.reload({waitUntil:'networkidle'});
  await page.locator('.report-shell').waitFor();
  assert.equal(await page.locator('.full-report-content').count(),0,'paid content stays locked');
  await check('assessment-summary');
  await page.locator('.recharts-wrapper').scrollIntoViewIfNeeded();
  await check('assessment-radar');
  // Paid report rendering fixture: no payment or production access is performed.
  fullReport=true;
  await page.reload({waitUntil:'networkidle'});
  await page.locator('.full-report-content').waitFor();
  await page.getByRole('heading',{name:'Heatmap زیرشاخص‌ها',exact:true}).scrollIntoViewIfNeeded();
  await check('assessment-full-report');
  await page.emulateMedia({media:'print'});
  assert.equal(await page.locator('.full-report-content').isVisible(),false,'summary PDF excludes paid details');
  assert.equal(await page.locator('.site-footer').isVisible(),false);
  if(name==='desktop') await page.pdf({path:output+'/assessment-summary.pdf',format:'A4',printBackground:true});
  await page.emulateMedia({media:'screen'});
  await page.goto(origin+'/admin',{waitUntil:'networkidle'});
  await page.getByRole('heading',{name:'ورود مدیر'}).waitFor();
  await check('admin-login',{chrome:false});
  await page.getByLabel('رمز عبور',{exact:true}).fill('local-fixture-only');
  await page.getByRole('button',{name:'ورود',exact:true}).click();
  await page.getByRole('button',{name:'خروج',exact:true}).waitFor();
  await check('admin-requests',{chrome:false});
  for(const [label,button] of [['admin-assessments','ارزیابی‌های بلوغ'],['admin-articles','مقالات'],['admin-about','درباره ما']]) {
   await page.getByRole('button',{name:new RegExp(button)}).first().click();
   await check(label,{chrome:false});
  }
  assert.deepEqual(errors,[],`${name} runtime errors`);
  await context.close();
 }
 await fs.writeFile(output+'/report.json',JSON.stringify({passed:true,reports},null,2));
 console.log(JSON.stringify({passed:true,viewports:4,checks:reports.length,articlePdf:true,reportPdf:true,fixtureOnly:true}));
} finally {await browser.close();}