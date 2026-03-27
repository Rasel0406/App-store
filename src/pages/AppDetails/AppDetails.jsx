import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faDownload, faStar } from '@fortawesome/free-solid-svg-icons'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useInstallations } from '../../context/InstallationsContextValue.jsx'
import { useToast } from '../../context/ToastContextValue.jsx'
import { formatDownloads, formatPlainNumber, formatRating } from '../../utils/formatNumbers.jsx'
import errorArtwork from '../../assets/error-404.png'

const AppDetails = () => {
  const app = useLoaderData()
  const { installApp, isInstalled } = useInstallations()
  const { addToast } = useToast()

  const installed = app ? isInstalled(app.id) : false

  const handleInstall = () => {
    if (!app) {
      return
    }

    if (installed) {
      addToast({
        title: 'Already installed',
        message: `${app.title} is already in My Installation`,
        tone: 'info',
      })
      return
    }

    const success = installApp(app)
    if (success) {
      addToast({
        title: 'Installed',
        message: `${app.title} has been added to My Installation`,
      })
    }
  }

  if (!app) {
    return (
      <section className="space-y-6 rounded-4xl bg-white p-10 text-center shadow-lg">
        <img src={errorArtwork} alt="Not found" className="mx-auto w-full max-w-md" />
        <h1 className="text-4xl font-semibold text-slate-900">Opps!! App Not Found</h1>
        <p className="text-lg text-slate-500">
          The app you are requesting is not found on our system. Please try another app.
        </p>
        <Link to="/apps" className="inline-flex items-center justify-center rounded-full bg-[#6C4FFF] px-8 py-3 text-white">
          Go Back!
        </Link>
      </section>
    )
  }

  const metrics = [
    { id: 'downloads', label: 'Downloads', value: formatDownloads(app.downloads), icon: faDownload },
    { id: 'rating', label: 'Average Ratings', value: formatRating(app.ratingAvg), icon: faStar },
    { id: 'reviews', label: 'Total Reviews', value: formatPlainNumber(app.reviews), icon: faComments },
  ]

  const ratings = app.ratings ?? []
  const ratingValues = ratings.map((rating) => rating.count)
  const maxRatingValue = ratingValues.length > 0 ? Math.max(...ratingValues) : 0
  const ratingStep = Math.max(1000, Math.ceil(maxRatingValue / 4 / 1000) * 1000)
  const ratingTicks = Array.from({ length: 5 }, (_, index) => ratingStep * index)
  const ratingDomainMax = ratingTicks[ratingTicks.length - 1] || ratingStep

  const descriptionParagraphs = (app.description ?? '')
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <section className="py-6">
      <div className="space-y-8 border border-slate-200 bg-white px-8 py-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[420px_1fr] lg:items-start">
          <div className="rounded-[10px] border border-slate-200 bg-white p-3 shadow-sm">
            <img src={app.image} alt={`${app.title} logo`} className="h-60 w-full rounded-lg object-contain" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2 border-b border-[#6C4FFF] pb-4">
              <h1 className="text-5xl font-semibold leading-tight text-[#2C2F67] sm:text-4xl">{app.title}</h1>
              <p className="text-[20px] text-slate-700 sm:text-lg">
                Developed by <span className="font-semibold text-[#5D43E8]">{app.companyName}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-0">
              {metrics.map((metric) => (
                <div key={metric.id} className="flex min-w-45 items-center gap-4 border-slate-200 px-4 py-2 sm:not-last:border-r">
                  <div>
                    <p className="text-sm text-slate-500">{metric.label}</p>
                    <p className="text-5xl font-bold leading-none text-slate-900 sm:text-4xl">{metric.value}</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#6C4FFF] text-white">
                    <FontAwesomeIcon icon={metric.icon} className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleInstall}
              className="inline-flex items-center justify-center rounded-lg bg-[#10C98D] px-10 py-3 text-4xl font-semibold text-white shadow-[0_8px_20px_rgba(16,201,141,0.25)] sm:text-2xl"
              disabled={installed}
            >
              {installed ? 'Installed' : `Install Now (${app.size} MB)`}
            </button>
          </div>
        </div>

        <div className="space-y-6 border-t border-slate-200 pt-6">
          <h2 className="text-5xl font-semibold text-[#2C2F67] sm:text-4xl">Ratings</h2>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratings} layout="vertical" margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis
                  type="number"
                  domain={[0, ratingDomainMax]}
                  ticks={ratingTicks}
                  tick={{ fill: '#64748b', fontSize: 14 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: '#64748b', fontSize: 16 }}
                  axisLine={false}
                  tickLine={false}
                  width={70}
                />
                <Bar dataKey="count" fill="#10C98D" background={{ fill: '#e2e8f0' }} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-2 text-xl font-semibold text-[#10C98D] sm:text-base">
            <span className="h-3 w-3 bg-[#10C98D]" aria-hidden="true" />
            <span>count</span>
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-5xl font-semibold text-[#2C2F67] sm:text-4xl">Description</h3>
          <div className="space-y-4 text-[28px] leading-relaxed text-slate-600 sm:text-base">
            {descriptionParagraphs.length > 0 ? (
              descriptionParagraphs.map((paragraph, index) => <p key={`desc-${index}`}>{paragraph}</p>)
            ) : (
              <p>{app.description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppDetails
