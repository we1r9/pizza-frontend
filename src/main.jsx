import ReactDOM from "react-dom/client"
import { App } from "./App"

import "./global.css"

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
