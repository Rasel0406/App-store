import React from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './Router/Router.jsx'
import { InstallationsProvider } from './context/InstallationsContext'
import { ToastProvider } from './context/ToastContext'

const App = () => {
  return (
    <InstallationsProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </InstallationsProvider>
  )
}

export default App
