<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { t } = useI18n()
useReveal()
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const form = reactive({
  name: '',
  email: '',
  people: '',
  date: '',
  message: '',
  website: '', // honeypot
})

const fieldErrors = reactive<Record<string, string>>({
  name: '',
  email: '',
  people: '',
  date: '',
  message: '',
})

const sent = ref(false)
const sending = ref(false)
const formError = ref('')

function clearFieldError(key: keyof typeof fieldErrors) {
  fieldErrors[key] = ''
}

function validateClient(): boolean {
  fieldErrors.name = ''
  fieldErrors.email = ''
  fieldErrors.people = ''
  fieldErrors.date = ''
  fieldErrors.message = ''
  formError.value = ''

  const name = form.name.trim()
  const email = form.email.trim()
  const people = form.people.trim()
  const date = form.date.trim()
  const message = form.message.trim()
  const peopleN = Number(people)

  if (!name) fieldErrors.name = t('contact.errors.nameRequired')
  else if (name.length < 2) fieldErrors.name = t('contact.errors.nameShort')

  if (!email) fieldErrors.email = t('contact.errors.emailRequired')
  else if (!EMAIL_RE.test(email)) fieldErrors.email = t('contact.errors.emailInvalid')

  if (!people) fieldErrors.people = t('contact.errors.peopleRequired')
  else if (!Number.isInteger(peopleN) || peopleN < 1 || peopleN > 50) {
    fieldErrors.people = t('contact.errors.peopleInvalid')
  }

  if (!date) fieldErrors.date = t('contact.errors.dateRequired')

  if (!message) fieldErrors.message = t('contact.errors.messageRequired')
  else if (message.length < 10) fieldErrors.message = t('contact.errors.messageShort')

  return (
    !fieldErrors.name &&
    !fieldErrors.email &&
    !fieldErrors.people &&
    !fieldErrors.date &&
    !fieldErrors.message
  )
}

const SERVER_ERROR_KEYS: Record<string, Record<string, string>> = {
  name: {
    required: 'contact.errors.nameRequired',
    too_short: 'contact.errors.nameShort',
  },
  email: {
    required: 'contact.errors.emailRequired',
    invalid: 'contact.errors.emailInvalid',
  },
  people: {
    required: 'contact.errors.peopleRequired',
    invalid: 'contact.errors.peopleInvalid',
  },
  date: {
    required: 'contact.errors.dateRequired',
    invalid: 'contact.errors.dateInvalid',
  },
  message: {
    required: 'contact.errors.messageRequired',
    too_short: 'contact.errors.messageShort',
  },
}

function mapServerFieldErrors(errors: Record<string, string> | undefined) {
  if (!errors) return
  for (const [field, code] of Object.entries(errors)) {
    const i18nKey = SERVER_ERROR_KEYS[field]?.[code]
    if (i18nKey) fieldErrors[field] = t(i18nKey)
  }
}

async function onSubmit() {
  if (sending.value) return
  if (!validateClient()) return

  sending.value = true
  formError.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        people: Number(form.people.trim()),
        date: form.date.trim(),
        message: form.message.trim(),
        website: form.website,
      },
    })
    sent.value = true
  } catch (err: unknown) {
    const payload = err as {
      data?: { data?: { fieldErrors?: Record<string, string> }; fieldErrors?: Record<string, string> }
    }
    const fieldErrs = payload.data?.data?.fieldErrors || payload.data?.fieldErrors
    if (fieldErrs) {
      mapServerFieldErrors(fieldErrs)
    } else {
      formError.value = t('contact.error')
    }
  } finally {
    sending.value = false
  }
}

useSeoMeta({
  title: () => `${t('contact.eyebrow')} — HMI Paris`,
  description: () => t('contact.intro'),
})
</script>

<template>
  <div>
    <PageHero
      compact
      :title="t('contact.title')"
      :eyebrow="t('contact.eyebrow')"
      image="/images/paris-placeholder.svg"
    >
      <p class="text-white/95">
        {{ s?.contactCtaSubtitle }}
      </p>
    </PageHero>

    <section class="py-20 sm:py-24">
      <div class="container-site grid gap-14 lg:grid-cols-2">
        <div class="reveal">
          <SectionHeading
            :eyebrow="t('contact.studio')"
            :title="s?.contactEmail || 'info@hmiparis.com'"
          />
          <p class="mt-6 max-w-md text-[var(--muted-fg)] leading-relaxed">
            {{ t('contact.intro') }}
          </p>
          <p class="mt-4 text-sm text-[var(--muted-fg)]">
            {{ s?.studioLocation }} · {{ s?.contactPhone }}
          </p>
        </div>

        <form
          class="reveal glass-panel relative space-y-6 p-8"
          novalidate
          @submit.prevent="onSubmit"
        >
          <div v-if="sent" class="text-[var(--heading)]">
            <p class="font-display text-3xl text-[var(--teal)]">{{ t('contact.thanks') }}</p>
            <p class="mt-3 text-[var(--muted-fg)]">
              {{ t('contact.successNote') }}
            </p>
          </div>
          <template v-else>
            <!-- Honeypot: hidden from users, filled by simple bots -->
            <div class="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label>
                Website
                <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
              </label>
            </div>

            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
                t('contact.name')
              }}</span>
              <input
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                maxlength="120"
                :aria-invalid="Boolean(fieldErrors.name)"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)]"
                @input="clearFieldError('name')"
              />
              <p v-if="fieldErrors.name" class="mt-2 text-sm text-red-700">{{ fieldErrors.name }}</p>
            </label>

            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
                t('contact.email')
              }}</span>
              <input
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                maxlength="254"
                :aria-invalid="Boolean(fieldErrors.email)"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)]"
                @input="clearFieldError('email')"
              />
              <p v-if="fieldErrors.email" class="mt-2 text-sm text-red-700">
                {{ fieldErrors.email }}
              </p>
            </label>

            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
                t('contact.people')
              }}</span>
              <input
                v-model="form.people"
                type="number"
                name="people"
                min="1"
                max="50"
                inputmode="numeric"
                :aria-invalid="Boolean(fieldErrors.people)"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)]"
                @input="clearFieldError('people')"
              />
              <p v-if="fieldErrors.people" class="mt-2 text-sm text-red-700">
                {{ fieldErrors.people }}
              </p>
            </label>

            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
                t('contact.date')
              }}</span>
              <input
                v-model="form.date"
                type="date"
                name="date"
                :aria-invalid="Boolean(fieldErrors.date)"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)]"
                @input="clearFieldError('date')"
              />
              <p v-if="fieldErrors.date" class="mt-2 text-sm text-red-700">{{ fieldErrors.date }}</p>
            </label>

            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
                t('contact.message')
              }}</span>
              <textarea
                v-model="form.message"
                name="message"
                rows="4"
                maxlength="5000"
                :placeholder="t('contact.messagePh')"
                :aria-invalid="Boolean(fieldErrors.message)"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)] placeholder:text-[var(--muted-fg)]"
                @input="clearFieldError('message')"
              />
              <p v-if="fieldErrors.message" class="mt-2 text-sm text-red-700">
                {{ fieldErrors.message }}
              </p>
            </label>

            <p v-if="formError" class="text-sm text-red-700" role="alert">{{ formError }}</p>

            <button type="submit" class="btn-primary mt-4" :disabled="sending">
              {{ sending ? t('contact.sending') : t('contact.submit') }}
            </button>
          </template>
        </form>
      </div>
    </section>
  </div>
</template>
