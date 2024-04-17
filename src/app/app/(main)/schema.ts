import { z } from 'zod'

export const upsertTodoSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  doneAt: z.date().optional().nullable(),
})

export const deleteTodoSchema = z.object({
  id: z.string(),
})

export type UpsertTodoSchema = z.infer<typeof upsertTodoSchema>
export type DeleteTodoSchema = z.infer<typeof deleteTodoSchema>
