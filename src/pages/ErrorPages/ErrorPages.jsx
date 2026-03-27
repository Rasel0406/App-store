import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import errorVisual from '../../assets/error-404.png'

const ErrorPages = () => {
  const routeError = useRouteError()
  const statusText = routeError?.statusText || 'Oops, page not found!'
  const statusCode = routeError?.status || 404

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#F4F6FB] px-4 text-center text-slate-900">
      <img src={errorVisual} alt="Error" className="w-full max-w-xl" />
      <p className="text-base font-semibold uppercase tracking-[0.4em] text-[#6C4FFF]">Error {statusCode}</p>
      <h1 className="text-4xl font-semibold">{statusText}</h1>
      <p className="max-w-2xl text-lg text-slate-500">
        The page you are looking for is not available. Return to the home page to continue exploring the Hero App Store.
      </p>
      <Link to="/" className="inline-flex items-center justify-center rounded-full bg-[#6C4FFF] px-8 py-3 text-white">
        Go Back!
      </Link>
    </section>
  )
}

export default ErrorPages