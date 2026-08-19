<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const PHONE_RE = /^\+?[0-9][0-9\s().-]{6,38}$/

const TOUR_OPTIONS = [
  'パリ街歩きツアー',
  'モンサンミッシェル',
  'ジヴェルニー＆ヴェトゥイユ',
  'オーヴェル＝シュル＝オワーズ',
  'ヴェルサイユ宮殿',
  'シャンパーニュ地方',
  '凱旋門賞2026 観戦バスツアー',
] as const

const SERVICE_OPTIONS = [
  '専用車＆日本語ガイド',
  '空港送迎',
  '通訳・アテンド・視察同行',
  'オーダーメイド手配',
  'その他',
] as const

const TOUR_QUERY_MAP: Record<string, string> = {
  'paris-walking-tour': 'パリ街歩きツアー',
  paris: 'パリ街歩きツアー',
  'mont-saint-michel': 'モンサンミッシェル',
  giverny: 'ジヴェルニー＆ヴェトゥイユ',
  auvers: 'オーヴェル＝シュル＝オワーズ',
  'auvers-sur-oise': 'オーヴェル＝シュル＝オワーズ',
  versailles: 'ヴェルサイユ宮殿',
  champagne: 'シャンパーニュ地方',
  arc2026: '凱旋門賞2026 観戦バスツアー',
  'arc-de-triomphe-2026': '凱旋門賞2026 観戦バスツアー',
}

function resolveServiceFromQuery(raw: string) {
  const value = asTrimmed(raw)
  if (!value) return ''
  const mapped = TOUR_QUERY_MAP[value] || TOUR_QUERY_MAP[value.toLowerCase()]
  if (mapped) return mapped
  const options = [...TOUR_OPTIONS, ...SERVICE_OPTIONS]
  return options.find((option) => option === value) || ''
}

function prefillFromQuery() {
  const key = String(route.query.tour || route.query.service || '')
  const service = resolveServiceFromQuery(key)
  if (service) {
    form.service = service
    form.source = asTrimmed(key) || 'contact-page'
  }
}

function initialForm() {
  return {
    service: '',
    preferredDate: '',
    secondDate: '',
    partySize: '',
    hotel: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '',
    source: 'contact-page',
  }
}

const form = reactive(initialForm())

const fieldErrors = reactive<Record<string, string>>({
  service: '',
  name: '',
  email: '',
  message: '',
  partySize: '',
  preferredDate: '',
  secondDate: '',
  phone: '',
})

const sent = ref(false)
const sending = ref(false)
const formError = ref('')
let suppressSentReset = false

function asTrimmed(value: unknown): string {
  if (value == null) return ''
  return String(value).trim()
}

function clearFieldError(key: string) {
  fieldErrors[key] = ''
}

function resetForm() {
  suppressSentReset = true
  Object.assign(form, initialForm())
  for (const key of Object.keys(fieldErrors)) fieldErrors[key] = ''
  formError.value = ''
  prefillFromQuery()
  suppressSentReset = false
}

prefillFromQuery()

watch(
  () => [route.query.tour, route.query.service],
  () => prefillFromQuery(),
)

watch(
  form,
  () => {
    if (suppressSentReset || !sent.value) return
    sent.value = false
  },
  { deep: true },
)

function todayIso() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const minDate = computed(() => todayIso())

function isValidDate(value: string) {
  return DATE_RE.test(value) && !Number.isNaN(Date.parse(`${value}T12:00:00`))
}

function validateOptionalDate(value: string, key: 'preferredDate' | 'secondDate') {
  if (!value) return true
  if (!isValidDate(value)) {
    fieldErrors[key] = t('contact.errors.dateInvalid')
    return false
  }
  if (value < minDate.value) {
    fieldErrors[key] = t('contact.errors.dateNotPast')
    return false
  }
  return true
}

function validateClient(): boolean {
  for (const key of Object.keys(fieldErrors)) fieldErrors[key] = ''
  formError.value = ''

  const service = asTrimmed(form.service)
  const name = asTrimmed(form.name)
  const email = asTrimmed(form.email)
  const message = asTrimmed(form.message)
  const party = asTrimmed(form.partySize)
  const phone = asTrimmed(form.phone)
  const preferredDate = asTrimmed(form.preferredDate)
  const secondDate = asTrimmed(form.secondDate)

  if (!service) fieldErrors.service = t('contact.errors.serviceRequired')
  if (!name) fieldErrors.name = t('contact.errors.nameRequired')
  else if (name.length < 2) fieldErrors.name = t('contact.errors.nameShort')

  if (!email) fieldErrors.email = t('contact.errors.emailRequired')
  else if (!EMAIL_RE.test(email)) fieldErrors.email = t('contact.errors.emailInvalid')

  if (!message) fieldErrors.message = t('contact.errors.messageRequired')

  if (party) {
    const n = Number(party)
    if (!Number.isInteger(n) || n < 1 || n > 30) {
      fieldErrors.partySize = t('contact.errors.partyInvalid')
    }
  }

  if (phone && !PHONE_RE.test(phone)) {
    fieldErrors.phone = t('contact.errors.phoneInvalid')
  }

  validateOptionalDate(preferredDate, 'preferredDate')
  validateOptionalDate(secondDate, 'secondDate')
  if (
    preferredDate &&
    secondDate &&
    isValidDate(preferredDate) &&
    isValidDate(secondDate) &&
    secondDate < preferredDate
  ) {
    fieldErrors.secondDate = t('contact.errors.dateOrder')
  }

  return !Object.values(fieldErrors).some(Boolean)
}

