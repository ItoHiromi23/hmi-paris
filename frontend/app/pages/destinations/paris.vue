<script setup lang="ts">
const heroWidths = [640, 960, 1280, 1600]
const heroSrc = optSrc('paris-hero', 1280)
const heroSrcset = optSrcSet('paris-hero', heroWidths)
const heroAvifSrc = optSrc('paris-hero', 1280, 'avif')
const heroAvifSrcset = optSrcSet('paris-hero', heroWidths, 'avif')
const tileWidths = [400, 640, 800]
const featureWidths = [640, 960, 1200]

function parisName(src: string) {
  return `paris-${(src.split('/').pop() || '').replace(/\.[^.]+$/, '')}`
}

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
  title: 'パリ街歩きツアー — HMI Paris',
  description:
    '屋根のない美術館を、日本語で歩く。初めてでも、何度目でも。あなたの「好き」に合わせて、パリを自由に組み立てる一日を。',
  ogLocale: 'ja_JP',
})

const maraisGallery = [
  { src: '/images/destinations/paris/marais-01.jpg', alt: 'マレ地区の街並み', w: 750, h: 1000 },
  { src: '/images/destinations/paris/marais-02.jpg', alt: 'マレ地区の街並み', w: 750, h: 1000 },
  { src: '/images/destinations/paris/marais-03.jpg', alt: 'マレ地区の街並み', w: 750, h: 1000 },
  { src: '/images/destinations/paris/marais-04.jpg', alt: 'マレ地区の街並み', w: 750, h: 1000 },
]

const montmartreGallery = [
  { src: '/images/destinations/paris/montmartre-01.jpg', alt: 'モンマルトルの街並み', w: 750, h: 1000 },
  { src: '/images/destinations/paris/montmartre-02.jpg', alt: 'モンマルトルの街並み', w: 750, h: 1000 },
  { src: '/images/destinations/paris/montmartre-03.jpg', alt: 'モンマルトルの街並み', w: 750, h: 1000 },
]

const classicsGallery = [
  { src: '/images/destinations/paris/classics-01.jpg', alt: 'パリの主要観光名所', w: 750, h: 1000 },
  { src: '/images/destinations/paris/classics-02.jpg', alt: 'パリの主要観光名所', w: 750, h: 1000 },
  { src: '/images/destinations/paris/classics-03.jpg', alt: 'パリの主要観光名所', w: 1000, h: 965 },
]

const fulldayGalleryA = [
  { src: '/images/destinations/paris/fullday-01.jpg', alt: 'パリの街歩き', w: 1100, h: 825 },
  { src: '/images/destinations/paris/fullday-02.jpg', alt: 'パリの街歩き', w: 1100, h: 809 },
]

const fulldayGalleryB = [
  { src: '/images/destinations/paris/fullday-03.jpg', alt: 'パリの街歩き', w: 675, h: 900 },
  { src: '/images/destinations/paris/fullday-04.jpg', alt: 'パリの街角の看板（サドル職人の店）', w: 900, h: 843 },
  { src: '/images/destinations/paris/fullday-05.jpg', alt: 'パリの街歩き', w: 675, h: 900 },
]
</script>

