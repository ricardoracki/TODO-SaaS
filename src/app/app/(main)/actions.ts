'use server'
import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { DeleteTodoSchema, UpsertTodoSchema } from './schema'

export async function getUserTodos() {
  const session = await auth()

  const todos = await prisma.todo.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return todos
}

export async function upsertTodo(input: UpsertTodoSchema) {
  const session = await auth()
  console.log(session?.user?.id)

  if (!session?.user)
    return {
      error: 'not authorized',
      data: null,
    }

  if (input.id) {
    const updatedTodo = await prisma.todo.findUnique({
      where: {
        id: input.id,
      },
      select: {
        id: true,
      },
    })

    if (!updatedTodo)
      return {
        error: 'Todo is not found',
        data: null,
      }

    const todo = await prisma.todo.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: {
        title: input.title,
        doneAt: input.doneAt,
      },
    })
    return {
      error: null,
      data: todo,
    }
  }

  if (!input.title)
    return {
      error: 'Title is required',
      data: null,
    }

  const todo = await prisma.todo.create({
    data: {
      title: input.title,
      userId: session.user.id!,
    },
  })
  return {
    error: null,
    data: todo,
  }
}

export async function deleteTodo(input: DeleteTodoSchema) {
  const session = await auth()

  if (!session?.user)
    return {
      error: 'Not Authorized',
      data: null,
    }

  const toDelete = await prisma.todo.findUnique({
    where: {
      userId: session?.user?.id,
      id: input.id,
    },
  })

  if (!toDelete) {
    return {
      error: 'Todo not found',
      data: null,
    }
  }

  await prisma.todo.delete({
    where: {
      userId: session?.user?.id,
      id: input.id,
    },
  })

  return {
    error: null,
    data: 'Todo deleted successfuly',
  }
}
