create table public.ai_maturity_assessments (
  id bigint generated always as identity primary key,
  access_token uuid not null unique,
  organization text not null,
  industry text not null,
  respondent_role text not null,
  phone text not null,
  answers jsonb not null,
  dimension_scores jsonb not null,
  overall_score integer not null,
  maturity_level integer not null,
  status text not null default 'result_ready',
  full_report_unlocked boolean not null default false,
  payment_confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_maturity_phone_format check (phone ~ '^09[0-9]{9}$'),
  constraint ai_maturity_score_check check (overall_score between 0 and 100),
  constraint ai_maturity_level_check check (maturity_level between 1 and 5),
  constraint ai_maturity_status_check check (status in ('result_ready', 'payment_requested', 'paid')),
  constraint ai_maturity_paid_unlock_check check (
    (status = 'paid' and full_report_unlocked and payment_confirmed_at is not null)
    or (status <> 'paid' and not full_report_unlocked and payment_confirmed_at is null)
  )
);

create index ai_maturity_assessments_status_created_at_idx
on public.ai_maturity_assessments (status, created_at desc);

alter table public.ai_maturity_assessments enable row level security;
revoke all on table public.ai_maturity_assessments from anon, authenticated;
grant insert (access_token, organization, industry, respondent_role, phone, answers, dimension_scores, overall_score, maturity_level)
on table public.ai_maturity_assessments to anon, authenticated;
grant select on table public.ai_maturity_assessments to anon, authenticated;
grant update (status, updated_at) on table public.ai_maturity_assessments to anon, authenticated;

create policy "visitor can create maturity assessment"
on public.ai_maturity_assessments for insert to anon, authenticated
with check (
  status = 'result_ready'
  and not full_report_unlocked
  and payment_confirmed_at is null
);

create policy "visitor can read assessment with bearer token"
on public.ai_maturity_assessments for select to anon, authenticated
using (
  access_token::text = coalesce(
    (current_setting('request.headers', true)::jsonb ->> 'x-assessment-token'),
    ''
  )
  or exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

create policy "visitor can request manual payment"
on public.ai_maturity_assessments for update to anon, authenticated
using (
  access_token::text = coalesce(
    (current_setting('request.headers', true)::jsonb ->> 'x-assessment-token'),
    ''
  )
  and status = 'result_ready'
  and not full_report_unlocked
)
with check (
  access_token::text = coalesce(
    (current_setting('request.headers', true)::jsonb ->> 'x-assessment-token'),
    ''
  )
  and status = 'payment_requested'
  and not full_report_unlocked
  and payment_confirmed_at is null
);

create policy "admin can update maturity assessments"
on public.ai_maturity_assessments for update to authenticated
using (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.admin_users
  where admin_users.user_id = (select auth.uid())
));

grant update (status, full_report_unlocked, payment_confirmed_at, updated_at)
on table public.ai_maturity_assessments to authenticated;
