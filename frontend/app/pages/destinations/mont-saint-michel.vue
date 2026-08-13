<script setup lang="ts">
const heroWidths = [640, 960, 1280, 1500]
const heroSrc = optSrc('msm-hero', 960)
const heroSrcset = optSrcSet('msm-hero', heroWidths)
const heroAvifSrc = optSrc('msm-hero', 1280, 'avif')
const heroAvifSrcset = optSrcSet('msm-hero', heroWidths, 'avif')
const heroSizes = '(max-width: 800px) 100vw, 720px'
const galleryWidths = [400, 640, 900]

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
  title: 'モンサンミッシェル & ノルマンディー田舎村 — HMI Paris',
  description:
    '人を惹きつけてやまない「西洋の驚異」へ、日本人アシスタントガイドがご案内。途中、ノルマンディーの素敵な田舎村にも立ち寄る、よくばりな一日ツアー。',
  ogLocale: 'ja_JP',
})

const gallery = [
  {
    name: 'msm-gallery-01',
    alt: '干潟に映るモンサンミッシェル',
    caption: '干潟に映るモンサンミッシェル',
    wide: true,
    w: 900,
    h: 721,
  },
  {
    name: 'msm-gallery-02',
    alt: '修道院へ続くメイン通り',
    caption: '修道院へ続くメイン通り',
    w: 900,
    h: 716,
  },
  {
    name: 'msm-gallery-03',
    alt: '島の路地',
    caption: '島の路地',
    w: 900,
    h: 927,
  },
  {
    name: 'msm-gallery-04',
    alt: '湾を見渡せる城壁',
    caption: '湾を見渡せる城壁',
    w: 900,
    h: 741,
  },
  {
    name: 'msm-gallery-05',
    alt: '修道院の回廊',
    caption: '修道院の回廊',
    w: 900,
    h: 679,
  },
  {
    name: 'msm-gallery-06',
    alt: '村のカフェ',
    caption: '村のカフェ',
    w: 900,
    h: 896,
  },
  {
    name: 'msm-gallery-07',
    alt: 'ノルマンディーの田舎村',
    caption: 'ノルマンディーの田舎村',
    w: 900,
    h: 649,
  },
]
</script>

<template>
  <div class="msm-page">
    <div class="msm-wrap">
      <header class="masthead">
        <div class="brand">HMI&nbsp;Paris</div>
        <div class="brand-rule" />
        <h1>モンサンミッシェル<br>&amp; ノルマンディー田舎村</h1>
        <div class="sub">MSM &amp; village de Normandie</div>
      </header>

      <div class="hero">
        <picture>
          <source type="image/avif" :srcset="heroAvifSrcset" :sizes="heroSizes" />
          <img
            :src="heroSrc"
            :srcset="heroSrcset"
            :sizes="heroSizes"
            alt="モン・サン＝ミッシェル"
            width="1500"
            height="870"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
      </div>

      <section class="lead">
        <p class="quote">『海上のピラミッド』とヴィクトル・ユゴーが称した島。</p>
        <p>干満の差が大きく、大潮の際は海に囲まれる孤島と化す、神秘的な場所。</p>
        <p>
          一人の司教が夢で見た、大天使ミカエルのお告げから歴史は始まる。1300年以上もの時を経て作り上げられた世界遺産、モンサンミッシェル。
        </p>
        <p class="guide">
          人を惹きつけてやまない「西洋の驚異」へ、日本人アシスタントガイドがご案内。途中、ノルマンディーの素敵な田舎村にも立ち寄る、よくばりな一日ツアー。
        </p>
      </section>

      <h2 class="points-title">ポイント</h2>

      <div class="point">
        <h3><span class="no">01</span>日本人アシスタントガイド付きで安心</h3>
        <p>ノルマンディー地方、モンサンミッシェルを知り尽くしたガイドがご案内します。</p>
        <p>歴史から絶景写真スポット、食事のアドバイスまで、ご要望に応じてアレンジします。</p>
      </div>

      <div class="point">
        <h3><span class="no">02</span>ノルマンディーの田舎村を散策</h3>
        <p>
          中世の木組みの家が建ち並ぶメルヘンな田舎村は、まるで時が止まったかのよう。また、食文化も豊かな地方ならではの特産物もご紹介します。
        </p>
        <p>長距離移動の疲れも、ここで少し癒されます。</p>
      </div>

      <div class="point">
        <h3><span class="no">03</span>プロのドライバーによる運転で安心</h3>
        <p>快適な専用車で長距離移動もラクラク。</p>
        <p>
          車はバスに比べて移動時間が短いため、それぞれのスポットで滞在時間を長く取れるのもメリットです。
        </p>
      </div>

      <div class="point">
        <h3><span class="no">04</span>ご宿泊ホテルまでお迎えで安心</h3>
        <p>早朝の出発でも、ホテル出発なので移動や治安の不安を解消できます。</p>
      </div>

      <h2 class="gallery-title">ギャラリー</h2>

      <div class="gallery">
        <figure v-for="item in gallery" :key="item.name" :class="{ wide: item.wide }">
          <picture>
            <source
              type="image/avif"
              :srcset="optSrcSet(item.name, galleryWidths, 'avif')"
              :sizes="item.wide ? '(max-width: 800px) 100vw, 720px' : '(max-width: 800px) 50vw, 350px'"
            />
            <img
              :src="optSrc(item.name, 640)"
              :srcset="optSrcSet(item.name, galleryWidths)"
              :sizes="item.wide ? '(max-width: 800px) 100vw, 720px' : '(max-width: 800px) 50vw, 350px'"
              :alt="item.alt"
              :width="item.w"
              :height="item.h"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <figcaption>{{ item.caption }}</figcaption>
        </figure>
      </div>

      <section class="details">
        <div class="intro">
          <p>
            モン・サン・ミシェルと素敵な田舎村を日本語アシスタントガイド付きの専用車で観光する、1日満喫コースです。
          </p>
          <p class="small">修道院内は自由見学となり、ガイドは付きません。</p>
        </div>

        <div class="price-band">
          <div class="amount">1,700€〜</div>
          <div class="meta">1〜6名さま（1グループ）</div>
        </div>

        <h2 class="dt-title">ツアー詳細</h2>

        <dl class="dt-list">
          <div class="dl-row">
            <dt>【人数】</dt>
            <dd>1〜6名さま（1グループ）</dd>
          </div>
          <div class="dl-row">
            <dt>【待ち合わせ時間】</dt>
            <dd>07:30〜08:30の間</dd>
          </div>
          <div class="dl-row">
            <dt>【集合場所】</dt>
            <dd>ホテルのロビー（ホテルはパリ市内に限ります）</dd>
          </div>
          <div class="dl-row">
            <dt>【含まれるもの】</dt>
            <dd>専用車（高速道路代、パーキング代含む）、日本語アシスタントガイド</dd>
          </div>
          <div class="dl-row">
            <dt>【含まれないもの】</dt>
            <dd>チケット代、オーディオガイド代、飲食代</dd>
          </div>
          <div class="dl-row">
            <dt>【入場チケットについて】</dt>
            <dd>チケット代はツアー料金には含まれておりません。</dd>
            <dd>ご希望の方にはお手配も承ります（修道院チケット代 × 人数分 ＋ 手数料25€）。</dd>
            <dd>オーディオガイドをご希望の場合は別途10€（お一人さま）。</dd>
          </div>
          <div class="dl-row">
            <dt>【ご予約について】</dt>
            <dd>入場チケットは時間指定のご予約となります。</dd>
            <dd>空き状況により、ご希望の時間帯に沿えない場合がございます。</dd>
          </div>
          <div class="dl-row">
            <dt>【ご予約とお支払い】</dt>
            <dd>お支払い期限は予約確定のメールをお送りした時間より72時間以内。</dd>
          </div>
          <div class="dl-row">
            <dt>【お支払い方法】</dt>
            <dd>クレジットカード（Visa、Mastercard）、銀行振り込み</dd>
          </div>
          <div class="dl-row">
            <dt>【予約確認書】</dt>
            <dd>
              お支払い確認後、メールにてお送りする予約確認書（バウチャー）を印刷、またはスクリーンショットのうえ、参加当日にご持参ください。こちらが「参加券」となります。
            </dd>
          </div>
          <div class="dl-row">
            <dt>【キャンセル規定】</dt>
            <dd>
              <table class="cancel-table">
                <tbody>
                  <tr>
                    <td>参加日の30日前まで</td>
                    <td>0%</td>
                  </tr>
                  <tr>
                    <td>参加日の29日〜14日前まで</td>
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
              <p class="cancel-note">
                待ち合わせ時間にご連絡なく30分以上遅れた場合は、キャンセルとみなされます。
              </p>
            </dd>
          </div>
        </dl>
      </section>

      <div class="cta">
        <NuxtLink to="/contact">お問い合わせはこちら</NuxtLink>
      </div>

      <footer class="msm-foot">
        <div class="brand-rule" />
        HMI Paris · Conciergerie &amp; visites guidées en japonais
      </footer>
    </div>
  </div>
</template>

<style>
.msm-page {
  --indigo-950: #0b1220;
  --indigo-900: #111d38;
  --indigo-850: #152343;
  --indigo-800: #1b2c50;
  --brass: #c6a662;
  --brass-soft: #dcc38c;
  --brass-dim: #8f7a4c;
  --paper: #ece6d7;
  --paper-dim: #a9a596;
  --line: rgba(198, 166, 98, 0.28);
  min-height: calc(100vh - 74px);
  background: radial-gradient(120% 80% at 50% -10%, #16264a 0%, var(--indigo-950) 62%) fixed;
  color: var(--paper);
  font-family: var(--gothic);
  line-height: 2;
  -webkit-font-smoothing: antialiased;
}

.msm-page * {
  box-sizing: border-box;
}

.msm-wrap {
  max-width: 720px;
  margin: 0 auto;
  padding: 64px 28px 88px;
}

.msm-page .masthead {
  text-align: center;
}

.msm-page .brand {
  font-family: var(--serif);
  letter-spacing: 0.42em;
  text-transform: uppercase;
  font-size: 14px;
  color: var(--brass-soft);
  padding-left: 0.42em;
}

.msm-page .brand-rule {
  width: 44px;
  height: 1px;
  margin: 18px auto;
  background: linear-gradient(90deg, transparent, var(--brass), transparent);
}

.msm-page .masthead h1 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(23px, 5.6vw, 32px);
  letter-spacing: 0.06em;
  margin: 0.15em 0 0.1em;
  color: var(--paper);
  line-height: 1.5;
}

.msm-page .masthead .sub {
  font-family: var(--serif);
  font-style: italic;
  font-size: 17px;
  color: var(--paper-dim);
  letter-spacing: 0.03em;
}

.msm-page .lead {
  margin: 46px 0 8px;
}

.msm-page .lead p {
  font-family: var(--mincho);
  font-weight: 500;
  font-size: clamp(16px, 4vw, 18px);
  line-height: 2.05;
  letter-spacing: 0.03em;
  margin: 0 0 20px;
  color: var(--paper);
}

.msm-page .lead .quote {
  color: var(--brass-soft);
  font-size: clamp(18px, 4.6vw, 21px);
}

.msm-page .lead .guide {
  color: var(--brass-soft);
  padding-top: 22px;
  margin-top: 26px;
  border-top: 1px solid rgba(198, 166, 98, 0.16);
}

.msm-page .points-title {
  text-align: center;
  margin: 60px 0 12px;
  font-family: var(--mincho);
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0.14em;
  color: var(--brass-soft);
}

.msm-page .points-title::before,
.msm-page .points-title::after {
  content: '';
  display: inline-block;
  width: 26px;
  height: 1px;
  background: var(--brass-dim);
  vertical-align: middle;
  margin: 0 14px 6px;
}

.msm-page .point {
  position: relative;
  margin-top: 30px;
  padding: 28px 28px 26px 30px;
  background: linear-gradient(180deg, var(--indigo-900), var(--indigo-850));
  border: 1px solid var(--line);
  border-radius: 3px;
  box-shadow: 0 22px 54px -32px rgba(0, 0, 0, 0.7);
}

.msm-page .point::before {
  content: '';
  position: absolute;
  left: 0;
  top: 22px;
  bottom: 22px;
  width: 2px;
  background: linear-gradient(180deg, var(--brass), transparent);
  border-radius: 2px;
}

.msm-page .point h3 {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin: 0 0 12px;
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(16px, 4vw, 18.5px);
  letter-spacing: 0.04em;
  color: var(--brass-soft);
  line-height: 1.6;
}

.msm-page .point h3 .no {
  font-family: var(--serif);
  font-style: italic;
  font-size: 24px;
  color: var(--brass);
  flex: none;
  line-height: 1;
}

.msm-page .point p {
  font-family: var(--gothic);
  font-weight: 300;
  font-size: 15.5px;
  letter-spacing: 0.02em;
  margin: 0 0 6px;
  color: var(--paper);
}

.msm-page .point p:last-child {
  margin-bottom: 0;
}

.msm-page .hero {
  position: relative;
  margin: 0 0 4px;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid var(--line);
  box-shadow: 0 26px 62px -34px rgba(0, 0, 0, 0.8);
}

.msm-page .hero img {
  display: block;
  width: 100%;
  height: auto;
}

.msm-page .hero::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(11, 18, 32, 0.32) 0%,
    rgba(11, 18, 32, 0) 38%,
    rgba(11, 18, 32, 0.72) 100%
  );
}

.msm-page .gallery-title {
  text-align: center;
  margin: 62px 0 22px;
  font-family: var(--mincho);
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.16em;
  color: var(--brass-soft);
}

.msm-page .gallery-title::before,
.msm-page .gallery-title::after {
  content: '';
  display: inline-block;
  width: 26px;
  height: 1px;
  background: var(--brass-dim);
  vertical-align: middle;
  margin: 0 14px 6px;
}

.msm-page .gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.msm-page .gallery figure {
  margin: 0;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  border: 1px solid rgba(198, 166, 98, 0.22);
  background: var(--indigo-900);
}

.msm-page .gallery picture {
  display: block;
}

.msm-page .gallery img {
  display: block;
  width: 100%;
  height: auto;
  transition:
    transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1),
    filter 0.6s;
  filter: saturate(0.94);
}

.msm-page .gallery figure.wide img {
  height: auto;
}

.msm-page .gallery figure:hover img,
.msm-page .gallery figure:focus-within img {
  transform: scale(1.05);
  filter: saturate(1.04);
}

.msm-page .gallery figure.wide {
  grid-column: 1 / -1;
}

.msm-page .gallery figcaption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 26px 14px 10px;
  background: linear-gradient(180deg, rgba(11, 18, 32, 0), rgba(11, 18, 32, 0.86));
  font-family: var(--mincho);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: var(--paper);
}

.msm-page .details {
  margin-top: 64px;
  padding: 36px 30px 32px;
  background: linear-gradient(180deg, var(--indigo-900), var(--indigo-850));
  border: 1px solid var(--line);
  border-radius: 3px;
  box-shadow: 0 22px 54px -32px rgba(0, 0, 0, 0.7);
}

.msm-page .details .intro p {
  font-family: var(--mincho);
  font-weight: 500;
  font-size: clamp(15.5px, 3.9vw, 17px);
  line-height: 2;
  letter-spacing: 0.03em;
  margin: 0 0 12px;
  color: var(--paper);
}

.msm-page .details .intro p.small {
  font-family: var(--gothic);
  font-weight: 300;
  font-size: 14px;
  color: var(--paper-dim);
  margin-bottom: 0;
}

.msm-page .price-band {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 22px;
  margin: 26px 0 4px;
  padding: 22px 0;
  border-top: 1px solid rgba(198, 166, 98, 0.16);
  border-bottom: 1px solid rgba(198, 166, 98, 0.16);
}

