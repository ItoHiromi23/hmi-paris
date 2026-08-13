<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: optimizeImageUrl('/images/destinations/versailles/hero.jpg', 1600, 70),
      fetchpriority: 'high',
      type: 'image/webp',
    },
  ],
})

useSeoMeta({
  title: '華麗な歴史が詰まったフランス黄金時代の宮殿 — HMI Paris',
  description:
    '太陽王ルイ14世が築いた、贅を尽くしたきらびやかな宮殿。専用車と日本語アシスタントガイドで、鏡の回廊からトリアノン離宮までご案内します。',
  ogLocale: 'ja_JP',
})

const rays = (() => {
  const cx = 250
  const cy = 250
  const r0 = 100
  const r1 = 248
  const n = 48
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    const len = i % 4 === 0 ? r1 : i % 2 === 0 ? r1 - 34 : r1 - 62
    const d = Math.min(Math.abs(i), Math.abs(i - n), Math.abs(i - n / 2))
    return {
      x1: cx + Math.cos(a) * r0,
      y1: cy + Math.sin(a) * r0,
      x2: cx + Math.cos(a) * len,
      y2: cy + Math.sin(a) * len,
      delay: `${0.15 + d * 0.035}s`,
    }
  })
})()
</script>

<template>
  <div class="versailles-page">
    <header class="hero">
      <img
        class="hero-photo"
        :src="optimizeImageUrl('/images/destinations/versailles/hero.jpg', 1600, 70)"
        :srcset="imageSrcSet('/images/destinations/versailles/hero.jpg', [800, 1200, 1600, 2000], 70)"
        sizes="100vw"
        alt="ヴェルサイユ宮殿"
        width="1600"
        height="1067"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <svg class="sun" viewBox="0 0 500 500" aria-hidden="true" focusable="false">
        <g id="rays">
          <line
            v-for="(ray, i) in rays"
            :key="i"
            class="ray"
            :x1="ray.x1"
            :y1="ray.y1"
            :x2="ray.x2"
            :y2="ray.y2"
            :style="{ animationDelay: ray.delay }"
          />
        </g>
        <circle class="halo" cx="250" cy="250" r="96" />
        <circle class="halo" cx="250" cy="250" r="132" style="opacity: 0.12" />
      </svg>
      <div class="hero-inner">
        <p class="eyebrow">Château de Versailles</p>
        <h1>華麗な歴史が詰まった<br />フランス黄金時代の宮殿</h1>
        <p class="sub">ルイ14世が夢を築き、<br />マリー・アントワネットが夢から逃れた場所。</p>
        <div class="rule" aria-hidden="true" />
      </div>
    </header>

    <section class="intro">
      <div class="wrap">
        <p class="lede">
          太陽王ルイ14世が築いた、贅を尽くしたきらびやかな宮殿。そして王が何より力を入れたのが庭園でした。
        </p>
        <p>
          その熱の入れようは、庭園の歩き方の手引きを自ら書き記したほど。敷地は約800ヘクタール。離宮プチ・トリアノンは、マリー・アントワネットがひとときの安らぎを得た場所です。見逃せないポイントがたくさんある華麗な歴史の舞台を、ぜひ体感してください。
        </p>
        <p class="note">
          専用車でご案内いたしますので、広大な敷地の奥にある離宮までの移動も快適。日本語アシスタントガイドが効率よくご案内します。
        </p>
      </div>
    </section>

    <section class="axis-section">
      <div class="wrap">
        <div class="sec-head">
          <p class="eyebrow">Les points forts</p>
          <h2>★見どころ★</h2>
        </div>

        <div class="axis">
          <div class="axis-main">
            <article class="stop left">
              <div class="stop-body">
                <h3><span class="num">①</span>鏡の回廊</h3>
                <span class="place">Galerie des Glaces — 宮殿本殿</span>
                <p>
                  欧州の貴族たちの憧れの的。長さ73mの回廊には、当時大変貴重だった鏡がふんだんに使われ、フランス王の偉大さを象徴しています。1919年、第一次世界大戦を終結させたヴェルサイユ条約が調印されたのもこの場所。日本も五大国の一員として全権団を送り、この回廊に立ち会いました。
                </p>
              </div>
              <figure class="stop-photo">
                <img
                  :src="optimizeImageUrl('/images/destinations/versailles/gallery-glaces.jpg', 825, 68)"
                  alt="ヴェルサイユ宮殿 鏡の回廊"
                  loading="lazy"
                  width="825"
                  height="1100"
                />
              </figure>
            </article>

            <article class="stop right">
              <div class="stop-body">
                <h3><span class="num">②</span>王妃の寝室</h3>
                <span class="place">Chambre de la Reine — 宮殿本殿</span>
                <p>
                  最後にこの部屋を使ったのはマリー・アントワネット。1789年10月、民衆が宮殿に押し寄せた夜、王妃は寝室の隠し扉から逃れました。室内は当時の姿に忠実に復元され、夏用の花柄の絹織物まで織り直されています。
                </p>
              </div>
              <figure class="stop-photo">
                <img
                  :src="optimizeImageUrl('/images/destinations/versailles/gallery-reine.jpg', 825, 68)"
                  alt="ヴェルサイユ宮殿 王妃の寝室"
                  loading="lazy"
                  width="825"
                  height="1100"
                />
              </figure>
            </article>

            <article class="stop left">
              <div class="stop-body">
                <h3><span class="num">③</span>庭園</h3>
                <span class="place">Les Jardins — ル・ノートルの設計</span>
                <p>どこまでも続く左右対称のフランス式庭園。数々の噴水も見どころです。</p>
                <ul>
                  <li>
                    <b>アポロンの噴水</b><br />水面から昇る太陽神の馬車は、太陽王そのものの象徴。
                  </li>
                  <li>
                    <b>ラトナの噴水</b><br />アポロンの母ラトナの神話を描いた、宮殿から庭園への序章。
                  </li>
                  <li>
                    <b>大運河</b><br />全長約1,670m。かつては王の船遊びの舞台でした。
                  </li>
                </ul>
              </div>
              <figure class="stop-photo">
                <img
                  :src="optimizeImageUrl('/images/destinations/versailles/gallery-jardins.jpg', 1100, 68)"
                  alt="ヴェルサイユ宮殿 庭園"
                  loading="lazy"
                  width="1100"
                  height="825"
                />
              </figure>
            </article>
          </div>

          <div class="fork">
            <span>
              Hors de l'axe
              <small>― 軸線を離れて、北西へ ―</small>
            </span>
          </div>

          <div class="axis-trianon">
            <article class="stop right">
              <div class="stop-body">
                <h3><span class="num">④</span>プチ・トリアノン</h3>
                <span class="place">Petit Trianon — 王妃の離宮</span>
                <p>
                  1774年、即位したばかりのルイ16世が王妃マリーアントワネットに贈った小さな城館。ヴェルサイユでただ一人、彼女だけが招く人を選べた場所でした。宮廷の窮屈な作法から解き放たれ、素朴なドレスで過ごした王妃の「もう一つの顔」がここにあります。
                </p>
              </div>
            </article>

            <article class="stop left">
              <div class="stop-body">
                <h3><span class="num">⑤</span>王妃の村里(アモー)</h3>
                <span class="place">Hameau de la Reine</span>
                <p>
                  プチ・トリアノンの奥に広がる、藁葺き屋根の小さな農村。王妃が羊飼いの娘のように過ごした夢のような一角です。池に映る「王妃の家」は、ヴェルサイユで最も写真映えするスポットのひとつ。
                </p>
              </div>
            </article>

            <article class="stop right">
              <div class="stop-body">
                <h3><span class="num">⑥</span>グラン・トリアノン</h3>
                <span class="place">Grand Trianon — 王の隠れ家</span>
                <p>
                  ばら色の大理石の列柱が美しい、ルイ14世が宮廷の喧騒を離れて過ごした離宮。あくまで王の私的な隠れ家として建てられました。のちにナポレオンが改修し、暮らした場所でもあります。庭園に面した列柱廊からの眺めは、ヴェルサイユで最も静かな時間。
                </p>
                <p class="stop-note">
                  これらの離宮はいずれも本殿から離れた場所にありますが、専用車でご案内するからこそ、無理なく足を延ばせます。
                </p>
              </div>
              <figure class="stop-photo">
                <img
                  :src="optimizeImageUrl('/images/destinations/versailles/gallery-trianon.jpg', 1100, 68)"
                  alt="ヴェルサイユ グラン・トリアノン"
                  loading="lazy"
                  width="1100"
                  height="825"
                />
              </figure>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="practical">
      <div class="wrap">
        <div class="sec-head">
          <p class="eyebrow">Programme &amp; tarifs</p>
          <h2>コースと料金</h2>
        </div>

        <div class="courses">
          <article class="course">
            <p class="dur latin">5<em>HEURES</em></p>
            <h3>宮殿、または離宮</h3>
            <p>ヴェルサイユ宮殿もしくはトリアノン離宮の、どちらかを見学するコースです。お選びください。</p>
            <p class="caution">宮殿内は自由見学となり、ガイドは付きません。</p>
            <p class="price latin">740 €〜<span>1〜6名さま(1グループ)</span></p>
            <p class="meet">待ち合わせ時間 … 08:30〜12:00の間</p>
          </article>
          <article class="course">
            <p class="dur latin">8<em>HEURES</em></p>
            <h3>宮殿と離宮</h3>
            <p>ヴェルサイユ宮殿とトリアノン離宮の両方を観光する、1日満喫コースです。</p>
            <p class="caution">宮殿内は自由見学となり、ガイドは付きません。</p>
            <p class="price latin">1,150 €〜<span>1〜6名さま(1グループ)</span></p>
            <p class="meet">待ち合わせ時間 … 08:30〜10:00の間</p>
          </article>
        </div>

        <div class="block">
          <h3>ツアー詳細</h3>
          <dl class="facts">
            <dt>人数</dt>
            <dd>1〜6名さま(1グループ)</dd>
            <dt>集合場所</dt>
            <dd>ホテルのロビー<small>ホテルはパリ市内に限ります。</small></dd>
            <dt>含まれるもの</dt>
            <dd>専用車(ドライバー含む)、日本語アシスタントガイド</dd>
            <dt>含まれないもの</dt>
            <dd>チケット代、オーディオガイド代、飲食代</dd>
          </dl>
        </div>

        <div class="block">
          <h3>入場チケットについて</h3>
          <dl class="facts">
            <dt>チケット代</dt>
            <dd>
              ツアー料金には含まれておりません。<small
                >ご希望の方にはお手配も承ります(チケット代 × 人数分 + 手数料25€)。</small
              >
            </dd>
            <dt>オーディオガイド</dt>
            <dd>ご希望の場合はお手配も承ります。</dd>
            <dt>ご予約について</dt>
            <dd>
              入場チケットは時間指定のご予約となります。<small
                >空き状況により、ご希望の時間帯に沿えない場合がございます。</small
              >
            </dd>
          </dl>
        </div>

        <div class="block">
          <h3>ご予約とお支払い</h3>
          <dl class="facts">
            <dt>お支払い期限</dt>
            <dd>予約確定のメールをお送りした時間より72時間以内</dd>
            <dt>お支払い方法</dt>
            <dd>クレジットカード(Visa、Mastercard)、銀行振り込み</dd>
            <dt>予約確認書</dt>
            <dd>
              お支払い確認後、メールにてお送りする予約確認書(バウチャー)を印刷、またはスクリーンショットのうえ、参加当日にご持参ください。<small
                >こちらが「参加券」となります。</small
              >
            </dd>
          </dl>
        </div>

        <div class="block">
          <h3>キャンセル規定</h3>
          <table class="cancel">
            <tbody>
              <tr>
                <th>参加日の30日前まで</th>
                <td>0%</td>
              </tr>
              <tr>
                <th>参加日の29日〜14日前まで</th>
                <td>50%</td>
              </tr>
              <tr>
                <th>参加日の13日前〜当日</th>
                <td>100%</td>
              </tr>
              <tr>
                <th>チケット代が発生する場合</th>
                <td>100%</td>
              </tr>
            </tbody>
          </table>
          <p class="caution">待ち合わせ時間にご連絡なく30分以上遅れた場合は、キャンセルとみなされます。</p>
        </div>
      </div>
    </section>

    <section class="closing">
      <div class="diamond" aria-hidden="true" />
      <p>
        鏡の回廊から大運河の水面まで、すべては一本の直線の上に。<br />その線を離れた先に、王妃の小さな村があります。
      </p>
      <NuxtLink class="cta latin" to="/contact">ご予約・お問い合わせ</NuxtLink>
    </section>

    <footer class="versailles-foot">HMI PARIS &nbsp;·&nbsp; CONCIERGE &amp; TRAVEL GUIDE, IN JAPANESE</footer>
  </div>
