<script setup lang="ts">
const heroWidths = [640, 960, 1024, 1600]
const heroSrc = optSrc('giverny-hero', 960)
const heroSrcset = optSrcSet('giverny-hero', heroWidths)
const heroAvifSrc = optSrc('giverny-hero', 1600, 'avif')
const heroAvifSrcset = optSrcSet('giverny-hero', heroWidths, 'avif')
const figWidths = [400, 640, 750]

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: heroAvifSrc,
      imageSrcset: heroAvifSrcset,
      imageSizes: '(max-width: 760px) 100vw, 760px',
      fetchpriority: 'high',
      type: 'image/avif',
    },
  ],
})

useSeoMeta({
  title: 'セーヌが結ぶ、二つのモネ ｜ ジヴェルニー & ヴェトゥイユ — HMI Paris',
  description:
    'モネが生涯をかけて造り上げた庭、ジヴェルニー。そして彼が画家として飛躍したもう一つの村ヴェトゥイユへ。専用車でめぐるモネの旅。',
  ogLocale: 'ja_JP',
})
</script>

<template>
  <section class="hmi-giverny" aria-label="ジヴェルニー モネの旅">
    <div class="wrap">
      <figure class="hero-photo">
        <picture>
          <source type="image/avif" :srcset="heroAvifSrcset" sizes="(max-width: 760px) 100vw, 760px" />
          <img
            :src="heroSrc"
            :srcset="heroSrcset"
            sizes="(max-width: 760px) 100vw, 760px"
            alt="緑の鎧戸とバラのアーチに彩られた、ジヴェルニーのモネの家"
            width="1600"
            height="684"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
      </figure>

      <p class="eyebrow">Une journée avec Monet</p>
      <h1 class="hero-title">セーヌが結ぶ、二つのモネ</h1>
      <p class="hero-sub">ジヴェルニー ＆ ヴェトゥイユ ― 専用車でめぐるモネの旅</p>
      <hr class="rule" />
      <p class="lead">
        モネが生涯をかけて造り上げた唯一無二の庭、ジヴェルニー。<br />
        そして<span class="dash">――</span>彼が画家として飛躍し、深い悲しみをも知った、もう一つの村ヴェトゥイユへ。<br />
        電車では決してたどり着けない、セーヌ川沿いの小さな寄り道。<br />
        専用車だからこそ叶う、モネの心の風景もめぐる旅。
      </p>

      <div class="journey">
        <div class="station">
          <p class="sec-label">L'autre village de Monet</p>
          <h2>ヴェトゥイユ ― もう一つのモネの村</h2>
          <ul>
            <li>
              ジヴェルニーに移り住む前<span class="dash">――</span>二つの家族が身を寄せ合って暮らした「もう一つのモネの家」を訪ねます（外観のみ）
            </li>
            <li>
              暮らしたのはわずか3年。それでもこの村を描いた作品は230点以上。うち約60点は、特徴的な屋根を持つ村の教会を題材にしたものです
            </li>
            <li>村を見下ろす丘の上の教会。そこには、モネが見たであろう景色が今も目の前に広がります</li>
            <li>キャンバスに遺された風景が、100年以上を経た今もそのまま残っています</li>
            <li>最初の妻カミーユが眠る村。<em class="work">『死の床のカミーユ』</em>は、ここで描かれました</li>
          </ul>

          <figure class="solo">
            <img
              :src="optSrc('giverny-vetheuil', 640)"
              :srcset="optSrcSet('giverny-vetheuil', figWidths)"
              sizes="(max-width: 560px) 100vw, 460px"
              width="704"
              height="1000"
              loading="lazy"
              decoding="async"
              alt="ヴェトゥイユの教会と、その前に置かれたモネの絵の複製パネル"
            />
            <figcaption>絵と、その風景が並び立つ。モネが立った場所に、いま自分が立つ。</figcaption>
          </figure>
        </div>

        <div class="station">
          <p class="sec-label">Le jardin d'eau</p>
          <h2>ジヴェルニー ― モネの睡蓮の池</h2>
          <ul>
            <li>「花を描くために画家になった」とも言われるモネ。植物へのなみなみならぬこだわりとは？</li>
            <li>同じ風景を何枚も描く「連作」。光とともに移ろう色彩の世界に心ゆくまで浸ってください</li>
            <li>
              モネの最高傑作は、この二つの庭
              <div class="sub">
                <span>① 絵の具を置くように花を敷き詰めた「花の庭」</span>
                <span>② 空を映す鏡のような水面に、そっと顔を出す睡蓮の「水の庭」</span>
              </div>
            </li>
            <li>池に映る空も雲も、それ自体がもう一枚の絵画。画家が光とともに見つめた景色に、静かに寄り添うひとときを</li>
            <li>午後がおすすめ。睡蓮の花が咲く時間に</li>
            <li>柳や牡丹など、日本でも親しまれる草木が寄り添う、季節ごとに楽しめるモネ自作の庭</li>
            <li>モネが最後まで筆を入れ続けた大作「睡蓮」（オランジュリー美術館）が生まれたのも、この庭のアトリエでした</li>
            <li>
              家族と過ごしたピンクの家は生前のまま。2人目の妻アリスとは、なぜか寝室が別々<span class="dash">――</span>その理由とは？
            </li>
            <li>浮世絵の色に合わせたダイニングの壁、青が美しいキッチン。細部にまで宿る、モネの色彩へのこだわりを</li>
          </ul>

          <div class="duo">
            <figure>
              <img
                :src="optSrc('giverny-pond', 640)"
                :srcset="optSrcSet('giverny-pond', figWidths)"
                sizes="(max-width: 560px) 100vw, 360px"
                width="750"
                height="1000"
                loading="lazy"
                decoding="async"
                alt="空と雲を映すジヴェルニーの睡蓮の池と、岸辺に咲く花々"
              />
              <figcaption>空も雲も、水面がそのまま一枚の絵に。</figcaption>
            </figure>
            <figure>
              <img
                :src="optSrc('giverny-kitchen', 640)"
                :srcset="optSrcSet('giverny-kitchen', figWidths)"
                sizes="(max-width: 560px) 100vw, 360px"
                width="750"
                height="1000"
                loading="lazy"
                decoding="async"
                alt="青いタイルと銅鍋が並ぶ、モネの家のキッチン"
              />
              <figcaption>青いタイルに銅の鍋。細部にまで宿る、モネの色彩へのこだわり。</figcaption>
            </figure>
          </div>

          <figure class="solo">
            <img
              :src="optSrc('giverny-bicycle', 640)"
              :srcset="optSrcSet('giverny-bicycle', figWidths)"
              sizes="(max-width: 560px) 100vw, 460px"
              width="750"
              height="1000"
              loading="lazy"
              decoding="async"
              alt="花かごを載せた自転車が停まる、ジヴェルニーの村の小径"
            />
            <figcaption>花を載せた自転車が似合う、ジヴェルニーの小径。時間がゆっくりと流れます。</figcaption>
          </figure>
        </div>
      </div>

      <div class="practical">
        <div class="card">
          <h3>安心・快適な一日</h3>
          <ul>
            <li>日本人アシスタントガイドが、心をこめてご案内</li>
            <li>電車とバスを乗り継ぐより効率的</li>
          </ul>
        </div>
        <div class="card">
          <h3>道中の車窓も、見どころ</h3>
          <ul>
            <li>
              ジヴェルニーや田舎の村へ向かう風景は、車の旅ならでは
              <div class="sub">
                <span>― 石灰岩の断崖を掘り抜いた「洞窟の家」</span>
                <span>― 「フランスの最も美しい村」に登録されたラ・ロッシュ＝ギヨン。断崖の要塞とつながる、貴族の城が佇みます</span>
                <span>― 雄大なセーヌ川の眺めと、美しい大自然をお楽しみいただけます</span>
              </div>
            </li>
          </ul>
          <figure>
            <img
              :src="optSrc('giverny-roche-guyon', 640)"
              :srcset="optSrcSet('giverny-roche-guyon', figWidths)"
              sizes="(max-width: 560px) 100vw, 360px"
              width="750"
              height="1000"
              loading="lazy"
              decoding="async"
              alt="白亜の断崖の下に佇むラ・ロッシュ＝ギヨンの城と、崖の上に残る要塞"
            />
            <figcaption>白亜の崖の下に城、崖の上に要塞。ラ・ロッシュ＝ギヨン。</figcaption>
          </figure>
        </div>
      </div>

      <div class="details">
        <h3>ツアー詳細・料金</h3>

        <dl class="facts">
          <dt>人数</dt>
          <dd>1〜6名さま（1グループ）</dd>
          <dt>集合場所</dt>
          <dd>ホテルのロビー</dd>
          <dt>待ち合わせ時間</dt>
          <dd>08:30〜13:30 の間</dd>
          <dt>所要時間</dt>
          <dd>約6時間</dd>
          <dt>料金</dt>
          <dd>
            <span class="price">940€〜<small>1グループあたり（入場チケット別）</small></span>
          </dd>
        </dl>

        <div class="notes">
          <p>※ 入場チケットは料金に含まれておりません。</p>
          <p>※ チケットの手配も承ります（13.5€ × 人数分 ＋ 手数料 25€）。</p>
          <p>※ 入場チケットは時間指定の予約制です。空き状況により、ご希望の時間帯に添えない場合がございます。</p>
        </div>

        <div class="incl">
          <div class="yes">
            <h4>含まれるもの</h4>
            <p>専用車（ドライバー含む）<br />日本人アシスタントガイド</p>
          </div>
          <div class="no">
            <h4>含まれないもの</h4>
            <p>入場チケット代<br />飲食代</p>
          </div>
        </div>

        <dl class="facts">
          <dt>お支払い期限</dt>
          <dd>予約確定メールの送信時刻より 72時間以内</dd>
          <dt>お支払い方法</dt>
          <dd>クレジットカード（VISA / Mastercard）、銀行振込</dd>
          <dt>予約確認書</dt>
          <dd>
            お支払い確認後、メールにて予約確認書（バウチャー）をお送りします。印刷またはスクリーンショットのうえ、当日ご持参ください。こちらが「参加券」となります。
          </dd>
        </dl>

        <div class="cancel">
          <p class="sub-h">キャンセル条件</p>
          <p class="cancel-note">※ 待ち合わせ時間にご連絡なく30分以上遅れられた場合は、キャンセルとみなされます。</p>
          <table>
            <thead>
              <tr>
                <th>ご連絡の時期</th>
                <th>キャンセル料金</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>参加日の30日前まで</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>参加日の29日前〜14日前まで</td>
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

      <div class="cta-band">
        <p class="cta-note">少人数・専用車の特別な一日を、ご一緒に。</p>
        <NuxtLink class="cta" to="/contact">ご予約・お問い合わせ</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style>
