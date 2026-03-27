import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInstallations } from '../../context/InstallationsContextValue.jsx'
import { useToast } from '../../context/ToastContextValue.jsx'
import emptyArtwork from '../../assets/error-404.png'
import { formatDownloads, formatRating } from '../../utils/formatNumbers.jsx'

const Installation = () => {
  const { installedApps, uninstallApp } = useInstallations()
  const { addToast } = useToast()
  const [sortOrder, setSortOrder] = useState('desc')

  const displayApps = useMemo(() => (
    [...installedApps].sort((a, b) => (
      sortOrder === 'desc' ? b.size - a.size : a.size - b.size
    ))
  ), [installedApps, sortOrder])

  const handleUninstall = (app) => {
    uninstallApp(app.id)
    addToast({
      title: 'Uninstalled',
      message: `${app.title} has been removed`,
      tone: 'info',
    })
  }

  if (installedApps.length === 0) {
    return (
      <section className="py-16 text-center">
        <div className="mx-auto max-w-xl space-y-6 rounded-[32px] bg-white p-10 shadow-lg">
          <img src={emptyArtwork} alt="Empty state" className="mx-auto w-60" />
          <h1 className="text-4xl font-semibold text-slate-900">No installations yet</h1>
          <p className="text-lg text-slate-500">
            Install an app from the Hero catalog and it will appear here instantly.
          </p>
          <Link to="/apps" className="inline-flex items-center justify-center rounded-full bg-[#6C4FFF] px-8 py-3 text-white">
            Browse apps
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-8 py-10">
      <header className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#6C4FFF]">Installation</p>
          <h1 className="text-3xl font-semibold text-slate-900">Your Installed Apps</h1>
          <p className="text-slate-500">{installedApps.length} Apps Found</p>
        </div>
        <select
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="desc">Sort By Size (High-Low)</option>
          <option value="asc">Sort By Size (Low-High)</option>
        </select>
      </header>

      <div className="space-y-4">
        {displayApps.map((app) => (
          <div key={app.id} className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-[#E9EDF6] p-3">
                <img src={app.image} alt={app.title} className="h-full w-full object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{app.title}</h3>
                <p className="text-sm text-slate-500">{app.companyName}</p>
              </div>
            </div>

            <div className="flex flex-1 flex-wrap items-center gap-6 text-sm font-semibold text-slate-600">
              <span className="text-[#15B26B]">{formatDownloads(app.downloads)} downloads</span>
              <span className="text-[#F78B2D]">★ {formatRating(app.ratingAvg)}</span>
              <span>{app.size} MB</span>
            </div>

            <button
              type="button"
              className="rounded-full bg-[#FF4D6D] px-6 py-2 text-sm font-semibold text-white shadow-sm"
              onClick={() => handleUninstall(app)}
            >
              Uninstall
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Installation
