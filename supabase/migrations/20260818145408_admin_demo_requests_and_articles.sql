create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.demo_requests (
  id bigint generated always as identity primary key,
  phone text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint demo_requests_phone_format check (phone ~ '^09[0-9]{9}$'),
  constraint demo_requests_status_check check (status in ('new', 'contacted'))
);

create table if not exists public.articles (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint articles_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint articles_status_check check (status in ('draft', 'published')),
  constraint articles_publish_date_check check (
    status = 'draft' or (status = 'published' and published_at is not null)
  )
);

create index if not exists demo_requests_created_at_idx on public.demo_requests (created_at desc);
create index if not exists demo_requests_status_created_at_idx on public.demo_requests (status, created_at desc);
create index if not exists articles_status_published_at_idx on public.articles (status, published_at desc);

alter table public.admin_users enable row level security;
alter table public.demo_requests enable row level security;
alter table public.articles enable row level security;

revoke all on public.admin_users from anon, authenticated;
revoke all on public.demo_requests from anon, authenticated;
revoke all on public.articles from anon, authenticated;
grant select on public.admin_users to authenticated;
grant insert (phone) on public.demo_requests to anon;
grant select, update on public.demo_requests to authenticated;
grant select on public.articles to anon;
grant select, insert, update, delete on public.articles to authenticated;

create policy "admin can read own membership"
on public.admin_users for select to authenticated
using ((select auth.uid()) = user_id);

create policy "public can submit demo requests"
on public.demo_requests for insert to anon
with check (status = 'new');

create policy "admin can read demo requests"
on public.demo_requests for select to authenticated
using (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
));

create policy "admin can update demo requests"
on public.demo_requests for update to authenticated
using (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
));

create policy "public can read published articles"
on public.articles for select to anon
using (status = 'published' and published_at is not null and published_at <= now());

create policy "admin can read all articles"
on public.articles for select to authenticated
using (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
));

create policy "admin can insert articles"
on public.articles for insert to authenticated
with check (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
));

create policy "admin can update articles"
on public.articles for update to authenticated
using (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
));

create policy "admin can delete articles"
on public.articles for delete to authenticated
using (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
));
