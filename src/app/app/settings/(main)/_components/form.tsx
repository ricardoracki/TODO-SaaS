'use client'
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { UpdateProfileSchema, updateProfileSchema } from '../schema'
import { updateProfile } from '../actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Session } from 'next-auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type ProfileFormProps = {
  defaultValues?: Session['user']
}

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const router = useRouter()

  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await updateProfile(data)
    toast({
      title: 'Perfil Atualizado',
      description: 'Seus dados de perfil foram atualizados com sucesso.',
    })

    router.refresh()
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Nome</CardTitle>
            <CardDescription>
              Este será o nome exibido publicamente para o seu perfil.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do seu perfil"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>
              Este campo só pode ser alterado entrando em contato com o
              microsaas@email.com.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Digite o e-mail do seu perfil"
                      readOnly
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting
            ? 'Salvando alterações'
            : 'Salvar alterações'}
        </Button>
      </form>
    </Form>
  )
}
