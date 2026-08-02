<script setup lang="ts">
import type { TourPackage } from '~/types/package'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { fetchPackageBySlug, formatPrice } = useTourPackages()
const { data: pkg } = await useLocaleAsyncData(
  () => `package-${slug.value}`,
  (code) => fetchPackageBySlug(slug.value, code),
  { watch: [slug] },
)

if (!pkg.value) {
  throw createError({ statusCode: 404, statusMessage: t('packages.notFound') })
}

function formatList(items: string[]) {
  return items.map((item) => `・ ${item}`).join('\n')
}

function buildDetailRows(tour: TourPackage) {
  const fee =
    tour.feeNote.trim() ||
    (tour.priceFrom != null
      ? `${t('packages.fromPrice')} ${formatPrice(tour.priceFrom, tour.currency)}`
      : '')

  const candidates = [
    { id: 'groupSize', label: t('packages.details.groupSize'), value: tour.groupSize },
    {
      id: 'duration',
      label: t('packages.details.duration'),
      value: tour.durationLabel || t('packages.days', { n: tour.durationDays }),
    },
    { id: 'departureTime', label: t('packages.details.departureTime'), value: tour.departureTime },
    { id: 'meetingPlace', label: t('packages.details.meetingPlace'), value: tour.meetingPlace },
    { id: 'fee', label: t('packages.details.fee'), value: fee },
    {
      id: 'included',
      label: t('packages.details.included'),
      value: tour.included.length ? formatList(tour.included) : '',
    },
    {
      id: 'notIncluded',
      label: t('packages.details.notIncluded'),
      value: tour.notIncluded.length ? formatList(tour.notIncluded) : '',
    },
    {
      id: 'paymentDeadline',
      label: t('packages.details.paymentDeadline'),
      value: tour.paymentDeadline,
    },
    {
      id: 'paymentMethods',
      label: t('packages.details.paymentMethods'),
      value: tour.paymentMethods,
    },
    {
      id: 'reservationConfirmation',
      label: t('packages.details.reservationConfirmation'),
      value: tour.reservationConfirmation,
    },
    {
      id: 'cancellationConditions',
      label: t('packages.details.cancellationConditions'),
      value: tour.cancellationConditions,
    },
  ]

  return candidates.filter((row) => Boolean(row.value?.trim()))
}

const detailRows = computed(() => (pkg.value ? buildDetailRows(pkg.value) : []))

useReveal()

useSeoMeta({
  title: `${pkg.value.title} — HMI Paris`,
  description: pkg.value.summary,
})
</script>

<template>
  <div v-if="pkg">
    <PageHero
      :title="pkg.title"
      :eyebrow="`${pkg.region} · ${pkg.durationLabel || t('packages.days', { n: pkg.durationDays })}`"
      :image="pkg.heroImageUrl || '/images/paris-placeholder.svg'"
    >
      <p class="text-lg text-white/95">{{ pkg.summary }}</p>
      <template #actions>
        <a href="#enquiry" class="btn-primary">
          {{ t('packages.enquirySubmit') }}
        </a>
        <NuxtLink :to="localePath('/packages')" class="btn-ghost">{{ t('packages.allTours') }}</NuxtLink>
      </template>
    </PageHero>

    <section class="py-20 sm:py-24">
      <div class="container-site grid gap-14 lg:grid-cols-[1.4fr_0.8fr] lg:gap-20">
        <div class="reveal">
          <SectionHeading :eyebrow="t('packages.itinerary')" :title="t('packages.overview')" />
          <p class="mt-6 text-base leading-relaxed text-[var(--muted-fg)] whitespace-pre-line">
            {{ pkg.description }}
          </p>

          <ul v-if="pkg.highlights?.length" class="mt-10 space-y-4">
            <li
              v-for="item in pkg.highlights"
              :key="item"
              class="flex items-start gap-3 border-b border-[var(--line)] pb-4 text-[var(--heading)]"
            >
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--teal)]" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <aside class="reveal glass-panel h-fit p-8 sm:p-10">
          <p class="section-label">{{ t('packages.priceLabel') }}</p>
          <p class="font-display mt-2 text-5xl text-[var(--teal)]">
            {{ formatPrice(pkg.priceFrom, pkg.currency) }}
          </p>
          <p class="mt-2 text-sm text-[var(--muted-fg)]">
            {{ t('packages.priceHint') }}
          </p>
          <dl class="mt-10 space-y-5 text-sm text-[var(--heading)]">
            <div class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">{{ t('packages.destination') }}</dt>
              <dd>{{ pkg.destination }}</dd>
            </div>
            <div class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">{{ t('packages.region') }}</dt>
              <dd>{{ pkg.region }}</dd>
            </div>
            <div class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">{{ t('packages.duration') }}</dt>
              <dd>{{ pkg.durationLabel || t('packages.days', { n: pkg.durationDays }) }}</dd>
            </div>
          </dl>
          <div class="mt-10">
            <a href="#enquiry" class="btn-primary w-full">
              {{ t('packages.enquirySubmit') }}
            </a>
          </div>
        </aside>
      </div>
    </section>

    <section v-if="pkg.gallery.length" class="pb-16 sm:pb-20">
      <div class="container-site">
        <div class="reveal">
          <SectionHeading
            :eyebrow="t('packages.galleryEyebrow')"
            :title="t('packages.galleryTitle')"
          />
        </div>
        <div
          class="reveal mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          <figure
            v-for="(image, index) in pkg.gallery"
            :key="`${image.url}-${index}`"
            class="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)]"
          >
            <img
              :src="optimizeImageUrl(image.url, 900, 70)"
              :srcset="imageSrcSet(image.url, [400, 640, 900, 1200], 70)"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              :alt="image.alt"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>

    <TourDetails :rows="detailRows" />

    <ImportantNotes />

    <section id="enquiry" class="py-16 sm:py-20">
      <div class="container-site grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div class="reveal">
          <SectionHeading
            :eyebrow="t('packages.enquiryEyebrow')"
            :title="t('packages.enquiryTitle')"
          />
          <p class="mt-4 max-w-md text-[var(--muted-fg)] leading-relaxed">
            {{ t('packages.enquiryIntro') }}
          </p>
          <p v-if="pkg.enquiryEmail" class="mt-4 text-sm text-[var(--muted-fg)]">
            {{ t('packages.enquiryTo') }}:
            <a :href="`mailto:${pkg.enquiryEmail}`" class="text-[var(--teal)]">{{
              pkg.enquiryEmail
            }}</a>
          </p>
        </div>
        <div class="reveal glass-panel relative p-8 sm:p-10">
          <EnquiryForm
            :tour-slug="pkg.slug"
            :submit-label="t('packages.enquirySubmit')"
          />
        </div>
      </div>
    </section>

    <ContactBanner variant="reservation" />
  </div>
</template>
