import { factories } from '@strapi/strapi'

/** Default CRUD — admin / authenticated only (no public permissions). */
export default factories.createCoreRouter('api::order.order')
