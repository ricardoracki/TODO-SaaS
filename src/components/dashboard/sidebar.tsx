import { cn } from '@/lib/utils'
import Link from 'next/link'

export type DashboardSidebarGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

function DashboardSidebar({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <aside
      className={cn(
        'border-r border-border flex-col flex space-y-6',
        className
      )}
    >
      {children}
    </aside>
  )
}

function Header({ className, children }: DashboardSidebarGenericProps) {
  return (
    <header className={cn('px-6 py-3 border-b border-border', className)}>
      {children}
    </header>
  )
}

function Main({ className, children }: DashboardSidebarGenericProps) {
  return <main className={cn('px-3 ', className)}>{children}</main>
}

function Nav({ className, children }: DashboardSidebarGenericProps) {
  return <nav className={cn('', className)}>{children}</nav>
}

function NavHeader({ className, children }: DashboardSidebarGenericProps) {
  return <header className={cn('', className)}>{children}</header>
}

function NavHeaderTitle({ className, children }: DashboardSidebarGenericProps) {
  return (
    <div
      className={cn('text-xs uppercase text-muted-foreground ml-3', className)}
    >
      {children}
    </div>
  )
}

function NavMain({ className, children }: DashboardSidebarGenericProps) {
  return <main className={cn('flex flex-col', className)}>{children}</main>
}

type DashboardSidebarNavLinkProps = {
  href: string
  active?: boolean
}

function NavLink({
  className,
  children,
  href,
  active,
}: DashboardSidebarGenericProps<DashboardSidebarNavLinkProps>) {
  return (
    <Link
      href={href}
      className={cn(
        'text-xs px-3 py-2 rounded-md flex items-center',
        active && 'bg-secondary',
        className
      )}
    >
      {children}
    </Link>
  )
}

function NavFooter({ className, children }: DashboardSidebarGenericProps) {
  return <nav className={cn('', className)}>{children}</nav>
}

function Footer({ className, children }: DashboardSidebarGenericProps) {
  return (
    <footer className={cn('p-6 mt-auto border-t border-border', className)}>
      {children}
    </footer>
  )
}

DashboardSidebar.Header = Header
DashboardSidebar.Main = Main
DashboardSidebar.Nav = Nav
DashboardSidebar.NavHeader = NavHeader
DashboardSidebar.NavHeaderTitle = NavHeaderTitle
DashboardSidebar.NavMain = NavMain
DashboardSidebar.NavLink = NavLink
DashboardSidebar.NavFooter = NavFooter
DashboardSidebar.Footer = Footer

export { DashboardSidebar }
