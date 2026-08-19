// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

const isProd = process.env.NODE_ENV === 'production'
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const securityHeaders: Record<string, string> = {
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
}

if (isProd) {
  securityHeaders['Strict-Transport-Security'] =
    'max-age=63072000; includeSubDomains; preload'
  securityHeaders['Content-Security-Policy'] = [
    "default-src 'self'",
    "img-src 'self' data: blob:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "script-src 'self' 'unsafe-inline'",
    "connect-src 'self'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; ')
}

const jaFontsHref =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Shippori+Mincho+B1:wght@700&family=Zen+Kaku+Gothic+New:wght@400;700&display=swap'

const prerenderRoutes = [
  '/',
  '/packages',
  '/events',
  '/about',
  '/contact',
  '/privacy',
  '/legal',
  '/cookies',
  '/packages/classic-paris-essentials',
  '/packages/montmartre-after-dark',
  '/packages/le-marais-private-walk',
  '/packages/versailles-royal-day',
  '/packages/left-bank-literary-trail',
  '/packages/seine-twilight-cruise',
  '/events/arc-de-triomphe-2026',
  '/events/paris-christmas-lights-2026',
  '/destinations/mont-saint-michel',
  '/destinations/paris',
  '/destinations/champagne',
  '/destinations/versailles',
  '/destinations/auvers-sur-oise',
  '/destinations/giverny',
]

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Devtools adds third-party cookies / console noise in Lighthouse — local only
  devtools: { enabled: !isProd },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/i18n'],
  i18n: {
    locales: [{ code: 'ja', language: 'ja', name: '日本語', file: 'ja.json' }],
    defaultLocale: 'ja',
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
  },
  css: ['~/assets/css/main.css'],
  router: {
    options: {
      scrollBehaviorType: 'auto',
    },
  },
  image: {
    provider: 'ipx',
    domains: ['localhost', '127.0.0.1'],
    format: ['webp', 'avif'],
    quality: 60,
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
      title: 'トップ｜HMI PARIS',
      htmlAttrs: { lang: 'ja' },
      meta: [
        {
          name: 'description',
          content:
            'パリ発の日本語 旅行・コンシェルジュサービス HMI PARIS。観光ツアー、専用車＆ガイド、通訳・アテンド。',
        },
        { name: 'theme-color', content: '#15223b' },
        { property: 'og:site_name', content: 'HMI Paris' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ja_JP' },
        { property: 'og:image', content: '/og.jpg' },
        { property: 'og:image:secure_url', content: '/og.jpg' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'HMI Paris' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/og.jpg' },
        { name: 'twitter:image:alt', content: 'HMI Paris' },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'image_src', href: '/og.jpg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: jaFontsHref,
          media: 'print',
          onload: "this.media='all'",
          'data-hmi-fonts': '1',
        },
        { rel: 'agent', href: '/agents.txt' },
        { rel: 'llms', href: '/llms.txt' },
        { rel: 'llms-full', href: '/llms-full.txt' },
        { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'llms.txt' },
        { rel: 'alternate', type: 'application/json', href: '/catalog.json', title: 'catalog' },
      ],
      noscript: [{ innerHTML: `<link rel="stylesheet" href="${jaFontsHref}">` }],
    },
  },
  runtimeConfig: {
    // Contact form emails via Resend (https://resend.com)
    // Set these on the host (Vercel/Railway). Nuxt also accepts NUXT_RESEND_API_KEY, etc.
    resendApiKey: process.env.RESEND_API_KEY || '',
    emailFrom: process.env.EMAIL_FROM || 'HMI Paris <onboarding@resend.dev>',
    contactTo: process.env.CONTACT_TO || 'info@hmiparis.com',
    public: {
      siteUrl,
    },
  },
  vite: {
    build: {
      cssMinify: 'esbuild',
      minify: 'esbuild',
      sourcemap: false,
      cssCodeSplit: true,
    },
  },
  nitro: {
    // Vercel needs its own preset so POST /api/contact becomes a serverless function.
    // Railway / a plain Node host still uses the standalone server.
    preset: process.env.VERCEL ? 'vercel' : 'node-server',
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: true,
      routes: prerenderRoutes,
      ignore: ['/_ipx/**'],
    },
    routeRules: {
      '/**': {
        headers: {
          ...securityHeaders,
          'Cache-Control': 'public, max-age=300',
        },
      },
      '/_nuxt/**': {
        headers: {
          ...securityHeaders,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      },
      '/_ipx/**': {
        headers: {
          ...securityHeaders,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      },
      '/images/**': {
        headers: {
          ...securityHeaders,
          'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=604800',
        },
      },
      '/api/contact': {
        prerender: false,
        headers: { ...securityHeaders, 'Cache-Control': 'no-store' },
      },
      '/agents.txt': { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      '/llms.txt': { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      '/llms-full.txt': { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      '/robots.txt': { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      '/catalog.json': { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
      '/.well-known/agent-manifest.json': {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    },
  },
})
