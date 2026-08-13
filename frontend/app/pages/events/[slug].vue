<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { getEventBySlug, formatJaDate } = useMainEvents()
const event = computed(() => getEventBySlug(slug.value))

if (!event.value) {
  throw createError({ statusCode: 404, statusMessage: 'Event not found' })
}

const aboutParagraphs = computed(() =>
  (event.value?.aboutBody || '')
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
)

const hasAbout = computed(() =>
  Boolean(
    event.value?.aboutKicker ||
      event.value?.aboutTitle ||
      event.value?.aboutLead ||
      aboutParagraphs.value.length ||
      event.value?.aboutImageUrl,
  ),
)

const hasHighlights = computed(() =>
  Boolean(
    event.value?.highlightsKicker ||
      event.value?.highlightsTitle ||
      event.value?.highlights.length ||
      event.value?.highlightsImageUrl,
  ),
)

const hasTour = computed(() =>
  Boolean(
    event.value?.tourKicker ||
      event.value?.tourTitle ||
      event.value?.inclusions.length ||
      event.value?.exclusions.length ||
      event.value?.tourNote,
  ),
)

const hasFlow = computed(() =>
  Boolean(
    event.value?.flowKicker ||
      event.value?.flowTitle ||
      event.value?.schedule.length ||
      event.value?.meetingTitle ||
      event.value?.meetingImageUrl ||
      event.value?.flowNote,
  ),
)

const hasDetails = computed(() =>
  Boolean(
    event.value?.detailsKicker ||
      event.value?.detailsTitle ||
      event.value?.detailRows.length ||
      event.value?.cancellationTitle ||
      event.value?.cancellationRows.length ||
      event.value?.detailsNote,
  ),
)

const hasBooking = computed(() =>
  Boolean(
    event.value?.bookingKicker ||
      event.value?.bookingTitle ||
      event.value?.bookingSteps.length,
  ),
)

const hasNotes = computed(() =>
  Boolean(
    event.value?.notesKicker ||
      event.value?.notesTitle ||
      event.value?.notesList.length,
  ),
)

const hasCta = computed(() =>
  Boolean(
    event.value?.ctaKicker ||
      event.value?.ctaTitle ||
      event.value?.ctaButton ||
      event.value?.ctaScarce,
  ),
)

useSeoMeta({
  title: () => `${event.value?.title || ''} | HMI Paris`,
  description: () => event.value?.summary || '',
})
</script>

