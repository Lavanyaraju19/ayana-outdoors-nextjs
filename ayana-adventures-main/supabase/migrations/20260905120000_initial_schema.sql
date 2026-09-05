-- Ayana Outdoors: initial schema
-- One table per existing content array (see src/data/homepageContent.ts), plus admin_profiles
-- (authorization) and enquiries (the real contact/enquiry form backing store).

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- admin_profiles must exist before is_admin() references it.
create table public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

comment on table public.admin_profiles is
  'Presence of a row here is what every RLS policy below checks to authorize content writes. '
  'Rows are created only via the service-role key (seed script or Supabase dashboard) — there is '
  'no public admin signup path.';

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_profiles where user_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- Content tables (one per src/data/homepageContent.ts export)
-- ---------------------------------------------------------------------------

create table public.hero_content (
  id boolean primary key default true,
  eyebrow text not null,
  headline text not null,
  headline_highlight text not null,
  subheadline text not null,
  highlights text[] not null default '{}',
  cta_primary_label text not null,
  cta_primary_link text not null,
  cta_secondary_label text not null,
  cta_secondary_link text not null,
  cta_tertiary_label text,
  cta_tertiary_link text,
  updated_at timestamptz not null default now(),
  constraint hero_content_singleton check (id)
);

create table public.impact_stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  description text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.adventures (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_path text not null,
  description text not null,
  duration text not null,
  difficulty text not null,
  age_group text not null,
  learn_link text not null,
  enquiry_link text not null,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.why_ayana_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  link text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.journey_with_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  link text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  label text,
  description text not null,
  link text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_path text not null,
  description text not null,
  link text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Distinct from gallery_items (the homepage teaser cards): this is the actual photo grid
-- shown on the full /gallery page — just a caption + image, no link/description needed.
create table public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_path text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  link text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.founder_facts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.additional_faq_questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_options (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  action text not null,
  link text not null,
  external boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id boolean primary key default true,
  phone text not null,
  whatsapp_number text not null,
  email text not null,
  address_locality text not null,
  address_region text not null,
  social_instagram text,
  social_youtube text,
  social_facebook text,
  social_linkedin text,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id)
);

-- ---------------------------------------------------------------------------
-- Enquiries: the real form-submission table. Deliberately NOT called "bookings" —
-- there is no inventory, pricing, or payment provider to confirm a booking against yet.
-- A future `bookings` table can reference `enquiries.id` once a real provider exists.
-- ---------------------------------------------------------------------------

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text not null,
  child_name text,
  child_age text,
  adventure_id uuid references public.adventures (id) on delete set null,
  message text,
  source_page text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'processing', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index enquiries_status_idx on public.enquiries (status);
create index enquiries_created_at_idx on public.enquiries (created_at desc);
create index adventures_sort_order_idx on public.adventures (sort_order);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------

do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'hero_content', 'impact_stats', 'adventures', 'why_ayana_items', 'journey_with_items',
      'testimonials', 'gallery_items', 'gallery_photos', 'media_items', 'founder_facts', 'faq_items',
      'additional_faq_questions', 'contact_options', 'site_settings', 'enquiries'
    ])
  loop
    execute format(
      'create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.admin_profiles enable row level security;
alter table public.hero_content enable row level security;
alter table public.impact_stats enable row level security;
alter table public.adventures enable row level security;
alter table public.why_ayana_items enable row level security;
alter table public.journey_with_items enable row level security;
alter table public.testimonials enable row level security;
alter table public.gallery_items enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.media_items enable row level security;
alter table public.founder_facts enable row level security;
alter table public.faq_items enable row level security;
alter table public.additional_faq_questions enable row level security;
alter table public.contact_options enable row level security;
alter table public.site_settings enable row level security;
alter table public.enquiries enable row level security;

-- admin_profiles: a user may check only their own membership row (used by middleware).
-- Rows are created/removed only via the service-role key — no INSERT/UPDATE/DELETE policy exists.
create policy "self can read own admin profile" on public.admin_profiles
  for select using (user_id = auth.uid());

-- Public content tables: anyone can read; only admins can write.
create policy "public read hero_content" on public.hero_content for select using (true);
create policy "admin write hero_content" on public.hero_content for all using (public.is_admin()) with check (public.is_admin());

create policy "public read impact_stats" on public.impact_stats for select using (true);
create policy "admin write impact_stats" on public.impact_stats for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published adventures" on public.adventures for select using (is_published or public.is_admin());
create policy "admin write adventures" on public.adventures for all using (public.is_admin()) with check (public.is_admin());

create policy "public read why_ayana_items" on public.why_ayana_items for select using (true);
create policy "admin write why_ayana_items" on public.why_ayana_items for all using (public.is_admin()) with check (public.is_admin());

create policy "public read journey_with_items" on public.journey_with_items for select using (true);
create policy "admin write journey_with_items" on public.journey_with_items for all using (public.is_admin()) with check (public.is_admin());

create policy "public read testimonials" on public.testimonials for select using (true);
create policy "admin write testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());

create policy "public read gallery_items" on public.gallery_items for select using (true);
create policy "admin write gallery_items" on public.gallery_items for all using (public.is_admin()) with check (public.is_admin());

create policy "public read gallery_photos" on public.gallery_photos for select using (true);
create policy "admin write gallery_photos" on public.gallery_photos for all using (public.is_admin()) with check (public.is_admin());

create policy "public read media_items" on public.media_items for select using (true);
create policy "admin write media_items" on public.media_items for all using (public.is_admin()) with check (public.is_admin());

create policy "public read founder_facts" on public.founder_facts for select using (true);
create policy "admin write founder_facts" on public.founder_facts for all using (public.is_admin()) with check (public.is_admin());

create policy "public read faq_items" on public.faq_items for select using (true);
create policy "admin write faq_items" on public.faq_items for all using (public.is_admin()) with check (public.is_admin());

create policy "public read additional_faq_questions" on public.additional_faq_questions for select using (true);
create policy "admin write additional_faq_questions" on public.additional_faq_questions for all using (public.is_admin()) with check (public.is_admin());

create policy "public read contact_options" on public.contact_options for select using (true);
create policy "admin write contact_options" on public.contact_options for all using (public.is_admin()) with check (public.is_admin());

create policy "public read site_settings" on public.site_settings for select using (true);
create policy "admin write site_settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

-- Enquiries: anyone can submit one; only admins can read/manage them (protects visitor PII).
create policy "public can submit enquiry" on public.enquiries for insert with check (true);
create policy "admin read enquiries" on public.enquiries for select using (public.is_admin());
create policy "admin update enquiries" on public.enquiries for update using (public.is_admin()) with check (public.is_admin());
create policy "admin delete enquiries" on public.enquiries for delete using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage: admin-uploaded media (gallery photos, etc.)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media bucket" on storage.objects
  for select using (bucket_id = 'media');

create policy "admin write media bucket" on storage.objects
  for all using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());
