# HMI Paris

Static Nuxt site for HMI Paris. Pages are prerendered. The only live server endpoint is `POST /api/contact`, which sends enquiry mail via Resend.

## Setup

```bash
npm install
cp .env.example .env
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm run start
```

Prerendered HTML is generated at build time. Keep `RESEND_API_KEY`, `EMAIL_FROM`, and `CONTACT_TO` set so the contact form can deliver mail. Without `RESEND_API_KEY` the form still validates and accepts submissions locally; mail is skipped.

## Content

Copy lives in `app/data/` (`cms.ts`, `packages.ts`, `events.ts`). Edit those files and rebuild — there is no CMS.

## Agent discovery

- `/llms.txt`, `/llms-full.txt`, `/agents.txt`
- `/catalog.json`
- `/.well-known/agent-manifest.json`
