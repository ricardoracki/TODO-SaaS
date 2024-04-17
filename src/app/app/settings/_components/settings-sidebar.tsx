'use client'

import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { usePathname } from 'next/navigation'

export function SettingsSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <aside>
      <DashboardSidebar.Nav>
        <DashboardSidebar.NavMain>
          <DashboardSidebar.NavLink
            href="/app/settings"
            active={isActive('/app/settings')}
          >
            Meu perfil
          </DashboardSidebar.NavLink>
          <DashboardSidebar.NavLink
            href="/app/settings/theme"
            active={isActive('/app/settings/theme')}
          >
            Aparência
          </DashboardSidebar.NavLink>
          <DashboardSidebar.NavLink
            href="/app/settings/billing"
            active={isActive('/app/settings/billing')}
          >
            Assinatura
          </DashboardSidebar.NavLink>
        </DashboardSidebar.NavMain>
      </DashboardSidebar.Nav>
    </aside>
  )
}
