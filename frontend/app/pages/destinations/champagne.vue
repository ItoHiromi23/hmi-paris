<script setup lang="ts">
const heroWidths = [640, 960, 1280, 1600]
const heroSrc = optSrc('champagne-hero', 1280)
const heroSrcset = optSrcSet('champagne-hero', heroWidths)
const heroAvifSrc = optSrc('champagne-hero', 1280, 'avif')
const heroAvifSrcset = optSrcSet('champagne-hero', heroWidths, 'avif')
const galleryWidths = [400, 640, 900]
const wideWidths = [640, 960, 1280]

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: heroAvifSrc,
      imageSrcset: heroAvifSrcset,
      imageSizes: '100vw',
      fetchpriority: 'high',
      type: 'image/avif',
    },
  ],
})

useSeoMeta({
  title: 'シャンパーニュ地方 ― 白亜のカーヴをめぐる、泡の旅 — HMI Paris',
  description:
    '専用車で葡萄畑の丘を走り、名門メゾンの扉を訪ねます。シャンパン醸造の秘密に触れ、黄金の輝きを味わう一日にご案内します。',
  ogLocale: 'ja_JP',
})

const gallery = [
  {
    name: 'champagne-gallery-01',
    alt: 'シャンパーニュの葡萄畑',
    w: 1400,
    h: 933,
    widths: galleryWidths,
  },
  {
    name: 'champagne-gallery-02',
    alt: 'シャンパーニュの丘陵',
    w: 1400,
    h: 933,
    widths: galleryWidths,
  },
  {
    name: 'champagne-gallery-03',
    alt: 'シャンパーニュの村並み',
    w: 1400,
    h: 933,
    widths: galleryWidths,
  },
  {
    name: 'champagne-gallery-04',
    alt: 'シャンパーニュのカーヴとボトル',
    w: 1800,
    h: 700,
    widths: wideWidths,
    wide: true,
  },
  {
    name: 'champagne-gallery-05',
    alt: 'シャンパーニュのメゾン',
    w: 1400,
    h: 933,
    widths: galleryWidths,
  },
]

const bubblesEl = ref<HTMLElement | null>(null)

onMounted(() => {
  const wrap = bubblesEl.value
  if (!wrap) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  for (let i = 0; i < 26; i++) {
    const b = document.createElement('span')
    const size = 4 + Math.random() * 12
    b.style.width = `${size}px`
    b.style.height = `${size}px`
    b.style.left = `${Math.random() * 100}%`
    b.style.animationDuration = `${7 + Math.random() * 9}s`
    b.style.animationDelay = `${-Math.random() * 12}s`
    wrap.appendChild(b)
  }
})
</script>

