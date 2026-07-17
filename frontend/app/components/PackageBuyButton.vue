<script setup lang="ts">
import type { ProductType } from '~/types/package'
import type { TourSessionSlot } from '~/composables/useTourSessions'

const props = defineProps<{
  productType?: ProductType
  packageSlug: string
  packageTitle: string
  priceLabel: string
  soldOut?: boolean
  availableLabel?: string
}>()

const open = ref(false)
const loading = ref(false)
const error = ref('')
const loadingSessions = ref(false)
const sessions = ref<TourSessionSlot[]>([])
const selectedDate = ref('')
const selectedSessionId = ref('')

const form = reactive({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
})

const isEvent = computed(() => props.productType === 'event')
const needsSession = computed(() => !isEvent.value)
const buyLabel = computed(() =>
  isEvent.value ? 'Buy this event' : 'Book a date & time',
)

const dateOptions = computed(() => buildSessionDayOptions(sessions.value))

const firstOpenDate = computed(() => dateOptions.value.find((d) => !d.busy)?.key || '')

const timesForSelectedDate = computed(() => {
  if (!selectedDate.value) return []
  return sessions.value
    .filter((s) => sessionDateKey(s.startsAt) === selectedDate.value)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
})

const selectedSession = computed(
  () => sessions.value.find((s) => s.sessionDocumentId === selectedSessionId.value) || null,
)

const selectedDay = computed(
  () => dateOptions.value.find((d) => d.key === selectedDate.value) || null,
)

watch(selectedDate, () => {
  selectedSessionId.value = ''
})

async function loadSessions() {
  if (!needsSession.value) return
  loadingSessions.value = true
  error.value = ''
  try {
    sessions.value = await fetchTourSessions(props.packageSlug)
    selectedDate.value = firstOpenDate.value
    selectedSessionId.value = ''
    if (!sessions.value.length) {
      error.value = 'No upcoming dates available for this package'
    } else if (!firstOpenDate.value) {
      error.value = 'All upcoming dates are fully reserved'
    }
  } finally {
    loadingSessions.value = false
  }
}

function selectDate(dayKey: string, busy: boolean) {
  if (busy) return
  selectedDate.value = dayKey
}

function selectTime(slot: TourSessionSlot) {
  if (slot.soldOut) return
  selectedSessionId.value = slot.sessionDocumentId
}

async function openCheckout() {
  open.value = true
  await loadSessions()
}

async function startCheckout() {
  error.value = ''
  if (props.soldOut) {
    error.value = 'Sold out — bookings are closed'
    return
  }
  if (needsSession.value && !selectedSessionId.value) {
    error.value = 'Please select an available date and time'
    return
  }
  if (!form.customerEmail.trim()) {
    error.value = 'Please enter your email address'
    return
  }
  loading.value = true
  try {
    const res = await $fetch<{ url: string }>('/api/checkout', {
      method: 'POST',
      body: {
        productType: props.productType || 'package',
        packageSlug: props.packageSlug,
        sessionDocumentId: selectedSessionId.value || undefined,
        customerName: form.customerName.trim() || undefined,
        customerEmail: form.customerEmail.trim(),
        customerPhone: form.customerPhone.trim() || undefined,
      },
    })
    if (!res?.url) throw new Error('Checkout URL missing')
    markSlotsDirty()
    window.location.href = res.url
  } catch (e: unknown) {
    const msg =
      e && typeof e === 'object' && 'data' in e
        ? String((e as { data?: { statusMessage?: string } }).data?.statusMessage || '')
        : ''
    error.value =
      msg ||
      'Could not start checkout. Check Stripe settings or availability.'
    loading.value = false
  }
}
</script>