<template>
  <div v-if="event" class="event-page">
    <nav v-if="event.navLinks.length" class="event-nav">
      <div class="event-wrap event-nav-inner">
        <ul class="event-nav-links">
          <li v-for="link in event.navLinks" :key="link.href">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </nav>

    <header class="event-hero">
      <div class="event-wrap">
        <span v-if="event.label" class="event-tag">{{ event.label }}</span>
        <div v-if="event.category" class="event-eyebrow">{{ event.category }}</div>
        <h1>{{ event.title }}</h1>
        <div v-if="event.subLatin" class="event-sub-latin">{{ event.subLatin }}</div>
        <dl class="event-hero-meta">
          <div v-if="event.eventDate">
            <dt>Date</dt>
            <dd>{{ formatJaDate(event.eventDate) }}</dd>
          </div>
          <div v-if="event.venue">
            <dt>Venue</dt>
            <dd>{{ event.venue }}</dd>
          </div>
          <div v-if="event.edition">
            <dt>Edition</dt>
            <dd>{{ event.edition }}</dd>
          </div>
          <div v-if="event.guideLabel">
            <dt>Guide</dt>
            <dd>{{ event.guideLabel }}</dd>
          </div>
        </dl>
      </div>
    </header>

    <section v-if="hasAbout" id="about">
      <div class="event-wrap">
        <span v-if="event.aboutKicker" class="event-kicker">{{ event.aboutKicker }}</span>
        <h2 v-if="event.aboutTitle">{{ event.aboutTitle }}</h2>
        <p v-if="event.aboutLead" class="event-lead">{{ event.aboutLead }}</p>
        <p v-for="(paragraph, i) in aboutParagraphs" :key="i">{{ paragraph }}</p>
        <figure v-if="event.aboutImageUrl">
          <img
            :src="optimizeImageUrl(event.aboutImageUrl, 1200, 70)"
            :srcset="imageSrcSet(event.aboutImageUrl, [640, 900, 1200], 70)"
            sizes="(max-width: 900px) 100vw, 720px"
            :alt="event.aboutImageCaption || event.aboutTitle"
            width="1400"
            height="1050"
            loading="lazy"
            decoding="async"
          />
          <figcaption v-if="event.aboutImageCaption">{{ event.aboutImageCaption }}</figcaption>
        </figure>
      </div>
    </section>

    <section v-if="hasHighlights" id="highlights" class="event-band">
      <div class="event-wrap">
        <span v-if="event.highlightsKicker" class="event-kicker">{{ event.highlightsKicker }}</span>
        <h2 v-if="event.highlightsTitle">{{ event.highlightsTitle }}</h2>

        <div
          v-for="(item, i) in event.highlights"
          :key="`${item.num}-${item.title}-${i}`"
          class="event-highlight"
        >
          <h3>
            <span v-if="item.num" class="event-num">{{ item.num }}</span>{{ item.title }}
          </h3>
          <p v-if="item.body">{{ item.body }}</p>
          <p v-if="item.caveat" class="event-caveat">{{ item.caveat }}</p>
        </div>

        <figure v-if="event.highlightsImageUrl">
          <img
            :src="optimizeImageUrl(event.highlightsImageUrl, 1200, 70)"
            :srcset="imageSrcSet(event.highlightsImageUrl, [640, 900, 1200], 70)"
            sizes="(max-width: 900px) 100vw, 720px"
            :alt="event.highlightsImageCaption || event.highlightsTitle"
            width="1400"
            height="1050"
            loading="lazy"
            decoding="async"
          />
          <figcaption v-if="event.highlightsImageCaption">
            {{ event.highlightsImageCaption }}
          </figcaption>
        </figure>
      </div>
    </section>

    <section v-if="hasTour" id="tour">
      <div class="event-wrap">
        <span v-if="event.tourKicker" class="event-kicker">{{ event.tourKicker }}</span>
        <h2 v-if="event.tourTitle">{{ event.tourTitle }}</h2>
        <div class="event-cols">
          <div v-if="event.inclusions.length">
            <ul class="event-list event-list-yes">
              <li v-for="item in event.inclusions" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div v-if="event.exclusions.length">
            <h3 v-if="event.exclusionsTitle" class="event-exclusions-title">
              {{ event.exclusionsTitle }}
            </h3>
            <ul class="event-list event-list-no">
              <li v-for="item in event.exclusions" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
        <div v-if="event.tourNote" class="event-note">{{ event.tourNote }}</div>
      </div>
    </section>

    <section v-if="hasFlow" id="flow" class="event-band">
      <div class="event-wrap">
        <span v-if="event.flowKicker" class="event-kicker">{{ event.flowKicker }}</span>
        <h2 v-if="event.flowTitle">{{ event.flowTitle }}</h2>
        <ul v-if="event.schedule.length" class="event-tl">
          <li v-for="(item, i) in event.schedule" :key="`${item.time}-${i}`">
            <span v-if="item.time" class="event-time">{{ item.time }}</span>
            <span class="event-what">{{ item.what }}</span>
          </li>
        </ul>

        <div
          v-if="event.meetingImageUrl || event.meetingTitle || event.meetingBody"
          class="event-meet"
        >
          <figure v-if="event.meetingImageUrl">
            <img
              :src="optimizeImageUrl(event.meetingImageUrl, 760, 70)"
              :srcset="imageSrcSet(event.meetingImageUrl, [400, 760], 70)"
              sizes="(max-width: 768px) 100vw, 380px"
              :alt="event.meetingImageCaption || event.meetingTitle"
              width="760"
              height="1013"
              loading="lazy"
              decoding="async"
            />
            <figcaption v-if="event.meetingImageCaption">
              {{ event.meetingImageCaption }}
            </figcaption>
          </figure>
          <div>
            <h3 v-if="event.meetingTitle">{{ event.meetingTitle }}</h3>
            <p v-if="event.meetingBody">{{ event.meetingBody }}</p>
            <p v-if="event.meetingCaveat" class="event-caveat event-caveat-flush">
              {{ event.meetingCaveat }}
            </p>
          </div>
        </div>

        <div v-if="event.flowNote" class="event-note">{{ event.flowNote }}</div>
      </div>
    </section>

    <section v-if="hasDetails" id="details">
      <div class="event-wrap">
        <span v-if="event.detailsKicker" class="event-kicker">{{ event.detailsKicker }}</span>
        <h2 v-if="event.detailsTitle">{{ event.detailsTitle }}</h2>
        <table v-if="event.detailRows.length">
          <tbody>
            <tr v-for="row in event.detailRows" :key="row.label">
              <th>{{ row.label }}</th>
              <td class="whitespace-pre-line">{{ row.value }}</td>
            </tr>
          </tbody>
        </table>

        <h2
          v-if="event.cancellationTitle"
          class="event-cancel-title"
        >
          {{ event.cancellationTitle }}
        </h2>
        <table v-if="event.cancellationRows.length">
          <thead>
            <tr>
              <th>{{ event.cancellationHeaderWhen }}</th>
              <th>{{ event.cancellationHeaderFee }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in event.cancellationRows" :key="i">
              <td>{{ row.when }}</td>
              <td>{{ row.fee }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="event.detailsNote" class="event-note">{{ event.detailsNote }}</div>
      </div>
    </section>

    <section v-if="hasBooking" id="booking" class="event-band">
      <div class="event-wrap">
        <span v-if="event.bookingKicker" class="event-kicker">{{ event.bookingKicker }}</span>
        <h2 v-if="event.bookingTitle">{{ event.bookingTitle }}</h2>
        <ul v-if="event.bookingSteps.length" class="event-tl">
          <li v-for="(item, i) in event.bookingSteps" :key="`${item.time}-${i}`">
            <span v-if="item.time" class="event-time">{{ item.time }}</span>
            <span class="event-what">{{ item.what }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="hasNotes" id="notes">
      <div class="event-wrap">
        <span v-if="event.notesKicker" class="event-kicker">{{ event.notesKicker }}</span>
        <h2 v-if="event.notesTitle">{{ event.notesTitle }}</h2>
        <ul v-if="event.notesList.length" class="event-notes-list">
          <li v-for="item in event.notesList" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section v-if="hasCta" class="event-cta">
      <div class="event-wrap">
        <span v-if="event.ctaKicker" class="event-kicker event-kicker-on-dark">
          {{ event.ctaKicker }}
        </span>
        <h2 v-if="event.ctaTitle">{{ event.ctaTitle }}</h2>
        <NuxtLink
          v-if="event.ctaButton"
          :to="localePath('/contact')"
          class="event-btn"
        >
          {{ event.ctaButton }}
        </NuxtLink>
        <p v-if="event.ctaScarce" class="event-scarce">{{ event.ctaScarce }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.event-page {
  --event-indigo: #1c2a4a;
  --event-indigo-deep: #141f38;
  --event-brass: #b08d57;
  --event-brass-light: #c9a96e;
  --event-brass-text: #7a5e30;
  --event-paper: #f7f3ea;
  --event-paper-2: #efe8d8;
  --event-ink: #2b2a28;
  --event-ink-soft: #5a564f;
  --event-line: rgba(28, 42, 74, 0.14);
  --event-nav-h: 52px;
  color: var(--event-ink);
  background: var(--event-paper);
  font-weight: 300;
  line-height: 1.9;
}

.event-wrap {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px;
}

.event-nav {
  position: sticky;
  top: 74px;
  z-index: 40;
  height: var(--event-nav-h);
  background: rgba(20, 31, 56, 0.96);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(176, 141, 87, 0.35);
  display: flex;
  align-items: center;
}

.event-nav-inner {
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: auto;
}

.event-nav-links {
  display: flex;
  gap: 26px;
  list-style: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
}

.event-nav-links a {
  color: rgba(247, 243, 234, 0.82);
  text-decoration: none;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  transition: color 0.2s;
}

.event-nav-links a:hover,
.event-nav-links a:focus-visible {
  color: var(--event-brass-light);
}

.event-page :deep(section[id]),
.event-page :deep(header) {
  scroll-margin-top: calc(74px + var(--event-nav-h) + 8px);
}

.event-hero {
  position: relative;
  background:
    linear-gradient(160deg, rgba(20, 31, 56, 0.88), rgba(28, 42, 74, 0.8)),
    radial-gradient(circle at 28% 18%, rgba(176, 141, 87, 0.3), transparent 58%);
  color: var(--event-paper);
  padding: 88px 0 76px;
  text-align: center;
  border-bottom: 3px solid var(--event-brass);
}

.event-tag {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: var(--event-indigo-deep);
  background: var(--event-brass-light);
  padding: 5px 16px;
  border-radius: 2px;
  margin-bottom: 22px;
  font-weight: 500;
}

.event-eyebrow {
  font-family: var(--serif);
  letter-spacing: 0.38em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: var(--event-brass-light);
  margin-bottom: 24px;
}

.event-hero h1 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: 2.6rem;
  line-height: 1.45;
  letter-spacing: 0.06em;
  margin: 0;
  color: var(--event-paper);
}

.event-sub-latin {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.3rem;
  color: var(--event-brass-light);
  letter-spacing: 0.08em;
  margin-top: 16px;
}

.event-hero-meta {
  margin-top: 34px;
  padding-top: 26px;
  border-top: 1px solid rgba(176, 141, 87, 0.34);
  display: flex;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
}

.event-hero-meta > div {
  padding: 0 30px;
  border-right: 1px solid rgba(247, 243, 234, 0.16);
}

.event-hero-meta > div:last-child {
  border-right: none;
}

.event-hero-meta dt {
  font-family: var(--serif);
  font-size: 0.66rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--event-brass-light);
  margin-bottom: 6px;
}

.event-hero-meta dd {
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  line-height: 1.6;
  margin: 0;
}

.event-page section {
  padding: 76px 0;
}

.event-band {
  background: var(--event-paper-2);
}

.event-kicker {
  font-family: var(--serif);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-size: 0.72rem;
  color: var(--event-brass-text);
  display: block;
  margin-bottom: 14px;
}

.event-kicker-on-dark {
  color: var(--event-brass-light);
}

.event-page h2 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: 1.62rem;
  letter-spacing: 0.05em;
  line-height: 1.6;
  margin: 0 0 30px;
  color: var(--event-ink);
}

.event-page h2::after {
  content: '';
  display: block;
  width: 44px;
  height: 2px;
  background: var(--event-brass);
  margin-top: 16px;
}

.event-page h3 {
  font-family: var(--mincho);
  font-weight: 500;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  color: var(--event-indigo);
  margin: 0 0 12px;
}

.event-page p {
  margin: 0 0 20px;
}

.event-page p:last-child {
  margin-bottom: 0;
}

.event-lead {
  font-size: 1.06rem;
  line-height: 2.05;
}

.event-page figure {
  margin: 32px 0;
}

.event-page figure img {
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid var(--event-line);
}

.event-page figcaption {
  font-size: 0.78rem;
  line-height: 1.7;
  color: var(--event-ink-soft);
  margin-top: 10px;
  letter-spacing: 0.04em;
}

.event-highlight {
  padding: 30px 0;
  border-top: 1px solid var(--event-line);
}

.event-highlight:first-of-type {
  border-top: none;
  padding-top: 0;
}

.event-num {
  color: var(--event-brass-text);
  font-family: var(--serif);
  margin-right: 10px;
}

.event-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.event-exclusions-title {
  margin-bottom: 16px !important;
  font-size: 0.95rem !important;
  color: var(--event-ink-soft) !important;
}

.event-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.event-list li {
  padding: 11px 0 11px 24px;
  position: relative;
  border-bottom: 1px dashed var(--event-line);
  font-size: 0.94rem;
}

.event-list li:last-child {
  border-bottom: none;
}

.event-list-yes li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--event-brass);
}

