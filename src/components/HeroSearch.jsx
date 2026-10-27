import React, { useState } from 'react';
import { CITIES, POPULAR_ROUTES } from '../data/cities';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRightLeft, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  HeartHandshake, 
  TrendingDown, 
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function HeroSearch({ 
  searchParams, 
  setSearchParams, 
  onSearch 
}) {
  const [localOrigin, setLocalOrigin] = useState(searchParams.origin);
  const [localDestination, setLocalDestination] = useState(searchParams.destination);
  const [localDate, setLocalDate] = useState(searchParams.date);
  const [localPassengers, setLocalPassengers] = useState(searchParams.passengers);
  const [femalePreference, setFemalePreference] = useState(searchParams.femalePreference);

  const handleSwapCities = () => {
    const temp = localOrigin;
    setLocalOrigin(localDestination);
    setLocalDestination(temp);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      origin: localOrigin,
      destination: localDestination,
      date: localDate,
      passengers: localPassengers,
      femalePreference: femalePreference
    });
    onSearch();
  };

  const handleQuickRouteSelect = (route) => {
    setLocalOrigin(route.origin);
    setLocalDestination(route.destination);
    setSearchParams(prev => ({
      ...prev,
      origin: route.origin,
      destination: route.destination
    }));
    onSearch();
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background glowing ambient elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Safety Badge Headline */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-900/60 border border-teal-500/40 text-teal-300 text-xs sm:text-sm font-medium mb-5 shadow-sm shadow-teal-900/40">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Pakistan’s 1st Certified Female-Safe Intercity Booking Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight sm:leading-snug mb-4">
            Safe, Direct & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Fair-Priced</span> Bus Travel for Everyone.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Book tickets directly with verified bus operators. Zero broker fees. Dedicated safe seat selection for solo female commuters and university students.
          </p>
        </div>

        {/* Interactive Search Box */}
        <div className="bg-white text-slate-800 rounded-2xl shadow-2xl p-4 sm:p-6 border border-slate-100/90 relative">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Departure City */}
              <div className="md:col-span-3 relative">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 mr-1" />
                  Departure City
                </label>
                <select
                  value={localOrigin}
                  onChange={(e) => setLocalOrigin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none"
                  required
                >
                  {CITIES.map(city => (
                    <option key={`from-${city.id}`} value={city.name}>
                      {city.name} ({city.province})
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center pt-2 md:pt-4">
                <button
                  type="button"
                  onClick={handleSwapCities}
                  title="Swap Origin & Destination"
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-600 text-slate-600 border border-slate-200 transition-all active:scale-95 shadow-sm"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Destination City */}
              <div className="md:col-span-3 relative">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1" />
                  Destination City
                </label>
                <select
                  value={localDestination}
                  onChange={(e) => setLocalDestination(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none"
                  required
                >
                  {CITIES.filter(c => c.name !== localOrigin).map(city => (
                    <option key={`to-${city.id}`} value={city.name}>
                      {city.name} ({city.province})
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Date */}
              <div className="md:col-span-3 relative">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center">
                  <Calendar className="w-3.5 h-3.5 text-teal-600 mr-1" />
                  Travel Date
                </label>
                <input
                  type="date"
                  value={localDate}
                  onChange={(e) => setLocalDate(e.target.value)}
                  min="2026-09-06"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none"
                  required
                />
              </div>

              {/* Passengers */}
              <div className="md:col-span-2 relative">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center">
                  <Users className="w-3.5 h-3.5 text-teal-600 mr-1" />
                  Seats
                </label>
                <select
                  value={localPassengers}
                  onChange={(e) => setLocalPassengers(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none"
                >
                  <option value={1}>1 Passenger</option>
                  <option value={2}>2 Passengers</option>
                  <option value={3}>3 Passengers</option>
                  <option value={4}>4 Passengers</option>
                </select>
              </div>
            </div>

            {/* Bottom Row: Solo Female Toggle & Submit Button */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Solo Female Seat Preference Toggle */}
              <div className="flex items-center space-x-3 w-full sm:w-auto bg-teal-50/80 p-2.5 sm:px-4 sm:py-2.5 rounded-xl border border-teal-200/80">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={femalePreference}
                    onChange={(e) => setFemalePreference(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs sm:text-sm font-bold text-teal-900">
                      Solo Female Seat Preference
                    </span>
                    <span className="bg-teal-200/70 text-teal-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                      Safe Zone
                    </span>
                  </div>
                  <p className="text-[11px] text-teal-700">
                    Filters fleets with female hostesses & enforces adjacent ladies-only seat rules
                  </p>
                </div>
              </div>

              {/* Submit Search Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center space-x-2 active:scale-98"
              >
                <Search className="w-4 h-4" />
                <span>Search Verified Buses</span>
              </button>
            </div>
          </form>
        </div>

        {/* Popular Route Shortcuts */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300 flex items-center">
            <Sparkles className="w-3.5 h-3.5 text-teal-400 mr-1" /> Quick Routes:
          </span>
          {POPULAR_ROUTES.map((route, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickRouteSelect(route)}
              className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-teal-300 border border-slate-700 transition-all"
            >
              {route.origin} → {route.destination} ({route.duration})
            </button>
          ))}
        </div>

        {/* Value Prop Micro Highlights */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 bg-slate-800/40 border border-slate-700/50 p-3 rounded-xl">
            <TrendingDown className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">0% Middleman Fee</p>
              <p className="text-[11px] text-slate-400">Save Rs. 300-500 per seat</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-800/40 border border-slate-700/50 p-3 rounded-xl">
            <ShieldCheck className="w-5 h-5 text-teal-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Adjacent Lady Safety</p>
              <p className="text-[11px] text-slate-400">Guaranteed privacy</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-800/40 border border-slate-700/50 p-3 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Direct Terminal PNR</p>
              <p className="text-[11px] text-slate-400">Walk straight to boarding</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-800/40 border border-slate-700/50 p-3 rounded-xl">
            <Lock className="w-5 h-5 text-teal-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">EasyPaisa & Raast</p>
              <p className="text-[11px] text-slate-400">Instant fee-free checkout</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
