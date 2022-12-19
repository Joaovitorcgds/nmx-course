import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/global.scss"

import { Routes } from './routes'
import { AuthContextProvider} from './context/AuthProvider'
import { DatabaseContextProvider } from './context/DatabaseProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <DatabaseContextProvider>
        <Routes/>
      </DatabaseContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
