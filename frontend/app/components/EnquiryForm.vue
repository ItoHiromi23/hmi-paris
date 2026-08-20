<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** When set, enquiry is routed to that tour’s Strapi enquiryEmail. */
    tourSlug?: string
    submitLabel?: string
  }>(),
  {
    tourSlug: '',
    submitLabel: '',
  },
)

const { t } = useI18n()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
/** Strict Latin A–Z only (optional internal space / hyphen / apostrophe). */
const LATIN_NAME_RE = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/
/** Characters allowed while typing names. */
const LATIN_NAME_CHARS_RE = /[^A-Za-z '\-]/g

function initialForm() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    people: '' as string | number,
    date: '',
    description: '',
    website: '',
  }
}

const form = reactive(initialForm())

const fieldErrors = reactive<Record<string, string>>({
  firstName: '',
  lastName: '',
  email: '',
  people: '',
  date: '',
  description: '',
})

const sending = ref(false)
const formError = ref('')
const { showThanks } = useContactThanks()

const minDate = computed(() => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 1)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
})

const buttonLabel = computed(
  () => props.submitLabel || t('contact.submit'),
)

function asTrimmed(value: unknown): string {
  if (value == null) return ''
  return String(value).trim()
}

function clearFieldError(key: keyof typeof fieldErrors) {
  fieldErrors[key] = ''
}

function sanitizeLatinName(value: string): string {
  return value.replace(LATIN_NAME_CHARS_RE, '')
}

function onLatinNameInput(field: 'firstName' | 'lastName', event: Event) {
  const input = event.target as HTMLInputElement
  const cleaned = sanitizeLatinName(input.value)
  if (cleaned !== form[field]) {
    form[field] = cleaned
    input.value = cleaned
  }
  if (cleaned && !LATIN_NAME_RE.test(asTrimmed(cleaned))) {
    fieldErrors[field] = t('contact.errors.nameLatin')
  } else {
    fieldErrors[field] = ''
  }
}

function validateLatinName(field: 'firstName' | 'lastName', requiredKey: string) {
  const value = asTrimmed(form[field])
  if (!value) {
    fieldErrors[field] = t(requiredKey)
    return false
  }
  if (value.length < 2) {
    fieldErrors[field] = t('contact.errors.nameShort')
    return false
  }
  if (!LATIN_NAME_RE.test(value)) {
    fieldErrors[field] = t('contact.errors.nameLatin')
    return false
  }
  fieldErrors[field] = ''
  return true
}

function validateClient(): boolean {
  for (const key of Object.keys(fieldErrors)) fieldErrors[key] = ''
  formError.value = ''

  const email = asTrimmed(form.email)
  const people = asTrimmed(form.people)
  const date = asTrimmed(form.date)
  const description = asTrimmed(form.description)
  const peopleN = Number(people)

  validateLatinName('firstName', 'contact.errors.firstNameRequired')
  validateLatinName('lastName', 'contact.errors.lastNameRequired')

  if (!email) fieldErrors.email = t('contact.errors.emailRequired')
  else if (!EMAIL_RE.test(email)) fieldErrors.email = t('contact.errors.emailInvalid')

  if (!people) fieldErrors.people = t('contact.errors.peopleRequired')
  else if (!Number.isInteger(peopleN) || peopleN < 1 || peopleN > 50) {
    fieldErrors.people = t('contact.errors.peopleInvalid')
  }

  if (!date) fieldErrors.date = t('contact.errors.dateRequired')
  else if (!DATE_RE.test(date) || Number.isNaN(Date.parse(`${date}T12:00:00`))) {
    fieldErrors.date = t('contact.errors.dateInvalid')
  } else if (date < minDate.value) {
    fieldErrors.date = t('contact.errors.dateFuture')
  }

  if (!description) fieldErrors.description = t('contact.errors.descriptionRequired')
  else if (description.length < 10) fieldErrors.description = t('contact.errors.descriptionShort')

  return !Object.values(fieldErrors).some(Boolean)
}

const SERVER_ERROR_KEYS: Record<string, Record<string, string>> = {
  firstName: {
    required: 'contact.errors.firstNameRequired',
    too_short: 'contact.errors.nameShort',
    latin: 'contact.errors.nameLatin',
  },
  lastName: {
    required: 'contact.errors.lastNameRequired',
    too_short: 'contact.errors.nameShort',
    latin: 'contact.errors.nameLatin',
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
    past: 'contact.errors.dateFuture',
  },
  description: {
    required: 'contact.errors.descriptionRequired',
    too_short: 'contact.errors.descriptionShort',
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
        firstName: asTrimmed(form.firstName),
        lastName: asTrimmed(form.lastName),
        email: asTrimmed(form.email),
        people: Number(asTrimmed(form.people)),
        date: asTrimmed(form.date),
        description: asTrimmed(form.description),
        website: form.website,
        tourSlug: props.tourSlug || undefined,
      },
    })
    showThanks()
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
</script>

<template>
  <form class="relative space-y-6" novalidate @submit.prevent="onSubmit">
      <div class="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
        </label>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <label class="block">
          <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
            t('contact.firstName')
          }}</span>
          <input
            v-model="form.firstName"
            type="text"
            name="firstName"
            autocomplete="given-name"
            maxlength="80"
            lang="en"
            inputmode="text"
            pattern="[A-Za-z]+([ '\-][A-Za-z]+)*"
            :placeholder="t('contact.firstNamePh')"
            :aria-invalid="Boolean(fieldErrors.firstName)"
            class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)] placeholder:text-[var(--muted-fg)]"
            @input="onLatinNameInput('firstName', $event)"
          />
          <p v-if="fieldErrors.firstName" class="mt-2 text-sm text-red-700">
            {{ fieldErrors.firstName }}
          </p>
        </label>

        <label class="block">
          <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
            t('contact.lastName')
          }}</span>
          <input
            v-model="form.lastName"
            type="text"
            name="lastName"
            autocomplete="family-name"
            maxlength="80"
            lang="en"
            inputmode="text"
            pattern="[A-Za-z]+([ '\-][A-Za-z]+)*"
            :placeholder="t('contact.lastNamePh')"
            :aria-invalid="Boolean(fieldErrors.lastName)"
            class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)] placeholder:text-[var(--muted-fg)]"
            @input="onLatinNameInput('lastName', $event)"
          />
          <p v-if="fieldErrors.lastName" class="mt-2 text-sm text-red-700">
            {{ fieldErrors.lastName }}
          </p>
        </label>
      </div>

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
          :min="minDate"
          :aria-invalid="Boolean(fieldErrors.date)"
          class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)]"
          @input="clearFieldError('date')"
        />
        <p v-if="fieldErrors.date" class="mt-2 text-sm text-red-700">{{ fieldErrors.date }}</p>
      </label>

      <label class="block">
        <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
          t('contact.description')
        }}</span>
        <textarea
          v-model="form.description"
          name="description"
          rows="4"
          maxlength="5000"
          :placeholder="t('contact.descriptionPh')"
          :aria-invalid="Boolean(fieldErrors.description)"
          class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)] placeholder:text-[var(--muted-fg)]"
          @input="clearFieldError('description')"
        />
        <p v-if="fieldErrors.description" class="mt-2 text-sm text-red-700">
          {{ fieldErrors.description }}
        </p>
      </label>

      <p v-if="formError" class="text-sm text-red-700" role="alert">{{ formError }}</p>

      <button type="submit" class="btn-primary mt-4" :disabled="sending">
        {{ sending ? t('contact.sending') : buttonLabel }}
      </button>
    </form>
</template>
