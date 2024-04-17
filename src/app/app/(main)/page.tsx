import { DashBoardPage } from '@/components/dashboard/page'
import { TodoDataTable } from './_components/todo-data-table'
import { TodoUpsertSheet } from './_components/todo-upsert-sheet'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { getUserTodos } from './actions'

export default async function Page() {
  const todos = await getUserTodos()

  return (
    <DashBoardPage>
      <DashBoardPage.Header>
        <DashBoardPage.HeaderTitle>Tarefas</DashBoardPage.HeaderTitle>
        <DashBoardPage.Nav>
          <TodoUpsertSheet>
            <Button variant="outline" size="sm">
              <PlusIcon className="w-4 h-4 mr-3" />
              Add todo
            </Button>
          </TodoUpsertSheet>
        </DashBoardPage.Nav>
      </DashBoardPage.Header>
      <DashBoardPage.Main>
        <TodoDataTable data={todos} />
      </DashBoardPage.Main>
    </DashBoardPage>
  )
}
