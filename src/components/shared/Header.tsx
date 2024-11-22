
type Props = {}

const Header = (_: Props) => {
  return (
    <header className="flex items-center gap-2 border-b justify-between px-4 bg-gray-800 h-16">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>
    </header>
  )
}

export default Header