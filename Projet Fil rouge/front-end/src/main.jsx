import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/scss/index.scss'
import AppRouter from './Router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
