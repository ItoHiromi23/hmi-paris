<script setup lang="ts">
const heroWidths = [640, 960, 1280, 1500]
const heroSrc = optSrc('auvers-hero', 1280)
const heroSrcset = optSrcSet('auvers-hero', heroWidths)
const heroAvifSrc = optSrc('auvers-hero', 1280, 'avif')
const heroAvifSrcset = optSrcSet('auvers-hero', heroWidths, 'avif')
const figWidths = [400, 640, 900]
const graveWidths = [640, 960, 1100]
const heroSizes = '(max-width: 960px) 100vw, 960px'

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: heroAvifSrc,
      imageSrcset: heroAvifSrcset,
      imageSizes: heroSizes,
      fetchpriority: 'high',
      type: 'image/avif',
    },
  ],
})

useSeoMeta({
  title: 'ゴッホの家 ｜ オーヴェル・シュル・オワーズ — HMI Paris',
  description:
    'ゴッホが最後の70日間を過ごした街、オーヴェル・シュル・オワーズ。専用車でめぐる、画家の足跡をたどる一日。',
  ogLocale: 'ja_JP',
})

const rootEl = ref<HTMLElement | null>(null)
let revealObserver: IntersectionObserver | null = null

onMounted(() => {
  const root = rootEl.value
  if (!root) return
  const els = root.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'))
    return
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )
  els.forEach((el) => revealObserver?.observe(el))
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  revealObserver = null
})
</script>

