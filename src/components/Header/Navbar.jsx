import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faDownload, faHouse, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import logo from '../../assets/logo.png'

const navItems = [
  { name: 'Home', path: '/', icon: faHouse },
  { name: 'Apps', path: '/apps', icon: faTableCellsLarge },
  { name: 'Installation', path: '/installation', icon: faDownload },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="py-6">
      <div className="flex items-center justify-between gap-6   bg-white width-100% px-6 py-3 shadow-lg">
        <Link to="/" className="flex items-center gap-4">
          <img src={logo} alt="Hero IO" className="h-12 w-12" />
          <div>
            <p className="text-lg font-bold uppercase  text-[#632EE3]">Hero.IO</p>
        
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} className="relative pb-2">
              {({ isActive }) => (
                <>
                  <span className={`flex items-center gap-2 text-sm font-semibold transition ${isActive ? 'text-[#6C4FFF]' : 'text-slate-500 hover:text-slate-900'}`}>
                    <FontAwesomeIcon icon={item.icon} className="h-4 w-4" aria-hidden="true" />
                    {item.name}
                  </span>
                  <span className={`pointer-events-none absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#6C4FFF] transition ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 md:inline-flex"
          >
            <FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4" aria-hidden="true" />
            Contribution
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            className="btn btn-circle btn-ghost text-slate-900 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => (
                  `flex items-center gap-3 text-lg font-semibold ${isActive ? 'text-[#6C4FFF]' : 'text-slate-600'}`
                )}
                onClick={() => setOpen(false)}
                end={item.path === '/'}
              >
                <FontAwesomeIcon icon={item.icon} className="h-4 w-4" aria-hidden="true" />
                {item.name}
              </NavLink>
            ))}
            <a
              href="https://github.com/your-github"
              target="_blank"
              rel=""
              className="rounded-full bg-[#6C4FFF] px-5 py-3 text-center text-white"
            >
              Contribution
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar