import React from 'react'
import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom'
import Navbar from '../../components/Header/Navbar'
import Footer from '../../components/Footer/Footer'
import LoadingOverlay from '../../components/common/LoadingOverlay'

const Root = () => {
  const navigation = useNavigation()
  const busy = navigation.state === 'loading'

  return (
    <div className="min-h-screen bg-[#F4F6FB] text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-white via-white/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(108,79,255,0.12),transparent_45%)]" />
      </div>

      <div className="mx-auto flex min-h-screen w-full flex-col px-4 sm:px-10 lg:px-16">
        <Navbar />
        <main className="flex-1 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>

      <LoadingOverlay busy={busy} />
      <ScrollRestoration />
    </div>
  )
}

export default Root