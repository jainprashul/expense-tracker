
import clsx from "clsx"
import { ChevronLeft, LogOutIcon, Settings2Icon, User } from "lucide-react"
import React from "react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { useAppSelector } from "@/store/hooks"
import Logo from "@/assets/logo.svg"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authService } from "@/services/authService"
import { MenuItem } from "@/types/Menu"
import { useNavigate } from "react-router-dom"
import { PROFILE, SETTINGS } from "@/navigation/route"


type Props = {
  title?: string | React.ReactNode
  onGoBack?: boolean
  children?: React.ReactNode
}

const Header = ({
  title = <span className="flex gap-2 items-center">
    <img src={Logo} alt="Logo" className="h-7" /> Transact
  </span>,
  onGoBack, children
}: Props) => {

  return (
    <header className="flex items-center gap-2 border-b px-4 bg-secondary/20 shadow-md  h-16">
      {onGoBack && <GoBack />}
      <h1 className={clsx("text-xl flex-grow font-bold", !onGoBack && "ml-2")}>{title}</h1>
      <div className="flex items-center gap-2">
        {children}
        <AvatarMenu />

      </div>
    </header>
  )
}

export default React.memo(Header)

function GoBack() {
  if (window.history.length < 2) {
    return
  }
  return (
    <button onClick={() => window.history.back()} className="flex items-center gap-1 bg-secondary/20 text-gray-400 p-2 rounded-md">
      <ChevronLeft size={30} />
    </button>
  )
}




function AvatarMenu() {
  const user = useAppSelector(s => s.auth.user)
  const navigate = useNavigate()
  console.log(user)

  const menuList: MenuItem[] = [
    {
      name: 'Profile',
      icon: <User />,
      onClick: () => {
        navigate(PROFILE)
      }
    },
    {
      name: 'Settings',
      icon: <Settings2Icon />,
      onClick: () => {
        navigate(SETTINGS)
      },
      separatorBelow: true
    },
    {
      name: <span className="text-red-600">Log out</span>,
      icon: <LogOutIcon />,
      onClick: () => {
        authService.logout()
      }
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>
            <User size={30} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuList.map((item, index) => {
          if (item.hide) return null
          return (
            <div key={index}>
              {item.separatorAbove && <DropdownMenuSeparator />}
              <DropdownMenuItem onClick={item.onClick}>
                {item.icon} {item.name}
              </DropdownMenuItem>
              {item.separatorBelow && <DropdownMenuSeparator />}
            </div>
          )
        })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
