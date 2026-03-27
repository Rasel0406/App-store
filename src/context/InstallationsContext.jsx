import { useCallback, useEffect, useMemo, useState } from 'react'
import InstallationsContext from './InstallationsContextValue.jsx'

const STORAGE_KEY = 'hero-io-installed-apps'
const readFromStorage = () => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    console.error('Failed to read installations from storage', error)
    return []
  }
}

export const InstallationsProvider = ({ children }) => {
  const [installedApps, setInstalledApps] = useState(readFromStorage)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(installedApps))
  }, [installedApps])

  const installApp = useCallback((app) => {
    if (!app || installedApps.some((item) => item.id === app.id)) {
      return false
    }

    setInstalledApps((prev) => [...prev, app])
    return true
  }, [installedApps])

  const uninstallApp = useCallback((appId) => {
    setInstalledApps((prev) => prev.filter((item) => item.id !== appId))
  }, [])

  const isInstalled = useCallback((appId) => (
    installedApps.some((item) => item.id === appId)
  ), [installedApps])

  const value = useMemo(() => ({
    installedApps,
    installApp,
    uninstallApp,
    isInstalled,
  }), [installedApps, installApp, uninstallApp, isInstalled])

  return (
    <InstallationsContext.Provider value={value}>
      {children}
    </InstallationsContext.Provider>
  )
}
