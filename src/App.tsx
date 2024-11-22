import { ThemeProvider } from "@/components/theme-provider"
import Layout from "./components/shared/Layout"
import AppRoutes from "./navigation/AppRoutes"



function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <AppRoutes />
      </Layout>
    </ThemeProvider>
  )
}

export default App