.hmi-giverny {
  --ink: #1b2a23;
  --ink-soft: #3c5147;
  --pond: #2f6b4f;
  --pond-deep: #245240;
  --willow: #456344;
  --lily: #a85d72;
  --mist: #eef1ec;
  --paper: #f7f9f5;
  --line: #d3dcd2;

  box-sizing: border-box;
  background: var(--mist);
  color: var(--ink);
  font-family: var(--mincho);
  line-height: 1.9;
  -webkit-font-smoothing: antialiased;
  padding: clamp(2.5rem, 6vw, 5rem) clamp(1.1rem, 5vw, 3rem);
}

.hmi-giverny * {
  box-sizing: border-box;
}

.hmi-giverny .wrap {
  max-width: 760px;
  margin: 0 auto;
}

.hmi-giverny .hero-photo {
  margin: 0 0 2.6rem;
  overflow: hidden;
  border-radius: 3px;
}

.hmi-giverny .hero-photo img {
  display: block;
  width: 100%;
  height: auto;
}

.hmi-giverny .eyebrow {
  font-family: var(--serif);
  font-style: italic;
  letter-spacing: 0.14em;
  color: var(--pond);
  font-size: clamp(1rem, 2.6vw, 1.25rem);
  margin: 0 0 1.1rem;
  text-transform: uppercase;
}

