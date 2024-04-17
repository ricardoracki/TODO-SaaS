'use server'

import { auth } from '@/services/auth'
import { UpdateProfileSchema } from './schema'
import { prisma } from '@/services/database'

export async function updateProfile({ email, name }: UpdateProfileSchema) {
  const session = await auth()

  if (!session?.user)
    return {
      error: 'Not Authorized',
      data: null,
    }

  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name,
    },
  })
}
