/**
 * Custom order routes — availability (public) + sessions + sync (secret header).
 */
export default {
  routes: [
    {
      method: 'GET',
      path: '/inventory/availability',
      handler: 'order.availability',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/inventory/sessions',
      handler: 'order.sessions',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/inventory/session',
      handler: 'order.sessionAvailability',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/orders/sync',
      handler: 'order.sync',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
}
