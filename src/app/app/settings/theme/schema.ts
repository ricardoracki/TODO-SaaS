import { z } from 'zod'

export const appearanceFormSchema = z.object({
  theme: z.string(),
})

export type AppearanceFormValues = z.infer<typeof appearanceFormSchema>
