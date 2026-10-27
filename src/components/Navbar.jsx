import React from 'react';
import { Shield, Bus, PhoneCall, Database, LayoutDashboard, Ticket, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, myBookingsCount, onOpenBookings }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      {/* Top emergency & trust notification bar */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 px-4 py-1.5 text-xs text-teal-200 border-b border-teal-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3 h-3 mr-1 text-emerald-400" /> 100% Direct Bus Booking
            </span>
            <span className="hidden sm:inline text-slate-300">
              Zero Middleman Commission • Dedicated Solo Female Safe Seating
            </span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <a href="tel:1122" className="flex items-center hover:text-teal-300 transition-colors">
              <PhoneCall className="w-3 h-3 mr-1 text-teal-400" />
              <span className="font-semibold text-white">Emergency 1122</span>
            </a>
            <span className="text-slate-600">|</span>
            <a href="tel:15" className="hover:text-teal-300 transition-colors">
              Police 15
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-teal-300 font-urdu hidden md:inline">سفر محفوظ، کرایہ جائز</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('search')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Safar<span className="text-teal-400">Safe</span>
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-teal-900/60 text-teal-300 border border-teal-500/30 font-medium">
                  PK
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Direct Bus Ticketing & Women Safety
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'search'
                  ? 'bg-slate-800 text-teal-300 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <Bus className="w-4 h-4" />
                <span>Find Buses</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('operator')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'operator'
                  ? 'bg-slate-800 text-teal-300 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Operator Portal</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('schema')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'schema'
                  ? 'bg-slate-800 text-teal-300 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <Database className="w-4 h-4" />
                <span>DB Schema & Architecture</span>
              </span>
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-3">
            {/* My Bookings Button */}
            <button
              onClick={onOpenBookings}
              className="relative px-3.5 py-2 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all flex items-center space-x-2 shadow-sm"
            >
              <Ticket className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">My Tickets</span>
              {myBookingsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-[11px] font-bold text-white flex items-center justify-center">
                  {myBookingsCount}
                </span>
              )}
            </button>

            {/* Role switch toggle for quick testing */}
            <button
              onClick={() => setActiveTab(activeTab === 'operator' ? 'search' : 'operator')}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-md shadow-teal-700/20 transition-all"
            >
              {activeTab === 'operator' ? '← Passenger View' : 'Operator View →'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