<template>
  <div class="champagne-page">
    <header class="hero">
      <picture class="hero-photo">
        <source type="image/avif" :srcset="heroAvifSrcset" sizes="100vw" />
        <img
          :src="heroSrc"
          :srcset="heroSrcset"
          sizes="100vw"
          alt="シャンパーニュ地方の葡萄畑"
          width="1800"
          height="1000"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
      <div class="hero-veil" />
      <div ref="bubblesEl" class="bubbles" aria-hidden="true" />
      <div class="hero-mark">Champagne</div>
      <h1>
        シャンパーニュ地方<br /><span class="accent">― 白亜のカーヴをめぐる、泡の旅</span>
      </h1>
      <div class="hero-rule" />
    </header>

    <section class="intro">
      <p>
        なだらかに葡萄畑が広がるシャンパーニュの丘陵。この地に降りそそぐ光を、名だたるメゾンたちは幾世紀にもわたり、一本の瓶の中へと閉じ込めてきました。幾百万本もの瓶が眠り、泡の宝がゆっくりと熟成の時を重ねています。専用車で葡萄畑の丘を走り、心を尽くしたご案内のもと、名門メゾンの扉を訪ねます。シャンパン醸造の秘密に触れ、黄金の輝きを味わう一日にご案内します。
      </p>
    </section>

    <div class="chapter-label">
      <span class="eyebrow">泡の宝が眠るカーヴをめぐる</span>
    </div>

    <section class="places">
      <article class="place">
        <div class="place-head">
          <h2 class="place-jp">エペルネー</h2>
          <span class="place-latin">Épernay</span>
        </div>
        <p>
          シャンパーニュの真髄は、地の下に眠っています。エペルネーのシャンパン通り ―
          「シャンパーニュ大通り」の石畳の下には、白亜を穿って掘られた地下回廊が幾キロメートルにもわたって広がります。一定の温度と静寂に守られたそのなかで、幾多の瓶が幾年もの熟成を重ね、繊細な泡を生み出してゆきます。
        </p>
        <p>
          この大通りには、名だたるメゾンの館が軒を連ねます。かの高名な「ドン・ペリニヨン」の名は、もともとメゾン・メルシエが商標として登録していたもの。1927年、メルシエ家の令嬢がモエ・エ・シャンドン家へと嫁いだ折、その婚礼の贈り物として受け継がれ、やがて世界に冠たる至高のシャンパンへと磨き上げられました。メルシエとモエ・エ・シャンドン
          ― 二つの由緒あるメゾンが、今もこの地で静かに向かい合っています。
        </p>
      </article>

      <article class="place">
        <div class="place-head">
          <h2 class="place-jp">オーヴィレール</h2>
          <span class="place-latin">Hautvillers</span>
        </div>
        <p class="place-kicker">
          <span class="eyebrow">シャンパン発祥の地</span>
        </p>
        <p>
          マルヌ渓谷を見下ろす高台に佇む村、オーヴィレール。一枚一枚の絵画のような錬鉄の看板がそれぞれの家並みを飾っています。この地で修道士ドン・ペリニヨンは、複数のワインを調和させ、その泡の魔法を引き出す技を極めたと語り継がれています。今日、彼はこの村の中心にある修道院教会に、静かに眠っています。カーヴをめぐる旅の合間に、この発祥の地に立ち寄れば、一杯のシャンパンがいっそう深い味わいを帯びることでしょう。
        </p>
      </article>

      <article class="place">
        <div class="place-head">
          <h2 class="place-jp">ランス</h2>
          <span class="place-latin">Reims</span>
        </div>
        <p>
          地下はガロ・ローマ時代の採石場を起源とする「クレイエール」が、名門メゾンの蔵として今に受け継がれています。専門のご案内のもと、世代を超えて受け継がれる醸造の技のすべてを、間近にご覧いただけます。そして旅の締めくくりには、選びぬかれた一杯のシャンパンを心ゆくまでご堪能ください。
        </p>
      </article>
    </section>

    <section class="option">
      <div class="option-inner">
        <span class="eyebrow">戴冠の都</span>
        <h2>ランス大聖堂</h2>
        <span class="cath-latin">Cathédrale Notre-Dame de Reims</span>
        <p>
          ゴシック建築の傑作にして世界遺産であるこの大聖堂は、幾世紀にもわたりフランス国王の戴冠の地となりました。1429年、ジャンヌ・ダルクがシャルル7世を王冠へと導いたのも、この地にほかなりません。天へと昇る石の尖塔、光を織りなすステンドグラス
          ―
          その荘厳なる佇まいは、白亜のカーヴとはまた異なる、シャンパーニュのもう一つの魂を映し出します。
        </p>
      </div>
    </section>

    <section class="gallery">
      <div class="gallery-grid">
        <figure v-for="item in gallery" :key="item.name" :class="{ wide: item.wide }">
          <picture>
            <source type="image/avif" :srcset="optSrcSet(item.name, item.widths, 'avif')" sizes="(max-width: 700px) 100vw, 540px" />
            <img
              :src="optSrc(item.name, item.wide ? 960 : 640)"
              :srcset="optSrcSet(item.name, item.widths)"
              sizes="(max-width: 700px) 100vw, 540px"
              :alt="item.alt"
              :width="item.w"
              :height="item.h"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </figure>
      </div>
    </section>

    <section class="courses">
      <h2 class="courses-title"><span class="star">★</span> お選びいただける2つのコース</h2>
      <div class="courses-sub">Deux itinéraires au choix</div>
      <div class="course-grid">
        <div class="course">
          <span class="course-num">①</span>
          <div class="course-stops">
            エペルネー<span class="note">カーヴ見学</span>
            <span class="plus">＋</span>オーヴィレール
          </div>
          <div class="course-maison">※ エペルネー：モエ・エ・シャンドン または メルシエ</div>
        </div>
        <div class="course">
          <span class="course-num">②</span>
          <div class="course-stops">
            ランス<span class="note">カーヴ見学</span>
            <span class="plus">＋</span>ランス大聖堂
          </div>
          <div class="course-maison">
            ※ ランス：ヴーヴ・クリコ（月曜休み） または G.H.マム（休みは季節により異なります）
          </div>
        </div>
      </div>
    </section>

    <section class="details">
      <div class="details-box">
        <div class="drow">
          <div class="dlabel">人数</div>
          <div class="dval">1〜6名さま（1グループ）</div>
        </div>
        <div class="drow">
          <div class="dlabel">所要時間</div>
          <div class="dval">8時間</div>
        </div>
        <div class="drow">
          <div class="dlabel">出発時間</div>
          <div class="dval">8:00 ／ 9:00 ／ 10:00</div>
        </div>
        <div class="drow">
          <div class="dlabel">集合場所</div>
          <div class="dval">ホテルのロビー（パリ市内のホテルに限ります）</div>
        </div>
        <div class="drow">
          <div class="dlabel">料金</div>
          <div class="dval"><span class="price">1,620 €</span> 〜</div>
        </div>
        <div class="drow">
          <div class="dlabel">含まれるもの</div>
          <div class="dval">
            <ul>
              <li>専用車（高速道路料金を含む）</li>
              <li>日本語アシスタントガイド</li>
            </ul>
          </div>
        </div>
        <div class="drow">
          <div class="dlabel">含まれないもの</div>
          <div class="dval">
            <ul>
              <li>カーヴ入場チケット（メゾンやコースにより料金は異なります）</li>
              <li>食事代</li>
            </ul>
          </div>
        </div>
        <div class="drow">
          <div class="dlabel">お支払い期限</div>
          <div class="dval">予約確定時のメールをお送りした時間より72時間以内</div>
        </div>
        <div class="drow">
          <div class="dlabel">お支払い方法</div>
          <div class="dval">クレジットカード（Visa、Mastercard）、銀行振り込み</div>
        </div>
        <div class="drow">
          <div class="dlabel">予約確認書</div>
          <div class="dval">
            お支払い確認後、メールにてお送りする予約確認書（バウチャー）を印刷、またはスクリーンショットのうえ、参加当日にご持参ください。こちらが「参加券」となります。
          </div>
        </div>
        <div class="drow">
          <div class="dlabel">キャンセル条件</div>
          <div class="dval">
            <p class="dnote">
              ※ 待ち合わせ時間に連絡なく30分以上遅れられた場合は、キャンセルとみなされます。
            </p>
            <table class="cancel-table">
              <tbody>
                <tr>
                  <td>参加日の30日前まで</td>
                  <td>0%</td>
                </tr>
                <tr>
                  <td>参加日の29〜14日前まで</td>
                  <td>50%</td>
                </tr>
                <tr>
                  <td>参加日の13日前〜当日</td>
                  <td>100%</td>
                </tr>
                <tr>
                  <td>チケット代が発生する場合</td>
                  <td>100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="contact">
      <div class="contact-box">
        <h2>お問い合わせ・お申し込み</h2>
        <div class="sub">Réservation</div>
        <p>
          ご希望の日程、ご人数、コース（①または②）をお知らせください。空き状況をお調べのうえ、折り返しご連絡いたします。お気軽にお申し付けください。
        </p>
        <NuxtLink class="contact-btn" to="/contact">メールでお問い合わせ</NuxtLink>
        <a class="contact-mail" href="mailto:info@hmiparis.com">info@hmiparis.com</a>
      </div>
    </section>

    <footer class="foot">
      <span class="latin">HMI Paris</span>
      <small>Excursions privées au départ de Paris</small>
    </footer>
  </div>
