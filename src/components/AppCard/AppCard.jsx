import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faStar } from '@fortawesome/free-solid-svg-icons'
import { formatDownloads, formatRating } from '../../utils/formatNumbers.jsx'

const imageSurfacePalette = [
  '#C8EE8A',
  '#DDE7F6',
  '#8755B3',
  '#F5D930',
  '#F9C9D5',
  '#D4F3FF',
]

const AppCard = ({ app, actionSlot, layout = 'vertical' }) => {
  const navigate = useNavigate()
  const isHorizontal = layout === 'horizontal'

  if (!app) {
    return null
  }

  const handleNavigate = () => {
    navigate(`/apps/${app.id}`)
  }

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    handleNavigate()
  }

  const stopCardClick = (event) => {
    event.stopPropagation()
  }

  const surfaceColor = imageSurfacePalette[(app.id - 1) % imageSurfacePalette.length]
  const articleLayoutClasses = isHorizontal ? 'flex items-center gap-6 text-left' : ''
  const imageLayoutClasses = isHorizontal ? 'max-w-[180px]' : ''
  const bodyLayoutClasses = isHorizontal ? 'flex-1 pt-0 text-left' : ''
  const statsLayoutClasses = isHorizontal ? 'justify-start' : ''

  return (
    <article
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`group rounded-xl border border-[#D8D8D8] bg-[#EBEBEB] p-5 text-center shadow-[0_6px_14px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-[#8B5CF6]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] ${articleLayoutClasses}`}
    >
      <div
        className={`mx-auto flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-[14px] p-5 ${imageLayoutClasses}`}
        style={{ backgroundColor: surfaceColor }}
      >
        <img
          src={app.image}
          alt={`${app.title} logo`}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <div className={`space-y-3 pt-4 text-slate-900 ${bodyLayoutClasses}`}>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold leading-tight text-slate-900">{app.title}</h3>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{app.companyName}</p>
        </div>

        <div className={`flex flex-wrap items-center justify-between gap-3 text-sm font-semibold ${statsLayoutClasses}`}>
          <span className="inline-flex items-center gap-1 rounded-[10px] bg-[#DDF2E8] px-3 py-1 text-[#11A676]">
            <FontAwesomeIcon icon={faDownload} className="h-4 w-4" aria-hidden="true" />
            {formatDownloads(app.downloads)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-[10px] bg-[#E2DDF9] px-3 py-1 text-[#6942D6]">
            <FontAwesomeIcon icon={faStar} className="h-4 w-4" aria-hidden="true" />
            {formatRating(app.ratingAvg)}
          </span>
        </div>

        {actionSlot ? <div className="pt-2" onClick={stopCardClick}>{actionSlot}</div> : null}
      </div>
    </article>
  )
}

export default AppCard