<template>
  <div class="paris-page">
    <header class="hero" id="top">
      <picture>
        <source type="image/avif" :srcset="heroAvifSrcset" sizes="100vw" />
        <img
          class="hero-img"
          :src="heroSrc"
          :srcset="heroSrcset"
          sizes="100vw"
          alt="パリの街並み"
          width="1800"
          height="1013"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
      <div class="hero-overlay">
        <div class="eyebrow">HMI Paris · Walking Tour</div>
        <p class="tagline">屋根のない美術館を、日本語で歩く。</p>
        <h1>パリ街歩きツアー</h1>
        <div class="sub-latin">Découvrir Paris à votre rythme</div>
        <p class="hero-lead">
          初めてでも、何度目でも。<br />あなたの「好き」に合わせて、パリを自由に組み立てる一日を。
        </p>
      </div>
    </header>

    <nav class="page-nav" aria-label="ページ内メニュー">
      <div class="wrap">
        <ul>
          <li><a href="#intro">はじめに</a></li>
          <li><a href="#courses">モデルコース</a></li>
          <li><a href="#flow">ご予約の流れ</a></li>
          <li><a href="#price">料金</a></li>
          <li><a href="#details">ツアー詳細</a></li>
          <li><a href="#contact">お問い合わせ</a></li>
        </ul>
      </div>
    </nav>

    <div class="wrap">
      <section class="intro" id="intro">
        <span class="kicker">Bienvenue à Paris</span>
        <h2>屋根のない美術館、パリへ</h2>
        <p class="lead">
          芸術と食、花の都パリ。高さや壁の色まで統一された街並みは、伝統と歴史を物語り、街自体が屋根のない美術館のようです。
        </p>
        <p>
          シャンゼリゼ通り、凱旋門、エッフェル塔、ノートルダム大聖堂。数えきれないほどの観光名所。スイーツやパン屋、ビストロから星付きレストランまで、食べ尽くせないグルメの数々。初めての方からリピーターの方まで楽しんでいただける街歩きを、日本語アシスタントが言葉の心配なくご案内いたします。地下鉄の乗り方から、テーマに沿ったご希望の場所まで、安心してパリをお楽しみください。
        </p>
        <p>
          年代を経て広がっていったパリは、地域ごとに異なる特徴と個性を持っています。アートやファッション、美食などテーマを決めて旅をしたり、行きたいエリアを中心に散策したり。自由自在にカスタマイズできる、あなただけの街歩きツアーです。
        </p>
      </section>

      <section id="audience">
        <span class="kicker">For You</span>
        <h2>こんな方におすすめ</h2>
        <ul class="audience">
          <li>パリが初めてで、地下鉄の乗り方や街の歩き方から知りたい方</li>
          <li>何度も訪れているけれど、まだ知らないパリを発見したい方</li>
          <li>言葉の不安なく、日本語で気軽に質問しながら歩きたい方</li>
          <li>アート・グルメ・ファッションなど、ご自身の興味に合わせて自由に組み立てたい方</li>
        </ul>
      </section>

      <section id="courses">
        <span class="kicker">Modèles de parcours</span>
        <h2>おすすめエリア＆モデルコース</h2>

        <article class="course">
          <div class="gallery cols-4">
            <img
              v-for="item in maraisGallery"
              :key="item.src"
              :src="optSrc(parisName(item.src), 400)"
              :srcset="optSrcSet(parisName(item.src), tileWidths)"
              sizes="(max-width: 640px) 50vw, 215px"
              :alt="item.alt"
              :width="item.w"
              :height="item.h"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="course-inner">
            <div class="course-head">
              <h3>マレ地区</h3>
              <span class="duration">4時間 — 235€</span>
            </div>
            <p>
              中世のパリにタイムスリップ。おしゃれなパリジェンヌが行き交い、小道にはカフェやブティックがひしめく、トレンド発祥の地マレ。中世には貴族がこぞって屋敷を建てた、最も華やいだ場所でもありました。今も残る貴族の邸宅や隠れたスポットを巡り、最古のマルシェ、貴族の広場、スイーツやマレのソウルフードなど、さまざまな角度から素敵なマレをお楽しみいただけます。
            </p>
            <div class="notes">
              <p>※ 車両侵入禁止エリアがあります。</p>
              <p>※ 月曜日はお休みの店舗が多くございます。</p>
              <p>※ 午後から開店する店舗が多く、午前中は静かです。</p>
            </div>
          </div>
        </article>

        <article class="course">
          <img
            class="feature"
            :src="optSrc('paris-montmartre-feature', 960)"
            :srcset="optSrcSet('paris-montmartre-feature', [640, 960, 1100])"
            sizes="(max-width: 860px) 100vw, 860px"
            alt="ムーラン・ルージュ（モンマルトル）"
            width="1400"
            height="984"
            loading="lazy"
            decoding="async"
          />
          <div class="gallery cols-3">
            <img
              v-for="item in montmartreGallery"
              :key="item.src"
              :src="optSrc(parisName(item.src), 400)"
              :srcset="optSrcSet(parisName(item.src), tileWidths)"
              sizes="(max-width: 640px) 50vw, 287px"
              :alt="item.alt"
              :width="item.w"
              :height="item.h"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="course-inner">
            <div class="course-head">
              <h3>モンマルトル</h3>
              <span class="duration">3時間 190€ / 4時間 235€</span>
            </div>
            <p>
              ちょっと田舎に遊びに来たような、情緒あふれる街並みが残るモンマルトル。スケッチのできる環境があり、芸術家たちが愛し暮らしたこの地で、数々の名作が生まれました。ゴッホやルノワールが描いた風車小屋ムーラン・ド・ラ・ギャレット、受け継がれたブドウ畑、曲がりくねった小道。パリにいながら、パリを離れて旅をしたかのようなひとときです。「パリ北のベランダ」とも称され、標高130mの丘からは市内をパノラミックに一望できます。丘の傾斜を利用した面白い写真スポットや、丘の歴史にも触れながら体感していただけます。
            </p>
            <div class="spots-label">主な予定スポット</div>
            <ul class="spots">
              <li>サクレクール寺院</li>
              <li>サン・ピエール教会</li>
              <li>テルトル広場</li>
              <li>ゴッホの家</li>
              <li>ムーラン・ド・ラ・ギャレット</li>
              <li>モンマルトル美術館 ※</li>
              <li>ジュテームの壁 ※</li>
              <li>壁抜け男像</li>
            </ul>
            <div class="notes">
              <p>※ モンマルトル美術館はご希望に応じて立ち寄り可能です（入場料別）。</p>
              <p>※ ジュテームの壁は2026年7月現在、修復中です。</p>
              <p>※ 坂道と階段が多いため、歩きやすい靴がおすすめです。</p>
              <p>
                ※
                3時間コースは、モンマルトル美術館の館内を見学する時間がないため、外観のみのご案内となります。
              </p>
            </div>
          </div>
        </article>

        <article class="course">
          <div class="gallery cols-3">
            <img
              v-for="item in classicsGallery"
              :key="item.src"
              :src="optSrc(parisName(item.src), 400)"
              :srcset="optSrcSet(parisName(item.src), tileWidths)"
              sizes="(max-width: 640px) 50vw, 287px"
              :alt="item.alt"
              :width="item.w"
              :height="item.h"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="course-inner">
            <div class="course-head">
              <h3>パリ早わかり 王道コース</h3>
              <span class="duration">3時間 — 190€</span>
            </div>
            <p>
              まずはパリの主要な観光名所を短時間で回りたい。そんなご要望にお応えするコースです。地下鉄や市バスを利用しながら、各名所で写真撮影。パリの歴史やエピソードにも触れながら、王道の観光スポットを巡ります。
            </p>
            <div class="spots-label">主なスポット</div>
            <ul class="spots">
              <li>エッフェル塔</li>
              <li>凱旋門</li>
              <li>シャンゼリゼ通り</li>
              <li>ノートルダム大聖堂</li>
            </ul>
            <div class="notes">
              <p>※ 基本は外観のみの観光です。</p>
              <p>※ 交通事情や見学ペースにもよりますが、最低3ヶ所はご見学いただけます。</p>
              <p>※ ご希望に応じてアレンジ可能です。</p>
            </div>
          </div>
        </article>

        <article class="course">
          <img
            class="feature feature-wide"
            :src="optSrc('paris-fullday-feature', 960)"
            :srcset="optSrcSet('paris-fullday-feature', featureWidths)"
            sizes="(max-width: 860px) 100vw, 860px"
            alt="オペラ界隈のパッサージュ（ガラス屋根のアーケード）"
            width="1170"
            height="654"
            loading="lazy"
            decoding="async"
          />
          <div class="gallery cols-2">
            <img
              v-for="item in fulldayGalleryA"
              :key="item.src"
              :src="optSrc(parisName(item.src), 640)"
              :srcset="optSrcSet(parisName(item.src), tileWidths)"
              sizes="(max-width: 640px) 100vw, 430px"
              :alt="item.alt"
              :width="item.w"
              :height="item.h"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="gallery cols-3">
            <img
              v-for="item in fulldayGalleryB"
              :key="item.src"
              :src="optSrc(parisName(item.src), 400)"
              :srcset="optSrcSet(parisName(item.src), tileWidths)"
              sizes="(max-width: 640px) 50vw, 287px"
              :alt="item.alt"
              :width="item.w"
              :height="item.h"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="course-inner">
            <div class="course-head">
              <h3>パリよくばり 1日コース</h3>
              <span class="duration">8時間 — 400€</span>
            </div>
            <p>
              王道コースに加え、オペラ界隈のパッサージュ、マレやモンマルトル界隈の散策、おすすめのスイーツ店やカフェなど、ご希望に沿って自由にカスタマイズいただけます。メトロの乗り方からカフェでの注文の仕方、美術館巡りからパッサージュまで。パリを隅々まで満喫いただける1日ツアーです。
            </p>
            <div class="spots-label">ご提案エリア／スポット</div>
            <ul class="spots">
              <li>王道スポット（凱旋門・エッフェル塔・ノートルダムなど）</li>
              <li>モンマルトル界隈</li>
              <li>オペラ界隈（オペラ座・デパート・パッサージュなど）</li>
              <li>スイーツ巡り</li>
              <li>絶景写真スポット巡り</li>
            </ul>
          </div>
        </article>
      </section>

      <section id="flow">
        <span class="kicker">Étapes</span>
        <h2>ご予約からツアー当日までの流れ</h2>
        <div class="flow">
          <div class="flow-step">
            <div class="num" />
            <div class="body">
              <h3>お問い合わせ</h3>
              <p>ご希望のエリア・テーマ・ご人数などをお聞かせください。</p>
            </div>
          </div>
          <div class="flow-step">
            <div class="num" />
            <div class="body">
              <h3>コースのご提案・お見積り</h3>
              <p>ご希望に沿ったコースと料金をご案内いたします。</p>
            </div>
          </div>
          <div class="flow-step">
            <div class="num" />
            <div class="body">
              <h3>ご予約確定</h3>
              <p>日程・待ち合わせ場所を確定いたします。</p>
            </div>
          </div>
          <div class="flow-step">
            <div class="num" />
            <div class="body">
              <h3>当日・ツアー開始</h3>
              <p>待ち合わせ場所でお会いし、パリの街歩きへ出発します。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="price">
        <span class="kicker">Tarifs</span>
        <h2>料金について</h2>
        <div class="price-box">
          <table class="price-table">
            <tbody>
              <tr>
                <td class="dur">3時間</td>
                <td class="amt">190€</td>
              </tr>
              <tr>
                <td class="dur">4時間</td>
                <td class="amt">235€</td>
              </tr>
              <tr>
                <td class="dur">6時間</td>
                <td class="amt">325€</td>
              </tr>
              <tr>
                <td class="dur">8時間</td>
                <td class="amt">400€</td>
              </tr>
              <tr class="extra">
                <td class="dur">追加1時間ごと</td>
                <td class="amt">+45€</td>
              </tr>
            </tbody>
          </table>
          <p class="price-late">20:00以降は1時間ごと55€になります。</p>
          <p class="price-note">
            1グループ（1〜6名さま）あたりの料金です。<br />交通費・飲食代・チケット代は含まれておりません。
          </p>
        </div>
      </section>

      <section class="details" id="details">
        <span class="kicker">Détails pratiques</span>
        <h2 class="dt-title">ツアー詳細</h2>
        <dl class="dt-list">
          <div class="dl-row">
            <dt>参加人数</dt>
            <dd>1〜6名さままで（1グループ）</dd>
          </div>
          <div class="dl-row">
            <dt>含まれるもの</dt>
            <dd>日本語アシスタントガイド</dd>
          </div>
          <div class="dl-row">
            <dt>含まれないもの</dt>
            <dd>交通費、飲食代、チケット代</dd>
          </div>
          <div class="dl-row">
            <dt>集合場所</dt>
            <dd>ご宿泊ホテルのロビー、またはご希望の場所</dd>
          </div>
          <div class="dl-row">
            <dt>ツアー開始時間</dt>
            <dd>09:00〜16:00の間で、ご希望のお時間</dd>
            <dd class="sub">
              ※ 20:00以降は1時間ごと55€を申し受けます。／終了時間は22:00までとなります。
            </dd>
          </div>
          <div class="dl-row">
            <dt>お支払い期限</dt>
            <dd>予約確定のメールをお送りした時間より72時間以内</dd>
          </div>
          <div class="dl-row">
            <dt>お支払い方法</dt>
            <dd>クレジットカード（Visa / Mastercard）、銀行振り込み</dd>
          </div>
          <div class="dl-row">
            <dt>予約確認書</dt>
            <dd>
              お支払い確認後、メールにて予約確認書（バウチャー）をお送りいたします。印刷またはスクリーンショットのうえ、参加当日にご持参ください。こちらが「参加券」となります。
            </dd>
          </div>
          <div class="dl-row">
            <dt>持ち物・服装</dt>
            <dd>
              歩きやすい靴、天候に合わせた服装、飲み物などをおすすめします。モンマルトルやマレは坂道・石畳が多いため、履き慣れた靴が安心です。
            </dd>
          </div>
        </dl>
      </section>

      <section id="cancel">
        <span class="kicker">Annulation</span>
        <h2>キャンセル規定</h2>
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
        <div class="caution">
          <p>待ち合わせ時間に、ご連絡なく30分以上遅れられた場合は、キャンセルとみなされます。</p>
          <p>
            こちらでお手配したチケット類は、キャンセルされた場合の返金はございません。お申し込み直後から100%のキャンセル料が発生いたします。
          </p>
        </div>
      </section>

      <section id="notes">
        <span class="kicker">Notes importantes</span>
        <h2>ご注意</h2>
        <div class="caution">
          <p>
            交通費、入場料、食事代は、いずれのコースも料金に含まれておりません。ご希望がございましたらお手配可能です。
          </p>
          <p>
            モニュメントや美術館の入場チケットは、時間指定の予約制となっているところが多いため、事前にご予約されることをおすすめいたします。
          </p>
        </div>
      </section>

      <div class="cta" id="contact">
        <span class="kicker">Réservation</span>
        <h2>パリの一日を、ご一緒に</h2>
        <p>
          ご希望のエリアやテーマ、日程が決まっていなくても大丈夫です。まずはお気軽にお問い合わせください。
        </p>
        <NuxtLink to="/contact">お問い合わせはこちら</NuxtLink>
      </div>

      <footer class="paris-foot">
        <div class="brand-rule" />
        HMI Paris · Conciergerie &amp; visites guidées en japonais
      </footer>
    </div>
  </div>
