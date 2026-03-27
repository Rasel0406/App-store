import { useCallback, useMemo, useState } from 'react'
import ToastContext from './ToastContextValue.jsx'

let toastCounter = 0

const toneClasses = {
  success: 'bg-success text-success-content',
  info: 'bg-info text-info-content',
  error: 'bg-error text-error-content',
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(({ title, message, tone = 'success', duration = 3200 }) => {
    toastCounter += 1
    const nextToast = {
      id: toastCounter,
      title: title || 'Success',
      message,
      tone,
    }

    setToasts((prev) => [...prev, nextToast])

    setTimeout(() => removeToast(nextToast.id), duration)
  }, [removeToast])

  const value = useMemo(() => ({ addToast }), [addToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[70] space-y-3 w-full max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`alert shadow-xl border border-white/10 backdrop-blur ${toneClasses[toast.tone] || toneClasses.success}`}
          >
            <div>
              <h6 className="font-semibold text-base">{toast.title}</h6>
              {toast.message && (
                <p className="text-sm opacity-80">{toast.message}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
