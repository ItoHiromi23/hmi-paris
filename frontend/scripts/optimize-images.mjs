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
    src: 'public/images/destinations/giverny/hero.jpg',
    name: 'giverny-hero',
    widths: [640, 960, 1024],
    avif: 42,
    webp: 48,
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
    const img = sharp(input).resize({ width, withoutEnlargement: true })
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
