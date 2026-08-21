import { useCallback, useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/site";
import type { Database } from "@/lib/database.types";

type BlogComment = Pick<
  Database["public"]["Tables"]["blog_comments"]["Row"],
  "id" | "article_id" | "author_name" | "body" | "created_at"
>;

const emptyForm = {
  authorName: "",
  email: "",
  body: "",
  website: "",
};

export function BlogComments({ articleId }: { articleId: number }) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const loadComments = useCallback(async () => {
    const { data } = await supabase
      .from("blog_comments")
      .select("id, article_id, author_name, body, created_at")
      .eq("article_id", articleId)
      .order("created_at", { ascending: false });

    setComments(data ?? []);
    setLoading(false);
  }, [articleId]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  async function submitComment(event: FormEvent) {
    event.preventDefault();
    setMessage("");

    const cooldownKey = `nexation-comment-${articleId}`;
    const lastSubmission = Number(window.localStorage.getItem(cooldownKey) ?? 0);
    if (Date.now() - lastSubmission < 60_000) {
      setMessageType("error");
      setMessage("برای ارسال نظر بعدی، لطفاً یک دقیقه صبر کنید.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("blog_comments").insert({
      article_id: articleId,
      author_name: form.authorName.trim(),
      email: form.email.trim() || null,
      body: form.body.trim(),
      website: form.website,
    });

    if (error) {
      setMessageType("error");
      setMessage("ارسال نظر انجام نشد. لطفاً اطلاعات را بررسی و دوباره تلاش کنید.");
    } else {
      window.localStorage.setItem(cooldownKey, String(Date.now()));
      setForm({ ...emptyForm });
      setMessageType("success");
      setMessage("نظر شما ثبت شد و پس از تأیید مدیر نمایش داده می‌شود.");
    }
    setSubmitting(false);
  }

  return (
    <section className="mt-14 border-t border-border pt-12" aria-labelledby="comments-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="comments-title" className="text-3xl font-black">
            دیدگاه‌ها
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            تجربه یا سؤال خود را درباره این مقاله با ما در میان بگذارید.
          </p>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">
          {comments.length.toLocaleString("fa-IR")} دیدگاه
        </span>
      </div>

      <form
        onSubmit={submitComment}
        className="relative mt-8 rounded-3xl border border-border bg-card p-6 md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="comment-name" className="text-sm font-bold">
              نام شما
            </label>
            <input
              id="comment-name"
              required
              minLength={2}
              maxLength={80}
              autoComplete="name"
              value={form.authorName}
              onChange={(event) => setForm({ ...form, authorName: event.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-cyan"
            />
          </div>
          <div>
            <label htmlFor="comment-email" className="text-sm font-bold">
              ایمیل <span className="font-normal text-muted-foreground">(اختیاری و خصوصی)</span>
            </label>
            <input
              id="comment-email"
              type="email"
              maxLength={254}
              autoComplete="email"
              dir="ltr"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-left outline-none focus:border-cyan"
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0"
          aria-hidden="true"
        >
          <label htmlFor="comment-website">وب‌سایت</label>
          <input
            id="comment-website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => setForm({ ...form, website: event.target.value })}
          />
        </div>

        <label htmlFor="comment-body" className="mt-5 block text-sm font-bold">
          متن دیدگاه
        </label>
        <textarea
          id="comment-body"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          value={form.body}
          onChange={(event) => setForm({ ...form, body: event.target.value })}
          className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 leading-8 outline-none focus:border-cyan"
        />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs leading-6 text-muted-foreground">
            دیدگاه‌ها پس از بررسی مدیر منتشر می‌شوند. ایمیل شما نمایش داده نخواهد شد.
          </p>
          <button
            disabled={submitting}
            className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground disabled:opacity-50"
          >
            {submitting ? "در حال ارسال..." : "ارسال دیدگاه"}
          </button>
        </div>
        {message && (
          <p
            role="status"
            className={`mt-4 rounded-xl border p-3 text-sm ${
              messageType === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-red-500/30 bg-red-500/10 text-red-300"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      <div className="mt-8 space-y-4">
        {loading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            در حال دریافت دیدگاه‌ها...
          </p>
        ) : comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            هنوز دیدگاهی منتشر نشده است؛ شما اولین نفر باشید.
          </div>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-black">{comment.author_name}</h3>
                <time dateTime={comment.created_at} className="text-xs text-muted-foreground">
                  {formatDate(comment.created_at)}
                </time>
              </div>
              <p className="mt-4 whitespace-pre-wrap leading-8 text-foreground/85">
                {comment.body}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
