import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faDownload, faStar } from '@fortawesome/free-solid-svg-icons'
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
      <section className="space-y-6 rounded-[32px] bg-white p-10 text-center shadow-lg">
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
    {
      id: 'downloads',
      label: 'Downloads',
      value: formatDownloads(app.downloads),
      icon: faDownload,
      accent: '#15B26B',
    },
    {
      id: 'rating',
      label: 'Average Ratings',
      value: formatRating(app.ratingAvg),
      icon: faStar,
      accent: '#F78B2D',
    },
    {
      id: 'reviews',
      label: 'Total Reviews',
      value: formatPlainNumber(app.reviews),
      icon: faComments,
      accent: '#6C4FFF',
    },
  ]

  const ratingValues = app.ratings?.map((rating) => rating.count) || []
  const maxRatingValue = ratingValues.length ? Math.max(...ratingValues) : 0
  const ratingStep = Math.max(1000, Math.ceil(maxRatingValue / 4 / 1000) * 1000)
  const ratingTicks = Array.from({ length: 5 }, (_, index) => ratingStep * index)

  const renderRatingWidth = (value) => {
    if (!maxRatingValue) {
      return '0%'
    }
    return `${(value / maxRatingValue) * 100}%`
  }

  const descriptionParagraphs = app.description
    ? app.description.split('\n').map((paragraph) => paragraph.trim()).filter(Boolean)
    : []

  return (
    <section className="py-8">
      <div className="space-y-12 rounded-[40px] bg-white p-8 shadow-[0_40px_80px_rgba(15,23,42,0.08)]">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <div className="rounded-[32px] border border-slate-200 bg-[#EEF2FB] p-8">
            <img src={app.image} alt={`${app.title} logo`} className="mx-auto w-full max-w-[260px]" />
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-sm text-slate-500">
                Developed by <span className="font-semibold text-[#4C64FF]">{app.companyName}</span>
              </p>
              <h1 className="text-4xl font-semibold text-slate-900">{app.title}</h1>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.id} className="flex items-center gap-4 rounded-[28px] border border-slate-200 px-5 py-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ backgroundColor: metric.accent }}>
                    <FontAwesomeIcon icon={metric.icon} className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm text-slate-500">{metric.label}</p>
                    <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleInstall}
              className="inline-flex items-center justify-center rounded-xl bg-[#14B669] px-8 py-3 text-base font-semibold text-white"
              disabled={installed}
            >
              {installed ? 'Installed' : `Install Now (${app.size} MB)`}
            </button>
          </div>
        </div>

        <div className="space-y-6 border-t border-slate-200 pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#6C4FFF]">Ratings</p>
              <h2 className="text-3xl font-semibold text-slate-900">Review Breakdown</h2>
            </div>
            <span className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700">
              Overall {formatRating(app.ratingAvg)} ★
            </span>
          </div>

          <div className="space-y-5">
            {app.ratings?.map((rating) => (
              <div key={rating.name} className="flex items-center gap-4">
                <span className="w-16 text-sm font-medium text-slate-500">{rating.name}</span>
                <div className="h-4 flex-1 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#FF8A00]"
                    style={{ width: renderRatingWidth(rating.count) }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-400">
            {ratingTicks.map((tick) => (
              <span key={tick}>{String(tick)}</span>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <h3 className="text-2xl font-semibold text-slate-900">Description</h3>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600">
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
