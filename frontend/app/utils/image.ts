/**
 * Responsive image URLs. External hosts are proxied via Nuxt IPX so the browser
 * never loads third-party cookies (e.g. Unsplash tracking).
 */
function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url)
}

function unsplashParams(url: URL, width: number, quality: number) {
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'crop')
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality))
  url.searchParams.set('fm', 'webp')
  return url.toString()
}

function sourceUrl(url: string, width: number, quality: number): string {
  try {
    const u = new URL(url)
    if (u.hostname.includes('images.unsplash.com')) {
      return unsplashParams(u, width, quality)
    }
  } catch {
    /* keep original */
  }
  return url
}

function ipxUrl(url: string, width: number, quality: number): string {
  const remote = sourceUrl(url, width, quality)
  return `/_ipx/f_webp,w_${width},q_${quality}/${encodeURIComponent(remote)}`
}

export function optimizeImageUrl(
  url: string | null | undefined,
  width: number,
  quality = 70,
): string {
  if (!url) return ''
  if (url.startsWith('/_ipx/') || url.startsWith('data:')) return url
  if (url.startsWith('/') && !url.startsWith('//')) return url
  if (isExternalUrl(url)) return ipxUrl(url, width, quality)
  return sourceUrl(url, width, quality)
}

export function imageSrcSet(
  url: string | null | undefined,
  widths: number[] = [640, 960, 1280, 1920],
  quality = 70,
): string {
  if (!url) return ''
  return widths.map((w) => `${optimizeImageUrl(url, w, quality)} ${w}w`).join(', ')
}
