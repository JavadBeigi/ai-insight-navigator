create table public.blog_comments (
  id bigint generated always as identity primary key,
  article_id bigint not null references public.articles(id) on delete cascade,
  author_name text not null,
  email text,
  body text not null,
  status text not null default 'pending',
  website text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_comments_author_name_length check (
    char_length(btrim(author_name)) between 2 and 80
  ),
  constraint blog_comments_email_format check (
    email is null or email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ),
  constraint blog_comments_email_length check (
    email is null or char_length(email) <= 254
  ),
  constraint blog_comments_body_length check (
    char_length(btrim(body)) between 10 and 2000
  ),
  constraint blog_comments_status_check check (
    status in ('pending', 'approved', 'rejected')
  ),
  constraint blog_comments_honeypot_empty check (website = '')
);

create index blog_comments_article_status_created_at_idx
on public.blog_comments (article_id, status, created_at desc);

create index blog_comments_status_created_at_idx
on public.blog_comments (status, created_at desc);

alter table public.blog_comments enable row level security;

revoke all on public.blog_comments from anon, authenticated;
grant insert (article_id, author_name, email, body, website)
on public.blog_comments to anon, authenticated;
grant select (id, article_id, author_name, body, created_at)
on public.blog_comments to anon;
grant select, update, delete on public.blog_comments to authenticated;

create policy "public can submit pending comments"
on public.blog_comments for insert to anon, authenticated
with check (
  status = 'pending'
  and website = ''
  and exists (
    select 1
    from public.articles
    where articles.id = blog_comments.article_id
      and articles.status = 'published'
      and articles.published_at is not null
      and articles.published_at <= now()
  )
);

create policy "public can read approved comments"
on public.blog_comments for select to anon
using (status = 'approved');

create policy "admin can read all comments"
on public.blog_comments for select to authenticated
using (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
));

create policy "admin can update comments"
on public.blog_comments for update to authenticated
using (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
));

create policy "admin can delete comments"
on public.blog_comments for delete to authenticated
using (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
));
