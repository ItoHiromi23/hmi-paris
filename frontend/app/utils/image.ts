/**
 * Build responsive Unsplash (or CDN) image URLs sized for delivery.
 */
export function optimizeImageUrl(
  url: string | null | undefined,
  width: number,
  quality = 70,
): string {
  if (!url) return ''

  try {
    const u = new URL(url)
    if (u.hostname.includes('images.unsplash.com')) {
      u.searchParams.set('auto', 'format')
      u.searchParams.set('fit', 'crop')
      u.searchParams.set('w', String(width))
      u.searchParams.set('q', String(quality))
      u.searchParams.set('fm', 'webp')
      return u.toString()
    }
  } catch {
    /* keep original */
  }

  return url
}

export function imageSrcSet(
  url: string | null | undefined,
  widths: number[] = [640, 960, 1280, 1920],
): string {
  if (!url) return ''
  return widths.map((w) => `${optimizeImageUrl(url, w)} ${w}w`).join(', ')
}