<template>
  <section
    ref="rootEl"
    class="hmi-auvers"
    aria-label="オーヴェル・シュル・オワーズ ゴッホ ツアー"
  >
    <header class="hero reveal">
      <svg class="crow" viewBox="0 0 100 40" fill="none" aria-hidden="true">
        <path
          d="M4 26 Q20 6 30 20 Q40 34 50 20 Q60 6 70 20 Q80 34 96 14"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          fill="none"
        />
      </svg>
      <p class="eyebrow">Auvers-sur-Oise&nbsp;·&nbsp;Sur les pas de Van&nbsp;Gogh</p>
      <h1 class="hmi-title">ゴッホの家</h1>
      <svg class="brushline" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M2 9 Q40 2 78 7 Q120 12 160 5 Q182 2 198 8"
          stroke="currentColor"
          stroke-width="5"
          stroke-linecap="round"
          fill="none"
        />
      </svg>
      <p class="subtitle">オーヴェル・シュル・オワーズ ― 専用車でめぐるゴッホ最後の70日</p>
      <p class="lede">
        ゴッホが最後の70日間を過ごした街、オーヴェル・シュル・オワーズ。 ここで描いた作品の数は<span
          class="accent"
          >70点以上</span
        >。 彼の足跡を、ひとつずつたどります。
      </p>
    </header>

    <figure class="hero-figure reveal">
      <picture>
        <source type="image/avif" :srcset="heroAvifSrcset" :sizes="heroSizes" />
        <img
          :src="heroSrc"
          :srcset="heroSrcset"
          :sizes="heroSizes"
          alt="オーヴェルの教会"
          width="1500"
          height="1261"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
      <figcaption>オーヴェルの教会 ― ゴッホが描いた、今も変わらぬ姿</figcaption>
    </figure>

    <div class="plan reveal">
      <p class="plan-label">Le déroulé de la journée</p>
      <h2 class="plan-h">このツアーでめぐるもの</h2>
      <ol class="steps">
        <li>生活し絵を描き、そして息を引き取ったラヴー亭の一室『ゴッホの部屋』を見学。</li>
        <li>
          遠くまで広がる麦畑、今も変わらぬオーヴェルの教会や市役所。彼が描いたゆかりのスポットを、素敵な小道を散策しながら巡ります。
        </li>
        <li>さらにゴッホのお墓、見晴らしの良い丘の上に建つ主治医ガシェ医師の家の見学など、盛りだくさん。</li>
        <li>専用車ならでは。街外れにあるガシェ医師の家まで、ラクラク車移動。</li>
        <li>日本語アシスタントガイドの案内で、効率よく散策していただけます。</li>
      </ol>
    </div>

    <div class="trail">
      <article class="stop reveal">
        <span class="node">1</span>
        <p class="stop-jp-label">見どころ</p>
        <h3 class="stop-fr">芸術家達を魅了してやまない田舎町</h3>
        <figure class="stop-figure reveal">
          <picture>
            <source type="image/avif" :srcset="optSrcSet('auvers-wheatfield', figWidths, 'avif')" sizes="(max-width: 700px) 100vw, 520px" />
            <img
              :src="optSrc('auvers-wheatfield', 640)"
              :srcset="optSrcSet('auvers-wheatfield', figWidths)"
              sizes="(max-width: 700px) 100vw, 520px"
              alt="麦畑と『カラスのいる麦畑』の解説板"
              width="1000"
              height="700"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <figcaption>『カラスのいる麦畑』が描かれた、その場所で</figcaption>
        </figure>
        <p>ゴッホは亡くなるまでの約2か月をここで過ごし、その間にこの街を題材に70点以上の作品を残しています。</p>
        <p>
          辺り一面に広がる麦畑、オーヴェルの教会、何気ない木の根っこまで――村のあらゆるものを描きました。街の至る所に、いまも絵画の世界が息づいています。
        </p>
        <p>ゴッホだけでなく、ピサロやセザンヌ、ルノワールなど、多くの画家達を魅了した、素朴で美しい田舎町です。</p>
      </article>

      <article class="stop reveal">
        <span class="node">2</span>
        <h3 class="stop-fr">カフェ兼ワイン販売店<br />ラヴー亭のゴッホの部屋</h3>
        <figure class="stop-figure reveal">
          <picture>
            <source type="image/avif" :srcset="optSrcSet('auvers-ravoux', figWidths, 'avif')" sizes="(max-width: 700px) 100vw, 520px" />
            <img
              :src="optSrc('auvers-ravoux', 640)"
              :srcset="optSrcSet('auvers-ravoux', figWidths)"
              sizes="(max-width: 700px) 100vw, 520px"
              alt="ラヴー亭の店内"
              width="1000"
              height="700"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <figcaption>ラヴー亭 ― ゴッホが暮らした建物の中</figcaption>
        </figure>
        <p>印象派の画家ピサロの勧めでこの街に移り、ラヴー亭の一室を間借りしていました。</p>
        <p>その小さな屋根裏部屋で多くの絵を描き、弟のテオ宛にオーヴェルの美しさを手紙に書き記しています。</p>
        <p>
          この部屋で息を引き取ったゴッホは、どのような思いでこの世を去っていったのでしょうか。目と心で感じ取る、特別な空間です。
        </p>
      </article>

      <article class="stop reveal">
        <span class="node">3</span>
        <h3 class="stop-fr">印象派絵画の愛好家<br />ガシェ医師の家</h3>
        <figure class="stop-figure reveal">
          <picture>
            <source type="image/avif" :srcset="optSrcSet('auvers-gachet', figWidths, 'avif')" sizes="(max-width: 700px) 100vw, 520px" />
            <img
              :src="optSrc('auvers-gachet', 640)"
              :srcset="optSrcSet('auvers-gachet', figWidths)"
              sizes="(max-width: 700px) 100vw, 520px"
              alt="ガシェ医師の家の室内と絵画"
              width="1000"
              height="700"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <figcaption>絵に囲まれた、ガシェ医師の家の室内</figcaption>
        </figure>
        <p>ゴッホの主治医であり、親しい間柄でもあったガシェ医師の家を見学します。</p>
        <p>
          彼自身も絵を描き、印象派絵画の愛好家でした。交流のあったピサロやセザンヌ、ルノワールなど、多くの画家達が訪れています。
        </p>
        <p>
          ゴッホもしばしばここを訪れ、家や庭、ガシェ医師やその家族をキャンヴァスに残しました。丘の上に建つ、眺めの良い庭付きの素敵なお家を、アシスタントがご案内します。
        </p>
      </article>
    </div>

    <figure class="closing-figure reveal">
      <picture>
        <source type="image/avif" :srcset="optSrcSet('auvers-grave', graveWidths, 'avif')" sizes="(max-width: 960px) 100vw, 700px" />
        <img
          :src="optSrc('auvers-grave', 960)"
          :srcset="optSrcSet('auvers-grave', graveWidths)"
          sizes="(max-width: 960px) 100vw, 700px"
          alt="ゴッホの墓"
          width="1100"
          height="620"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <figcaption>ひまわりに見守られて ― ゴッホの眠る場所</figcaption>
    </figure>

    <div class="details reveal">
      <p class="details-label">Informations pratiques</p>
      <h2 class="details-h">ツアー詳細</h2>

      <dl class="spec">
        <dt>【所要時間】</dt>
        <dd>6時間</dd>

        <dt>【出発時間】</dt>
        <dd>9:00 / 10:00 / 11:00</dd>

        <dt>【人数】</dt>
        <dd>1〜6名さま（1グループ）</dd>

        <dt>【集合場所】</dt>
        <dd>ホテルのロビー</dd>

        <dt>【料金】</dt>
        <dd><span class="price">940€〜</span></dd>
      </dl>

      <ul class="notes">
        <li>入場チケットは含まれておりません。</li>
        <li>チケットのお手配は可能です。（チケット代 × 人数分 ＋ 手数料 25€）</li>
        <li>
          ゴッホの家の入場チケットは時間指定予約になります。空き状況により、ご希望の時間帯に添えないことがあります。
        </li>
      </ul>

      <hr class="rule" />

      <dl class="spec">
        <dt>【含まれるもの】</dt>
        <dd>
          <ul>
            <li>専用車（ドライバー含む）</li>
            <li>日本語アシスタントガイド</li>
          </ul>
        </dd>

        <dt>【含まれないもの】</dt>
        <dd>
          <ul>
            <li>ゴッホの家　入場チケット</li>
            <li>ガシェ医師の家　入場チケット</li>
          </ul>
        </dd>
      </dl>

      <hr class="rule" />

      <dl class="spec">
        <dt>【お支払い期限】</dt>
        <dd>予約確定のメールをお送りした時間より72時間以内</dd>

        <dt>【お支払い方法】</dt>
        <dd>クレジットカード（VISA / Master）、銀行振り込み</dd>

        <dt>【予約確認書】</dt>
        <dd>
          お支払い確認後、メールにてお送りする予約確認書（バウチャー）を印刷、またはスクリーンショットし、参加当日にご持参ください。こちらが「参加券」となります。
        </dd>
      </dl>

      <hr class="rule" />

      <p class="cancel-h">【キャンセル条件】</p>
      <ul class="notes">
        <li>待ち合わせ時間に連絡なく30分以上遅れた場合は、キャンセルとみなされます。</li>
      </ul>

      <p class="cancel-h cancel-h-spaced">≪キャンセル料金≫</p>
      <table class="cancel">
        <tbody>
          <tr>
            <th>参加日の30日前まで</th>
            <td class="rate">0%</td>
          </tr>
          <tr>
            <th>参加日の29〜14日前まで</th>
            <td class="rate">50%</td>
          </tr>
          <tr>
            <th>参加日の13日前〜当日</th>
            <td class="rate">100%</td>
          </tr>
          <tr>
            <th>チケット代が発生する場合</th>
            <td class="rate">100%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="cta-wrap reveal">
      <p class="cta-note">彼の足跡を、あなた自身の目で。</p>
      <NuxtLink class="cta" to="/contact">このツアーを予約・お問い合わせ</NuxtLink>
    </div>
  </section>
