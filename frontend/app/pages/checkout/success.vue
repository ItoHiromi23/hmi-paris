<script setup lang="ts">
const route = useRoute()
const sessionId = computed(() => String(route.query.session_id || ''))

const { data, error } = await useAsyncData(
  () => `checkout-success-${sessionId.value}`,
  () =>
    sessionId.value
      ? $fetch<{
          orderNumber: string | null
          packageTitle: string | null
          packageSlug: string | null
          productType: string
          status: string
          customerEmail: string | null
          amountTotal: number | null
          currency: string | null
          available: number | null
          soldOut: boolean
          slotsSold: number | null
          slotsTotal: number | null
          sessionLabel?: string | null
          sessionStartsAt?: string | null
          emailSent?: boolean
          emailReason?: string
        }>('/api/checkout/session', { query: { session_id: sessionId.value } })
      : Promise.resolve(null),
)

const backLink = computed(() => {
  if (!data.value?.packageSlug) return '/packages'
  return data.value.productType === 'event'
    ? `/events/${data.value.packageSlug}`
    : `/packages/${data.value.packageSlug}`
})

// Payment confirmed — next visit to a product page should re-fetch slots
if (import.meta.client && data.value?.status === 'paid') {
  markSlotsDirty()
}

useSeoMeta({
  title: 'Thank you for your purchase — HMI Paris',
})
</script>

<template>
  <div class="container-site py-28 sm:py-36">
    <div class="mx-auto max-w-xl text-center">
      <p class="section-label">Payment complete</p>
      <h1 class="font-display mt-3 text-4xl text-[var(--heading)] sm:text-5xl">
        Thank you
      </h1>
      <p class="mt-4 text-[var(--muted-fg)]">
        Your payment was received and one booking slot has been reserved.
        <template v-if="data?.emailSent && data.customerEmail">
          A confirmation email was sent to
          <span class="font-medium text-[var(--heading)]">{{ data.customerEmail }}</span>.
        </template>
        <template v-else-if="data?.customerEmail">
          A confirmation email will be sent to
          <span class="font-medium text-[var(--heading)]">{{ data.customerEmail }}</span>
          (and a Stripe payment receipt if enabled in your Stripe Dashboard).
        </template>
      </p>

      <div v-if="data" class="glass-panel mt-10 p-8 text-left text-sm">
        <dl class="space-y-4 text-[var(--heading)]">
          <div class="flex justify-between gap-4 border-b border-[var(--line)] pb-3">
            <dt class="text-[var(--muted-fg)]">Order number</dt>
            <dd class="font-mono">{{ data.orderNumber || '—' }}</dd>
          </div>
          <div class="flex justify-between gap-4 border-b border-[var(--line)] pb-3">
            <dt class="text-[var(--muted-fg)]">Product</dt>
            <dd>{{ data.packageTitle || '—' }}</dd>
          </div>
          <div
            v-if="data.sessionLabel"
            class="flex justify-between gap-4 border-b border-[var(--line)] pb-3"
          >
            <dt class="text-[var(--muted-fg)]">Date & time</dt>
            <dd>{{ data.sessionLabel }}</dd>
          </div>
          <div class="flex justify-between gap-4 border-b border-[var(--line)] pb-3">
            <dt class="text-[var(--muted-fg)]">Amount</dt>
            <dd>
              <template v-if="data.amountTotal != null">
                {{ data.amountTotal }} {{ data.currency }}
              </template>
              <template v-else>—</template>
            </dd>
          </div>
          <div class="flex justify-between gap-4 border-b border-[var(--line)] pb-3">
            <dt class="text-[var(--muted-fg)]">Status</dt>
            <dd class="text-[var(--teal)]">{{ data.status }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-[var(--muted-fg)]">Slots left</dt>
            <dd :class="data.soldOut ? 'text-[var(--alert)]' : 'text-[var(--teal)]'">
              <template v-if="data.soldOut">Sold out (0)</template>
              <template v-else-if="data.available != null">{{ data.available }} left</template>
              <template v-else>Open</template>
              <span
                v-if="data.slotsTotal != null && data.slotsSold != null"
                class="text-[var(--muted-fg)]"
              >
                (sold {{ data.slotsSold }} / total {{ data.slotsTotal }})
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <p v-else-if="error" class="mt-8 text-sm text-[var(--alert)]">
        Could not load session details. Check your email or contact us.
      </p>

      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <NuxtLink :to="backLink" class="btn-primary">Back to product</NuxtLink>
        <NuxtLink to="/packages" class="btn-ghost-dark">All tours</NuxtLink>
      </div>
    </div>
  </div>
</template>
