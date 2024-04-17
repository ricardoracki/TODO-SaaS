'use client'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'

export function AuthForm() {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn('nodemailer', { email: data.email, redirect: false })
      toast({
        title: 'Link enviado',
        description: 'Verifique seu e-mail e clique no link que foi enviado',
      })
    } catch (e) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro. Por favor, tente novamente',
      })
    }
  })

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Magic Link</CardTitle>
        <CardDescription>
          Insira seu e-mail abaixo para fazer login na sua conta
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              {...form.register('email')}
            />
          </div>
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? 'Sending Magic link'
              : 'Send Magic Link'}
          </Button>
        </CardContent>
      </form>
      <CardFooter>
        <Button className="w-full" variant="ghost">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Voltar para o Login
        </Button>
      </CardFooter>
    </Card>
  )
}

function ArrowLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}
