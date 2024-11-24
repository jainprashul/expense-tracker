import { ThemeProvider } from "@/components/theme-provider"
import AppRoutes from "./navigation/AppRoutes"
import { Toaster } from "@/components/ui/sonner"


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
        <Toaster />
    </ThemeProvider>
  )
}

export default App
