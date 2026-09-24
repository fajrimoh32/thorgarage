-- Seed accounts for real Supabase Auth login
-- 1) Create auth.users via Supabase Auth UI or dashboard
-- 2) Then run this SQL to assign roles and profile values

insert into public.profiles (id, name, email, role)
values
  ('00000000-0000-0000-0000-000000000001', 'Owner THOR', 'owner@thorgarage.id', 'owner'),
  ('00000000-0000-0000-0000-000000000002', 'Admin Workshop', 'admin@thorgarage.id', 'admin')
on conflict (id) do update
set name = excluded.name,
    email = excluded.email,
    role = excluded.role;

-- If you create real Supabase auth users later, update their profile rows with:
-- update public.profiles set role = 'owner' where email = 'owner@thorgarage.id';
-- update public.profiles set role = 'admin' where email = 'admin@thorgarage.id';
