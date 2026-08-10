// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

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
    "img-src 'self' data: blob: https:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
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
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/i18n'],
  i18n: {
    locales: [{ code: 'ja', language: 'ja', name: '日本語', file: 'ja.json' }],
    defaultLocale: 'ja',
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
  },
  css: ['~/assets/css/main.css'],
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
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Shippori+Mincho+B1:wght@500;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap',
        },
        { rel: 'agent', href: '/agents.txt' },
        { rel: 'llms', href: '/llms.txt' },
        { rel: 'llms-full', href: '/llms-full.txt' },
        { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'llms.txt' },
      ],
    },
  },
  runtimeConfig: {
    // Contact form emails via Resend (https://resend.com)
    resendApiKey: process.env.RESEND_API_KEY || '',
    emailFrom: process.env.EMAIL_FROM || 'onboarding@resend.dev',
    contactTo: process.env.CONTACT_TO || 'arditbhoti@gmail.com',
    public: {
      strapiUrl,
      siteUrl,
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
      // SWR only in production — in dev it blocks Strapi edits from showing for ~60s
      ...(isProd
        ? {
            '/': { swr: 60 },
            '/packages': { swr: 60 },
            '/events': { swr: 60 },
          }
        : {}),
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
