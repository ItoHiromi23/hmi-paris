/** Responsive image URLs proxied through Nuxt IPX. */
const LOCAL_PLACEHOLDER = '/images/paris-placeholder.svg'

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url)
}

function sourceUrl(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname.includes('images.unsplash.com')) {
      return LOCAL_PLACEHOLDER
    }
  } catch {
    /* keep original */
  }
  return url
}

function ipxUrl(url: string, width: number, quality: number): string {
  const remote = sourceUrl(url)
  if (remote === LOCAL_PLACEHOLDER) return remote
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
  return sourceUrl(url)
}

export function imageSrcSet(
  url: string | null | undefined,
  widths: number[] = [640, 960, 1280, 1920],
  quality = 70,
): string {
  if (!url) return ''
  return widths.map((w) => `${optimizeImageUrl(url, w, quality)} ${w}w`).join(', ')
}
