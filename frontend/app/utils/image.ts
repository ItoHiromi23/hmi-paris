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

function shouldSkipOptimize(url: string): boolean {
  return (
    url.startsWith('/_ipx/') ||
    url.startsWith('data:') ||
    /\.svg(\?|$)/i.test(url)
  )
}

function ipxUrl(url: string, width: number, quality: number, format = 'webp'): string {
  const remote = sourceUrl(url)
  if (remote === LOCAL_PLACEHOLDER || shouldSkipOptimize(remote)) return remote

  const modifiers = `f_${format},w_${width},q_${quality}`

  if (remote.startsWith('/') && !remote.startsWith('//')) {
    return `/_ipx/${modifiers}${remote}`
  }

  if (isExternalUrl(remote)) {
    return `/_ipx/${modifiers}/${encodeURIComponent(remote)}`
  }

  return remote
}

export function optimizeImageUrl(
  url: string | null | undefined,
  width: number,
  quality = 60,
  format = 'webp',
): string {
  if (!url) return ''
  if (shouldSkipOptimize(url)) return url
  if (isExternalUrl(url) || (url.startsWith('/') && !url.startsWith('//'))) {
    return ipxUrl(url, width, quality, format)
  }
  return sourceUrl(url)
}

export function optSrc(name: string, width: number, format: 'avif' | 'webp' = 'webp'): string {
  return `/images/opt/${name}-${width}.${format}`
}

export function optSrcSet(
  name: string,
  widths: number[],
  format: 'avif' | 'webp' = 'webp',
): string {
  return widths.map((w) => `${optSrc(name, w, format)} ${w}w`).join(', ')
}

export function imageSrcSet(
  url: string | null | undefined,
  widths: number[] = [640, 960, 1280, 1920],
  quality = 60,
  format = 'webp',
): string {
  if (!url || shouldSkipOptimize(url)) return ''
  return widths.map((w) => `${optimizeImageUrl(url, w, quality, format)} ${w}w`).join(', ')
}
