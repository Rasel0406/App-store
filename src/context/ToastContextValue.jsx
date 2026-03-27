import { createContext, useContext } from 'react'

const ToastContext = createContext(null)

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }

  return context
}

export default ToastContext
