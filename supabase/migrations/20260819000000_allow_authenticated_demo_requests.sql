grant insert (phone) on public.demo_requests to authenticated;

drop policy if exists "public can submit demo requests" on public.demo_requests;

create policy "public can submit demo requests"
on public.demo_requests for insert to anon, authenticated
with check (status = 'new');
