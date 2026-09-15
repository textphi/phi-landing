-- Add a first name to the beta waitlist. Nullable and additive on purpose: the
-- existing rows predate this field and simply stay null -- no data is cleared.
alter table public.waitlist
  add column if not exists first_name text;

comment on column public.waitlist.first_name is
  'First name captured on the waitlist form. Null for sign-ups from before this column existed.';
