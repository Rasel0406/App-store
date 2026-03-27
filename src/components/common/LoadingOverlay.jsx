import React from 'react'

const LoadingOverlay = ({ busy }) => {
  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-300 ${busy ? 'visible opacity-100' : 'invisible opacity-0'}`}
      aria-hidden={!busy}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur" />
      <div className="relative flex h-full items-center justify-center">
        <span className="loading loading-ring loading-lg text-[#6C4FFF]" aria-label="Loading" />
      </div>
    </div>
  )
}

export default LoadingOverlay