</template>

<style>
.versailles-page {
  --indigo: #1b2a4a;
  --indigo-deep: #141f38;
  --brass: #b89150;
  --brass-light: #d8b878;
  --ivory: #f6f1e7;
  --ivory-soft: #efe7d6;
  --ink: #20222b;
  --muted: #6a6456;
  --line: rgba(184, 145, 80, 0.3);
  font-family: var(--mincho);
  color: var(--ink);
  background: var(--ivory);
  line-height: 2.15;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.versailles-page,
.versailles-page * {
  box-sizing: border-box;
}

.versailles-page .latin {
  font-family: var(--serif);
  font-weight: 500;
  letter-spacing: 0.05em;
}

.versailles-page .eyebrow {
  font-family: var(--serif);
  font-style: italic;
  letter-spacing: 0.14em;
  color: var(--brass);
  font-size: clamp(0.9rem, 1.3vw, 1.1rem);
  margin: 0;
}

.versailles-page .wrap {
  max-width: 940px;
  margin: 0 auto;
  padding: 0 26px;
}

.versailles-page .hero {
  position: relative;
  min-height: 88vh;
  background-color: var(--indigo-deep);
  color: var(--ivory);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 26px 96px;
  overflow: hidden;
}

.versailles-page .hero-photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
}

