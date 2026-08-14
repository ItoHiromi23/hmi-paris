<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { t } = useI18n()
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)
const email = computed(() => s.value?.contactEmail?.trim() || 'info@hmiparis.com')

useSeoMeta({
  title: () => `${t('contact.title')}｜HMI PARIS`,
  description: () => t('contact.metaDescription'),
})
</script>

<template>
  <div class="hmi-contact">
    <header class="contact-head">
      <div class="wrap">
        <p class="eyebrow">{{ t('contact.eyebrow') }}</p>
        <h1>{{ t('contact.title') }}</h1>
        <p class="latin">{{ t('contact.latin') }}</p>
      </div>
    </header>

    <section class="contact-section">
      <div class="wrap">
        <div class="contact-grid">
          <section aria-labelledby="contact-intro-title" class="intro">
            <p class="eyebrow">{{ t('contact.introEyebrow') }}</p>
            <h2 id="contact-intro-title">
              {{ t('contact.introTitleLine1') }}<br />{{ t('contact.introTitleLine2') }}
            </h2>
            <p>{{ t('contact.introLead') }}</p>
            <p>{{ t('contact.introFollow') }}</p>
            <div class="info-box">
              <div class="info-row">
                <span class="info-label">E-mail</span>
                <span class="info-value">
                  <a class="direct-mail" :href="`mailto:${email}`">{{ email }}</a>
                </span>
              </div>
              <div class="info-row">
                <span class="info-label">Location</span>
                <span class="info-value">{{ t('contact.location') }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Language</span>
                <span class="info-value">{{ t('contact.language') }}</span>
              </div>
            </div>
          </section>

          <ContactReservationForm />
        </div>
      </div>
    </section>

    <div class="hmi-site-return">
      <NuxtLink to="/">{{ t('contact.backHome') }}</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.contact-head {
  background: var(--ink);
  color: var(--paper);
  position: relative;
  overflow: hidden;
  padding: 74px 0 64px;
}
.contact-head::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(100% 150% at 82% 20%, rgba(50, 74, 120, 0.42), transparent 58%);
}
.contact-head::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--brass), transparent);
}
.contact-head .wrap {
  position: relative;
}
.contact-head .eyebrow {
  font-family: var(--serif);
  font-style: italic;
  color: var(--brass-2);
  font-size: 18px;
  margin: 0 0 10px;
}
.contact-head h1 {
  font-family: var(--mincho);
  font-weight: 700;
  font-size: clamp(30px, 4.4vw, 46px);
  margin: 0;
  letter-spacing: 0.08em;
  color: #fbf7ee;
}
.contact-head .latin {
  font-family: var(--serif);
  letter-spacing: 0.22em;
  color: #b9aa88;
  text-transform: uppercase;
  font-size: 13px;
  margin: 14px 0 0;
}
.contact-section {
  padding: 78px 0 92px;
}
.contact-grid {
  display: grid;
  grid-template-columns: 0.78fr 1.22fr;
  gap: 54px;
  align-items: start;
  max-width: 1040px;
  margin: 0 auto;
}
.intro {
  padding: 8px 4px 0;
}
.intro .eyebrow {
  font-family: var(--serif);
  font-style: italic;
  color: var(--brass);
  font-size: 18px;
  margin: 0 0 8px;
}
.intro h2 {
  font-family: var(--mincho);
  font-size: clamp(23px, 3vw, 31px);
  line-height: 1.55;
  color: var(--ink);
  margin: 0 0 22px;
  letter-spacing: 0.05em;
}
.intro p {
  color: var(--muted);
  margin: 0 0 18px;
}
.info-box {
  margin-top: 30px;
  border-top: 1px solid var(--line);
  padding-top: 24px;
}
.info-row {
  margin-bottom: 17px;
}
.info-label {
  display: block;
  color: var(--brass);
  font-family: var(--serif);
  font-style: italic;
  font-size: 14px;
  letter-spacing: 0.08em;
  margin-bottom: 2px;
}
.info-value {
  font-size: 14px;
  color: var(--ink);
}
.direct-mail {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--brass);
  text-underline-offset: 4px;
}
.hmi-site-return {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 28px 55px;
  text-align: left;
}
.hmi-site-return a {
  display: inline-block;
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--ink);
  border-bottom: 1px solid var(--brass);
  padding-bottom: 3px;
}
@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }
  .intro {
    padding: 0;
  }
}
@media (max-width: 640px) {
  .contact-head {
    padding: 56px 0 50px;
  }
  .contact-section {
    padding: 54px 0 70px;
  }
  .hmi-site-return {
    padding: 0 18px 44px;
  }
}
</style>
