import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//context
import { IdUserContextProvider } from './context/idUserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <IdUserContextProvider>
    <App />
  </IdUserContextProvider>
)
