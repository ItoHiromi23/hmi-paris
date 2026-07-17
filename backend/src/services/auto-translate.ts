/**
 * Lightweight EN ↔ JA translation for Strapi auto-locale sync.
 * Prefers DeepL when DEEPL_AUTH_KEY is set; otherwise uses MyMemory (free, rate-limited).
 */

export type Lang = 'en' | 'ja'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function translateWithDeepL(text: string, from: Lang, to: Lang, authKey: string) {
  const isFree = authKey.endsWith(':fx') || Boolean(process.env.DEEPL_API_URL?.includes('api-free'))
  const base =
    process.env.DEEPL_API_URL || (isFree ? 'https://api-free.deepl.com' : 'https://api.deepl.com')

  const body = new URLSearchParams()
  body.set('auth_key', authKey)
  body.set('text', text)
  body.set('source_lang', from.toUpperCase())
  body.set('target_lang', to.toUpperCase())

  const res = await fetch(`${base}/v2/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) {
    throw new Error(`DeepL ${res.status}: ${await res.text()}`)
  }
  const json = (await res.json()) as { translations?: Array<{ text: string }> }
  return json.translations?.[0]?.text || text
}

async function translateWithMyMemory(text: string, from: Lang, to: Lang) {
  const url = new URL('https://api.mymemory.translated.net/get')
  url.searchParams.set('q', text.slice(0, 450))
  url.searchParams.set('langpair', `${from}|${to}`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`MyMemory ${res.status}`)
  const json = (await res.json()) as {
    responseData?: { translatedText?: string }
    responseStatus?: number
  }
  const out = json.responseData?.translatedText
  if (!out || json.responseStatus !== 200) {
    throw new Error(`MyMemory failed: ${JSON.stringify(json).slice(0, 200)}`)
  }
  // MyMemory sometimes echoes "QUERY LENGTH LIMIT..." — keep original
  if (/QUERY LENGTH LIMIT/i.test(out)) return text
  return out
}

export async function translateText(text: string, from: Lang, to: Lang): Promise<string> {
  const trimmed = String(text || '').trim()
  if (!trimmed || from === to) return text

  const key = process.env.DEEPL_AUTH_KEY || process.env.DEEPL_API_KEY || ''
  try {
    if (key) return await translateWithDeepL(trimmed, from, to, key)
    return await translateWithMyMemory(trimmed, from, to)
  } catch (err) {
    console.warn('[auto-translate] failed, keeping source text:', err)
    return text
  }
}

export async function translateValue(value: unknown, from: Lang, to: Lang): Promise<unknown> {
  if (value == null) return value
  if (typeof value === 'string') return translateText(value, from, to)
  if (Array.isArray(value)) {
    const out: unknown[] = []
    for (const item of value) {
      out.push(await translateValue(item, from, to))
      // gentle rate-limit for free MyMemory
      if (!process.env.DEEPL_AUTH_KEY && !process.env.DEEPL_API_KEY) await sleep(120)
    }
    return out
  }
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>
    // JSON maps like { "0": "…", "1": "…" }
    const keys = Object.keys(obj)
    if (keys.length && keys.every((k) => /^\d+$/.test(k))) {
      const out: Record<string, unknown> = {}
      for (const k of keys) {
        out[k] = await translateValue(obj[k], from, to)
        if (!process.env.DEEPL_AUTH_KEY && !process.env.DEEPL_API_KEY) await sleep(120)
      }
      return out
    }
  }
  return value
}

export async function translateFields(
  data: Record<string, unknown>,
  fields: string[],
  from: Lang,
  to: Lang,
): Promise<Record<string, unknown>> {
  const out: Record<string, unknown> = {}
  for (const field of fields) {
    if (!(field in data) || data[field] == null) continue
    out[field] = await translateValue(data[field], from, to)
    if (!process.env.DEEPL_AUTH_KEY && !process.env.DEEPL_API_KEY) await sleep(80)
  }
  return out
}