.versailles-page .hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(20, 31, 56, 0.48) 0%,
    rgba(27, 42, 74, 0.66) 50%,
    rgba(20, 31, 56, 0.82) 100%
  );
  pointer-events: none;
}

.versailles-page .sun {
  position: absolute;
  top: -38vmin;
  left: 50%;
  width: 96vmin;
  height: 96vmin;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 2;
}

.versailles-page .sun .ray {
  stroke: var(--brass);
  stroke-width: 0.7;
  opacity: 0;
  transform-origin: 250px 250px;
  animation: versailles-ray-in 1.6s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}

.versailles-page .sun .halo {
  fill: none;
  stroke: var(--brass);
  stroke-width: 0.6;
  opacity: 0.13;
}

@keyframes versailles-ray-in {
  to {
    opacity: 0.17;
  }
}

.versailles-page .hero-inner {
  position: relative;
  z-index: 2;
  max-width: 720px;
  text-shadow: 0 1px 24px rgba(11, 18, 32, 0.55);
}

.versailles-page .hero h1 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(2.3rem, 6.4vw, 4.1rem);
  letter-spacing: 0.1em;
  line-height: 1.45;
  margin: 0.5rem 0 1.4rem;
  color: var(--ivory);
}

.versailles-page .hero .sub {
  font-size: clamp(0.98rem, 1.7vw, 1.12rem);
  color: rgba(246, 241, 231, 0.86);
  font-weight: 300;
  line-height: 2.3;
  margin: 0;
}

