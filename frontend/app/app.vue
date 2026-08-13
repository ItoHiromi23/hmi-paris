<script setup lang="ts">
import { cmsBundle } from '~/data/cms'

const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
const requestURL = useRequestURL()
const s = cmsBundle.settings

const ogOrigin = computed(() => {
  const host = requestURL.host || ''
  if (!host || host.includes('localhost') || host.startsWith('127.0.0.1')) {
    return ''
  }
  return requestURL.origin
})
const ogImage = computed(() =>
  ogOrigin.value ? `${ogOrigin.value}/og.jpg` : '/og.jpg',
)

useSeoMeta({
  ogSiteName: 'HMI Paris',
  ogType: 'website',
  ogLocale: 'ja_JP',
  ogImage,
  ogImageSecureUrl: ogImage,
  ogImageType: 'image/jpeg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'HMI Paris',
  twitterCard: 'summary_large_image',
  twitterImage: ogImage,
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TravelAgency',
            '@id': `${siteUrl}/#organization`,
            name: 'HMI Paris',
            url: siteUrl,
            logo: `${siteUrl}/og.jpg`,
            email: s.contactEmail,
            telephone: s.contactPhone,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Paris',
              addressCountry: 'FR',
            },
            description: s.metaDescription,
            inLanguage: 'ja',
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: 'HMI Paris',
            inLanguage: 'ja',
            publisher: { '@id': `${siteUrl}/#organization` },
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
