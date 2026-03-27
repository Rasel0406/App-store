import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Root from '../pages/Root/Root'
import ErrorPages from '../pages/ErrorPages/ErrorPages'
import Home from '../pages/Home/Home'
import Apps from '../pages/Apps/Apps'
import AppDetails from '../pages/AppDetails/AppDetails'
import Installation from '../pages/Installation/Installation'
import { loadAllApps, loadAppDetails, loadHomeApps } from '../utils/dataService.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPages />,
    children: [
      {
        index: true,
        loader: loadHomeApps,
        element: <Home />,
      },
      {
        path: 'apps',
        loader: loadAllApps,
        element: <Apps />,
      },
      {
        path: 'apps/:id',
        loader: loadAppDetails,
        element: <AppDetails />,
      },
      {
        path: 'installation',
        element: <Installation />,
      },
    ],
  },
])