.versailles-page .hero .rule {
  width: 1px;
  height: 70px;
  background: linear-gradient(var(--brass), transparent);
  margin: 44px auto 0;
}

.versailles-page .intro {
  padding: 96px 0 40px;
}

.versailles-page .intro p {
  font-size: clamp(1rem, 1.6vw, 1.1rem);
  margin: 0 0 1.9rem;
  max-width: 720px;
}

.versailles-page .intro p:last-child {
  margin-bottom: 0;
}

.versailles-page .lede {
  font-family: var(--mincho);
  font-weight: 500;
  font-size: clamp(1.15rem, 2.3vw, 1.55rem) !important;
  line-height: 2;
  color: var(--indigo);
}

.versailles-page .note {
  margin-top: 52px;
  border-left: 2px solid var(--brass);
  padding: 6px 0 6px 22px;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 2.1;
  max-width: 640px;
}

.versailles-page .axis-section {
  padding: 88px 0 110px;
}

.versailles-page .sec-head {
  text-align: center;
  margin-bottom: 70px;
}

.versailles-page .sec-head h2 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(1.5rem, 3.2vw, 2rem);
  letter-spacing: 0.22em;
  color: var(--indigo);
  margin: 0.4rem 0 0;
}

.versailles-page .axis {
  position: relative;
}

.versailles-page .stop {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 92px;
  margin-bottom: 62px;
}

.versailles-page .stop.left .stop-body {
  grid-column: 1;
  grid-row: 1;
}

.versailles-page .stop.left .stop-photo {
  grid-column: 2;
  grid-row: 1;
}