</template>

<style>
.paris-page {
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

.paris-page * {
  box-sizing: border-box;
}

.paris-page .wrap {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 28px 88px;
}

.paris-page section {
  padding: 56px 0 8px;
  scroll-margin-top: 90px;
}

.paris-page .kicker {
  font-family: var(--serif);
  letter-spacing: 0.32em;
  text-transform: uppercase;
  font-size: 12px;
  color: var(--brass);
  display: block;
  margin-bottom: 14px;
}

.paris-page h2 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(20px, 4.4vw, 27px);
  letter-spacing: 0.05em;
  color: var(--brass-soft);
  margin: 0 0 26px;
  position: relative;
  padding-bottom: 16px;
}

.paris-page h2::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 52px;
  height: 2px;
  background: var(--brass);
}

.paris-page .hero {
  position: relative;
  aspect-ratio: 1800 / 1013;
  color: var(--paper);
  text-align: center;
  overflow: hidden;
  border-bottom: 3px solid var(--brass);
}

.paris-page .hero picture,
.paris-page .hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.paris-page .hero-img {
  object-fit: cover;
  object-position: center 42%;
}

.paris-page .hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 104px;
  background:
    radial-gradient(ellipse at 50% 50%, rgba(12, 20, 38, 0.62) 0%, rgba(12, 20, 38, 0.74) 70%, rgba(12, 20, 38, 0.82) 100%),
    linear-gradient(180deg, rgba(20, 31, 56, 0.55), rgba(20, 31, 56, 0.35) 45%, rgba(20, 31, 56, 0.7));
}

