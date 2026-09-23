begin;

create table public.site_pages (
  slug text primary key check (slug = 'about'),
  content jsonb not null check (jsonb_typeof(content) = 'object'),
  updated_at timestamptz not null default now()
);
alter table public.site_pages enable row level security;
revoke all on public.site_pages from anon, authenticated;
grant select on public.site_pages to anon, authenticated;
grant insert, update on public.site_pages to authenticated;
create policy "public reads site pages" on public.site_pages
  for select to anon, authenticated using (true);
create policy "admins insert site pages" on public.site_pages
  for insert to authenticated with check (
    exists (select 1 from public.admin_users where user_id = (select auth.uid()))
  );
create policy "admins update site pages" on public.site_pages
  for update to authenticated using (
    exists (select 1 from public.admin_users where user_id = (select auth.uid()))
  ) with check (
    exists (select 1 from public.admin_users where user_id = (select auth.uid()))
  );

commit;
