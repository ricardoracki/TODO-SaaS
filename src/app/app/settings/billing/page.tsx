import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { createCheckoutAction } from './actions'
import { auth } from '@/services/auth'
import { getUserQuota } from '@/services/stripe'

export default async function Page() {
  const session = await auth()
  const { plan, quota } = await getUserQuota(session?.user?.id as string)

  return (
    <form action={createCheckoutAction}>
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Planos de Uso</CardTitle>
          <CardDescription>
            Você está atualmente no plano{' '}
            <span className="font-bold uppercase">{plan}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <header className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                {quota.TASKS.current}/{quota.TASKS.available}
              </span>
              <span className="text-muted-foreground text-sm">
                {quota.TASKS.usage}%
              </span>
            </header>
            <main>
              <Progress value={quota.TASKS.usage} />
            </main>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between borter-t pt-6">
          <span>Para um limite maior, assine o PRO</span>
          <Button type="submit">Assinar por R$9/mês</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