.paris-page .hero .eyebrow {
  font-family: var(--serif);
  letter-spacing: 0.42em;
  text-transform: uppercase;
  font-size: 13px;
  color: var(--brass-soft);
  margin-bottom: 22px;
  padding-left: 0.42em;
  text-shadow: 0 2px 18px rgba(10, 16, 30, 0.55);
}

.paris-page .hero h1 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(26px, 6vw, 40px);
  line-height: 1.5;
  letter-spacing: 0.06em;
  margin: 0 0 8px;
  color: var(--paper);
  text-shadow: 0 2px 18px rgba(10, 16, 30, 0.55);
}

.paris-page .hero .sub-latin {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(18px, 3.2vw, 22px);
  color: var(--brass-soft);
  letter-spacing: 0.08em;
  margin-top: 14px;
  text-shadow: 0 2px 18px rgba(10, 16, 30, 0.55);
}

.paris-page .hero .tagline {
  font-family: var(--mincho);
  font-weight: 500;
  font-size: clamp(14px, 3.2vw, 16.5px);
  letter-spacing: 0.18em;
  color: rgba(247, 243, 234, 0.9);
  margin: 0 0 18px;
}

.paris-page .hero .hero-lead {
  margin: 26px auto 0;
  max-width: 520px;
  font-size: 15px;
  line-height: 2;
  color: rgba(247, 243, 234, 0.86);
}

