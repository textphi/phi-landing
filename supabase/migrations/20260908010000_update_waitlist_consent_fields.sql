do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'waitlist'
      and column_name = 'agreed_to_terms'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'waitlist'
      and column_name = 'agreed_to_terms_and_conditions'
  ) then
    alter table public.waitlist
      rename column agreed_to_terms to agreed_to_terms_and_conditions;
  end if;
end
$$;

alter table public.waitlist
  add column if not exists privacy_policy_version text
  not null default '2026-09-08';

do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conrelid = 'public.waitlist'::regclass
      and conname = 'waitlist_terms_must_be_accepted'
  ) and not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.waitlist'::regclass
      and conname = 'waitlist_terms_and_conditions_must_be_accepted'
  ) then
    alter table public.waitlist
      rename constraint waitlist_terms_must_be_accepted
      to waitlist_terms_and_conditions_must_be_accepted;
  end if;
end
$$;
