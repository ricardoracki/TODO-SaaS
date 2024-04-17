import Stripe from 'stripe'

import { config } from '@/config'
import { prisma } from '../database'

export const stripe = new Stripe(config.stripe.secretKey as string, {
  apiVersion: '2024-04-10',
  httpClient: Stripe.createFetchHttpClient(),
})

export const getStripeCustomerByEmail = async (email: string) => {
  const customers = await stripe.customers.list({ email })
  return customers.data[0]
}

export const createStripeCustomer = async (input: {
  name?: string
  email: string
}) => {
  let customer = await getStripeCustomerByEmail(input.email)
  if (customer) return customer

  const createdCustomer = await stripe.customers.create({
    email: input.email,
    name: input.email,
  })

  const createdSubscription = await stripe.subscriptions.create({
    customer: createdCustomer.id,
    items: [{ plan: config.stripe.plans.free.priceId }],
  })

  await prisma.user.update({
    where: {
      email: input.email,
    },
    data: {
      stripeCustomerId: createdCustomer.id,
      stripeSubscriptionId: createdSubscription.id,
      stripeSubscriptionStatus: createdSubscription.status,
      stripePriceId: config.stripe.plans.free.priceId,
    },
  })

  return createdCustomer
}

export const createCheckoutSession = async (
  userId: string,
  userEmail: string,
  userStripSubscriptionId: string
) => {
  try {
    let customer = await createStripeCustomer({
      email: userEmail,
    })

    const subscription = await stripe.subscriptionItems.list({
      subscription: userStripSubscriptionId,
      limit: 1,
    })

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: 'http://localhost:3000/app/settings/billing',
      flow_data: {
        type: 'subscription_update_confirm',
        after_completion: {
          type: 'redirect',
          redirect: {
            return_url:
              'http://localhost:3000/app/settings/billing?success=true',
          },
        },
        subscription_update_confirm: {
          subscription: userStripSubscriptionId,
          items: [
            {
              id: subscription.data[0].id,
              price: config.stripe.plans.pro.priceId,
              quantity: 1,
            },
          ],
        },
      },
    })

    return {
      url: session.url,
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error to create checkout session')
  }
}

export const handleProcessWebhookUpdatedSubscription = async (event: {
  object: Stripe.Subscription
}) => {
  const stripeCustomerId = event.object.customer as string
  const stripeSubscriptionId = event.object.id as string
  const stripeSubscriptionStatus = event.object.status
  const stripePriceId = event.object.items.data[0].price.id

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        {
          stripeSubscriptionId,
        },
        {
          stripeCustomerId,
        },
      ],
    },
    select: {
      id: true,
    },
  })

  if (!userExists) {
    throw new Error('user of stripeCustomerId not found')
  }

  await prisma.user.update({
    where: {
      id: userExists.id,
    },
    data: {
      stripeCustomerId,
      stripeSubscriptionId,
      stripeSubscriptionStatus,
      stripePriceId,
    },
  })
}

export const getPlanByPriceId = (priceId: string) => {
  const plans = config.stripe.plans

  const plan = Object.entries(plans).find(
    ([name, config]) => config.priceId === priceId
  )

  if (!plan) {
    throw new Error('Plano não encontrado')
  }

  return {
    name: plan[0],
    quota: plan[1].quota.TASKS,
  }
}

export const getUserQuota = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripePriceId: true,
    },
  })

  if (!user || !user.stripePriceId) {
    throw new Error('User not found')
  }

  const tasks = await prisma.todo.count({
    where: {
      userId,
    },
  })

  const plan = getPlanByPriceId(user.stripePriceId)

  return {
    plan: plan.name,
    quota: {
      TASKS: {
        available: plan.quota,
        current: tasks,
        usage: (tasks / plan.quota) * 100,
      },
    },
  }
}

// export const handleProcessWebhookCheckout = async (event: {
//   object: Stripe.Checkout.Session
// }) => {
//   const clientReferenceId = event.object.client_reference_id as string
//   const stripeSubscriptionId = event.object.subscription as string
//   const stripeCustomerId = event.object.customer as string
//   const checkoutStatus = event.object.status

//   if (checkoutStatus !== 'complete') return

//   if (!clientReferenceId || !stripeSubscriptionId || !stripeCustomerId) {
//     throw new Error(
//       'clientReferenceId, stripeSubscriptionId and stripeCustomerId is required'
//     )
//   }

//   const userExists = await prisma.user.findUnique({
//     where: {
//       id: clientReferenceId,
//     },
//     select: {
//       id: true,
//     },
//   })

//   if (!userExists) {
//     throw new Error('user of clientReferenceId not found')
//   }

//   await prisma.user.update({
//     where: {
//       id: userExists.id,
//     },
//     data: {
//       stripeCustomerId,
//       stripeSubscriptionId,
//     },
//   })
// }

// export const handleProcessWebhookUpdatedSubscription = async (event: {
//   object: Stripe.Subscription
// }) => {
//   const stripeCustomerId = event.object.customer as string
//   const stripeSubscriptionId = event.object.id as string
//   const stripeSubscriptionStatus = event.object.status

//   const userExists = await prisma.user.findFirst({
//     where: {
//       OR: [
//         {
//           stripeSubscriptionId,
//         },
//         {
//           stripeCustomerId,
//         },
//       ],
//     },
//     select: {
//       id: true,
//     },
//   })

//   if (!userExists) {
//     throw new Error('user of stripeCustomerId not found')
//   }

//   await prisma.user.update({
//     where: {
//       id: userExists.id,
//     },
//     data: {
//       stripeCustomerId,
//       stripeSubscriptionId,
//       stripeSubscriptionStatus,
//     },
//   })
// }
