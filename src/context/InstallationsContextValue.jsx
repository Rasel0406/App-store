import { createContext, useContext } from 'react'

const InstallationsContext = createContext(null)

export const useInstallations = () => {
  const context = useContext(InstallationsContext)

  if (!context) {
    throw new Error('useInstallations must be used inside InstallationsProvider')
  }

  return context
}

export default InstallationsContext
