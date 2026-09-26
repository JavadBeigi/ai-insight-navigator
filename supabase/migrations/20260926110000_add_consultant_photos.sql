begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'consultant-photos',
  'consultant-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "public reads consultant photos"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'consultant-photos');

create policy "admins upload consultant photos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'consultant-photos'
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

create policy "admins update consultant photos"
on storage.objects for update
to authenticated
using (
  bucket_id = 'consultant-photos'
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
)
with check (
  bucket_id = 'consultant-photos'
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

create policy "admins delete consultant photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'consultant-photos'
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

commit;
