import Header from './Header'
import Footer from './Footer'

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="bg-zinc-900 mx-auto container h-screen max-h-screen flex flex-col">
        <Header />
        <main className="flex flex-1 overflow-y-scroll scrollbar max-h-screen">
          {children}
        </main>
        <Footer />
      </div>
  )
}

export default Layout