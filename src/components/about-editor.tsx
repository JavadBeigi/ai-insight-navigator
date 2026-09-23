import { useEffect, useState, type FormEvent } from "react";
import { aboutSchema, defaultAbout, type AboutContent } from "@/lib/about";
import { supabase } from "@/lib/supabase";

export function AboutEditor() {
  const [form, setForm] = useState<AboutContent>(defaultAbout);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const { data, error } = await supabase.from("site_pages").select("content").eq("slug", "about").maybeSingle();
        if (error) throw error;
        const parsed = aboutSchema.safeParse(data?.content ?? defaultAbout);
        if (!parsed.success) throw new Error("Invalid content");
        if (active) { setForm(parsed.data); setReady(true); }
      } catch {
        if (active) { setFailed(true); setMessage("دریافت محتوا ممکن نشد. اتصال و فعال‌بودن جدول site_pages را بررسی کنید و صفحه را دوباره باز کنید."); }
      } finally { if (active) setLoading(false); }
    }
    void load();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function change(key: keyof Omit<AboutContent, "services">, value: string) {
    setForm(current => ({ ...current, [key]: value })); setDirty(true); setMessage("");
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    if (!ready || saving) return;
    const parsed = aboutSchema.safeParse(form);
    if (!parsed.success) { setFailed(true); setMessage(parsed.error.issues[0].message); return; }
    setSaving(true); setMessage("");
    try {
      const { data, error } = await supabase.from("site_pages").upsert({ slug: "about", content: parsed.data, updated_at: new Date().toISOString() }, { onConflict: "slug" }).select("slug").single();
      if (error || !data) throw error ?? new Error("No saved row");
      setForm(parsed.data); setDirty(false); setFailed(false); setMessage("صفحه درباره ما ذخیره شد و تغییرات در سایت قابل مشاهده است.");
    } catch { setFailed(true); setMessage("ذخیره انجام نشد. متن شما در فرم حفظ شده؛ اتصال و دسترسی مدیر را بررسی و دوباره تلاش کنید."); }
    finally { setSaving(false); }
  }

  const inputClass = "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 leading-8 outline-none focus:border-cyan";
  const field = (key: keyof Omit<AboutContent, "services">, label: string, maxLength: number, rows = 2) => <label className="block text-sm font-bold">{label}<textarea required maxLength={maxLength} rows={rows} value={form[key]} onChange={event => change(key, event.target.value)} className={inputClass} /></label>;
  return <section className="mt-8 rounded-3xl border border-border bg-card p-5 md:p-8" dir="rtl">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-2xl font-black">مدیریت درباره ما</h1><p className="mt-3 text-sm leading-7 text-muted-foreground">متن مأموریت، معرفی و خدمات Nexation را ویرایش کنید. دکمهٔ ذخیره، تغییرات را مستقیماً در صفحه عمومی منتشر می‌کند.</p></div><a href="/about" target="_blank" rel="noopener noreferrer" className="text-cyan underline">مشاهده صفحه ↗</a></div>
    {message && <p role={failed ? "alert" : "status"} className={`mt-5 rounded-xl border p-4 text-sm ${failed ? "border-red-400/30 text-red-300" : "border-emerald-400/30 text-emerald-300"}`}>{message}</p>}
    {loading ? <p className="py-8" role="status">در حال دریافت محتوا…</p> : <form onSubmit={save} className="mt-8 space-y-7"><fieldset disabled={!ready || saving} className="space-y-7 disabled:opacity-60">
      {field("title", "عنوان اصلی", 160)}{field("introduction", "معرفی کوتاه", 800, 3)}{field("mission", "مأموریت (برای پاراگراف جدید یک خط خالی بگذارید)", 2000, 7)}
      <div className="grid gap-5 lg:grid-cols-3">{form.services.map((service, i) => <fieldset key={i} className="space-y-4 rounded-2xl border border-border p-4"><legend className="px-2 text-cyan">محور {i + 1}</legend><label className="block text-sm">عنوان<input required maxLength={120} value={service.title} className={inputClass} onChange={event => { setForm(current => ({ ...current, services: current.services.map((s, index) => index === i ? { ...s, title: event.target.value } : s) })); setDirty(true); setMessage(""); }} /></label><label className="block text-sm">توضیح<textarea required maxLength={800} rows={6} value={service.description} className={inputClass} onChange={event => { setForm(current => ({ ...current, services: current.services.map((s, index) => index === i ? { ...s, description: event.target.value } : s) })); setDirty(true); setMessage(""); }} /></label></fieldset>)}</div>
      {field("nativeTitle", "عنوان چشم‌انداز AI-native", 160)}{field("nativeDescription", "توضیح چشم‌انداز", 1200, 4)}{field("ctaTitle", "عنوان دعوت به همکاری", 160)}{field("ctaDescription", "متن دعوت به همکاری", 600, 3)}
      <div className="flex flex-wrap items-center gap-4"><button type="submit" className="rounded-xl bg-primary px-7 py-3 font-bold text-primary-foreground">{saving ? "در حال ذخیره…" : "ذخیره و انتشار تغییرات"}</button>{dirty && <span className="text-sm text-amber-300">تغییرات ذخیره‌نشده دارید</span>}</div>
    </fieldset></form>}
  </section>;
}