.paris-page .page-nav {
  border-bottom: 1px solid var(--line);
  background: rgba(11, 18, 32, 0.72);
}

.paris-page .page-nav .wrap {
  padding: 0 28px;
}

.paris-page .page-nav ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 28px;
  list-style: none;
  margin: 0;
  padding: 14px 0;
}

.paris-page .page-nav a {
  color: rgba(236, 230, 215, 0.78);
  text-decoration: none;
  font-size: 13px;
  letter-spacing: 0.08em;
  transition: color 0.2s;
}

.paris-page .page-nav a:hover,
.paris-page .page-nav a:focus-visible {
  color: var(--brass-soft);
  outline: none;
}

.paris-page .intro p,
.paris-page .course-inner > p {
  font-family: var(--mincho);
  font-weight: 500;
  font-size: clamp(15.5px, 3.8vw, 17px);
  line-height: 2.05;
  letter-spacing: 0.03em;
  margin: 0 0 20px;
  color: var(--paper);
}

.paris-page .intro p.lead {
  color: var(--brass-soft);
  font-size: clamp(16.5px, 4vw, 18.5px);
}

.paris-page .audience {
  list-style: none;
  display: grid;
  gap: 14px;
  margin: 0;
  padding: 0;
}

.paris-page .audience li {
  padding: 16px 18px 16px 34px;
  position: relative;
  color: var(--paper);
  font-family: var(--gothic);
  font-weight: 300;
  font-size: 15px;
  background: linear-gradient(180deg, var(--indigo-900), var(--indigo-850));
  border: 1px solid var(--line);
  border-radius: 3px;
}

