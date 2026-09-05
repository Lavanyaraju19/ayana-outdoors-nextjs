# Deploying Ayana Outdoors

This app is a standard Next.js App Router application (`next build` / `next start`) backed by
Supabase (PostgreSQL + Auth + Storage). It has no Vercel-specific or Hostinger-specific code —
the same build runs anywhere Node.js runs.

## 1. Set up production Supabase

The app has been built and fully tested against a **local** Supabase instance
(`supabase start`, via the Supabase CLI + Docker). For production you need a real hosted project:

1. Create a project at [supabase.com](https://supabase.com) (free tier is enough to start).
2. In the SQL Editor (or via `supabase db push` from this repo, linked to the project with
   `supabase link`), run the migration in `supabase/migrations/20260905120000_initial_schema.sql`.
3. Run the contents of `supabase/seed.sql` once, so the site launches with the same content
   it has today (you can then edit everything through `/admin` afterwards).
4. Create the first admin account: Authentication → Users → Add user (email + password), then
   in the SQL Editor:
   ```sql
   insert into admin_profiles (user_id, full_name, role)
   values ('<the new user''s UUID>', 'Your Name', 'admin');
   ```
5. From Project Settings → API, copy the Project URL, anon key, and service_role key.

## 2. Environment variables

Copy `.env.example` and fill in the real values from step 1:

| Variable | Where it's used | Exposed to browser? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public site + admin | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public site + admin | Yes (safe — RLS enforces access) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only helper (`createServiceRoleClient`, currently unused by any active code path) | **Never** — do not add a `NEXT_PUBLIC_` prefix to this |
| `RESEND_API_KEY` | Enquiry notification emails | No — optional, leave blank to skip email notifications (enquiries are still saved) |
| `ENQUIRY_NOTIFICATION_EMAIL` | Which inbox gets notified of new enquiries | No — optional |

## 3. Deploy to Hostinger

Hostinger's **Node.js Web Apps Hosting** (via hPanel → Websites → Add Website → Node.js Apps)
runs a standard `npm run build` / `npm run start` — no custom server file or adapter is needed.

1. In hPanel, create a new Node.js app and point it at this repository (GitHub import, or upload).
2. Node.js version: 20.x or 22.x (set in `package.json`'s `engines` field; Hostinger supports 18/20/22/24).
3. Build command: `npm run build`. Start command: `npm run start`.
4. Add the environment variables from step 2 in the app's settings panel.
5. Deploy. Hostinger builds files outside `public_html` and routes requests to the Node
   process automatically.

**Important — this project does not use SSH-based migrations.** Hostinger's Node.js hosting
doesn't provide shell access for one-off commands, so apply Supabase migrations directly against
your Supabase project (via the Supabase CLI from your own machine, or the SQL Editor) — not from
the Hostinger app itself.

### Domain & HTTPS

Point your domain at the Hostinger-assigned app (or use their custom domain flow in hPanel).
Hostinger provisions HTTPS automatically for domains added through hPanel.

## 4. Verify after deploying

- [ ] Visit every public route (see the route table in the audit report) and confirm real content loads.
- [ ] Log in at `/admin/login` with the account created in step 1.4, confirm the dashboard loads.
- [ ] Edit one piece of content (e.g. an FAQ) and confirm it appears on the public page without a redeploy.
- [ ] Submit the contact form as a test visitor and confirm it appears under `/admin/enquiries`.
- [ ] Confirm `/admin` redirects to `/admin/login` when signed out (in a private/incognito window).
- [ ] Confirm both background videos (`/videos/hero-loop.mp4` on the homepage, `/assets/internal-video.mp4`
      on interior pages) load and autoplay.

## What's intentionally not wired up yet

- **Real admin credentials for production** — only a local dev account exists (`scripts/seed-admin.ts`).
  Create real ones per step 1.4 above; do not run the seed script against production.
- **Email delivery** — the integration boundary exists (`src/app/actions/enquiry.ts`, `notifyNewEnquiry`)
  and is safe to leave disabled (`RESEND_API_KEY` unset); enquiries are always saved to the database
  regardless. Set the two env vars above once you have a Resend account to enable it.
- **Payments / live booking availability** — nothing exists for this because no provider, pricing,
  or availability policy was supplied. The `enquiries` table is designed so a future `bookings`
  table can reference `enquiries.id` once that's ready; nothing here needs to change to add it.
