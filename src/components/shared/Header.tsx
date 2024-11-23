
import { ChevronLeft } from "lucide-react"

type Props = {
  title?: string
  onGoBack?: boolean
}

const Header = ({
  title = 'Expense Tracker',
  onGoBack,
}: Props) => {
  return (
    <header className="flex items-center gap-2 border-b px-4 bg-zinc-800 h-16">
      {onGoBack && <GoBack />}
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  )
}

export default Header

function GoBack () {

  console.log(window.history)

  if (window.history.length < 2) {
    return
  }
  return (
    <button onClick={() => window.history.back()} className="flex items-center gap-1 bg-zinc-800 text-gray-400 p-2 rounded-md">
      <ChevronLeft size={30} />
    </button>
  )
}