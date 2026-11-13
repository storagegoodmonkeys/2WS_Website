-- Run ONCE in the NEW project: SQL Editor -> New query -> Run
-- Adds the phone column used by the contact form.
-- Stored in E.164 format (e.g. +905321234567).
alter table public.contact_messages
  add column if not exists phone text;
