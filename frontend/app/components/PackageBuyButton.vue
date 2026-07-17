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

const { t } = useI18n()

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
  isEvent.value ? t('checkout.buyEvent') : t('checkout.bookDate'),
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
      error.value = t('checkout.errNoDates')
    } else if (!firstOpenDate.value) {
      error.value = t('checkout.errAllBusy')
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

watch(open, (isOpen) => {
  if (!import.meta.client) return
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
})

async function startCheckout() {
  error.value = ''
  if (props.soldOut) {
    error.value = t('checkout.errSoldOut')
    return
  }
  if (needsSession.value && !selectedSessionId.value) {
    error.value = t('checkout.errPickSlot')
    return
  }
  if (!form.customerEmail.trim()) {
    error.value = t('checkout.errEmail')
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
      t('checkout.errCheckout')
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
      {{ t('common.soldOut') }}
    </button>
    <button v-else type="button" class="btn-primary w-full" @click="openCheckout">
      {{ buyLabel }}
    </button>
    <p v-if="!soldOut" class="mt-2 text-center text-xs text-[var(--muted-fg)]">
      {{ t('checkout.hint') }}
    </p>

    <Teleport to="body">
      <div
        v-if="open"
        class="fixed inset-0 z-[80] flex items-end justify-center bg-[var(--void)]/50 p-0 sm:items-center sm:p-6 md:p-8"
        @click.self="open = false"
      >
        <div
          class="flex w-full max-h-[min(92dvh,920px)] max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="buy-title"
        >
          <div class="shrink-0 border-b border-[var(--line)] px-5 py-4 sm:px-8 sm:py-5">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <p class="section-label">{{ t('checkout.online') }}</p>
                <h2
                  id="buy-title"
                  class="font-display mt-1 truncate text-xl text-[var(--heading)] sm:text-2xl"
                >
                  {{ packageTitle }}
                </h2>
                <p class="mt-1 text-sm text-[var(--muted-fg)]">
                  {{ t('checkout.amountDue') }}
                  <span class="font-semibold text-[var(--teal)]">{{ priceLabel }}</span>
                </p>
              </div>
              <button
                type="button"
                class="shrink-0 rounded-lg px-3 py-2 text-sm text-[var(--muted-fg)] hover:bg-[var(--paper)] hover:text-[var(--heading)]"
                :aria-label="t('checkout.close')"
                @click="open = false"
              >
                ✕
              </button>
            </div>
            <p class="mt-2 hidden text-xs text-[var(--muted-fg)] sm:block">
              {{ t('checkout.sameDayHint') }}
            </p>
          </div>

          <form
            class="flex min-h-0 flex-1 flex-col"
            @submit.prevent="startCheckout"
          >
            <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-6">
              <div
                class="grid gap-6 lg:grid-cols-2 lg:gap-8"
                :class="needsSession ? '' : 'lg:grid-cols-1'"
              >
                <div v-if="needsSession" class="space-y-4">
                  <div class="flex items-end justify-between gap-3">
                    <p class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">
                      {{ t('checkout.stepDate') }}
                    </p>
                    <p class="text-[11px] text-[var(--muted-fg)]">
                      <span
                        class="inline-block h-2 w-2 rounded-full bg-[var(--alert)] align-middle"
                      />
                      {{ t('checkout.busyLegend') }}
                    </p>
                  </div>

                  <p v-if="loadingSessions" class="text-sm text-[var(--muted-fg)]">
                    {{ t('checkout.loadingCalendar') }}
                  </p>

                  <div
                    v-else
                    class="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    <button
                      v-for="day in dateOptions"
                      :key="day.key"
                      type="button"
                      class="rounded-xl border px-1.5 py-2.5 text-center text-sm transition sm:px-2 sm:py-3"
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
                        :class="
                          day.busy
                            ? 'text-[var(--muted-fg)] line-through'
                            : 'text-[var(--heading)]'
                        "
                      >
                        {{ day.dayNum }}
                      </span>
                      <span class="mt-1 block text-[10px] text-[var(--muted-fg)]">{{
                        day.month
                      }}</span>
                      <span
                        class="mt-1.5 block text-[10px] font-semibold uppercase tracking-wide"
                        :class="day.busy ? 'text-[var(--alert)]' : 'text-[var(--teal)]'"
                      >
                        {{
                          day.busy
                            ? t('checkout.busy')
                            : t('checkout.openSlots', { n: day.open })
                        }}
                      </span>
                    </button>
                  </div>

                  <p class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">
                    {{ t('checkout.stepTime') }}
                  </p>

                  <div
                    v-if="selectedDay?.busy"
                    class="rounded-lg bg-[var(--alert)]/10 px-3 py-3 text-sm text-[var(--alert)]"
                  >
                    {{ t('checkout.dayReserved') }}
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
                              ? 'text-white'
                              : 'text-[var(--teal)]'
                        "
                      >
                        {{ slot.soldOut ? t('checkout.reserved') : t('common.available') }}
                      </span>
                    </button>
                  </div>
                  <p v-else class="text-sm text-[var(--muted-fg)]">
                    {{ t('checkout.selectDateFirst') }}
                  </p>

                  <p
                    v-if="selectedSession && !selectedSession.soldOut"
                    class="rounded-lg bg-[var(--paper)] px-3 py-2 text-sm text-[var(--heading)]"
                  >
                    {{ t('checkout.selected') }}
                    {{ formatSessionDay(selectedSession.startsAt) }}
                    ·
                    {{ formatSessionTime(selectedSession.startsAt) }}–{{
                      formatSessionTime(selectedSession.endsAt)
                    }}
                  </p>
                </div>

                <div class="space-y-4">
                  <p
                    v-if="needsSession"
                    class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]"
                  >
                    {{ t('checkout.stepDetails') }}
                  </p>

                  <label class="block">
                    <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
                      t('checkout.name')
                    }}</span>
                    <input
                      v-model="form.customerName"
                      type="text"
                      autocomplete="name"
                      class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none focus:border-[var(--teal)]"
                      :placeholder="t('checkout.namePh')"
                    />
                  </label>
                  <label class="block">
                    <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
                      t('checkout.email')
                    }}</span>
                    <input
                      v-model="form.customerEmail"
                      type="email"
                      required
                      autocomplete="email"
                      class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none focus:border-[var(--teal)]"
                      :placeholder="t('checkout.emailPh')"
                    />
                  </label>
                  <label class="block">
                    <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
                      t('checkout.phone')
                    }}</span>
                    <input
                      v-model="form.customerPhone"
                      type="tel"
                      autocomplete="tel"
                      class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none focus:border-[var(--teal)]"
                      :placeholder="t('checkout.phonePh')"
                    />
                  </label>

                  <p v-if="error" class="text-sm text-[var(--alert)]">{{ error }}</p>
                </div>
              </div>
            </div>

            <div
              class="shrink-0 border-t border-[var(--line)] bg-white px-5 py-4 sm:px-8"
              style="padding-bottom: max(1rem, env(safe-area-inset-bottom))"
            >
              <div class="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  class="btn-ghost-dark w-full !py-3 sm:flex-1"
                  :disabled="loading"
                  @click="open = false"
                >
                  {{ t('checkout.close') }}
                </button>
                <button
                  type="submit"
                  class="btn-primary w-full !py-3 sm:flex-[1.4]"
                  :disabled="loading || (needsSession && !selectedSessionId)"
                >
                  {{ loading ? t('checkout.connecting') : t('checkout.pay') }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>
