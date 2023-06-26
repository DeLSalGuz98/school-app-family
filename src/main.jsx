import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//context
import { IdUserContextProvider } from './context/idUserContext.jsx'
import { StudentContextProvider } from './context/studentContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <IdUserContextProvider>
    <StudentContextProvider>
      <App />
    </StudentContextProvider>
  </IdUserContextProvider>
)
