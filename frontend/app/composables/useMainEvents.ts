import type { MainEvent, StrapiMainEvent } from '~/types/event'
import type { StrapiMedia } from '~/types/package'
import { computeAvailability } from '~/types/package'
import { fetchAvailability } from '~/composables/useAvailability'

const CAPACITY_DEFAULTS = {
  bookingUnlimited: false,
  slotsTotal: 20,
  slotsSold: 0,
  available: 20,
  soldOut: false,
}

const FALLBACK_EVENTS: MainEvent[] = [
  {
    id: 'fallback-arc',
    title: '凱旋門賞 2026 観戦バスツアー',
    slug: 'arc-de-triomphe-2026',
    label: '混乗バスツアー',
    badgeText: '2026 10.4 SUN 凱旋門賞観戦バスツアー',
    category: '季節限定・特別イベント',
    summary:
      'パリ・ロンシャン競馬場で開催される第105回凱旋門賞。世界トップクラスの騎手と名馬が競うヨーロッパ競馬の華やかな一日を、日本語ガイドとともに。',
    description:
      'パリ郊外のロンシャン競馬場で開催される凱旋門賞（Qatar Prix de l’Arc de Triomphe）を観戦する特別バスツアーです。ヨーロッパ競馬ならではの格式ある雰囲気と、出走馬・騎手の迫力を間近で体験できます。初めての競馬観戦でも安心の日本語ガイド同行付きです。',
    inclusions: [
      'ロンシャン競馬場までの往復送迎バス',
      '立ち見チケット（Pelouse de l’Arrivée）',
      'パドック入場',
      '競馬場マップ・投票方法の説明資料',
      '日本語ガイド同行',
    ],
    heroImageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80',
    eventDate: '2026-10-04',
    venue: 'ロンシャン競馬場（パリ）',
    priceFrom: 180,
    currency: 'EUR',
    ctaLabel: '詳細を見る',
    featured: true,
    sortOrder: 1,
    notes: '天候・出走状況により内容が変更となる場合があります。',
    ...CAPACITY_DEFAULTS,
  },
  {
    id: 'fallback-xmas',
    title: 'パリ・クリスマスイルミネーション 夜の散策',
    slug: 'paris-christmas-lights-2026',
    label: '季節限定ツアー',
    badgeText: '2026 12月 クリスマスシーズン',
    category: '季節限定・特別イベント',
    summary:
      'シャンゼリゼ通りやオペラ座周辺など、パリの冬を彩る光の名所を日本語ガイドとゆっくり巡ります。',
    description:
      '年末のパリは街全体が光で包まれます。クリスマスマーケットやショーウィンドウを楽しみながら、安全に夜の散策をご案内します。',
    inclusions: [
      '日本語ガイド同行',
      'シャンゼリゼ・オペラ周辺の名所巡り',
      'ホットドリンクご休憩（店舗による）',
      '集合場所までのご案内資料',
    ],
    heroImageUrl:
      'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?auto=format&fit=crop&w=1600&q=80',
    eventDate: '2026-12-15',
    venue: 'パリ市内',
    priceFrom: 95,
    currency: 'EUR',
    ctaLabel: '詳細を見る',
    featured: true,
    sortOrder: 2,
    notes: '開催日は天候・混雑状況により調整する場合があります。',
    ...CAPACITY_DEFAULTS,
  },
]

function mediaUrl(strapiUrl: string, media?: StrapiMedia | null): string | null {
  if (!media?.url) return null
  if (media.url.startsWith('http')) return media.url
  return `${strapiUrl}${media.url}`
}

function mapEvent(strapiUrl: string, item: StrapiMainEvent): MainEvent {
  const capacity = computeAvailability({
    bookingUnlimited: item.bookingUnlimited,
    slotsTotal: item.slotsTotal ?? 20,
    slotsSold: item.slotsSold ?? 0,
  })

  return {
    id: item.documentId || item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    label: item.label || '',
    badgeText: item.badgeText || '',
    category: item.category || '季節限定・特別イベント',
    summary: item.summary || '',
    description: item.description || '',
    inclusions: Array.isArray(item.inclusions) ? item.inclusions : [],
    heroImageUrl: mediaUrl(strapiUrl, item.heroImage) || item.heroImageUrl || null,
    eventDate: item.eventDate || null,
    venue: item.venue || '',
    priceFrom: item.priceFrom != null ? Number(item.priceFrom) : null,
    currency: item.currency || 'EUR',
    ctaLabel: item.ctaLabel || '詳細を見る',
    featured: Boolean(item.featured),
    sortOrder: item.sortOrder ?? 0,
    notes: item.notes || '',
    bookingUnlimited: capacity.bookingUnlimited,
    slotsTotal: capacity.slotsTotal,
    slotsSold: capacity.slotsSold,
    available: capacity.available,
    soldOut: capacity.soldOut,
  }
}

/** 日本語向け：例）2026年10月4日（日） */
export function formatJaDate(iso: string | null | undefined) {
  if (!iso) return ''
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  const weekdays = ['日', '月', '火', '水', '木', '金', '土']
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${weekdays[d.getDay()]}）`
}

export function useMainEvents() {
  const config = useRuntimeConfig()
  const strapiUrl = String(config.public.strapiUrl || 'http://127.0.0.1:1337')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')
  const { formatPrice } = useTourPackages()

  async function fetchEvents(): Promise<MainEvent[]> {
    try {
      const data = await $fetch<{ data: StrapiMainEvent[] }>(`${strapiUrl}/api/main-events`, {
        query: {
          populate: 'heroImage',
          'filters[publishedAt][$notNull]': 'true',
          sort: 'sortOrder:asc,eventDate:asc',
        },
      })

      if (!data?.data) return FALLBACK_EVENTS
      return Promise.all(
        data.data.map(async (item) => {
          const base = mapEvent(strapiUrl, item)
          const live = await fetchAvailability('event', base.slug, strapiUrl)
          if (!live) return base
          return {
            ...base,
            bookingUnlimited: live.bookingUnlimited,
            slotsTotal: live.slotsTotal,
            slotsSold: live.slotsSold,
            available: live.available,
            soldOut: live.soldOut,
          }
        }),
      )
    } catch (err) {
      console.error('[events] Failed to load from Strapi — using fallback', err)
      return FALLBACK_EVENTS
    }
  }

  async function fetchEventBySlug(slug: string): Promise<MainEvent | null> {
    try {
      const data = await $fetch<{ data: StrapiMainEvent[] }>(`${strapiUrl}/api/main-events`, {
        query: {
          'filters[slug][$eq]': slug,
          populate: '*',
        },
      })

      const item = data?.data?.[0]
      if (!item) return null

      const mapped = mapEvent(strapiUrl, item)
      const live = await fetchAvailability('event', slug, strapiUrl)
      if (!live) return mapped
      return {
        ...mapped,
        bookingUnlimited: live.bookingUnlimited,
        slotsTotal: live.slotsTotal,
        slotsSold: live.slotsSold,
        available: live.available,
        soldOut: live.soldOut,
      }
    } catch {
      return FALLBACK_EVENTS.find((e) => e.slug === slug) || null
    }
  }

  return {
    fetchEvents,
    fetchEventBySlug,
    formatJaDate,
    formatPrice,
  }
}
