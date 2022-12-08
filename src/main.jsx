import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/global.scss"

import { AuthContextProvider} from './context/AuthProvider'
import { Routes } from './Routes'

import { DatabaseContextProvider } from './context/DatabaseProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DatabaseContextProvider>
      <AuthContextProvider>
        <Routes/>
      </AuthContextProvider>
    </DatabaseContextProvider>
  </React.StrictMode>
)