</template>

<style>
.hmi-auvers {
  --ink: #16233b;
  --ink-soft: #3a4d6e;
  --wheat: #c1912b;
  --wheat-deep: #a4741a;
  --wheat-text: #6b4e10;
  --wheat-soft: #e6cf8a;
  --cobalt: #2a5a8c;
  --cobalt-deep: #1e4568;
  --field: #6f7d4a;
  --canvas: #f4eddb;
  --paper: #fbf6e9;
  --line: #e2d8bf;
  box-sizing: border-box;
  background:
    radial-gradient(1200px 520px at 82% -8%, rgba(42, 90, 140, 0.09), transparent 60%),
    radial-gradient(900px 460px at 10% 108%, rgba(193, 145, 43, 0.1), transparent 60%),
    var(--canvas);
  color: var(--ink);
  font-family: var(--mincho);
  line-height: 1.95;
  -webkit-font-smoothing: antialiased;
  padding: clamp(2.5rem, 6vw, 6rem) clamp(1.1rem, 5vw, 4.5rem) clamp(3rem, 7vw, 7rem);
  overflow: hidden;
}

.hmi-auvers * {
  box-sizing: border-box;
}

.hmi-auvers .hero {
  position: relative;
  max-width: 60rem;
  margin: 0 auto clamp(3rem, 7vw, 6rem);
  text-align: center;
  z-index: 1;
}

