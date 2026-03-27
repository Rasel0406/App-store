import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAppStoreIos, faGooglePlay } from '@fortawesome/free-brands-svg-icons'
import AppCard from '../../components/AppCard/AppCard'
import heroVisual from '../../assets/hero.png'

const heroStats = [
  { label: 'Total Downloads', value: '29.6M', sub: '21% More Than Last Month' },
  { label: 'Total Reviews', value: '906K', sub: '46% More Than Last Month' },
  { label: 'Active Apps', value: '132+', sub: '31 More Will Launch' },
]

const storeButtons = [
  {
    id: 'google',
    label: 'Google Play',
    href: 'https://play.google.com/store/apps',
    accent: '#FFD84A',
    icon: faGooglePlay,
  },
  {
    id: 'apple',
    label: 'App Store',
    href: 'https://apps.apple.com/us/genre/ios/id36',
    accent: '#D6E6FF',
    icon: faAppStoreIos,
  },
]

const floatingBadges = [
  { id: 1, symbol: '⏱️', bg: '#0BA5E9', top: '8%', left: '8%' },
  { id: 2, symbol: '✔️', bg: '#1FC16B', top: '35%', left: '-2%' },
  { id: 3, symbol: '⏰', bg: '#FF6B3D', top: '32%', right: '8%' },
  { id: 4, symbol: '🛠️', bg: '#4CC9F0', bottom: '10%', right: '4%' },
  { id: 5, symbol: '⏳', bg: '#605BFF', bottom: '0%', left: '10%' },
]

const Home = () => {
  const topApps = useLoaderData()

  return (
    <div className="space-y-16 py-6">
      <section className="relative overflow-hidden rounded-[48px] bg-[#F4F6FB] px-6 py-14 text-center shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:px-14">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" aria-hidden="true" />
        <div className="relative space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#6C4FFF]">Hero.io</p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            We Build <span className="text-[#6C4FFF]">Productive</span> Apps
          </h1>
          <p className="text-base text-slate-500">
            At <span className="font-semibold text-[#6C4FFF]">HERO.IO</span>, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting.
            Our goal is to turn your ideas into digital experiences that truly make an impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {storeButtons.map((store) => (
              <a
                key={store.id}
                href={store.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: store.accent }}>
                  <FontAwesomeIcon icon={store.icon} className="h-4 w-4" aria-hidden="true" />
                </span>
                {store.label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-md">
          <div className="absolute inset-0 -z-10 rounded-[56px] bg-gradient-to-br from-[#6C4FFF]/35 via-[#4C64FF]/15 to-transparent blur-3xl" />
          <img src={heroVisual} alt="App showcase" className="w-full" />
          {floatingBadges.map((badge) => (
            <span
              key={badge.id}
              className="absolute text-xl"
              style={{ top: badge.top, bottom: badge.bottom, left: badge.left, right: badge.right }}
            >
              <span
                className="inline-flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white shadow-2xl"
                style={{ backgroundColor: badge.bg }}
              >
                {badge.symbol}
              </span>
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-[36px] bg-gradient-to-r from-[#7C3AED] via-[#6A4CFF] to-[#5C6BFF] p-10 text-white shadow-[0_30px_90px_rgba(92,61,255,0.35)]">
        <p className="text-center text-lg font-semibold uppercase tracking-[0.35em]">Trusted By Millions, Built For You</p>
        <div className="mt-10 grid gap-8 text-center sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-sm uppercase tracking-[0.35em] text-white/70">{stat.label}</p>
              <p className="text-5xl font-semibold">{stat.value}</p>
              <p className="text-sm text-white/80">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#6C4FFF]">Trending Apps</p>
          <h2 className="text-4xl font-semibold text-slate-900">Explore All Trending Apps on the Market</h2>
          <p className="text-base text-slate-500">Explore All Trending Apps on the Market developed by us.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {topApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/apps"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#5B7CFF] px-12 py-3 text-base font-semibold text-white shadow-[0_20px_40px_rgba(92,61,255,0.35)]"
          >
            Show All
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
