import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { ADMIN_EMAIL, formatDate } from "@/lib/site";
import type { Database } from "@/lib/database.types";

type DemoRequest = Database["public"]["Tables"]["demo_requests"]["Row"];
type Article = Database["public"]["Tables"]["articles"]["Row"];
type BlogComment = Database["public"]["Tables"]["blog_comments"]["Row"];
type Tab = "requests" | "articles" | "comments";

const emptyArticle = {
  id: null as number | null,
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  status: "draft",
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "پنل مدیریت nexation" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("requests");
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [articleForm, setArticleForm] = useState({ ...emptyArticle });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const pendingCommentsCount = comments.filter((comment) => comment.status === "pending").length;
  const articlesById = useMemo(
    () => new Map(articles.map((article) => [article.id, article])),
    [articles],
  );

  const verifyAdmin = useCallback(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      setAuthorized(false);
      setChecking(false);
      return;
    }

    const { data } = await supabase.from("admin_users").select("user_id").maybeSingle();
    if (!data) await supabase.auth.signOut();
    setAuthorized(Boolean(data));
    setChecking(false);
  }, []);

  const loadData = useCallback(async () => {
    const [requestResult, articleResult, commentResult] = await Promise.all([
      supabase.from("demo_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("articles").select("*").order("created_at", { ascending: false }),
      supabase.from("blog_comments").select("*").order("created_at", { ascending: false }),
    ]);
    setRequests(requestResult.data ?? []);
    setArticles(articleResult.data ?? []);
    setComments(commentResult.data ?? []);
  }, []);

  useEffect(() => {
    void verifyAdmin();
  }, [verifyAdmin]);
  useEffect(() => {
    if (authorized) void loadData();
  }, [authorized, loadData]);

  async function login(event: FormEvent) {
    event.preventDefault();
    setLoginError("");
    setSaving(true);
    const { error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
    if (error) {
      setLoginError("نام کاربری یا رمز عبور صحیح نیست.");
      setSaving(false);
      return;
    }
    await verifyAdmin();
    setSaving(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setAuthorized(false);
  }

  async function updateRequestStatus(id: number, status: "new" | "contacted") {
    const { error } = await supabase
      .from("demo_requests")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) setMessage("تغییر وضعیت ذخیره نشد.");
    else
      setRequests((current) =>
        current.map((item) => (item.id === id ? { ...item, status } : item)),
      );
  }

  async function saveArticle(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setSaving(true);
    const now = new Date().toISOString();
    const payload = {
      title: articleForm.title.trim(),
      slug: articleForm.slug.trim().toLowerCase(),
      excerpt: articleForm.excerpt.trim(),
      content: articleForm.content.trim(),
      status: articleForm.status,
      published_at: articleForm.status === "published" ? now : null,
      updated_at: now,
    };
    const result = articleForm.id
      ? await supabase.from("articles").update(payload).eq("id", articleForm.id)
      : await supabase.from("articles").insert(payload);

    if (result.error)
      setMessage(
        result.error.code === "23505" ? "آدرس مقاله تکراری است." : "ذخیره مقاله انجام نشد.",
      );
    else {
      setMessage("مقاله با موفقیت ذخیره شد.");
      setArticleForm({ ...emptyArticle });
      await loadData();
    }
    setSaving(false);
  }

  async function deleteArticle(id: number) {
    if (!window.confirm("این مقاله حذف شود؟")) return;
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) setMessage("حذف مقاله انجام نشد.");
    else {
      setArticles((current) => current.filter((article) => article.id !== id));
      if (articleForm.id === id) setArticleForm({ ...emptyArticle });
    }
  }

  async function updateCommentStatus(id: number, status: "approved" | "rejected") {
    const { error } = await supabase
      .from("blog_comments")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) setMessage("تغییر وضعیت دیدگاه ذخیره نشد.");
    else {
      setComments((current) =>
        current.map((comment) => (comment.id === id ? { ...comment, status } : comment)),
      );
      setMessage(status === "approved" ? "دیدگاه منتشر شد." : "دیدگاه رد شد.");
    }
  }

  async function deleteComment(id: number) {
    if (!window.confirm("این دیدگاه برای همیشه حذف شود؟")) return;
    const { error } = await supabase.from("blog_comments").delete().eq("id", id);
    if (error) setMessage("حذف دیدگاه انجام نشد.");
    else {
      setComments((current) => current.filter((comment) => comment.id !== id));
      setMessage("دیدگاه حذف شد.");
    }
  }

  if (checking)
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        در حال بررسی دسترسی...
      </main>
    );

  if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-2xl"
        >
          <Link to="/" className="text-xl font-black">
            nexation<span className="text-cyan">.</span>
          </Link>
          <h1 className="mt-8 text-2xl font-black">ورود مدیر</h1>
          <label className="mt-6 block text-sm text-muted-foreground">نام کاربری</label>
          <input
            value="admin"
            disabled
            dir="ltr"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-left text-sm opacity-70"
          />
          <label className="mt-4 block text-sm text-muted-foreground">رمز عبور</label>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            dir="ltr"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-left text-sm outline-none focus:border-cyan"
          />
          {loginError && <p className="mt-3 text-sm text-red-400">{loginError}</p>}
          <button
            disabled={saving}
            className="mt-6 w-full rounded-xl bg-primary px-5 py-3 font-bold disabled:opacity-50"
          >
            {saving ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-5">
            <Link to="/" className="text-lg font-black">
              nexation<span className="text-cyan">.</span>
            </Link>
            <span className="text-xs text-muted-foreground">پنل مدیریت</span>
          </div>
          <button onClick={logout} className="text-sm text-muted-foreground hover:text-foreground">
            خروج
          </button>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("requests")}
            className={`rounded-xl px-5 py-3 text-sm font-bold ${tab === "requests" ? "bg-primary" : "bg-card text-muted-foreground"}`}
          >
            درخواست‌های دمو
          </button>
          <button
            onClick={() => setTab("articles")}
            className={`rounded-xl px-5 py-3 text-sm font-bold ${tab === "articles" ? "bg-primary" : "bg-card text-muted-foreground"}`}
          >
            مقالات
          </button>
          <button
            onClick={() => setTab("comments")}
            className={`rounded-xl px-5 py-3 text-sm font-bold ${tab === "comments" ? "bg-primary" : "bg-card text-muted-foreground"}`}
          >
            دیدگاه‌ها
            {pendingCommentsCount > 0 && (
              <span className="mr-2 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-300">
                {pendingCommentsCount.toLocaleString("fa-IR")}
              </span>
            )}
          </button>
        </div>

        {message && (
          <div className="mt-6 rounded-xl border border-cyan/30 bg-cyan/10 p-4 text-sm text-cyan">
            {message}
          </div>
        )}

        {tab === "requests" ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border px-6 py-5">
              <h1 className="text-xl font-black">درخواست‌های دمو</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {requests.length} درخواست ثبت شده
              </p>
            </div>
            {requests.length === 0 ? (
              <p className="p-10 text-center text-muted-foreground">هنوز درخواستی ثبت نشده است.</p>
            ) : (
              requests.map((request) => (
                <div
                  key={request.id}
                  className="grid gap-4 border-b border-border px-6 py-5 last:border-0 md:grid-cols-[1fr_1fr_auto] md:items-center"
                >
                  <div>
                    <a
                      href={`tel:${request.phone}`}
                      dir="ltr"
                      className="font-mono text-lg font-bold text-cyan hover:underline"
                    >
                      {request.phone}
                    </a>
                    <p className="mt-1 text-xs text-muted-foreground" dir="ltr">
                      {formatDate(request.created_at)}
                    </p>
                  </div>
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs ${request.status === "contacted" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}
                  >
                    {request.status === "contacted" ? "تماس گرفته شد" : "جدید"}
                  </span>
                  <button
                    onClick={() =>
                      updateRequestStatus(
                        request.id,
                        request.status === "contacted" ? "new" : "contacted",
                      )
                    }
                    className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-white/5"
                  >
                    {request.status === "contacted" ? "بازگرداندن به جدید" : "ثبت تماس"}
                  </button>
                </div>
              ))
            )}
          </div>
        ) : tab === "articles" ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <form onSubmit={saveArticle} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-black">
                  {articleForm.id ? "ویرایش مقاله" : "مقاله جدید"}
                </h1>
                {articleForm.id && (
                  <button
                    type="button"
                    onClick={() => setArticleForm({ ...emptyArticle })}
                    className="text-xs text-muted-foreground"
                  >
                    انصراف
                  </button>
                )}
              </div>
              <label className="mt-5 block text-sm text-muted-foreground">عنوان</label>
              <input
                required
                value={articleForm.title}
                onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-cyan"
              />
              <label className="mt-4 block text-sm text-muted-foreground">آدرس انگلیسی مقاله</label>
              <input
                required
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                dir="ltr"
                placeholder="ai-for-business"
                value={articleForm.slug}
                onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-left outline-none focus:border-cyan"
              />
              <label className="mt-4 block text-sm text-muted-foreground">خلاصه</label>
              <textarea
                required
                rows={3}
                value={articleForm.excerpt}
                onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-cyan"
              />
              <label className="mt-4 block text-sm text-muted-foreground">متن مقاله</label>
              <textarea
                required
                rows={12}
                value={articleForm.content}
                onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 leading-8 outline-none focus:border-cyan"
              />
              <label className="mt-4 block text-sm text-muted-foreground">وضعیت</label>
              <select
                value={articleForm.status}
                onChange={(e) => setArticleForm({ ...articleForm, status: e.target.value })}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3"
              >
                <option value="draft">پیش‌نویس</option>
                <option value="published">منتشرشده</option>
              </select>
              <button
                disabled={saving}
                className="mt-6 w-full rounded-xl bg-primary px-5 py-3 font-bold disabled:opacity-50"
              >
                {saving ? "در حال ذخیره..." : "ذخیره مقاله"}
              </button>
            </form>
            <div className="space-y-4">
              {articles.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
                  هنوز مقاله‌ای ساخته نشده است.
                </div>
              ) : (
                articles.map((article) => (
                  <div key={article.id} className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs ${article.status === "published" ? "bg-emerald-500/15 text-emerald-300" : "bg-white/5 text-muted-foreground"}`}
                        >
                          {article.status === "published" ? "منتشرشده" : "پیش‌نویس"}
                        </span>
                        <h2 className="mt-3 text-lg font-black">{article.title}</h2>
                        <p className="mt-2 text-xs text-muted-foreground" dir="ltr">
                          /blog/{article.slug}
                        </p>
                      </div>
                      <time className="text-xs text-muted-foreground" dir="ltr">
                        {formatDate(article.updated_at)}
                      </time>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() =>
                          setArticleForm({
                            id: article.id,
                            title: article.title,
                            slug: article.slug,
                            excerpt: article.excerpt,
                            content: article.content,
                            status: article.status,
                          })
                        }
                        className="rounded-lg border border-border px-4 py-2 text-sm"
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-300"
                      >
                        حذف
                      </button>
                      {article.status === "published" && (
                        <Link
                          to="/blog/$slug"
                          params={{ slug: article.slug }}
                          className="rounded-lg border border-border px-4 py-2 text-sm text-cyan"
                        >
                          مشاهده
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border px-6 py-5">
              <h1 className="text-xl font-black">مدیریت دیدگاه‌ها</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {pendingCommentsCount.toLocaleString("fa-IR")} دیدگاه در انتظار بررسی
              </p>
            </div>
            {comments.length === 0 ? (
              <p className="p-10 text-center text-muted-foreground">هنوز دیدگاهی ثبت نشده است.</p>
            ) : (
              comments.map((comment) => {
                const article = articlesById.get(comment.article_id);
                return (
                  <article key={comment.id} className="border-b border-border p-6 last:border-0">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="font-black">{comment.author_name}</h2>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs ${
                              comment.status === "approved"
                                ? "bg-emerald-500/15 text-emerald-300"
                                : comment.status === "rejected"
                                  ? "bg-red-500/15 text-red-300"
                                  : "bg-amber-500/15 text-amber-300"
                            }`}
                          >
                            {comment.status === "approved"
                              ? "منتشرشده"
                              : comment.status === "rejected"
                                ? "ردشده"
                                : "در انتظار"}
                          </span>
                        </div>
                        {comment.email && (
                          <a
                            href={`mailto:${comment.email}`}
                            dir="ltr"
                            className="mt-2 block text-sm text-cyan hover:underline"
                          >
                            {comment.email}
                          </a>
                        )}
                        <p className="mt-2 text-xs text-muted-foreground">
                          برای: {article?.title ?? `مقاله شماره ${comment.article_id}`}
                        </p>
                      </div>
                      <time className="text-xs text-muted-foreground" dir="ltr">
                        {formatDate(comment.created_at)}
                      </time>
                    </div>
                    <p className="mt-5 whitespace-pre-wrap rounded-xl bg-background p-4 leading-8">
                      {comment.body}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {comment.status !== "approved" && (
                        <button
                          onClick={() => updateCommentStatus(comment.id, "approved")}
                          className="rounded-lg border border-emerald-500/30 px-4 py-2 text-sm text-emerald-300"
                        >
                          تأیید و انتشار
                        </button>
                      )}
                      {comment.status !== "rejected" && (
                        <button
                          onClick={() => updateCommentStatus(comment.id, "rejected")}
                          className="rounded-lg border border-amber-500/30 px-4 py-2 text-sm text-amber-300"
                        >
                          رد کردن
                        </button>
                      )}
                      {article?.status === "published" && (
                        <Link
                          to="/blog/$slug"
                          params={{ slug: article.slug }}
                          className="rounded-lg border border-border px-4 py-2 text-sm text-cyan"
                        >
                          مشاهده مقاله
                        </Link>
                      )}
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-300"
                      >
                        حذف
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        )}
      </section>
    </main>
  );
}
