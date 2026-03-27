import React, { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import AppCard from '../../components/AppCard/AppCard'

const Apps = () => {
  const apps = useLoaderData()
  const [searchText, setSearchText] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')

  const results = useMemo(() => {
    const keyword = searchText.trim().toLowerCase()
    const filteredApps = apps.filter((app) => app.title.toLowerCase().includes(keyword))

    return [...filteredApps].sort((a, b) => (
      sortOrder === 'desc' ? b.downloads - a.downloads : a.downloads - b.downloads
    ))
  }, [apps, searchText, sortOrder])

  return (
    <section className="space-y-8 py-10">
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#6C4FFF]">All Apps</p>
        <h1 className="text-4xl font-semibold text-slate-900">Our All Applications</h1>
        <p className="text-lg text-slate-500">Explore all apps on the market developed by us. We code for millions.</p>
      </header>

      <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <p className="text-base font-semibold text-slate-700">({apps.length} Apps Found)</p>
        <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
          <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              className="grow text-sm outline-none"
              placeholder="Search Apps"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </label>
          <select
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="desc">Downloads: High-Low</option>
            <option value="asc">Downloads: Low-High</option>
          </select>
        </div>
      </div>

      {results.length === 0 && (
        <div className="rounded-[32px] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <p className="text-2xl font-semibold text-slate-900">No App Found</p>
          <p className="mt-3 text-slate-500">Try another title or clear the search box to reset the grid.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {results.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Apps
