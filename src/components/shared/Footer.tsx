
type Props = {}

const Footer = (_: Props) => {
  return (
    <nav className="flex items-center justify-center gap-4 h-8 bg-zinc-800 text-white">
      <span>© {new Date().getFullYear()} All rights reserved.</span>
    </nav>
  )
}

export default Footer