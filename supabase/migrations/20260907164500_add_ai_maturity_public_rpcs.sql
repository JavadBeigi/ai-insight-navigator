create or replace function public.request_ai_maturity_report(p_access_token uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.ai_maturity_assessments
  set status = 'payment_requested', updated_at = now()
  where access_token = p_access_token
    and status = 'result_ready'
    and not full_report_unlocked;
  return found;
end;
$$;

create or replace function public.get_ai_maturity_assessment(p_access_token uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'organization', organization,
    'industry', industry,
    'respondent_role', respondent_role,
    'phone', phone,
    'answers', answers,
    'status', status,
    'full_report_unlocked', full_report_unlocked
  )
  from public.ai_maturity_assessments
  where access_token = p_access_token;
$$;

revoke all on function public.request_ai_maturity_report(uuid) from public;
revoke all on function public.get_ai_maturity_assessment(uuid) from public;
grant execute on function public.request_ai_maturity_report(uuid) to anon, authenticated;
grant execute on function public.get_ai_maturity_assessment(uuid) to anon, authenticated;
