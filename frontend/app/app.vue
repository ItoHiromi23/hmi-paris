<script setup lang="ts">
import { cmsBundle } from '~/data/cms'

const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
const s = cmsBundle.settings

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
