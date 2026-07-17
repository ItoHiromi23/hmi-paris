import Stripe from 'stripe'

let stripe: Stripe | null = null

export function useStripe() {
  const config = useRuntimeConfig()
  const key = config.stripeSecretKey as string
  if (!key) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Stripe is not configured (STRIPE_SECRET_KEY missing)',
    })
  }
  if (!stripe) {
    stripe = new Stripe(key, {
      apiVersion: '2025-08-27.basil',
    })
  }
  return stripe
}
