import Header from './Header'
import Footer from './Footer'

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="bg-gray-900 mx-auto max-w-lg h-screen flex flex-col">
        <Header />
        <main className="flex flex-1 max-h-screen">
          {children}
        </main>
        <Footer />
      </div>
  )
}

export default Layout