.hmi-auvers .eyebrow {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  font-size: clamp(1rem, 2.4vw, 1.35rem);
  letter-spacing: 0.06em;
  color: var(--cobalt);
  margin: 0 0 0.9rem;
}

.hmi-auvers .eyebrow::before,
.hmi-auvers .eyebrow::after {
  content: '';
  display: inline-block;
  width: clamp(1.4rem, 5vw, 3rem);
  height: 1px;
  background: var(--wheat);
  vertical-align: middle;
  margin: 0 0.8em;
  opacity: 0.8;
}

.hmi-auvers h1.hmi-title {
  font-weight: 800;
  font-size: clamp(2.6rem, 8vw, 5rem);
  letter-spacing: 0.06em;
  line-height: 1.25;
  margin: 0;
  color: var(--ink);
}

.hmi-auvers .brushline {
  display: block;
  width: clamp(6rem, 22vw, 12rem);
  height: 14px;
  margin: 0.55rem auto 1.5rem;
  color: var(--wheat);
}

.hmi-auvers .subtitle {
  font-size: clamp(1rem, 2.6vw, 1.28rem);
  color: var(--ink-soft);
  letter-spacing: 0.05em;
  margin: 0 0 1.9rem;
}

.hmi-auvers .lede {
  font-size: clamp(1.05rem, 2.7vw, 1.3rem);
  color: var(--ink);
  max-width: 40rem;
  margin: 0 auto;
}

.hmi-auvers .lede .accent {
  color: var(--wheat-text);
  font-weight: 600;
}

.hmi-auvers .crow {
  position: absolute;
  top: -1.4rem;
  right: 6%;
  width: clamp(2.4rem, 7vw, 3.6rem);
  color: var(--ink);
  opacity: 0.42;
}

.hmi-auvers .plan {
  max-width: 46rem;
  margin: 0 auto clamp(3.5rem, 8vw, 6.5rem);
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: clamp(1.6rem, 4.5vw, 2.8rem) clamp(1.4rem, 4.5vw, 3rem);
  box-shadow: 0 22px 48px -34px rgba(22, 35, 59, 0.5);
}

.hmi-auvers .plan-label {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--cobalt);
  text-align: center;
  margin: 0 0 0.1rem;
}

.hmi-auvers .plan-h {
  text-align: center;
  font-weight: 700;
  font-size: clamp(1.3rem, 3.6vw, 1.7rem);
  letter-spacing: 0.08em;
  margin: 0 0 1.6rem;
}

.hmi-auvers ol.steps {
  list-style: none;
  counter-reset: step;
  margin: 0;
  padding: 0;
}

.hmi-auvers ol.steps li {
  counter-increment: step;
  position: relative;
  padding: 0.85rem 0 0.85rem 2.6rem;
  font-size: clamp(0.98rem, 2.4vw, 1.08rem);
  border-bottom: 1px solid var(--line);
}

.hmi-auvers ol.steps li:last-child {
  border-bottom: none;
}

