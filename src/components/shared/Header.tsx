import { useAppSelector } from "@/store/hooks"
import { ChevronLeft } from "lucide-react"

type Props = {}

const Header = (_: Props) => {
  const header = useAppSelector((state) => state.utility.header)
  return (
    <header className="flex items-center gap-2 border-b px-4 bg-zinc-800 h-16">
      {header.goBack && <GoBack />}
      <h1 className="text-2xl font-bold">{header.title}</h1>
    </header>
  )
}

export default Header

function GoBack () {

  if (window.history.length < 2) {
    return
  }
  return (
    <button onClick={() => window.history.back()} className="flex items-center gap-1 bg-zinc-800 text-gray-400 p-2 rounded-md">
      <ChevronLeft size={30} />
    </button>
  )
}