.paris-page .audience li::before {
  content: '◆';
  position: absolute;
  left: 14px;
  top: 16px;
  color: var(--brass);
  font-size: 10px;
  line-height: 2.2;
}

.paris-page .course {
  background: linear-gradient(180deg, var(--indigo-900), var(--indigo-850));
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 0 0 34px;
  margin-bottom: 28px;
  overflow: hidden;
  box-shadow: 0 22px 54px -32px rgba(0, 0, 0, 0.7);
}

.paris-page .gallery {
  display: grid;
  gap: 2px;
  border-bottom: 1px solid var(--line);
}

.paris-page .gallery.cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.paris-page .gallery.cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.paris-page .gallery.cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.paris-page .gallery + .gallery {
  border-top: none;
}

.paris-page .gallery img {
  width: 100%;
  height: auto;
  display: block;
  transition:
    filter 0.3s,
    transform 0.3s;
  filter: saturate(0.94);
}

.paris-page .gallery img:hover {
  filter: saturate(1.08) brightness(1.03);
  transform: scale(1.02);
}

.paris-page .feature {
  width: 100%;
  height: auto;
  display: block;
  border-bottom: 1px solid var(--line);
}

.paris-page .feature-wide {
  height: auto;
}

.paris-page .course-inner {
  padding: 30px 34px 0;
}

.paris-page .course-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 16px;
}

.paris-page .course-head h3 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: clamp(18px, 4vw, 21px);
  color: var(--brass-soft);
  letter-spacing: 0.04em;
  margin: 0;
}

.paris-page .duration {
  font-family: var(--serif);
  font-style: italic;
  font-size: 17px;
  color: var(--brass);
  white-space: nowrap;
}

.paris-page .spots-label {
  font-family: var(--mincho);
  font-weight: 600;
  color: var(--brass-soft);
  font-size: 14.5px;
  letter-spacing: 0.05em;
  margin: 20px 0 10px;
}

.paris-page .spots {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 22px;
  margin: 0;
  padding: 0;
}

.paris-page .spots li {
  padding-left: 18px;
  position: relative;
  font-size: 14.5px;
  font-weight: 300;
  color: var(--paper);
}

