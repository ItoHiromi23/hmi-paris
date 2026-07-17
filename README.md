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
