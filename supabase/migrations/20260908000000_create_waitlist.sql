create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  phone_number text not null unique,
  agreed_to_terms_and_conditions boolean not null default false,
  terms_version text not null default '2026-09-08',
  privacy_policy_version text not null default '2026-09-08',
  agreed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint waitlist_terms_and_conditions_must_be_accepted
    check (agreed_to_terms_and_conditions = true)
);

comment on table public.waitlist is
  'Phone numbers submitted through the Phi beta waitlist.';

alter table public.waitlist enable row level security;

revoke all on table public.waitlist from anon, authenticated;
grant all on table public.waitlist to service_role;