.hmi-giverny .hero-title {
  font-weight: 700;
  font-size: clamp(2rem, 6.4vw, 3.4rem);
  line-height: 1.28;
  letter-spacing: 0.02em;
  margin: 0 0 0.5rem;
}

.hmi-giverny .hero-sub {
  font-weight: 500;
  font-size: clamp(1rem, 3vw, 1.2rem);
  color: var(--ink-soft);
  letter-spacing: 0.04em;
  margin: 0 0 2.4rem;
}

.hmi-giverny .rule {
  width: 64px;
  height: 2px;
  border: 0;
  margin: 0 0 2.4rem;
  background: linear-gradient(90deg, var(--pond), var(--lily));
}

.hmi-giverny .lead {
  font-size: clamp(1.02rem, 2.7vw, 1.16rem);
  line-height: 2.15;
  margin: 0 0 3.6rem;
}

.hmi-giverny .lead .dash,
.hmi-giverny .dash {
  color: var(--pond);
  font-weight: 700;
}

.hmi-giverny figure {
  margin: 1.8rem 0 0;
}

.hmi-giverny figure img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 3px;
}

.hmi-giverny figcaption {
  margin-top: 0.6rem;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--ink-soft);
  letter-spacing: 0.02em;
}

.hmi-giverny .duo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin-top: 1.8rem;
}

