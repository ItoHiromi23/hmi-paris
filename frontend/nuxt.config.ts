// https://nuxt.com/docs/api/configuration/nuxt-config
const isProd = process.env.NODE_ENV === 'production'
const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'

function hostnameOf(url: string): string | null {
  try {
    return new URL(url).hostname
  } catch {
    return null
  }
}

const strapiHost = hostnameOf(strapiUrl)
const imageDomains = ['localhost', '127.0.0.1']
if (strapiHost && !imageDomains.includes(strapiHost)) {
  imageDomains.push(strapiHost)
}

const securityHeaders: Record<string, string> = {
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'cross-origin',
}

if (isProd) {
  securityHeaders['Strict-Transport-Security'] =
    'max-age=63072000; includeSubDomains; preload'
  securityHeaders['Content-Security-Policy'] = [
    "default-src 'self'",
    "img-src 'self' data: blob:",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "script-src 'self' 'unsafe-inline'",
    `connect-src 'self' ${strapiUrl} https:`,
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; ')
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Devtools adds third-party cookies / console noise in Lighthouse — local only
  devtools: { enabled: !isProd },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  css: [
    '@fontsource/noto-sans-jp/japanese-400.css',
    '@fontsource/noto-sans-jp/japanese-500.css',
    '@fontsource/noto-sans-jp/japanese-600.css',
    '@fontsource/noto-serif-jp/japanese-400.css',
    '@fontsource/noto-serif-jp/japanese-600.css',
    '@fontsource/cormorant-garamond/latin-400.css',
    '@fontsource/cormorant-garamond/latin-600.css',
    '@fontsource/outfit/latin-400.css',
    '@fontsource/outfit/latin-600.css',
    '~/assets/css/main.css',
  ],
  image: {
    domains: imageDomains,
    format: ['webp', 'avif'],
    quality: 70,
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1600,
    },
  },
  app: {
    head: {
      title: 'HMI Paris — パリ観光・専用車・空港送迎（日本語サポート）',
      htmlAttrs: { lang: 'ja' },
      meta: [
        {
          name: 'description',
          content:
            'パリ在住日本人スタッフによるプライベートツアー、専用車ガイド、空港送迎、通訳同行、オーダーメイド手配。',
        },
        { name: 'theme-color', content: '#0f766e' },
        { property: 'og:site_name', content: 'HMI Paris' },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'agent', href: '/agents.txt' },
        { rel: 'llms', href: '/llms.txt' },
        { rel: 'llms-full', href: '/llms-full.txt' },
        { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'llms.txt' },
      ],
    },
  },
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    ordersSharedSecret: process.env.ORDERS_SHARED_SECRET || '',
    // Booking confirmation emails via Resend (https://resend.com)
    resendApiKey: process.env.RESEND_API_KEY || '',
    emailFrom: process.env.EMAIL_FROM || 'HMI Paris <onboarding@resend.dev>',
    public: {
      strapiUrl,
      siteUrl,
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      stripeEnabled: Boolean(process.env.STRIPE_SECRET_KEY),
    },
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
  },
  nitro: {
    // Railway / Node long-running process (not serverless)
    preset: 'node-server',
    compressPublicAssets: true,
    routeRules: {
      '/**': { headers: securityHeaders },
      '/agents.txt': { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      '/llms.txt': { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      '/llms-full.txt': { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      '/robots.txt': { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      '/.well-known/agent-manifest.json': {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    },
  },
})
