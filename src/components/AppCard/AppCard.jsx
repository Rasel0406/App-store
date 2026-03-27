import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faStar } from '@fortawesome/free-solid-svg-icons'
import { formatDownloads, formatRating } from '../../utils/formatNumbers.jsx'

const AppCard = ({ app, actionSlot, layout = 'vertical' }) => {
  const navigate = useNavigate()

  if (!app) {
    return null
  }

  const handleNavigate = () => {
    navigate(`/apps/${app.id}`)
  }

  return (
    <article
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleNavigate()
        }
      }}
      className={`group rounded-[32px] border border-slate-200 bg-white p-6 text-center shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-[#7C3AED]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] ${layout === 'horizontal' ? 'flex items-center gap-6 text-left' : ''}`}
    >
      <div
        className={`mx-auto flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[24px] bg-[#E3E6F0] ${layout === 'horizontal' ? 'max-w-[140px]' : ''}`}
      >
        <img
          src={app.image}
          alt={`${app.title} logo`}
          loading="lazy"
          className="h-20 w-20 object-contain opacity-70"
        />
      </div>

      <div className={`space-y-3 text-slate-900 ${layout === 'horizontal' ? 'flex-1 text-left' : ''}`}>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900">{app.title}</h3>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{app.companyName}</p>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-3 text-sm font-semibold ${layout === 'horizontal' ? 'justify-start' : ''}`}>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E6F8ED] px-3 py-1 text-[#15B26B]">
            <FontAwesomeIcon icon={faDownload} className="h-4 w-4" aria-hidden="true" />
            {formatDownloads(app.downloads)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF1E0] px-3 py-1 text-[#F78B2D]">
            <FontAwesomeIcon icon={faStar} className="h-4 w-4" aria-hidden="true" />
            {formatRating(app.ratingAvg)}
          </span>
        </div>

        {actionSlot && (
          <div
            className="pt-2"
            onClick={(event) => event.stopPropagation()}
          >
            {actionSlot}
          </div>
        )}
      </div>
    </article>
  )
}

export default AppCard
