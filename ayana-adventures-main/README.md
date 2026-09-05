# Ayana Outdoors

Marketing site + admin CMS + enquiry system for Ayana Outdoors, an outdoor learning program for
children, families and schools based in Bengaluru.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS + shadcn/ui + framer-motion
- **Supabase** — PostgreSQL (content + enquiries), Auth (admin login), Storage (admin-uploaded images)
- **Vitest** (unit tests) + **Playwright** (end-to-end tests, including admin/enquiry flows)

## Local development

Requires Node.js 20+, Docker (for the local Supabase stack), and the Supabase CLI (installed
automatically via `npx` — no global install needed).

```sh
npm install

# Start local Postgres/Auth/Storage (first run pulls Docker images, takes a few minutes)
npm run supabase:start

# Apply the schema and seed it with the site's current content
npm run db:reset

# Copy the local Supabase connection details into .env.local
cp .env.example .env.local

# Create a local admin account (uses DEV_ADMIN_EMAIL / DEV_ADMIN_PASSWORD from .env.local)
npm run db:seed:admin

npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` for
the admin CMS.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` / `npm run start` | Production build / production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright (starts the dev server automatically) |
| `npm run supabase:start` / `supabase:stop` | Local Supabase stack |
| `npm run db:reset` | Re-apply migrations + seed data to the local database |
| `npm run db:migration:new <name>` | Scaffold a new migration file |
| `npm run db:seed:admin` | Create/update the local dev admin account |

## Project structure

- `src/app/` — routes (App Router). `src/app/admin/` is the CMS, gated by `src/middleware.ts`.
- `src/components/` — shared UI, ported 1:1 from the original design (visuals unchanged).
- `src/lib/content.ts` — typed read helpers for every content table.
- `src/app/admin/actions/` — server actions for content CRUD, auth, and media uploads.
- `supabase/migrations/` — schema (one table per content section) + RLS policies.
- `supabase/seed.sql` — the site's current content, so a fresh database matches production content.
- `tests/` — Playwright specs (`admin-cms.spec.ts` for CMS/enquiry flows, `responsiveness.spec.ts`
  and `screenshots.spec.ts` for layout across 9 device profiles).

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for setting up a production Supabase project and deploying
to Hostinger.
