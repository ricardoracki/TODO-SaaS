export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    plans: {
      free: {
        priceId: 'price_1P5E4EBRmGvBKLGAwaWVxgK4',
        quota: {
          TASKS: 5,
        },
      },
      pro: {
        priceId: 'price_1P5E4SBRmGvBKLGAmcWZnaut',
        quota: {
          TASKS: 100,
        },
      },
    },
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
}