.hmi-giverny .duo figure {
  margin: 0;
}

.hmi-giverny .solo {
  margin: 1.8rem auto 0;
  max-width: 460px;
}

.hmi-giverny .journey {
  position: relative;
  padding-left: clamp(1.4rem, 5vw, 2.6rem);
}

.hmi-giverny .journey::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: linear-gradient(180deg, var(--willow), var(--pond) 45%, var(--pond-deep));
  opacity: 0.55;
}

.hmi-giverny .station {
  position: relative;
  margin-bottom: 3.4rem;
}

.hmi-giverny .station::before {
  content: '';
  position: absolute;
  left: calc(-1 * clamp(1.4rem, 5vw, 2.6rem) + 1px);
  top: 0.55rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--mist);
  border: 2.5px solid var(--pond);
  box-shadow: 0 0 0 4px var(--mist);
}

.hmi-giverny .sec-label {
  font-family: var(--serif);
  font-style: italic;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--willow);
  font-size: 0.92rem;
  margin: 0 0 0.35rem;
}

.hmi-giverny h2 {
  font-weight: 700;
  font-size: clamp(1.32rem, 4vw, 1.7rem);
  letter-spacing: 0.03em;
  margin: 0 0 1.3rem;
  color: var(--ink);
}

.hmi-giverny ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.hmi-giverny li {
  position: relative;
  padding-left: 1.9rem;
  margin: 0 0 1.15rem;
  font-size: clamp(1rem, 2.6vw, 1.08rem);
  line-height: 1.95;
}

.hmi-giverny li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 4 A46 46 0 1 1 44 4 L50 50 Z' fill='%232f6b4f'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  transform: translateY(-2px) rotate(-12deg);
}

.hmi-giverny li .sub {
  margin-top: 0.55rem;
  padding-left: 0.2rem;
  color: var(--ink-soft);
  font-size: 0.98em;
  line-height: 1.85;
}

.hmi-giverny li .sub span {
  display: block;
}

.hmi-giverny em.work {
  font-style: normal;
}

.hmi-giverny .practical {
  margin-top: 1rem;
  display: grid;
  gap: 1.4rem;
  grid-template-columns: 1fr 1fr;
}

.hmi-giverny .card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 1.6rem 1.5rem;
}

.hmi-giverny .card h3 {
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.04em;
  margin: 0 0 0.9rem;
  color: var(--pond-deep);
}

.hmi-giverny .card ul li {
  margin-bottom: 0.7rem;
  font-size: 1rem;
}

.hmi-giverny .card ul li:last-child {
  margin-bottom: 0;
}

.hmi-giverny .card figure {
  margin-top: 1.2rem;
}

.hmi-giverny .cta-band {
  text-align: center;
  margin-top: 3.4rem;
  padding-top: 2.6rem;
  border-top: 1px solid var(--line);
}