const SERVER_ERROR_KEYS: Record<string, Record<string, string>> = {
  service: { required: 'contact.errors.serviceRequired' },
  name: { required: 'contact.errors.nameRequired', too_short: 'contact.errors.nameShort' },
  email: {
    required: 'contact.errors.emailRequired',
    invalid: 'contact.errors.emailInvalid',
  },
  message: { required: 'contact.errors.messageRequired' },
  partySize: { invalid: 'contact.errors.partyInvalid' },
  phone: { invalid: 'contact.errors.phoneInvalid' },
  preferredDate: {
    invalid: 'contact.errors.dateInvalid',
    past: 'contact.errors.dateNotPast',
  },
  secondDate: {
    invalid: 'contact.errors.dateInvalid',
    past: 'contact.errors.dateNotPast',
    order: 'contact.errors.dateOrder',
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
  sent.value = false

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        formType: 'reservation',
        service: asTrimmed(form.service),
        preferredDate: asTrimmed(form.preferredDate),
        secondDate: asTrimmed(form.secondDate),
        partySize: asTrimmed(form.partySize),
        hotel: asTrimmed(form.hotel),
        name: asTrimmed(form.name),
        email: asTrimmed(form.email),
        phone: asTrimmed(form.phone),
        message: asTrimmed(form.message),
        website: form.website,
        source: form.source,
      },
    })
    resetForm()
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
</script>

<template>
  <section aria-label="お問い合わせフォーム" class="form-card">
    <div v-if="sent" class="thanks" role="status">
      <p class="thanks-title">{{ t('contact.thanks') }}</p>
      <p class="thanks-note">{{ t('contact.successNote') }}</p>
    </div>
    <form novalidate @submit.prevent="onSubmit">
      <p class="form-note">
        <span class="req">＊</span>
        {{ t('contact.formNote') }}
      </p>
      <p aria-hidden="true" class="bot-field">
        <label>
          入力しないでください：
          <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
        </label>
      </p>
      <div class="fields">
        <div class="field full">
          <label for="service">
            {{ t('contact.service') }}<span class="req">＊</span>
          </label>
          <select
            id="service"
            v-model="form.service"
            name="service"
            required
            :aria-invalid="Boolean(fieldErrors.service)"
            @change="clearFieldError('service')"
          >
            <option value="">{{ t('contact.servicePlaceholder') }}</option>
            <optgroup :label="t('contact.serviceGroupTours')">
              <option v-for="option in TOUR_OPTIONS" :key="option" :value="option">
                {{ option }}
              </option>
            </optgroup>
            <optgroup :label="t('contact.serviceGroupOther')">
              <option v-for="option in SERVICE_OPTIONS" :key="option" :value="option">
                {{ option }}
              </option>
            </optgroup>
          </select>
          <p v-if="fieldErrors.service" class="field-error">{{ fieldErrors.service }}</p>
        </div>
        <div class="field">
          <label for="date1">{{ t('contact.preferredDate') }}</label>
          <input
            id="date1"
            v-model="form.preferredDate"
            name="preferred-date"
            type="date"
            :min="minDate"
            :aria-invalid="Boolean(fieldErrors.preferredDate)"
            @change="clearFieldError('preferredDate')"
          />
          <p v-if="fieldErrors.preferredDate" class="field-error">{{ fieldErrors.preferredDate }}</p>
        </div>
        <div class="field">
          <label for="date2">{{ t('contact.secondDate') }}</label>
          <input
            id="date2"
            v-model="form.secondDate"
            name="second-date"
            type="date"
            :min="form.preferredDate || minDate"
            :aria-invalid="Boolean(fieldErrors.secondDate)"
            @change="clearFieldError('secondDate')"
          />
          <p v-if="fieldErrors.secondDate" class="field-error">{{ fieldErrors.secondDate }}</p>
        </div>
        <div class="field">
          <label for="party">{{ t('contact.partySize') }}</label>
          <input
            id="party"
            v-model="form.partySize"
            name="party-size"
            type="number"
            inputmode="numeric"
            min="1"
            max="30"
            :placeholder="t('contact.partyPlaceholder')"
            :aria-invalid="Boolean(fieldErrors.partySize)"
            @input="clearFieldError('partySize')"
          />
          <p v-if="fieldErrors.partySize" class="field-error">{{ fieldErrors.partySize }}</p>
        </div>
        <div class="field">
          <label for="hotel">{{ t('contact.hotel') }}</label>
          <input
            id="hotel"
            v-model="form.hotel"
            name="hotel"
            type="text"
            autocomplete="organization"
            maxlength="160"
            :placeholder="t('contact.hotelPlaceholder')"
          />
        </div>
        <div class="field full">
          <label for="name">{{ t('contact.fullName') }}<span class="req">＊</span></label>
          <input
            id="name"
            v-model="form.name"
            name="name"
            type="text"
            autocomplete="name"
            maxlength="80"
            required
            :aria-invalid="Boolean(fieldErrors.name)"
            @input="clearFieldError('name')"
          />
          <p v-if="fieldErrors.name" class="field-error">{{ fieldErrors.name }}</p>
        </div>
        <div class="field full">
          <label for="email">{{ t('contact.emailAddress') }}<span class="req">＊</span></label>
          <input
            id="email"
            v-model="form.email"
            name="email"
            type="email"
            autocomplete="email"
            maxlength="254"
            required
            :aria-invalid="Boolean(fieldErrors.email)"
            @input="clearFieldError('email')"
          />
          <p v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email }}</p>
        </div>
        <div class="field full">
          <label for="phone">{{ t('contact.phone') }}</label>
          <input
            id="phone"
            v-model="form.phone"
            name="phone"
            type="tel"
            autocomplete="tel"
            maxlength="40"
            :placeholder="t('contact.phonePlaceholder')"
            :aria-invalid="Boolean(fieldErrors.phone)"
            @input="clearFieldError('phone')"
          />
          <p v-if="fieldErrors.phone" class="field-error">{{ fieldErrors.phone }}</p>
        </div>
        <div class="field full">
          <label for="message">
            {{ t('contact.message') }}<span class="req">＊</span>
          </label>
          <textarea
            id="message"
            v-model="form.message"
            name="message"
            required
            maxlength="5000"
            :placeholder="t('contact.messagePlaceholder')"
            :aria-invalid="Boolean(fieldErrors.message)"
            @input="clearFieldError('message')"
          />
          <small>{{ t('contact.messageHint') }}</small>
          <p v-if="fieldErrors.message" class="field-error">{{ fieldErrors.message }}</p>
        </div>
      </div>
      <p v-if="formError" class="field-error" role="alert">{{ formError }}</p>
      <div class="submit-row">
        <button class="submit-btn" type="submit" :disabled="sending">
          {{ sending ? t('contact.sending') : t('contact.submit') }}
        </button>
        <p class="privacy-note">{{ t('contact.privacyNote') }}</p>
      </div>
    </form>
  </section>
