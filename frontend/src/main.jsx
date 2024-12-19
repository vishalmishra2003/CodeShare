import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from './Context/SocketContext.jsx'
import { KeyProvider } from './Context/KeyContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KeyProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </KeyProvider>
  </StrictMode>,
)
