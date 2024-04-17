'use client'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { usePathname } from 'next/navigation'
import { HomeIcon, MixerVerticalIcon } from '@radix-ui/react-icons'
import { UserDropdown } from './user-dropdown'
import { Logo } from '@/components/logot'
import { Session } from 'next-auth'

interface Props {
  user: Session['user']
}

export function MainSideBar({ user }: Props) {
  const pathname = usePathname()

  const isActive = (path: string) =>
    path === '/app'
      ? pathname === path
      : pathname.startsWith(path) && pathname !== '/app'

  return (
    <DashboardSidebar>
      <DashboardSidebar.Header>
        <Logo />
      </DashboardSidebar.Header>
      <DashboardSidebar.Main className="flex flex-col flex-grow">
        <DashboardSidebar.Nav>
          <DashboardSidebar.NavMain>
            <DashboardSidebar.NavLink href="/app" active={isActive('/app')}>
              <HomeIcon className="w-3 h-4 mr-3" />
              Tarefas
            </DashboardSidebar.NavLink>
            <DashboardSidebar.NavLink
              href="/app/settings"
              active={isActive('/app/settings')}
            >
              <MixerVerticalIcon className="w-3 h-4 mr-3" />
              Configurações
            </DashboardSidebar.NavLink>
          </DashboardSidebar.NavMain>
        </DashboardSidebar.Nav>

        <DashboardSidebar.Nav className="mt-auto">
          <DashboardSidebar.NavHeader>
            <DashboardSidebar.NavHeaderTitle>
              Links extras
            </DashboardSidebar.NavHeaderTitle>
          </DashboardSidebar.NavHeader>
          <DashboardSidebar.NavMain>
            <DashboardSidebar.NavLink href="/help" active={isActive('/help')}>
              Precisa de ajuda?
            </DashboardSidebar.NavLink>
            <DashboardSidebar.NavLink href="/index" active={isActive('/index')}>
              Site
            </DashboardSidebar.NavLink>
          </DashboardSidebar.NavMain>
        </DashboardSidebar.Nav>
      </DashboardSidebar.Main>
      <DashboardSidebar.Footer>
        <UserDropdown user={user} />
      </DashboardSidebar.Footer>
    </DashboardSidebar>
  )
}
