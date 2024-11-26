
import clsx from "clsx"
import { ChevronLeft } from "lucide-react"
import React from "react"

type Props = {
  title?: string
  onGoBack?: boolean
  children?: React.ReactNode
}

const Header = ({
  title = 'Expense Tracker',
  onGoBack, children
}: Props) => {
  return (
    <header className="flex items-center gap-2 border-b  bg-zinc-800/20 shadow-md  h-16">
      {onGoBack && <GoBack />}
      <h1 className={clsx("text-xl flex-grow font-bold", !onGoBack && "ml-6")}>{title}</h1>
      <div className="flex items-center gap-2">
        {children}
      </div>
    </header>
  )
}

export default React.memo(Header)

function GoBack () {
  if (window.history.length < 2) {
    return
  }
  return (
    <button onClick={() => window.history.back()} className="flex items-center gap-1 bg-zinc-800/20 text-gray-400 p-2 rounded-md">
      <ChevronLeft size={30} />
    </button>
  )
}