.event-list-no li::before {
  content: '×';
  position: absolute;
  left: 2px;
  color: var(--event-ink-soft);
  font-size: 0.85rem;
}

.event-tl {
  list-style: none;
  position: relative;
  padding-left: 30px;
  margin: 0;
}

.event-tl::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--event-brass);
  opacity: 0.5;
}

.event-tl li {
  position: relative;
  padding: 0 0 30px;
}

.event-tl li:last-child {
  padding-bottom: 0;
}

.event-tl li::before {
  content: '';
  position: absolute;
  left: -29px;
  top: 9px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--event-paper);
  border: 2px solid var(--event-brass);
}

.event-band .event-tl li::before {
  background: var(--event-paper-2);
}

.event-time {
  font-family: var(--serif);
  color: var(--event-brass-text);
  letter-spacing: 0.14em;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 3px;
}

.event-what {
  font-size: 0.96rem;
  color: var(--event-ink);
}

.event-meet {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 34px;
  align-items: start;
  margin: 34px 0 26px;
}

.event-meet figure {
  margin: 0;
}

.event-page table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

.event-page th,
.event-page td {
  padding: 15px 14px;
  text-align: left;
  border-bottom: 1px solid var(--event-line);
  vertical-align: top;
}

.event-page th {
  font-family: var(--mincho);
  font-weight: 500;
  color: var(--event-indigo);
  width: 34%;
  white-space: nowrap;
}

