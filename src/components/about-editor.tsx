import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Loader2, Plus, Trash2, UploadCloud } from "lucide-react";
import { aboutSchema, defaultAbout, emptyConsultant, type AboutContent } from "@/lib/about";
import { supabase } from "@/lib/supabase";

const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 leading-8 outline-none focus:border-cyan";

export function AboutEditor() {
  const [form, setForm] = useState<AboutContent>(defaultAbout);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const { data, error } = await supabase
          .from("site_pages")
          .select("content")
          .eq("slug", "about")
          .maybeSingle();
        if (error) throw error;
        const parsed = aboutSchema.safeParse(data?.content ?? defaultAbout);
        if (!parsed.success) throw new Error("Invalid content");
        if (active) {
          setForm(parsed.data);
          setReady(true);
        }
      } catch {
        if (active) {
          setFailed(true);
          setMessage("دریافت محتوا ممکن نشد. اتصال و دسترسی مدیر را بررسی کنید.");
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty) event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function changed() {
    setDirty(true);
    setMessage("");
  }
  function change(key: keyof Omit<AboutContent, "services" | "consultants">, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    changed();
  }
  function updateConsultant(index: number, patch: Partial<AboutContent["consultants"][number]>) {
    setForm((current) => ({
      ...current,
      consultants: current.consultants.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      ),
    }));
    changed();
  }
  function addConsultant() {
    if (form.consultants.length >= 12) return;
    setForm((current) => ({
      ...current,
      consultants: [
        ...current.consultants,
        { ...emptyConsultant, specialties: [...emptyConsultant.specialties] },
      ],
    }));
    changed();
  }
  function removeConsultant(index: number) {
    if (form.consultants.length === 1) {
      setFailed(true);
      setMessage("حداقل یک مشاور باید باقی بماند.");
      return;
    }
    if (!window.confirm("این مشاور از صفحه درباره ما حذف شود؟")) return;
    setForm((current) => ({
      ...current,
      consultants: current.consultants.filter((_, i) => i !== index),
    }));
    changed();
  }
  function moveConsultant(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= form.consultants.length) return;
    setForm((current) => {
      const consultants = [...current.consultants];
      [consultants[index], consultants[next]] = [consultants[next], consultants[index]];
      return { ...current, consultants };
    });
    changed();
  }
  async function uploadPhoto(index: number, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!imageTypes.includes(file.type)) {
      setFailed(true);
      setMessage("فرمت عکس باید JPG، PNG، WebP یا AVIF باشد.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFailed(true);
      setMessage("حجم عکس نباید بیشتر از ۵ مگابایت باشد.");
      return;
    }
    setUploading(index);
    setFailed(false);
    setMessage("");
    try {
      const ext =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase()
          .replace(/[^a-z0-9]/g, "") || "jpg";
      const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("consultant-photos")
        .upload(path, file, { cacheControl: "31536000", upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("consultant-photos").getPublicUrl(path);
      updateConsultant(index, { imageUrl: data.publicUrl });
      setMessage("عکس آپلود شد. برای نمایش در سایت، تغییرات را ذخیره کنید.");
    } catch {
      setFailed(true);
      setMessage("آپلود عکس انجام نشد. مخزن تصاویر و دسترسی مدیر را بررسی کنید.");
    } finally {
      setUploading(null);
    }
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    const parsed = aboutSchema.safeParse(form);
    if (!parsed.success) {
      setFailed(true);
      setMessage(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const { data, error } = await supabase
        .from("site_pages")
        .upsert(
          { slug: "about", content: parsed.data, updated_at: new Date().toISOString() },
          { onConflict: "slug" },
        )
        .select("slug")
        .single();
      if (error || !data) throw error ?? new Error("No saved row");
      setForm(parsed.data);
      setDirty(false);
      setFailed(false);
      setMessage("صفحه درباره ما ذخیره شد و تغییرات در سایت قابل مشاهده است.");
    } catch {
      setFailed(true);
      setMessage("ذخیره انجام نشد. اطلاعات فرم حفظ شده است؛ دوباره تلاش کنید.");
    } finally {
      setSaving(false);
    }
  }

  const textField = (
    key: keyof Omit<AboutContent, "services" | "consultants">,
    label: string,
    max: number,
    rows = 2,
  ) => (
    <label className="block text-sm font-bold">
      {label}
      <textarea
        required
        maxLength={max}
        rows={rows}
        value={form[key]}
        onChange={(event) => change(key, event.target.value)}
        className={inputClass}
      />
    </label>
  );

  return (
    <section className="mt-8 rounded-3xl border border-border bg-card p-5 md:p-8" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black">مدیریت درباره ما</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            متن صفحه و فهرست مشاوران Nexation را مدیریت کنید.
          </p>
        </div>
        <a href="/about" target="_blank" rel="noopener noreferrer" className="text-cyan underline">
          مشاهده صفحه ↗
        </a>
      </div>
      {message && (
        <p
          role={failed ? "alert" : "status"}
          className={`mt-5 rounded-xl border p-4 text-sm ${failed ? "border-red-400/30 text-red-300" : "border-emerald-400/30 text-emerald-300"}`}
        >
          {message}
        </p>
      )}
      {loading ? (
        <p className="py-8">در حال دریافت محتوا…</p>
      ) : (
        <form onSubmit={save} className="mt-8 space-y-8">
          <fieldset disabled={!ready || saving} className="space-y-8 disabled:opacity-60">
            {textField("title", "عنوان اصلی", 160)}
            {textField("introduction", "معرفی کوتاه", 800, 3)}
            {textField("mission", "مأموریت", 2000, 7)}
            <div className="grid gap-5 lg:grid-cols-3">
              {form.services.map((service, index) => (
                <fieldset key={index} className="space-y-4 rounded-2xl border border-border p-4">
                  <legend className="px-2 text-cyan">محور {index + 1}</legend>
                  <label className="block text-sm">
                    عنوان
                    <input
                      required
                      maxLength={120}
                      value={service.title}
                      className={inputClass}
                      onChange={(event) => {
                        setForm((current) => ({
                          ...current,
                          services: current.services.map((item, i) =>
                            i === index ? { ...item, title: event.target.value } : item,
                          ),
                        }));
                        changed();
                      }}
                    />
                  </label>
                  <label className="block text-sm">
                    توضیح
                    <textarea
                      required
                      maxLength={800}
                      rows={6}
                      value={service.description}
                      className={inputClass}
                      onChange={(event) => {
                        setForm((current) => ({
                          ...current,
                          services: current.services.map((item, i) =>
                            i === index ? { ...item, description: event.target.value } : item,
                          ),
                        }));
                        changed();
                      }}
                    />
                  </label>
                </fieldset>
              ))}
            </div>

            <section className="rounded-3xl border border-cyan/20 bg-background/40 p-4 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black">مشاوران Nexation</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    ترتیب کارت‌ها همان ترتیب نمایش در سایت است.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addConsultant}
                  disabled={form.consultants.length >= 12}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold disabled:opacity-50"
                >
                  <Plus size={18} /> افزودن مشاور
                </button>
              </div>
              <div className="mt-6 grid gap-5 xl:grid-cols-2">
                {form.consultants.map((consultant, index) => (
                  <fieldset
                    key={index}
                    className="space-y-4 rounded-2xl border border-border bg-card p-5"
                  >
                    <legend className="px-2 font-bold text-cyan">مشاور {index + 1}</legend>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background text-xs text-muted-foreground">
                          {consultant.imageUrl ? (
                            <img
                              src={consultant.imageUrl}
                              alt={`پیش‌نمایش ${consultant.name}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            "بدون عکس"
                          )}
                        </div>
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-cyan/30 px-4 py-3 text-sm font-bold text-cyan">
                          {uploading === index ? (
                            <Loader2 className="animate-spin" size={18} />
                          ) : (
                            <UploadCloud size={18} />
                          )}
                          {uploading === index ? "در حال آپلود…" : "آپلود عکس"}
                          <input
                            type="file"
                            accept={imageTypes.join(",")}
                            className="sr-only"
                            disabled={uploading !== null}
                            onChange={(event) => void uploadPhoto(index, event)}
                          />
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          aria-label="انتقال به بالا"
                          disabled={index === 0}
                          onClick={() => moveConsultant(index, -1)}
                          className="rounded-lg border border-border p-2 disabled:opacity-30"
                        >
                          <ArrowUp size={17} />
                        </button>
                        <button
                          type="button"
                          aria-label="انتقال به پایین"
                          disabled={index === form.consultants.length - 1}
                          onClick={() => moveConsultant(index, 1)}
                          className="rounded-lg border border-border p-2 disabled:opacity-30"
                        >
                          <ArrowDown size={17} />
                        </button>
                        <button
                          type="button"
                          aria-label="حذف مشاور"
                          onClick={() => removeConsultant(index)}
                          className="rounded-lg border border-red-400/30 p-2 text-red-300"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                    <label className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm">
                      <span className="inline-flex items-center gap-2 font-bold">
                        {consultant.visible ? <Eye size={18} /> : <EyeOff size={18} />} نمایش در
                        صفحه درباره ما
                      </span>
                      <input
                        type="checkbox"
                        checked={consultant.visible}
                        onChange={(event) =>
                          updateConsultant(index, { visible: event.target.checked })
                        }
                        className="h-5 w-5 accent-primary"
                      />
                    </label>
                    <label className="block text-sm">
                      نام و نام خانوادگی
                      <input
                        required
                        maxLength={100}
                        value={consultant.name}
                        className={inputClass}
                        onChange={(event) => updateConsultant(index, { name: event.target.value })}
                      />
                    </label>
                    <label className="block text-sm">
                      عنوان یا حوزه مسئولیت
                      <input
                        required
                        maxLength={140}
                        value={consultant.role}
                        className={inputClass}
                        onChange={(event) => updateConsultant(index, { role: event.target.value })}
                      />
                    </label>
                    <label className="block text-sm">
                      معرفی کوتاه
                      <textarea
                        required
                        maxLength={600}
                        rows={4}
                        value={consultant.bio}
                        className={inputClass}
                        onChange={(event) => updateConsultant(index, { bio: event.target.value })}
                      />
                    </label>
                    <label className="block text-sm">
                      تخصص‌ها (با ویرگول جدا کنید؛ حداکثر ۶ مورد)
                      <input
                        required
                        value={consultant.specialties.join("، ")}
                        className={inputClass}
                        onChange={(event) =>
                          updateConsultant(index, {
                            specialties: event.target.value
                              .split(/[،,]/)
                              .map((item) => item.trim())
                              .filter(Boolean)
                              .slice(0, 6),
                          })
                        }
                      />
                    </label>
                    <label className="block text-sm">
                      آدرس عکس
                      <input
                        dir="ltr"
                        inputMode="url"
                        placeholder="https://..."
                        value={consultant.imageUrl}
                        className={inputClass}
                        onChange={(event) =>
                          updateConsultant(index, { imageUrl: event.target.value })
                        }
                      />
                    </label>
                    <label className="block text-sm">
                      لینک LinkedIn
                      <input
                        dir="ltr"
                        inputMode="url"
                        placeholder="https://linkedin.com/in/..."
                        value={consultant.linkedinUrl}
                        className={inputClass}
                        onChange={(event) =>
                          updateConsultant(index, { linkedinUrl: event.target.value })
                        }
                      />
                    </label>
                  </fieldset>
                ))}
              </div>
            </section>

            {textField("nativeTitle", "عنوان چشم‌انداز AI-native", 160)}
            {textField("nativeDescription", "توضیح چشم‌انداز", 1200, 4)}
            {textField("ctaTitle", "عنوان دعوت به همکاری", 160)}
            {textField("ctaDescription", "متن دعوت به همکاری", 600, 3)}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={uploading !== null}
                className="rounded-xl bg-primary px-7 py-3 font-bold disabled:opacity-50"
              >
                {saving ? "در حال ذخیره…" : "ذخیره و انتشار تغییرات"}
              </button>
              {dirty && <span className="text-sm text-amber-300">تغییرات ذخیره‌نشده دارید</span>}
            </div>
          </fieldset>
        </form>
      )}
    </section>
  );
}
