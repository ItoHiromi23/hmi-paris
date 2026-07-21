# HMI Paris — tourist packages platform

Professional **Paris** travel site built with **Nuxt 4** (TypeScript + Tailwind) and **Strapi 5**.

## Structure

```
frontend/   Nuxt storefront (Paris-focused)
backend/    Strapi CMS (packages, events, site copy)
```

## Quick start

### 1. Strapi (CMS)

```bash
cd backend
npm run develop
```

Open http://localhost:1337/admin and create the first admin user.  
On boot, Strapi seeds packages, events, and homepage CMS content (EN + JA) and opens public `find` / `findOne` permissions.

### 2. Nuxt (site)

```bash
cd frontend
npm run dev
```

Open http://localhost:3000.

Optional env (frontend):

```bash
NUXT_PUBLIC_STRAPI_URL=http://127.0.0.1:1337
NUXT_PUBLIC_SITE_URL=http://localhost:3000

# Contact form (Resend). Without the API key, submissions still validate locally.
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM=onboarding@resend.dev
CONTACT_TO=arditbhoti@gmail.com
```

## Deploy on Railway (frontend + backend)

Use **two services** in one Railway project, both from the same GitHub repo.

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
PUBLIC_URL=https://YOUR-BACKEND.up.railway.app
CORS_ORIGINS=https://YOUR-FRONTEND.up.railway.app
STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE=en
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
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM=onboarding@resend.dev
CONTACT_TO=arditbhoti@gmail.com
```

4. Generate a public domain, update backend `CORS_ORIGINS` + `PUBLIC_URL` and frontend `NUXT_PUBLIC_*` URLs, then redeploy.

Build/start commands come from `frontend/railway.toml` and `backend/railway.toml`.

## CMS & locales

Editorial content (packages, events, services, site settings, etc.) lives in Strapi with **English as default** and **Japanese as a linked locale**. Saving in one language can auto-fill the other when auto-translate is enabled (`AUTO_TRANSLATE`, optional `DEEPL_AUTH_KEY`).

## Brand

**HMI Paris** — curated Paris experiences.