</template>

<style>
.champagne-page {
  --indigo: #1b2a4a;
  --indigo-deep: #141f38;
  --brass: #b89150;
  --brass-light: #d8b878;
  --brass-text: #7a5e30;
  --ivory: #f6f1e7;
  --ivory-soft: #efe7d6;
  --ink: #20222b;
  --muted: #6a6456;
  font-family: var(--mincho);
  color: var(--ink);
  background: var(--ivory);
  line-height: 2.15;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.champagne-page,
.champagne-page * {
  box-sizing: border-box;
}

.champagne-page .latin {
  font-family: var(--serif);
  font-weight: 500;
  letter-spacing: 0.04em;
}

.champagne-page .eyebrow {
  font-family: var(--serif);
  font-style: italic;
  letter-spacing: 0.12em;
  color: var(--brass-text);
  font-size: clamp(0.95rem, 1.4vw, 1.15rem);
}

.champagne-page .hero {
  position: relative;
  aspect-ratio: 1800 / 1000;
  min-height: 0;
  background: linear-gradient(165deg, var(--indigo) 0%, var(--indigo-deep) 100%);
  color: var(--ivory);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 1.5rem 5rem;
  overflow: hidden;
}

.champagne-page .hero-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.champagne-page .hero-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 45%;
  opacity: 0.42;
}

