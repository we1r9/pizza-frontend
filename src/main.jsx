import ReactDOM from "react-dom/client"
import { App } from "./App"
import { ErrorBoundary } from "./shared/ui/error-boundary/component"

import "./global.css"

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
