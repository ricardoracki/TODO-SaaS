import { cn } from '@/lib/utils'

export type DashBoardPageGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

function DashBoardPage({ className, children }: DashBoardPageGenericProps) {
  return <section className={cn('h-screen', className)}>{children}</section>
}

function Header({ className, children }: DashBoardPageGenericProps) {
  return (
    <header
      className={cn(
        'px-6 py-3 border-b border-border flex items-center justify-between',
        className
      )}
    >
      {children}
    </header>
  )
}

function HeaderTitle({ className, children }: DashBoardPageGenericProps) {
  return (
    <h1 className={cn('text-md text-muted-foreground uppercase', className)}>
      {children}
    </h1>
  )
}

function Nav({ className, children }: DashBoardPageGenericProps) {
  return <nav className={cn('', className)}>{children}</nav>
}

function Main({ className, children }: DashBoardPageGenericProps) {
  return <main className={cn('p-6', className)}>{children}</main>
}

DashBoardPage.Header = Header
DashBoardPage.HeaderTitle = HeaderTitle
DashBoardPage.Nav = Nav
DashBoardPage.Main = Main

export { DashBoardPage }