.champagne-page .hero-veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 120%, rgba(184, 145, 80, 0.2), transparent 60%),
    linear-gradient(180deg, rgba(20, 31, 56, 0.72) 0%, rgba(20, 31, 56, 0.55) 45%, rgba(20, 31, 56, 0.88) 100%);
}

.champagne-page .hero > *:not(.hero-photo):not(.hero-veil):not(.bubbles) {
  position: relative;
  z-index: 2;
}

.champagne-page .gallery {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem 1.8rem 2rem;
}

.champagne-page .gallery-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
}

.champagne-page .gallery figure {
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(184, 145, 80, 0.35);
  background: var(--ivory-soft);
}

.champagne-page .gallery figure:nth-child(-n + 3) {
  grid-column: span 2;
}

.champagne-page .gallery figure.wide {
  grid-column: 1 / -1;
}

.champagne-page .gallery img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 1.2s ease;
}

.champagne-page .gallery figure:hover img {
  transform: scale(1.04);
}

.champagne-page .bubbles {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.champagne-page .bubbles span {
  position: absolute;
  bottom: -40px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, rgba(216, 184, 120, 0.55), rgba(184, 145, 80, 0.08) 70%);
  box-shadow: 0 0 6px rgba(216, 184, 120, 0.25);
  animation: champagne-rise linear infinite;
  opacity: 0;
}

@keyframes champagne-rise {
  0% {
    transform: translateY(0) scale(0.8);
    opacity: 0;
  }
  12% {
    opacity: 0.9;
  }
  88% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-96vh) scale(1.1);
    opacity: 0;
  }
}

.champagne-page .hero-mark {
  font-family: var(--serif);
  letter-spacing: 0.5em;
  font-size: 0.9rem;
  color: var(--brass-light);
  text-transform: uppercase;
  margin-bottom: 2.4rem;
  padding-left: 0.5em;
  opacity: 0;
  animation: champagne-fade 1.4s ease 0.2s forwards;
}

.champagne-page .hero h1 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(1.9rem, 4.6vw, 3.5rem);
  line-height: 1.7;
  letter-spacing: 0.06em;
  max-width: 20em;
  margin: 0;
  opacity: 0;
  animation: champagne-fade 1.6s ease 0.5s forwards;
}

.champagne-page .hero h1 .accent {
  color: var(--brass-light);
}

.champagne-page .hero-rule {
  width: 1px;
  height: 70px;
  background: linear-gradient(var(--brass), transparent);
  margin: 2.6rem 0 0;
  opacity: 0;
  animation: champagne-fade 1.6s ease 1s forwards;
}

@keyframes champagne-fade {
  to {
    opacity: 1;
  }
}

.champagne-page .intro {
  max-width: 760px;
  margin: 0 auto;
  padding: 6rem 1.8rem 4rem;
  text-align: center;
  font-size: clamp(1rem, 1.5vw, 1.12rem);
  color: #3a3a3a;
}

.champagne-page .intro p {
  margin: 0;
  text-align: justify;
  text-align-last: center;
}

.champagne-page .chapter-label {
  text-align: center;
  margin: 3rem auto 0;
  max-width: 800px;
  padding: 0 1.5rem;
}

.champagne-page .chapter-label .eyebrow {
  display: inline-block;
}

.champagne-page .chapter-label::after {
  content: '';
  display: block;
  width: 44px;
  height: 1px;
  background: var(--brass);
  margin: 1.4rem auto 0;
}

.champagne-page .places {
  max-width: 940px;
  margin: 0 auto;
  padding: 2rem 1.8rem 2rem;
}

.champagne-page .place {
  padding: 3.4rem 0;
  border-bottom: 1px solid rgba(184, 145, 80, 0.28);
}

.champagne-page .place:last-child {
  border-bottom: none;
}

.champagne-page .place-head {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.8rem;
  flex-wrap: wrap;
}

.champagne-page .place-jp {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  letter-spacing: 0.08em;
  color: var(--indigo);
  margin: 0;
}

.champagne-page .place-latin {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  color: var(--brass-text);
  letter-spacing: 0.03em;
}

