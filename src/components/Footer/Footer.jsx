import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <footer className="mt-20 rounded-t-[32px] bg-[#03152B] px-6 py-12 text-sm text-slate-300">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Hero IO" className="h-12 w-12" />
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-blue-200">Hero IO</p>
            <p className="text-2xl font-semibold text-white">App Store</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-white">
          <Link to="/" className="hover:text-[#6C4FFF]">Home</Link>
          <Link to="/apps" className="hover:text-[#6C4FFF]">Apps</Link>
          <Link to="/installation" className="hover:text-[#6C4FFF]">Installation</Link>
        </div>

        <div className="flex items-center gap-4 text-white">
          {['X', 'in', 'fb'].map((item) => (
            <span key={item} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30">
              {item === 'X' && (<span className="text-base font-semibold">X</span>)}
              {item === 'in' && (<span className="text-base font-semibold">in</span>)}
              {item === 'fb' && (<span className="text-base font-semibold">f</span>)}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-slate-400">
        Copyright © {new Date().getFullYear()} - All right reserved
      </p>
    </footer>
  )
}

export default Footer