.paris-page .spots li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--brass);
}

.paris-page .notes {
  margin-top: 22px;
  padding: 16px 20px;
  background: rgba(11, 18, 32, 0.35);
  border-left: 2px solid var(--brass);
}

.paris-page .notes p {
  font-family: var(--gothic);
  font-weight: 300;
  font-size: 13.5px;
  margin: 0 0 6px;
  color: var(--paper-dim);
  line-height: 1.85;
}

.paris-page .notes p:last-child {
  margin-bottom: 0;
}

.paris-page .flow {
  counter-reset: step;
  display: grid;
  gap: 0;
}

.paris-page .flow-step {
  display: flex;
  gap: 22px;
  align-items: flex-start;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}

.paris-page .flow-step:last-child {
  border-bottom: none;
}

.paris-page .flow-step .num {
  counter-increment: step;
  font-family: var(--serif);
  font-size: 24px;
  color: var(--brass);
  min-width: 44px;
  line-height: 1.4;
}

.paris-page .flow-step .num::before {
  content: '0' counter(step);
}

.paris-page .flow-step .body h3 {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: 17px;
  color: var(--brass-soft);
  margin: 0 0 4px;
}

.paris-page .flow-step .body p {
  margin: 0;
  font-size: 14.5px;
  font-weight: 300;
  color: var(--paper);
}

.paris-page .price-box {
  background: linear-gradient(180deg, var(--indigo-900), var(--indigo-850));
  color: var(--paper);
  padding: 40px 36px;
  border-radius: 3px;
  text-align: center;
  border: 1px solid var(--line);
  border-top: 3px solid var(--brass);
  box-shadow: 0 22px 54px -32px rgba(0, 0, 0, 0.7);
}

.paris-page .price-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 8px;
}

.paris-page .price-table td {
  padding: 14px 8px;
  border-bottom: 1px solid rgba(201, 169, 110, 0.25);
  color: var(--paper);
}

.paris-page .price-table tr:last-child td {
  border-bottom: none;
}

.paris-page .price-table .dur {
  text-align: left;
  font-family: var(--mincho);
  font-weight: 500;
  letter-spacing: 0.05em;
}

.paris-page .price-table .amt {
  text-align: right;
  font-family: var(--serif);
  font-size: 23px;
  color: var(--brass-soft);
  white-space: nowrap;
}

.paris-page .price-table .extra td {
  border-top: 1px solid rgba(201, 169, 110, 0.4);
  color: rgba(236, 230, 215, 0.75);
}

.paris-page .price-table .extra .amt {
  font-size: 18px;
}

.paris-page .price-note {
  font-size: 13.5px;
  color: rgba(236, 230, 215, 0.7);
  margin: 18px 0 0;
  text-align: center;
  font-weight: 300;
}

.paris-page .price-late {
  font-size: 14.5px;
  color: var(--brass-soft);
  margin: 14px 0 0;
  text-align: center;
  padding-top: 14px;
  border-top: 1px solid rgba(201, 169, 110, 0.25);
}

.paris-page .details {
  margin-top: 24px;
  padding: 36px 30px 32px;
  background: linear-gradient(180deg, var(--indigo-900), var(--indigo-850));
  border: 1px solid var(--line);
  border-radius: 3px;
  box-shadow: 0 22px 54px -32px rgba(0, 0, 0, 0.7);
}

.paris-page .details h2.dt-title {
  text-align: left;
}

.paris-page .dl-row {
  padding: 16px 0;
  border-bottom: 1px solid rgba(198, 166, 98, 0.12);
}

.paris-page .dl-row:last-of-type {
  border-bottom: none;
}

.paris-page .dl-row dt {
  font-family: var(--mincho);
  font-weight: 600;
  font-size: 14.5px;
  letter-spacing: 0.06em;
  color: var(--brass);
  margin: 0 0 4px;
  line-height: 1.7;
}

.paris-page .dl-row dd {
  margin: 0;
  font-family: var(--gothic);
  font-weight: 300;
  font-size: 14.5px;
  letter-spacing: 0.02em;
  line-height: 1.95;
  color: var(--paper);
}

.paris-page .dl-row dd.sub {
  color: var(--brass-soft);
  font-size: 13.5px;
  margin-top: 4px;
}