.hmi-giverny .cta-note {
  color: var(--ink-soft);
  font-size: 1rem;
  margin: 0 0 1.4rem;
  letter-spacing: 0.03em;
}

.hmi-giverny .cta {
  display: inline-block;
  font-family: var(--gothic);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #fff;
  background: var(--pond);
  text-decoration: none;
  padding: 0.95rem 2.6rem;
  border-radius: 2px;
  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.hmi-giverny .cta:hover {
  background: var(--pond-deep);
  transform: translateY(-2px);
}

.hmi-giverny .cta:focus-visible {
  outline: 3px solid var(--lily);
  outline-offset: 3px;
}

.hmi-giverny .details {
  margin-top: 3rem;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: clamp(1.5rem, 4vw, 2.4rem);
}

.hmi-giverny .details h3 {
  font-weight: 700;
  font-size: clamp(1.15rem, 3.4vw, 1.35rem);
  letter-spacing: 0.04em;
  margin: 0 0 1.6rem;
  color: var(--pond-deep);
}

.hmi-giverny .facts {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.85rem 1.4rem;
  margin: 0 0 1.8rem;
}

.hmi-giverny .facts dt {
  font-weight: 700;
  color: var(--pond-deep);
  font-size: 0.98rem;
  white-space: nowrap;
}

.hmi-giverny .facts dd {
  margin: 0;
  font-size: 1rem;
}

.hmi-giverny .price {
  font-size: clamp(1.7rem, 5vw, 2.2rem);
  font-weight: 700;
  color: var(--pond);
  line-height: 1.3;
  letter-spacing: 0.01em;
}

.hmi-giverny .price small {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ink-soft);
  letter-spacing: 0.02em;
  display: block;
  margin-top: 0.2rem;
}

.hmi-giverny .notes {
  margin: 0 0 1.8rem;
  padding: 1rem 1.2rem;
  border-left: 3px solid var(--willow);
  background: var(--mist);
  border-radius: 0 3px 3px 0;
}

.hmi-giverny .notes p {
  margin: 0 0 0.5rem;
  font-size: 0.94rem;
  line-height: 1.8;
  color: var(--ink-soft);
}

.hmi-giverny .notes p:last-child {
  margin-bottom: 0;
}

.hmi-giverny .incl {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin-bottom: 1.8rem;
}

.hmi-giverny .incl div {
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 1rem 1.1rem;
  background: #fff;
}

.hmi-giverny .incl h4 {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.hmi-giverny .incl .yes h4 {
  color: var(--pond);
}

.hmi-giverny .incl .no h4 {
  color: var(--ink-soft);
}

.hmi-giverny .incl p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.8;
}

.hmi-giverny .cancel table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.6rem;
  font-size: 0.95rem;
}

.hmi-giverny .cancel th,
.hmi-giverny .cancel td {
  text-align: left;
  padding: 0.6rem 0.4rem;
  border-bottom: 1px solid var(--line);
}

.hmi-giverny .cancel th {
  font-weight: 700;
  color: var(--pond-deep);
  font-size: 0.9rem;
  letter-spacing: 0.03em;
}

.hmi-giverny .cancel td:last-child {
  text-align: right;
  font-weight: 700;
  white-space: nowrap;
}

.hmi-giverny .cancel tr:last-child td {
  border-bottom: 0;
}

.hmi-giverny .sub-h {
  font-weight: 700;
  font-size: 1rem;
  margin: 1.6rem 0 0.4rem;
  color: var(--pond-deep);
  letter-spacing: 0.03em;
}

.hmi-giverny .cancel-note {
  margin: 0 0 0.2rem;
  font-size: 0.94rem;
  line-height: 1.8;
}

@media (max-width: 560px) {
  .hmi-giverny .practical,
  .hmi-giverny .incl,
  .hmi-giverny .duo {
    grid-template-columns: 1fr;
  }

  .hmi-giverny .facts {
    grid-template-columns: 1fr;
    gap: 0.2rem 0;
  }

  .hmi-giverny .facts dd {
    margin-bottom: 0.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hmi-giverny .cta {
    transition: none;
  }
}
</style>