</template>

<style scoped>
.form-card {
  background: var(--panel);
  border: 1px solid var(--line);
  box-shadow: 0 24px 65px -48px rgba(21, 34, 59, 0.55);
  padding: clamp(26px, 4vw, 46px);
}
.form-note {
  font-size: 13px;
  color: var(--muted);
  margin: 0 0 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}
.req {
  color: #8f5d35;
  font-size: 12px;
  margin-left: 5px;
}
.fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px 20px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.field.full {
  grid-column: 1 / -1;
}
.field label {
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--ink);
}
.field input,
.field select,
.field textarea {
  width: 100%;
  border: 1px solid #cec4b2;
  background: #fffdfa;
  color: var(--text);
  font: inherit;
  font-size: 15px;
  border-radius: 1px;
  padding: 12px 13px;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.field select {
  min-height: 52px;
}
.field textarea {
  min-height: 180px;
  resize: vertical;
}
.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: var(--brass);
  box-shadow: 0 0 0 3px rgba(169, 133, 76, 0.11);
}
.field input[aria-invalid='true'],
.field select[aria-invalid='true'],
.field textarea[aria-invalid='true'] {
  border-color: #8f3b2c;
}
.field small {
  font-size: 11.5px;
  line-height: 1.6;
  color: var(--muted);
}
.field-error {
  margin: 0;
  font-size: 13px;
  color: #8f3b2c;
}
.bot-field {
  position: absolute !important;
  left: -10000px !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
}
.submit-row {
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}
.submit-btn {
  appearance: none;
  border: 1px solid var(--brass);
  background: var(--brass);
  color: #18130b;
  font-family: var(--gothic);
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.13em;
  padding: 15px 34px;
  cursor: pointer;
  transition: 0.25s;
}
.submit-btn:hover:not(:disabled) {
  background: var(--brass-2);
  border-color: var(--brass-2);
}
.submit-btn:disabled {
  opacity: 0.7;
  cursor: wait;
}
.privacy-note {
  font-size: 11.5px;
  color: var(--muted);
  max-width: 31em;
  line-height: 1.65;
  margin: 0;
}
.thanks {
  margin-bottom: 28px;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--line);
}
.thanks-title {
  font-family: var(--mincho);
  font-size: 28px;
  color: var(--ink);
  margin: 0 0 12px;
}
.thanks-note {
  color: var(--muted);
  margin: 0;
}
@media (max-width: 640px) {
  .form-card {
    padding: 24px 18px;
  }
  .fields {
    grid-template-columns: 1fr;
  }
  .field.full {
    grid-column: auto;
  }
}
</style>