.versailles-page .stop.right .stop-body {
  grid-column: 2;
  grid-row: 1;
}

.versailles-page .stop.right .stop-photo {
  grid-column: 1;
  grid-row: 1;
}

.versailles-page .stop-photo {
  margin: 0;
  align-self: start;
  padding-top: 6px;
}

.versailles-page .stop-photo img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--line);
}

.versailles-page .stop h3 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(1.12rem, 2.1vw, 1.32rem);
  color: var(--indigo);
  letter-spacing: 0.06em;
  line-height: 1.8;
  margin: 0 0 0.3rem;
}

.versailles-page .num {
  color: var(--brass);
  letter-spacing: 0.08em;
  margin-right: 0.2em;
}

.versailles-page .place {
  font-family: var(--serif);
  font-style: italic;
  color: var(--brass);
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  display: block;
  margin-bottom: 1rem;
}

.versailles-page .stop p {
  margin: 0;
  font-size: 0.99rem;
  line-height: 2.2;
}

.versailles-page .stop-note {
  margin-top: 1.2rem;
  color: var(--muted);
  font-size: 0.9rem !important;
  line-height: 2.05 !important;
  border-left: 1px solid var(--brass);
  padding-left: 16px;
}

.versailles-page .stop ul {
  list-style: none;
  margin: 1.1rem 0 0;
  padding: 0;
}

.versailles-page .stop li {
  font-size: 0.95rem;
  line-height: 2.05;
  padding: 0 0 0.85rem 14px;
  color: var(--ink);
  border-left: 1px solid var(--line);
}

.versailles-page .stop li b {
  font-weight: 500;
  color: var(--indigo);
  font-family: var(--mincho);
}

.versailles-page .fork {
  position: relative;
  text-align: center;
  margin: 24px 0 62px;
  padding-top: 26px;
}

.versailles-page .fork span {
  display: inline-block;
  background: var(--ivory);
  padding: 0 20px;
  font-family: var(--serif);
  font-style: italic;
  color: var(--brass);
  letter-spacing: 0.1em;
  font-size: 0.95rem;
}

.versailles-page .fork small {
  display: block;
  font-family: var(--mincho);
  font-style: normal;
  color: var(--muted);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin-top: 0.1rem;
}

.versailles-page .practical {
  background: var(--ivory-soft);
  border-top: 1px solid var(--line);
  padding: 88px 0 96px;
}

.versailles-page .courses {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid var(--line);
  background: var(--ivory);
  margin-bottom: 64px;
}

.versailles-page .course {
  padding: 38px 34px;
}

.versailles-page .course + .course {
  border-left: 1px solid var(--line);
}

.versailles-page .course .dur {
  font-family: var(--serif);
  font-size: 2.5rem;
  line-height: 1;
  color: var(--brass);
  letter-spacing: 0.02em;
  margin: 0;
}

.versailles-page .course .dur em {
  font-style: normal;
  font-size: 1rem;
  letter-spacing: 0.14em;
  margin-left: 0.3em;
}

.versailles-page .course h3 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: 1.08rem;
  color: var(--indigo);
  margin: 18px 0 0.6rem;
  letter-spacing: 0.04em;
}

.versailles-page .course p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 2.1;
}

.versailles-page .course .price {
  margin-top: 26px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  font-family: var(--serif);
  font-size: 1.7rem;
  color: var(--indigo);
  letter-spacing: 0.03em;
}

.versailles-page .course .price span {
  font-family: var(--mincho);
  font-size: 0.8rem;
  color: var(--muted);
  display: block;
  letter-spacing: 0.06em;
}

.versailles-page .course .meet {
  margin-top: 14px;
  font-size: 0.85rem;
  color: var(--muted);
  line-height: 1.9;
}

.versailles-page .caution {
  display: block;
  margin-top: 1rem;
  font-size: 0.85rem !important;
  color: var(--muted);
  border-left: 1px solid var(--brass);
  padding-left: 14px;
  line-height: 1.95;
}

.versailles-page .block {
  margin-bottom: 58px;
}

.versailles-page .block > h3 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--indigo);
  letter-spacing: 0.16em;
  padding-bottom: 12px;
  margin: 0 0 24px;
  border-bottom: 1px solid var(--line);
}

.versailles-page .facts {
  display: grid;
  grid-template-columns: 190px 1fr;
  margin: 0;
}