<template>
  <div>
    <p
      v-if="availableLabel"
      class="mb-3 text-center text-sm font-semibold"
      :class="soldOut ? 'text-[var(--alert)]' : 'text-[var(--teal)]'"
    >
      {{ availableLabel }}
    </p>

    <button
      v-if="soldOut"
      type="button"
      class="btn-ghost-dark w-full cursor-not-allowed opacity-70"
      disabled
    >
      Sold out
    </button>
    <button v-else type="button" class="btn-primary w-full" @click="openCheckout">
      {{ buyLabel }}
    </button>
    <p v-if="!soldOut" class="mt-2 text-center text-xs text-[var(--muted-fg)]">
      Private tour · each date/time can only be booked once · busy days are disabled
    </p>

    <Teleport to="body">
      <div
        v-if="open"
        class="fixed inset-x-0 bottom-0 z-[80] flex items-end justify-center bg-[var(--void)]/50 p-4 sm:inset-0 sm:items-center"
        @click.self="open = false"
      >
        <div
          class="max-h-[90vh] w-full max-w-lg overflow-y-auto bg-white shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="buy-title"
        >
          <div class="border-b border-[var(--line)] px-6 py-5">
            <p class="section-label">Online checkout</p>
            <h2 id="buy-title" class="font-display mt-2 text-2xl text-[var(--heading)]">
              {{ packageTitle }}
            </h2>
            <p class="mt-1 text-sm text-[var(--muted-fg)]">
              Amount due:
              <span class="font-semibold text-[var(--teal)]">{{ priceLabel }}</span>
            </p>
            <p class="mt-2 text-xs text-[var(--muted-fg)]">
              Same day is fine with different hours (e.g. 12:00 and 17:00). The same hour cannot be
              booked twice.
            </p>
          </div>

          <form class="space-y-5 px-6 py-6" @submit.prevent="startCheckout">
            <div v-if="needsSession" class="space-y-4">
              <div class="flex items-end justify-between gap-3">
                <p class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">
                  1. Choose a date
                </p>
                <p class="text-[11px] text-[var(--muted-fg)]">
                  <span class="inline-block h-2 w-2 rounded-full bg-[var(--alert)] align-middle" />
                  Busy = fully reserved
                </p>
              </div>

              <p v-if="loadingSessions" class="text-sm text-[var(--muted-fg)]">Loading calendar…</p>

              <div v-else class="grid grid-cols-3 gap-2 sm:grid-cols-4">
                <button
                  v-for="day in dateOptions"
                  :key="day.key"
                  type="button"
                  class="rounded-xl border px-2 py-3 text-center text-sm transition"
                  :disabled="day.busy"
                  :aria-disabled="day.busy"
                  :class="
                    day.busy
                      ? 'cursor-not-allowed border-[var(--line)] bg-[var(--paper)] opacity-60'
                      : selectedDate === day.key
                        ? 'border-[var(--teal)] bg-[var(--teal)]/10 text-[var(--heading)]'
                        : 'border-[var(--line)] hover:border-[var(--teal)]'
                  "
                  @click="selectDate(day.key, day.busy)"
                >
                  <span
                    class="block text-[10px] uppercase tracking-wider"
                    :class="day.busy ? 'text-[var(--alert)]' : 'text-[var(--muted-fg)]'"
                  >
                    {{ day.weekday }}
                  </span>
                  <span
                    class="mt-0.5 block text-lg font-semibold leading-none"
                    :class="day.busy ? 'text-[var(--muted-fg)] line-through' : 'text-[var(--heading)]'"
                  >
                    {{ day.dayNum }}
                  </span>
                  <span class="mt-1 block text-[10px] text-[var(--muted-fg)]">{{ day.month }}</span>
                  <span
                    class="mt-2 block text-[10px] font-semibold uppercase tracking-wide"
                    :class="day.busy ? 'text-[var(--alert)]' : 'text-[var(--teal)]'"
                  >
                    {{ day.busy ? 'Busy' : `${day.open} open` }}
                  </span>
                </button>
              </div>

              <p class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">
                2. Choose a time
              </p>

              <div v-if="selectedDay?.busy" class="rounded-lg bg-[var(--alert)]/10 px-3 py-3 text-sm text-[var(--alert)]">
                This day is fully reserved. Pick another date.
              </div>

              <div v-else-if="selectedDate" class="grid grid-cols-2 gap-2">
                <button
                  v-for="slot in timesForSelectedDate"
                  :key="slot.sessionDocumentId"
                  type="button"
                  class="rounded-lg border px-3 py-3 text-left text-sm transition"
                  :disabled="slot.soldOut"
                  :class="
                    slot.soldOut
                      ? 'cursor-not-allowed border-[var(--line)] bg-[var(--paper)] opacity-60'
                      : selectedSessionId === slot.sessionDocumentId
                        ? 'border-[var(--teal)] bg-[var(--teal)] text-white'
                        : 'border-[var(--line)] text-[var(--heading)] hover:border-[var(--teal)]'
                  "
                  @click="selectTime(slot)"
                >
                  <span
                    class="block font-semibold"
                    :class="slot.soldOut ? 'text-[var(--muted-fg)] line-through' : ''"
                  >
                    {{ formatSessionTime(slot.startsAt) }}
                    <template v-if="slot.label"> · {{ slot.label }}</template>
                  </span>
                  <span
                    class="mt-1 block text-[11px] font-medium"
                    :class="
                      slot.soldOut
                        ? 'text-[var(--alert)]'
                        : selectedSessionId === slot.sessionDocumentId
                          ? 'text-white/85'
                          : 'text-[var(--teal)]'
                    "
                  >
                    {{ slot.soldOut ? 'Reserved' : 'Available' }}
                  </span>
                </button>
              </div>
              <p v-else class="text-sm text-[var(--muted-fg)]">Select an available date first</p>

              <p
                v-if="selectedSession && !selectedSession.soldOut"
                class="rounded-lg bg-[var(--paper)] px-3 py-2 text-sm text-[var(--heading)]"
              >
                Selected:
                {{ formatSessionDay(selectedSession.startsAt) }}
                ·
                {{ formatSessionTime(selectedSession.startsAt) }}–{{
                  formatSessionTime(selectedSession.endsAt)
                }}
              </p>
            </div>

            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">Name</span>
              <input
                v-model="form.customerName"
                type="text"
                autocomplete="name"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none focus:border-[var(--teal)]"
                placeholder="Jane Doe"
              />
            </label>
            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">Email *</span>
              <input
                v-model="form.customerEmail"
                type="email"
                required
                autocomplete="email"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none focus:border-[var(--teal)]"
                placeholder="you@example.com"
              />
            </label>
            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">Phone</span>
              <input
                v-model="form.customerPhone"
                type="tel"
                autocomplete="tel"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none focus:border-[var(--teal)]"
                placeholder="+33 ..."
              />
            </label>

            <p v-if="error" class="text-sm text-[var(--alert)]">{{ error }}</p>

            <div class="flex gap-3 pt-2">
              <button
                type="button"
                class="btn-ghost-dark flex-1 !py-3"
                :disabled="loading"
                @click="open = false"
              >
                Close
              </button>
              <button
                type="submit"
                class="btn-primary flex-1 !py-3"
                :disabled="loading || (needsSession && !selectedSessionId)"
              >
                {{ loading ? 'Connecting…' : 'Pay with Stripe' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>
