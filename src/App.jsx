import { AppProvider } from "./app/context"
import { Layout } from "./app/layout/component"
import { AppContent } from "./app/app-content/component"

export const App = () => {
  return (
    <AppProvider>
      <Layout>
        <AppContent />
      </Layout>
    </AppProvider>
  )
}
