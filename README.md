# HMI Paris — tourist packages platform

Professional **Paris** travel site built with **Nuxt 4** (TypeScript + Tailwind) and **Strapi 5**.

## Structure

```
frontend/   Nuxt storefront (Paris-focused)
backend/    Strapi CMS (Tour Package content type)
```

## Quick start

### 1. Strapi (CMS)

```bash
cd backend
npm run develop
```

Open http://localhost:1337/admin and create the first admin user.  
On boot, Strapi seeds Paris packages (Louvre, Montmartre, Le Marais, Versailles, Left Bank, Seine) and opens public `find` / `findOne` permissions.

### 2. Nuxt (site)

```bash
cd frontend
npm run dev
```

Open http://localhost:3000.

Optional env (frontend):

```bash
NUXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

If Strapi is offline, the site falls back to local Paris sample packages.

## Deploy on Railway (frontend + backend)

Use **two services** in one Railway project, both from the same GitHub repo `ardithoti/meridia`.

### A. Backend (Strapi)

1. New service → Deploy from GitHub → this repo  
2. **Root Directory:** `backend`  
3. Add **PostgreSQL** and link it to the service  
4. Variables:

```bash
HOST=0.0.0.0
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_URL=${{Postgres.DATABASE_URL}}
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
ENCRYPTION_KEY=...
ORDERS_SHARED_SECRET=shared-secret-same-as-frontend
PUBLIC_URL=https://YOUR-BACKEND.up.railway.app
CORS_ORIGINS=https://YOUR-FRONTEND.up.railway.app
```

5. Generate a public domain for the service. Open `/admin` and create the first admin user.

### B. Frontend (Nuxt)

1. New service → same GitHub repo  
2. **Root Directory:** `frontend`  
3. Variables:

```bash
HOST=0.0.0.0
NITRO_HOST=0.0.0.0
NODE_ENV=production
NUXT_PUBLIC_SITE_URL=https://YOUR-FRONTEND.up.railway.app
NUXT_PUBLIC_STRAPI_URL=https://YOUR-BACKEND.up.railway.app
STRIPE_SECRET_KEY=sk_...
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
ORDERS_SHARED_SECRET=shared-secret-same-as-backend
RESEND_API_KEY=re_...   # optional
EMAIL_FROM=HMI Paris <bookings@yourdomain.com>
```

4. Generate a public domain. In Stripe, set the webhook to  
   `https://YOUR-FRONTEND.up.railway.app/api/webhooks/stripe`

5. After both domains exist, update backend `CORS_ORIGINS` + `PUBLIC_URL` and frontend `NUXT_PUBLIC_*` URLs, then redeploy.

Build/start commands come from `frontend/railway.toml` and `backend/railway.toml`.

## Agentic browsing files

Served from `frontend/public/`:

| File | Purpose |
|------|---------|
| `/robots.txt` | Crawl policy + AI bots allowed |
| `/llms.txt` | Curated map for LLMs |
| `/llms-full.txt` | Extended catalog + brand context |
| `/agents.txt` | Agent identity, terms, capabilities |
| `/.well-known/agent-manifest.json` | Machine-readable agent manifest |
| `/sitemap.xml` | URL index |

HTML `<head>` also links `rel="agent"` and `rel="llms"`.

## Lighthouse

Audit the **production** build (not `nuxt dev` — that skips minify and inflates JS):

```bash
cd frontend
npm run build
npm run preview
# then run Lighthouse against http://127.0.0.1:3000
```

## Brand

**HMI Paris** — curated Paris experiences. Design language: deep indigo, brass accents, cool paper ground, Cormorant Garamond + Outfit.

## Booking capacity (slots)

### Packages — date/time sessions

Each **Tour Package** has bookable **Tour Sessions** (Content Manager → Tour Session):

| Field | Meaning |
|-------|---------|
| `startsAt` / `endsAt` | Session date & time |
| `capacity` | Max bookings for that session (**1** = private tour; one booking reserves the time) |
| `sold` | Confirmed paid bookings (auto-increments) |
| `sessionStatus` | `open` / `closed` / `cancelled` |

Checkout requires choosing a date + time. Remaining = `capacity − sold − pending`.  
With **capacity 1** (private tours):
- Same **day** can sell multiple packages at **different hours** (e.g. 12:00 and 17:00)
- The same **hour** cannot be booked twice
- Days where every hour is reserved show as **Busy** (disabled) in the calendar
- Reserved hours show as **Reserved** (disabled); other hours on that day stay open
### Events — package-level slots

Each **Main Event** still uses:

| Field | Meaning |
|-------|---------|
| `slotsTotal` | How many bookings are available in total |
| `slotsSold` | Confirmed paid bookings |
| `bookingUnlimited` | If on, ignore caps |

Remaining = `slotsTotal − slotsSold − pending checkouts`.

## Package payments (Stripe)

Money goes to **your Stripe account**. Every payment is stored in Strapi as an **Order** (Content Manager → Order).

### 1. Stripe keys

1. Create a [Stripe](https://dashboard.stripe.com) account and complete payouts onboarding.
2. Copy **Secret key** (`sk_test_…` for test, `sk_live_…` for production) into `frontend/.env`:

```bash
STRIPE_SECRET_KEY=sk_test_...
ORDERS_SHARED_SECRET=<same long random string as backend>
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. In `backend/.env` set the **same** `ORDERS_SHARED_SECRET`.

### 2. Local webhook (required for “paid” status)

```bash
# install Stripe CLI, then:
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the printed `whsec_…` into `frontend/.env` as `STRIPE_WEBHOOK_SECRET`, then restart Nuxt.

### 3. Buy flow

1. Open a package detail page → **このパッケージを購入**
2. Enter email → redirect to Stripe Checkout
3. Pay with test card `4242 4242 4242 4242`
4. After success, check Strapi **Order** (status `paid`) and your Stripe Dashboard → Payments

Restart Strapi after pulling so the **Order** content type loads.

## Next: selling packages

Catalog stays in Strapi Tour Package. Checkout is handled by Nuxt + Stripe; Orders keep your payment history in Strapi Admin.
