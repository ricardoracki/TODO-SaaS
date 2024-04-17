'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useRef } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Todo } from '../types'
import { upsertTodo } from '../actions'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpsertTodoSchema, upsertTodoSchema } from '../schema'
import { useRouter } from 'next/navigation'

type TodoUpsertProps = {
  children?: React.ReactNode
  defaultValue?: Todo
}

export function TodoUpsertSheet({ children, defaultValue }: TodoUpsertProps) {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const form = useForm<UpsertTodoSchema>({
    resolver: zodResolver(upsertTodoSchema),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await upsertTodo(data)
    toast({
      title: data.id ? 'Tarefa atualizada' : 'Tarefa criada',
      description: data.id
        ? `A tarefa com ID: ${data.id} foi atualizada com sucesso.`
        : 'Sua nova tarefa foi criada com sucesso.',
    })
    router.refresh()
    ref.current?.click()
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8 h-screen">
            <SheetHeader>
              <SheetTitle>Criar/Editar Tarefa</SheetTitle>
              <SheetDescription>
                Faça alterações ou crie sua tarefa aqui. Clique em salvar quando
                terminar.
              </SheetDescription>
            </SheetHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your todo title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este será o nome exibido publicamente para a tarefa
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="">
              {/* <SheetClose asChild> */}
              <Button type="submit">Salvar tarefa</Button>
              {/* </SheetClose> */}
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
