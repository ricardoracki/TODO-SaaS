'use server'
import { auth } from '@/services/auth'
import { createCheckoutSession } from '@/services/stripe'
import { redirect } from 'next/navigation'

export async function createCheckoutAction() {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'User not found',
      data: null,
    }
  }

  const checkoutSession = await createCheckoutSession(
    session.user.id,
    session.user.email as string,
    session.user.stripeSubscriptionId as string
  )

  if (checkoutSession.url) redirect(checkoutSession.url)
}