.versailles-page .facts dt {
  font-family: var(--mincho);
  color: var(--indigo);
  font-weight: 500;
  font-size: 0.92rem;
  letter-spacing: 0.05em;
  padding: 14px 0;
  border-top: 1px solid var(--line);
}

.versailles-page .facts dt:first-of-type,
.versailles-page .facts dd:first-of-type {
  border-top: 0;
}

.versailles-page .facts dd {
  margin: 0;
  font-size: 0.94rem;
  line-height: 2.05;
  padding: 14px 0;
  border-top: 1px solid var(--line);
}

.versailles-page .facts dd small {
  display: block;
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.95;
}

.versailles-page .cancel {
  width: 100%;
  border-collapse: collapse;
}

.versailles-page .cancel th,
.versailles-page .cancel td {
  text-align: left;
  padding: 13px 4px;
  border-bottom: 1px solid var(--line);
  font-weight: 300;
  font-size: 0.94rem;
}

.versailles-page .cancel th {
  font-family: var(--mincho);
  font-weight: 500;
  color: var(--indigo);
  letter-spacing: 0.05em;
  width: 64%;
}

.versailles-page .cancel td {
  font-family: var(--serif);
  font-size: 1.25rem;
  color: var(--brass);
  letter-spacing: 0.04em;
  text-align: right;
}

.versailles-page .cancel tr:last-child td {
  color: var(--indigo);
}

.versailles-page .closing {
  background: linear-gradient(168deg, var(--indigo) 0%, var(--indigo-deep) 100%);
  color: var(--ivory);
  text-align: center;
  padding: 96px 26px;
}

.versailles-page .closing p {
  max-width: 600px;
  margin: 0 auto;
  font-size: clamp(1.02rem, 1.9vw, 1.2rem);
  line-height: 2.3;
  color: rgba(246, 241, 231, 0.9);
}

.versailles-page .closing .diamond {
  width: 9px;
  height: 9px;
  border: 1px solid var(--brass);
  transform: rotate(45deg);
  margin: 0 auto 34px;
}

.versailles-page .cta {
  display: inline-block;
  margin-top: 44px;
  border: 1px solid var(--brass);
  color: var(--brass-light);
  text-decoration: none;
  padding: 15px 46px;
  letter-spacing: 0.2em;
  font-size: 0.92rem;
  transition:
    background 0.35s ease,
    color 0.35s ease;
}

.versailles-page .cta:hover,
.versailles-page .cta:focus,
.versailles-page .cta:focus-visible {
  background: var(--brass);
  color: var(--indigo-deep);
  outline: none;
}

.versailles-page .versailles-foot {
  background: var(--indigo-deep);
  color: rgba(246, 241, 231, 0.42);
  text-align: center;
  padding: 30px 26px;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  border-top: 1px solid rgba(184, 145, 80, 0.16);
}

@media (max-width: 760px) {
  .versailles-page .stop {
    grid-template-columns: 1fr;
    margin-bottom: 48px;
  }

  .versailles-page .stop.left .stop-body,
  .versailles-page .stop.right .stop-body {
    grid-column: 1;
    grid-row: 1;
  }

  .versailles-page .stop.left .stop-photo,
  .versailles-page .stop.right .stop-photo {
    grid-column: 1;
    grid-row: 2;
  }

  .versailles-page .stop-photo {
    padding-top: 22px;
  }

  .versailles-page .fork {
    text-align: left;
  }

  .versailles-page .fork span {
    padding-left: 0;
  }

  .versailles-page .intro {
    padding-top: 70px;
  }

  .versailles-page .courses {
    grid-template-columns: 1fr;
  }

  .versailles-page .course + .course {
    border-left: 0;
    border-top: 1px solid var(--line);
  }

  .versailles-page .course {
    padding: 30px 24px;
  }

  .versailles-page .facts {
    grid-template-columns: 1fr;
  }

  .versailles-page .facts dt {
    padding: 14px 0 0;
    border-top: 1px solid var(--line);
  }

  .versailles-page .facts dd {
    padding: 0 0 14px;
    border-top: 0;
  }

  .versailles-page .facts dd:first-of-type {
    border-top: 0;
  }

  .versailles-page .cancel th {
    width: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .versailles-page .sun .ray {
    animation: none;
    opacity: 0.17;
  }
}
</style>