.event-page thead th {
  border-bottom: 2px solid var(--event-brass);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  width: auto;
}

.event-cancel-title {
  margin-top: 60px !important;
}

.event-notes-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.event-notes-list li {
  position: relative;
  padding: 11px 0 11px 24px;
  border-bottom: 1px dashed var(--event-line);
  font-size: 0.88rem;
  line-height: 1.85;
}

.event-notes-list li:last-child {
  border-bottom: none;
}

.event-notes-list li::before {
  content: '※';
  position: absolute;
  left: 0;
  top: 11px;
  color: var(--event-brass);
  font-size: 0.8rem;
}

.event-caveat {
  font-size: 0.82rem;
  line-height: 1.8;
  color: var(--event-ink-soft);
  margin-top: 14px;
  padding-left: 1em;
  text-indent: -1em;
}

.event-caveat-flush {
  text-indent: 0;
  padding-left: 0;
}

.event-note {
  border-left: 2px solid var(--event-brass);
  padding: 16px 20px;
  background: rgba(176, 141, 87, 0.07);
  font-size: 0.88rem;
  line-height: 1.85;
  color: var(--event-ink-soft);
  margin-top: 26px;
}

.event-cta {
  background: var(--event-indigo);
  color: var(--event-paper);
  text-align: center;
  padding: 78px 0;
}

