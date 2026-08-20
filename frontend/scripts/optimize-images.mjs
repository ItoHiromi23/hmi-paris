import { mkdir, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public/images/opt')

const jobs = [
  {
    src: 'public/images/home/hero.jpg',
    name: 'hero',
    widths: [640, 750, 960, 1280, 1600],
    avif: 42,
    webp: 48,
  },
  {
    src: 'public/images/home/event-poster.jpg',
    name: 'event-poster',
    widths: [480, 640, 740, 900],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/home/dest-paris.jpg',
    name: 'dest-paris',
    widths: [400, 640, 800],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/home/dest-versailles.jpg',
    name: 'dest-versailles',
    widths: [400, 640, 800],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/home/dest-champagne.jpg',
    name: 'dest-champagne',
    widths: [400, 640, 800],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/home/dest-auvers.jpg',
    name: 'dest-auvers',
    widths: [400, 640, 800],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/home/dest-giverny.jpg',
    name: 'dest-giverny',
    widths: [400, 640, 800],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/home/dest-mont-saint-michel.jpg',
    name: 'dest-mont-saint-michel',
    widths: [400, 640, 800],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/mont-saint-michel/hero.jpg',
    name: 'msm-hero',
    widths: [640, 960, 1280, 1500],
    avif: 42,
    webp: 48,
  },
  {
    src: 'public/images/destinations/paris/hero.jpg',
    name: 'paris-hero',
    widths: [640, 960, 1280, 1600],
    avif: 42,
    webp: 48,
  },
  {
    src: 'public/images/destinations/paris/montmartre-feature.jpg',
    name: 'paris-montmartre-feature',
    widths: [640, 960, 1100],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/paris/fullday-feature.jpg',
    name: 'paris-fullday-feature',
    widths: [640, 960, 1200],
    avif: 48,
    webp: 55,
  },
  ...[
    'marais-01',
    'marais-02',
    'marais-03',
    'marais-04',
    'montmartre-01',
    'montmartre-02',
    'montmartre-03',
    'classics-01',
    'classics-02',
    'classics-03',
    'fullday-01',
    'fullday-02',
    'fullday-03',
    'fullday-04',
    'fullday-05',
  ].map((name) => ({
    src: `public/images/destinations/paris/${name}.jpg`,
    name: `paris-${name}`,
    widths: [400, 640, 800],
    avif: 48,
    webp: 55,
  })),
  {
    src: 'public/images/destinations/giverny/hero.jpg',
    name: 'giverny-hero',
    widths: [640, 960, 1024, 1600],
    avif: 42,
    webp: 48,
    enlarge: true,
  },
  {
    src: 'public/images/destinations/giverny/vetheuil.jpg',
    name: 'giverny-vetheuil',
    widths: [400, 640, 750],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/giverny/pond.jpg',
    name: 'giverny-pond',
    widths: [400, 640, 750],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/giverny/kitchen.jpg',
    name: 'giverny-kitchen',
    widths: [400, 640, 750],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/giverny/bicycle.jpg',
    name: 'giverny-bicycle',
    widths: [400, 640, 750],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/giverny/roche-guyon.jpg',
    name: 'giverny-roche-guyon',
    widths: [400, 640, 750],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/champagne/hero.jpg',
    name: 'champagne-hero',
    widths: [640, 960, 1280, 1600],
    avif: 42,
    webp: 48,
  },
  ...['gallery-01', 'gallery-02', 'gallery-03', 'gallery-04', 'gallery-05'].map((name) => ({
    src: `public/images/destinations/champagne/${name}.jpg`,
    name: `champagne-${name}`,
    widths: name === 'gallery-04' ? [640, 960, 1280] : [400, 640, 900],
    avif: 48,
    webp: 55,
  })),
  {
    src: 'public/images/destinations/versailles/hero.jpg',
    name: 'versailles-hero',
    widths: [640, 960, 1280, 1600],
    avif: 42,
    webp: 48,
  },
  {
    src: 'public/images/destinations/versailles/gallery-glaces.jpg',
    name: 'versailles-glaces',
    widths: [400, 640, 825],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/versailles/gallery-reine.jpg',
    name: 'versailles-reine',
    widths: [400, 640, 825],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/versailles/gallery-jardins.jpg',
    name: 'versailles-jardins',
    widths: [640, 960, 1100],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/versailles/gallery-trianon.jpg',
    name: 'versailles-trianon',
    widths: [640, 960, 1100],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/auvers-sur-oise/hero-church.jpg',
    name: 'auvers-hero',
    widths: [640, 960, 1280, 1500],
    avif: 42,
    webp: 48,
  },
  {
    src: 'public/images/destinations/auvers-sur-oise/wheatfield.jpg',
    name: 'auvers-wheatfield',
    widths: [400, 640, 900],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/auvers-sur-oise/ravoux.jpg',
    name: 'auvers-ravoux',
    widths: [400, 640, 900],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/auvers-sur-oise/gachet.jpg',
    name: 'auvers-gachet',
    widths: [400, 640, 900],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/destinations/auvers-sur-oise/grave.jpg',
    name: 'auvers-grave',
    widths: [640, 960, 1100],
    avif: 48,
    webp: 55,
  },
  ...['01', '02', '03', '04', '05', '06', '07'].map((n) => ({
    src: `public/images/destinations/mont-saint-michel/gallery-${n}.jpg`,
    name: `msm-gallery-${n}`,
    widths: [400, 640, 900],
    avif: 48,
    webp: 55,
  })),
  {
    src: 'public/images/events/arc-about.jpg',
    name: 'arc-about',
    widths: [640, 900, 1200],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/events/arc-highlights.jpg',
    name: 'arc-highlights',
    widths: [640, 900, 1200],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/events/arc-meeting.jpg',
    name: 'arc-meeting',
    widths: [400, 760],
    avif: 48,
    webp: 55,
  },
  {
    src: 'public/images/home/logo-header.png',
    name: 'logo-header',
    widths: [160, 200, 320],
    webp: 78,
  },
  {
    src: 'public/images/home/logo-foot.png',
    name: 'logo-foot',
    widths: [140, 180, 280],
    webp: 78,
  },
]

async function writeIfStale(outFile, sourceMtime, build) {
  try {
    const existing = await stat(outFile)
    if (existing.mtimeMs >= sourceMtime) return
  } catch {
    /* missing */
  }
  const buf = await build()
  await writeFile(outFile, buf)
}

await mkdir(outDir, { recursive: true })

for (const job of jobs) {
  const input = join(root, job.src)
  const sourceMtime = (await stat(input)).mtimeMs
  for (const width of job.widths) {
    const img = sharp(input).resize({
      width,
      withoutEnlargement: !job.enlarge,
    })
    if (job.avif) {
      await writeIfStale(join(outDir, `${job.name}-${width}.avif`), sourceMtime, () =>
        img.clone().avif({ quality: job.avif }).toBuffer(),
      )
    }
    if (job.webp) {
      await writeIfStale(join(outDir, `${job.name}-${width}.webp`), sourceMtime, () =>
        img.clone().webp({ quality: job.webp }).toBuffer(),
      )
    }
  }
  console.log(`optimized ${job.name}`)
}
