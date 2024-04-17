import { DashBoardPage } from '@/components/dashboard/page'
import { PropsWithChildren } from 'react'
import { SettingsSidebar } from './_components/settings-sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DashBoardPage>
      <DashBoardPage.Header>
        <DashBoardPage.HeaderTitle>Configurações</DashBoardPage.HeaderTitle>
      </DashBoardPage.Header>

      <DashBoardPage.Main>
        <div className="container max-w-screen-lg">
          <div className="grid grid-cols-[16rem_1fr] gap-12">
            <SettingsSidebar />
            <div>{children}</div>
          </div>
        </div>
      </DashBoardPage.Main>
    </DashBoardPage>
  )
}