.champagne-page .place p {
  margin: 0;
  font-size: clamp(1rem, 1.4vw, 1.08rem);
  color: #33343c;
  text-align: justify;
}

.champagne-page .place p + p {
  margin-top: 1.3rem;
}

.champagne-page .place-kicker {
  margin-bottom: 1.3rem;
}

.champagne-page .place-kicker .eyebrow {
  font-size: 1rem;
}

.champagne-page .option {
  background: var(--ivory);
  padding: 3rem 1.8rem 5rem;
  position: relative;
  border-top: 1px solid rgba(184, 145, 80, 0.28);
}

.champagne-page .option-inner {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}

.champagne-page .option .eyebrow {
  color: var(--brass-text);
  display: block;
  margin-bottom: 0.8rem;
}

.champagne-page .option h2 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: 0.1em;
  margin: 0 0 0.4rem;
  color: var(--indigo);
}

.champagne-page .option .cath-latin {
  font-family: var(--serif);
  font-style: italic;
  color: var(--brass-text);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  display: block;
}

.champagne-page .option p {
  margin: 0;
  color: #33343c;
  text-align: justify;
  text-align-last: center;
  font-size: clamp(1rem, 1.4vw, 1.08rem);
}

.champagne-page .courses {
  max-width: 900px;
  margin: 0 auto;
  padding: 5.5rem 1.8rem 6rem;
  text-align: center;
}

.champagne-page .courses-title {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(1.3rem, 2.4vw, 1.7rem);
  color: var(--indigo);
  letter-spacing: 0.08em;
  margin: 0 0 0.6rem;
}

.champagne-page .courses-title .star {
  color: var(--brass-text);
}

.champagne-page .courses-sub {
  font-family: var(--serif);
  font-style: italic;
  color: var(--muted);
  letter-spacing: 0.06em;
  margin-bottom: 3rem;
}

.champagne-page .course-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
}

.champagne-page .course {
  border: 1px solid rgba(184, 145, 80, 0.4);
  background: #fbf7ee;
  padding: 2.8rem 2rem;
  text-align: left;
  position: relative;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
}

.champagne-page .course:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px -22px rgba(27, 42, 74, 0.45);
}

.champagne-page .course-num {
  font-family: var(--serif);
  font-size: 2.6rem;
  color: var(--brass-text);
  line-height: 1;
  display: block;
  margin-bottom: 1.2rem;
}

.champagne-page .course-stops {
  font-family: var(--mincho);
  font-weight: 500;
  font-size: clamp(1.05rem, 1.7vw, 1.2rem);
  color: var(--indigo);
  letter-spacing: 0.04em;
  line-height: 1.9;
}

.champagne-page .course-stops .plus {
  color: var(--brass-text);
  margin: 0 0.35em;
}

.champagne-page .course-stops .note {
  display: block;
  font-family: var(--mincho);
  font-weight: 300;
  font-size: 0.9rem;
  color: var(--muted);
  letter-spacing: 0.02em;
  margin-top: 0.2em;
}

.champagne-page .course-maison {
  margin-top: 1.4rem;
  padding-top: 1.1rem;
  border-top: 1px solid rgba(184, 145, 80, 0.3);
  font-size: 0.85rem;
  line-height: 1.9;
  color: var(--muted);
  font-weight: 300;
}

.champagne-page .details {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.8rem 5.5rem;
}

.champagne-page .details-box {
  border: 1px solid rgba(184, 145, 80, 0.4);
  background: #fbf7ee;
  padding: 3rem 2.4rem;
}

.champagne-page .drow {
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 1.2rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid rgba(184, 145, 80, 0.22);
  align-items: start;
}

.champagne-page .drow:last-child {
  border-bottom: none;
}

.champagne-page .dlabel {
  font-family: var(--mincho);
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--indigo);
  letter-spacing: 0.05em;
}

.champagne-page .dval {
  font-size: 0.92rem;
  line-height: 1.95;
  color: #33343c;
  font-weight: 300;
}

.champagne-page .dval ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.champagne-page .dval li {
  padding-left: 1em;
  text-indent: -1em;
}

.champagne-page .dval li::before {
  content: '―';
  color: var(--brass-text);
  margin-right: 0.5em;
}

.champagne-page .dval .price {
  font-family: var(--serif);
  font-size: 1.6rem;
  color: var(--indigo);
  letter-spacing: 0.02em;
}

.champagne-page .cancel-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.4rem;
}