.paris-page dl.dt-list {
  margin: 8px 0 0;
}

.paris-page .cancel-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 22px;
  font-family: var(--gothic);
  font-weight: 300;
  font-size: 14.5px;
}

.paris-page .cancel-table td {
  padding: 13px 8px;
  border-bottom: 1px solid var(--line);
  color: var(--paper);
  line-height: 1.7;
}

.paris-page .cancel-table td:last-child {
  text-align: right;
  white-space: nowrap;
  padding-left: 14px;
  font-family: var(--serif);
  font-size: 21px;
  color: var(--brass-soft);
  letter-spacing: 0.03em;
}

.paris-page .cancel-table tr:last-child td {
  border-bottom: none;
}

.paris-page .caution {
  background: rgba(28, 42, 74, 0.35);
  border: 1px solid var(--line);
  padding: 28px 30px;
  border-radius: 2px;
}

.paris-page .caution p {
  font-size: 14.5px;
  font-weight: 300;
  margin: 0 0 12px;
  padding-left: 20px;
  position: relative;
  color: var(--paper);
  line-height: 1.9;
}

.paris-page .caution p::before {
  content: '※';
  position: absolute;
  left: 0;
  color: var(--brass);
}

.paris-page .caution p:last-child {
  margin-bottom: 0;
}

.paris-page .cta {
  text-align: center;
  margin-top: 64px;
  padding: 48px 24px 8px;
}

.paris-page .cta .kicker {
  text-align: center;
}

.paris-page .cta h2 {
  display: inline-block;
  text-align: center;
}

.paris-page .cta h2::after {
  left: 50%;
  transform: translateX(-50%);
}

.paris-page .cta p {
  font-family: var(--mincho);
  font-weight: 500;
  font-size: 16px;
  max-width: 520px;
  margin: 0 auto 28px;
  color: var(--paper);
}

.paris-page .cta a {
  display: inline-block;
  font-family: var(--mincho);
  font-weight: 500;
  font-size: 15.5px;
  letter-spacing: 0.14em;
  color: var(--indigo-950);
  text-decoration: none;
  background: var(--brass-soft);
  border: 1px solid var(--brass-soft);
  border-radius: 2px;
  padding: 14px 40px;
  transition:
    background 0.25s,
    color 0.25s,
    border-color 0.25s;
}

.paris-page .cta a:hover,
.paris-page .cta a:focus-visible {
  background: var(--brass);
  border-color: var(--brass);
  outline: none;
}

.paris-page .paris-foot {
  margin-top: 56px;
  text-align: center;
  font-family: var(--serif);
  font-style: italic;
  color: var(--paper-dim);
  font-size: 14.5px;
  letter-spacing: 0.03em;
}

.paris-page .brand-rule {
  width: 44px;
  height: 1px;
  margin: 0 auto 18px;
  background: linear-gradient(90deg, transparent, var(--brass), transparent);
}

@media (max-width: 900px) {
  .paris-page .hero {
    aspect-ratio: auto;
    display: flex;
    flex-direction: column;
  }

  .paris-page .hero picture,
  .paris-page .hero-img {
    position: relative;
    height: auto;
  }

  .paris-page .hero-overlay {
    position: relative;
    padding: 2.2rem 1.4rem 2.4rem;
    background: #0b1220;
  }
}

@media (max-width: 720px) {
  .paris-page .wrap {
    padding: 0 18px 68px;
  }

  .paris-page .hero h1 {
    font-size: 1.9rem;
  }

  .paris-page .hero .tagline {
    font-size: 0.9rem;
    letter-spacing: 0.1em;
  }

  .paris-page .hero .hero-lead {
    font-size: 0.88rem;
    margin-top: 20px;
  }

  .paris-page .course-inner {
    padding: 24px 20px 0;
  }

  .paris-page .details {
    padding: 30px 20px 26px;
  }

  .paris-page .price-box {
    padding: 30px 20px;
  }

  .paris-page .spots {
    grid-template-columns: 1fr;
  }

  .paris-page .gallery.cols-4 {
    grid-template-columns: 1fr 1fr;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .paris-page .hero-overlay,
  .paris-page .intro,
  .paris-page .course,
  .paris-page .price-box,
  .paris-page .details,
  .paris-page .cta {
    animation: paris-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }

  @keyframes paris-rise {
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