.hmi-auvers ol.steps li::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 1rem;
  width: 1.65rem;
  height: 1.65rem;
  border: 1.5px solid var(--wheat);
  border-radius: 50%;
  color: var(--wheat-text);
  font-family: var(--serif);
  font-weight: 600;
  font-size: 0.98rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--canvas);
}

.hmi-auvers .trail {
  position: relative;
  max-width: 52rem;
  margin: 0 auto;
  padding-left: clamp(2.2rem, 7vw, 4rem);
}

.hmi-auvers .stop {
  position: relative;
  margin-bottom: clamp(2.6rem, 6vw, 4rem);
}

.hmi-auvers .stop:last-child {
  margin-bottom: 0;
}

.hmi-auvers .node {
  position: absolute;
  left: calc(-1 * clamp(2.2rem, 7vw, 4rem));
  top: 0.15rem;
  width: clamp(1.8rem, 5vw, 2.05rem);
  height: clamp(1.8rem, 5vw, 2.05rem);
  border-radius: 50%;
  background: var(--cobalt-deep);
  border: 2px solid var(--wheat);
  color: var(--wheat-soft);
  font-family: var(--serif);
  font-weight: 600;
  font-size: clamp(0.95rem, 2.8vw, 1.05rem);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 0 5px var(--canvas),
    0 10px 22px -14px rgba(30, 69, 104, 0.9);
}

.hmi-auvers .stop:first-of-type .node {
  top: clamp(1.75rem, 5.5vw, 2rem);
}

.hmi-auvers .stop p.stop-jp-label {
  font-size: 1.15rem;
  line-height: 1.5;
  letter-spacing: 0.34em;
  color: var(--wheat-text);
  font-weight: 600;
  margin: 0 0 0.3rem;
}

.hmi-auvers .stop-fr {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  font-size: clamp(1.15rem, 3.2vw, 1.5rem);
  color: var(--cobalt);
  margin: 0 0 0.9rem;
  line-height: 1.35;
}

.hmi-auvers .stop p {
  margin: 0 0 0.9rem;
  font-size: clamp(1rem, 2.5vw, 1.12rem);
  color: var(--ink);
}

.hmi-auvers .stop p:last-child {
  margin-bottom: 0;
}

.hmi-auvers .cta-wrap {
  max-width: 52rem;
  margin: clamp(3.5rem, 8vw, 6rem) auto 0;
  text-align: center;
  border-top: 1px solid var(--line);
  padding-top: clamp(2.4rem, 6vw, 3.4rem);
}

.hmi-auvers .cta-note {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--cobalt);
  margin: 0 0 1.2rem;
}

.hmi-auvers a.cta {
  display: inline-block;
  font-family: var(--gothic);
  font-weight: 700;
  font-size: 1.02rem;
  letter-spacing: 0.14em;
  color: var(--canvas);
  background: var(--cobalt-deep);
  text-decoration: none;
  padding: 0.95rem 2.6rem;
  border-radius: 3px;
  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.hmi-auvers a.cta:hover {
  background: var(--wheat-deep);
  transform: translateY(-2px);
}

.hmi-auvers a.cta:focus-visible {
  outline: 3px solid var(--cobalt);
  outline-offset: 3px;
}

.hmi-auvers figure {
  margin: 0;
}

.hmi-auvers .hero-figure {
  max-width: 44rem;
  margin: 0 auto clamp(3rem, 7vw, 5rem);
  position: relative;
}

.hmi-auvers .hero-figure img,
.hmi-auvers .stop-figure img,
.hmi-auvers .closing-figure img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 3px;
}

.hmi-auvers .hero-figure img {
  box-shadow: 0 30px 60px -34px rgba(22, 35, 59, 0.62);
}

.hmi-auvers .hero-figure picture,
.hmi-auvers .stop-figure picture,
.hmi-auvers .closing-figure picture {
  display: block;
}

.hmi-auvers .stop-figure {
  margin: 0 0 1.2rem;
}

.hmi-auvers .stop-figure img {
  box-shadow: 0 22px 44px -30px rgba(22, 35, 59, 0.55);
}