.champagne-page .cancel-table td {
  padding: 0.45rem 0;
  font-size: 0.9rem;
  border-bottom: 1px dotted rgba(184, 145, 80, 0.35);
}

.champagne-page .cancel-table td:last-child {
  text-align: right;
  font-family: var(--serif);
  font-size: 1.1rem;
  color: var(--brass-text);
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.champagne-page .cancel-table tr:last-child td {
  border-bottom: none;
}

.champagne-page .dnote {
  font-size: 0.85rem;
  color: var(--muted);
  margin: 0 0 0.6rem;
  font-weight: 300;
}

.champagne-page .contact {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.8rem 6rem;
}

.champagne-page .contact-box {
  border: 1px solid rgba(184, 145, 80, 0.5);
  background: #fbf7ee;
  padding: 3.4rem 2.4rem;
  text-align: center;
}

.champagne-page .contact h2 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(1.3rem, 2.4vw, 1.65rem);
  color: var(--indigo);
  letter-spacing: 0.1em;
  margin: 0 0 0.5rem;
}

.champagne-page .contact .sub {
  font-family: var(--serif);
  font-style: italic;
  color: var(--brass-text);
  letter-spacing: 0.06em;
  margin-bottom: 1.8rem;
}

.champagne-page .contact p {
  font-size: 0.92rem;
  font-weight: 300;
  color: #33343c;
  max-width: 34em;
  margin: 0 auto 2.2rem;
  line-height: 2;
}

.champagne-page .contact-btn {
  display: inline-block;
  font-family: var(--mincho);
  font-size: 1rem;
  letter-spacing: 0.12em;
  color: var(--ivory);
  background: var(--indigo);
  border: 1px solid var(--indigo);
  padding: 1em 2.8em;
  text-decoration: none;
  transition:
    background 0.35s ease,
    color 0.35s ease;
}

.champagne-page .contact-btn:hover,
.champagne-page .contact-btn:focus-visible {
  background: var(--brass);
  border-color: var(--brass);
  color: var(--indigo-deep);
  outline: none;
}

.champagne-page .contact-mail {
  display: block;
  margin-top: 1.6rem;
  font-family: var(--serif);
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  color: var(--indigo);
  text-decoration: none;
  border-bottom: 1px solid rgba(184, 145, 80, 0.6);
  padding-bottom: 0.2em;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.champagne-page .contact-mail:hover {
  color: var(--brass-text);
}

.champagne-page .foot {
  text-align: center;
  padding: 3rem 1.5rem 4rem;
  border-top: 1px solid rgba(184, 145, 80, 0.3);
  background: var(--ivory-soft);
}

.champagne-page .foot .latin {
  letter-spacing: 0.4em;
  color: var(--indigo);
  font-size: 1rem;
  text-transform: uppercase;
  padding-left: 0.4em;
}

.champagne-page .foot small {
  display: block;
  margin-top: 0.8rem;
  color: var(--muted);
  font-family: var(--serif);
  font-style: italic;
  letter-spacing: 0.08em;
}

@media (max-width: 900px) {
  .champagne-page {
    line-height: 2;
  }

  .champagne-page .hero {
    aspect-ratio: auto;
    padding: 0 1.5rem 2.8rem;
    justify-content: flex-start;
  }

  .champagne-page .hero-photo {
    position: relative;
    height: auto;
  }

  .champagne-page .hero-photo img {
    display: block;
    height: auto;
    opacity: 0.72;
  }

  .champagne-page .hero-veil,
  .champagne-page .bubbles {
    display: none;
  }

  .champagne-page .hero-mark {
    margin-top: 2rem;
  }

  .champagne-page .gallery-grid {
    grid-template-columns: 1fr;
  }

  .champagne-page .gallery figure:nth-child(-n + 3),
  .champagne-page .gallery figure:nth-child(n + 4),
  .champagne-page .gallery figure.wide {
    grid-column: span 1;
  }

  .champagne-page .course-grid {
    grid-template-columns: 1fr;
  }

  .champagne-page .place-head {
    gap: 0.4rem;
  }

  .champagne-page .intro {
    padding-top: 4.5rem;
  }

  .champagne-page .details-box {
    padding: 2rem 1.4rem;
  }

  .champagne-page .drow {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .champagne-page .bubbles {
    display: none;
  }

  .champagne-page * {
    animation: none !important;
  }

  .champagne-page .hero-mark,
  .champagne-page .hero h1,
  .champagne-page .hero-rule {
    opacity: 1;
  }
}
</style>