.msm-page .price-band .amount {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(32px, 8vw, 42px);
  color: var(--brass-soft);
  line-height: 1;
  letter-spacing: 0.01em;
}

.msm-page .price-band .meta {
  font-family: var(--gothic);
  font-weight: 300;
  font-size: 14px;
  color: var(--paper-dim);
  line-height: 1.9;
}

.msm-page .details h2.dt-title {
  text-align: center;
  margin: 34px 0 6px;
  font-family: var(--mincho);
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.16em;
  color: var(--brass-soft);
}

.msm-page .dl-row {
  padding: 16px 0;
  border-bottom: 1px solid rgba(198, 166, 98, 0.12);
}

.msm-page .dl-row:last-of-type {
  border-bottom: none;
}

.msm-page .dl-row dt {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: 14.5px;
  letter-spacing: 0.06em;
  color: var(--brass);
  margin: 0 0 4px;
  line-height: 1.7;
}

.msm-page .dl-row dd {
  margin: 0;
  font-family: var(--gothic);
  font-weight: 300;
  font-size: 14.5px;
  letter-spacing: 0.02em;
  line-height: 1.95;
  color: var(--paper);
}

.msm-page .dl-row dd + dd {
  margin-top: 2px;
}

.msm-page dl.dt-list {
  margin: 8px 0 0;
}

.msm-page .cancel-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-family: var(--gothic);
  font-weight: 300;
  font-size: 14px;
}

.msm-page .cancel-table td {
  padding: 10px 0;
  border-bottom: 1px solid rgba(198, 166, 98, 0.12);
  color: var(--paper);
  line-height: 1.7;
  vertical-align: top;
}

.msm-page .cancel-table td:last-child {
  text-align: right;
  white-space: nowrap;
  padding-left: 14px;
  font-family: var(--serif);
  font-size: 17px;
  color: var(--brass-soft);
  letter-spacing: 0.03em;
}

.msm-page .cancel-table tr:last-child td {
  border-bottom: none;
}

.msm-page .cancel-note {
  margin: 12px 0 0;
  font-family: var(--gothic);
  font-weight: 300;
  font-size: 13.5px;
  line-height: 1.9;
  color: var(--paper-dim);
}

.msm-page .cta {
  text-align: center;
  margin-top: 52px;
}

.msm-page .cta a {
  display: inline-block;
  font-family: var(--mincho);
  font-weight: 500;
  font-size: 15.5px;
  letter-spacing: 0.14em;
  color: var(--brass-soft);
  text-decoration: none;
  border: 1px solid var(--brass-dim);
  border-radius: 2px;
  padding: 14px 34px;
  transition:
    background 0.25s,
    color 0.25s,
    border-color 0.25s;
}

.msm-page .cta a:hover,
.msm-page .cta a:focus-visible {
  background: var(--brass);
  color: var(--indigo-950);
  border-color: var(--brass);
  outline: none;
}

.msm-page .msm-foot {
  margin-top: 56px;
  text-align: center;
  font-family: var(--serif);
  font-style: italic;
  color: var(--paper-dim);
  font-size: 14.5px;
  letter-spacing: 0.03em;
}

.msm-page .msm-foot .brand-rule {
  margin: 0 auto 18px;
}

@media (max-width: 560px) {
  .msm-wrap {
    padding: 44px 18px 68px;
  }

  .msm-page .point {
    padding: 24px 20px 22px 22px;
  }

  .msm-page .details {
    padding: 30px 20px 26px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .msm-page .masthead,
  .msm-page .hero,
  .msm-page .lead,
  .msm-page .points-title,
  .msm-page .point,
  .msm-page .details,
  .msm-page .gallery-title,
  .msm-page .gallery,
  .msm-page .cta {
    animation: msm-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }

  .msm-page .point:nth-of-type(2) {
    animation-delay: 0.05s;
  }

  .msm-page .point:nth-of-type(3) {
    animation-delay: 0.1s;
  }

  .msm-page .point:nth-of-type(4) {
    animation-delay: 0.15s;
  }

  @keyframes msm-rise {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
}
</style>
