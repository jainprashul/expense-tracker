import { ThemeProvider } from "@/components/theme-provider"
import AppRoutes from "./navigation/AppRoutes"
import { Toaster } from "@/components/ui/sonner"
import PWABadge from "./PWABadge"


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
        <Toaster />
        <PWABadge />
    </ThemeProvider>
  )
}

export default App
