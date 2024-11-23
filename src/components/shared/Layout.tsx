
type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="bg-zinc-900 mx-auto container h-screen max-h-screen flex flex-col">
          {children}
      </div>
  )
}

export default Layout