-- THOR GARAGE database schema for Supabase

create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  role text not null default 'admin' check (role in ('owner', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists customers (
  id text primary key,
  name text not null,
  phone text,
  vehicle text,
  plate text,
  status text not null default 'Active',
  created_at timestamptz not null default now()
);

create table if not exists inventory (
  id text primary key,
  name text not null,
  sku text not null unique,
  stock integer not null default 0,
  unit text not null default 'pcs',
  status text not null default 'Ready',
  created_at timestamptz not null default now()
);

create table if not exists service_queue (
  id text primary key,
  customer text not null,
  bike text,
  service text not null,
  mechanic text,
  eta text,
  status text not null default 'Waiting',
  amount text default 'Rp 0',
  created_at timestamptz not null default now()
);

create table if not exists transactions (
  id text primary key,
  customer text not null,
  vehicle text,
  service text,
  method text,
  total integer not null default 0,
  due integer not null default 0,
  status text not null default 'Pending',
  cashier text,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id text primary key,
  customer text not null,
  method text,
  total integer not null default 0,
  due integer not null default 0,
  status text not null default 'Pending',
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table customers enable row level security;
alter table inventory enable row level security;
alter table service_queue enable row level security;
alter table transactions enable row level security;
alter table payments enable row level security;

create policy "profiles_read_own" on profiles
for select using (auth.uid() = id);

create policy "profiles_update_own" on profiles
for update using (auth.uid() = id);

create policy "all_authenticated_can_read_customers" on customers
for select using (auth.role() = 'authenticated');

create policy "all_authenticated_can_write_customers" on customers
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "all_authenticated_can_read_inventory" on inventory
for select using (auth.role() = 'authenticated');

create policy "all_authenticated_can_write_inventory" on inventory
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "all_authenticated_can_read_queue" on service_queue
for select using (auth.role() = 'authenticated');

create policy "all_authenticated_can_write_queue" on service_queue
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "all_authenticated_can_read_transactions" on transactions
for select using (auth.role() = 'authenticated');

create policy "all_authenticated_can_write_transactions" on transactions
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "all_authenticated_can_read_payments" on payments
for select using (auth.role() = 'authenticated');

create policy "all_authenticated_can_write_payments" on payments
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    'admin'
  )
  on conflict (id) do update
    set name = excluded.name,
        email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- sample seed data
insert into customers (id, name, phone, vehicle, plate, status)
values
  ('C-1001', 'Rafi Ardi', '0812-3456-7788', 'Vario 150', 'B 1337 ATO', 'Active'),
  ('C-1002', 'Nanda Putri', '0858-4421-9000', 'RX King', 'B 7781 TQG', 'Repeat'),
  ('C-1003', 'Hendra S', '0821-9901-2112', 'Beat Street', 'B 2210 KJY', 'Active')
on conflict (id) do nothing;

insert into inventory (id, name, sku, stock, unit, status)
values
  ('P-2001', 'Oli Mesin 10W-40', 'OLI-10W40', 12, 'pcs', 'Ready'),
  ('P-2002', 'Brake Pad Depan', 'BP-DP-12', 4, 'set', 'Low'),
  ('P-2003', 'Filter Udara', 'FLT-UDR-22', 7, 'pcs', 'Ready')
on conflict (id) do nothing;

insert into service_queue (id, customer, bike, service, mechanic, eta, status, amount)
values
  ('TS-2041', 'Rafi Ardi', 'Vario 150', 'Tune Up', 'Adit', '20 min', 'In Progress', 'Rp 420.000'),
  ('TS-2042', 'Nanda Putri', 'RX King', 'Ganti Ban', 'Bima', '12 min', 'Waiting', 'Rp 310.000')
on conflict (id) do nothing;

insert into transactions (id, customer, vehicle, service, method, total, due, status, cashier)
values
  ('INV-9012', 'Rafi Ardi', 'Vario 150', 'Tune Up', 'Cash', 420000, 0, 'Paid', 'Owner'),
  ('INV-9013', 'Nanda Putri', 'RX King', 'Ganti Ban', 'Transfer', 310000, 310000, 'Pending', 'Admin')
on conflict (id) do nothing;
