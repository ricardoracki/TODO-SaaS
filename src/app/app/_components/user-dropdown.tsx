import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getFallback } from '@/lib/get-fallback'
import {
  LockClosedIcon,
  MixerVerticalIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

interface Props {
  user: Session['user']
}

export function UserDropdown({ user }: Props) {
  if (!user) return

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-full flex items-center justify-between space-x-2 !px-0 hover:bg-transparent"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image as string} alt={user.name as string} />
            <AvatarFallback>
              {getFallback((user.name as string) || 'NN')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left flex-1 space-y-1">
            {user.name && (
              <p className="text-sm font-medium leading-none">{user.name}</p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {user.name && (
              <p className="text-sm font-medium leading-none">{user.name}</p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <MixerVerticalIcon className="w-3 h-4 mr-3" />
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RocketIcon className="w-3 h-4 mr-3" />
            Upgrade
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LockClosedIcon className="w-3 h-4 mr-3" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