.event-cta h2 {
  color: var(--event-paper);
}

.event-cta h2::after {
  margin-left: auto;
  margin-right: auto;
}

.event-btn {
  display: inline-block;
  text-decoration: none;
  border: 1px solid var(--event-brass-light);
  color: var(--event-brass-light);
  padding: 15px 44px;
  letter-spacing: 0.16em;
  font-size: 0.86rem;
  transition:
    background 0.25s,
    color 0.25s;
}

.event-btn:hover,
.event-btn:focus-visible {
  background: var(--event-brass-light);
  color: var(--event-indigo-deep);
}

.event-scarce {
  font-family: var(--serif);
  font-style: italic;
  color: var(--event-brass-light);
  font-size: 1.05rem;
  margin-top: 28px !important;
  letter-spacing: 0.04em;
}

@media (max-width: 720px) {
  .event-hero {
    padding: 64px 0 56px;
  }

  .event-hero h1 {
    font-size: 1.8rem;
  }

  .event-hero-meta > div {
    border-right: none;
    border-bottom: 1px solid rgba(247, 243, 234, 0.14);
    padding: 14px 0;
    width: 100%;
  }

  .event-hero-meta > div:last-child {
    border-bottom: none;
  }

  .event-cols {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .event-meet {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .event-meet figure img {
    max-width: 280px;
    margin: 0 auto;
  }

  .event-page section {
    padding: 56px 0;
  }

  .event-page th {
    width: 40%;
    white-space: normal;
  }
}
</style>