.hmi-auvers .closing-figure {
  max-width: 44rem;
  margin: clamp(3rem, 7vw, 5rem) auto 0;
}

.hmi-auvers .closing-figure img {
  box-shadow: 0 26px 52px -32px rgba(22, 35, 59, 0.55);
}

.hmi-auvers figcaption {
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  color: var(--ink-soft);
  text-align: center;
  margin-top: 0.7rem;
  opacity: 0.85;
}

.hmi-auvers .details {
  max-width: 47rem;
  margin: clamp(3.5rem, 8vw, 5.5rem) auto 0;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: clamp(1.6rem, 4.5vw, 2.8rem) clamp(1.3rem, 4.5vw, 3rem);
  box-shadow: 0 22px 48px -34px rgba(22, 35, 59, 0.5);
}

.hmi-auvers .details-label {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--cobalt);
  text-align: center;
  margin: 0 0 0.1rem;
}

.hmi-auvers .details-h {
  text-align: center;
  font-weight: 700;
  font-size: clamp(1.3rem, 3.6vw, 1.7rem);
  letter-spacing: 0.08em;
  margin: 0 0 1.8rem;
}

.hmi-auvers dl.spec {
  margin: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0;
}

.hmi-auvers dl.spec dt {
  font-weight: 600;
  color: var(--cobalt-deep);
  font-size: 0.98rem;
  letter-spacing: 0.04em;
  padding: 0.75rem 1.4rem 0.75rem 0;
  border-bottom: 1px solid var(--line);
  white-space: nowrap;
}

.hmi-auvers dl.spec dd {
  margin: 0;
  font-size: 1.02rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--line);
}

.hmi-auvers dl.spec dd .price {
  font-family: var(--serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--wheat-text);
  letter-spacing: 0.02em;
}

.hmi-auvers dl.spec dd ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.hmi-auvers dl.spec dd ul li {
  position: relative;
  padding-left: 0.95rem;
}

.hmi-auvers dl.spec dd ul li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--wheat);
}

.hmi-auvers .details hr.rule {
  border: none;
  border-top: 1px solid var(--line);
  margin: 1.8rem 0 1.4rem;
}

.hmi-auvers .notes {
  margin: 1.2rem 0 0;
  padding: 0;
  list-style: none;
}

.hmi-auvers .notes li {
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--ink-soft);
  padding-left: 1.2rem;
  position: relative;
  margin-bottom: 0.3rem;
}

.hmi-auvers .notes li::before {
  content: '\203B';
  position: absolute;
  left: 0;
  color: var(--wheat-text);
}

.hmi-auvers .cancel-h {
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  color: var(--cobalt-deep);
  margin: 0 0 0.7rem;
}

.hmi-auvers .cancel-h-spaced {
  margin-top: 1.4rem;
}

.hmi-auvers table.cancel {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 0.4rem;
}

.hmi-auvers table.cancel th,
.hmi-auvers table.cancel td {
  text-align: left;
  font-size: 0.98rem;
  padding: 0.6rem 0.5rem 0.6rem 0;
  border-bottom: 1px solid var(--line);
  font-weight: 400;
}

.hmi-auvers table.cancel td.rate {
  text-align: right;
  font-family: var(--serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--wheat-text);
  white-space: nowrap;
  padding-right: 0;
}

.hmi-auvers table.cancel tr:last-child th,
.hmi-auvers table.cancel tr:last-child td {
  border-bottom: none;
}

.hmi-auvers .reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.9s ease,
    transform 0.9s ease;
}

.hmi-auvers .reveal.in {
  opacity: 1;
  transform: none;
}

@media (max-width: 560px) {
  .hmi-auvers dl.spec {
    grid-template-columns: 1fr;
  }

  .hmi-auvers dl.spec dt {
    border-bottom: none;
    padding: 0.9rem 0 0.1rem;
  }

  .hmi-auvers dl.spec dd {
    padding: 0 0 0.9rem;
  }
}

@media (max-width: 600px) {
  .hmi-auvers ol.steps li {
    padding-left: 2.3rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hmi-auvers .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
