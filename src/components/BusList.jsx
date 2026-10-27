import React, { useState, useMemo } from 'react';
import { formatPKR } from '../utils/formatters';
import { 
  Bus, 
  Clock, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Wifi, 
  Zap, 
  Tv, 
  Coffee, 
  CheckCircle2, 
  TrendingDown, 
  AlertCircle, 
  Filter, 
  ArrowRight,
  UserCheck,
  ChevronRight
} from 'lucide-react';

export default function BusList({ 
  buses, 
  searchParams, 
  onSelectBus 
}) {
  const [filterClass, setFilterClass] = useState('ALL');
  const [onlyFemaleHostess, setOnlyFemaleHostess] = useState(searchParams.femalePreference);
  const [sortBy, setSortBy] = useState('PRICE_ASC');

  // Filter & Sort logic
  const filteredBuses = useMemo(() => {
    return buses.filter(bus => {
      // Filter by origin & destination
      const matchesRoute = 
        bus.origin.toLowerCase() === searchParams.origin.toLowerCase() &&
        bus.destination.toLowerCase() === searchParams.destination.toLowerCase();

      // If user selected specific route that doesn't match mock, keep open or show relevant
      if (!matchesRoute) return false;

      // Filter by bus class
      if (filterClass !== 'ALL' && !bus.busClass.includes(filterClass)) {
        return false;
      }

      // Filter by female hostess
      if (onlyFemaleHostess && !bus.hasFemaleHostess) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_ASC') return a.officialPrice - b.officialPrice;
      if (sortBy === 'PRICE_DESC') return b.officialPrice - a.officialPrice;
      if (sortBy === 'RATING_DESC') return b.operatorRating - a.operatorRating;
      if (sortBy === 'TIME_ASC') return a.departureTime.localeCompare(b.departureTime);
      return 0;
    });
  }, [buses, searchParams, filterClass, onlyFemaleHostess, sortBy]);

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Route & Date Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {searchParams.origin} <span className="text-teal-600">→</span> {searchParams.destination}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
              {filteredBuses.length} Verified Fleets
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Travel Date: <span className="font-semibold text-slate-700">{searchParams.date}</span> • Direct operator schedules with verified terminal counters
          </p>
        </div>

        {/* Pricing Transparency Callout Box */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 flex items-center space-x-3 text-emerald-900 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-emerald-950">Zero Middleman Fee Guarantee</p>
            <p className="text-emerald-800">
              You save approx <span className="font-bold text-emerald-950">Rs. 350 - Rs. 500</span> per seat compared to physical bus agent booths!
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Sorting Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
        
        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 flex items-center mr-1">
            <Filter className="w-3.5 h-3.5 mr-1 text-slate-400" /> Filter:
          </span>

          <button
            onClick={() => setFilterClass('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterClass === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Fleets
          </button>

          <button
            onClick={() => setFilterClass('2+1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterClass === '2+1'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Executive (2+1 Single Seat)
          </button>

          <button
            onClick={() => setFilterClass('2+2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterClass === '2+2'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Business (2+2)
          </button>

          {/* Female Hostess Toggle */}
          <button
            onClick={() => setOnlyFemaleHostess(!onlyFemaleHostess)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              onlyFemaleHostess
                ? 'bg-teal-700 text-white shadow-sm shadow-teal-700/30'
                : 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Dedicated Female Hostess</span>
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="PRICE_ASC">Price: Lowest First</option>
            <option value="PRICE_DESC">Price: Highest First</option>
            <option value="RATING_DESC">Operator Rating (Top)</option>
            <option value="TIME_ASC">Departure: Earliest</option>
          </select>
        </div>
      </div>

      {/* Bus Listings */}
      <div className="mt-6 space-y-4">
        {filteredBuses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
              <Bus className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">No buses found for this exact criteria</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              Try switching your departure or destination city, or toggle off filters to view all verified intercity departures.
            </p>
            <button
              onClick={() => {
                setFilterClass('ALL');
                setOnlyFemaleHostess(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-500 transition-all shadow"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredBuses.map((bus) => {
            const savings = bus.brokerPrice - bus.officialPrice;
            return (
              <div 
                key={bus.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400 hover:shadow-xl transition-all duration-200 overflow-hidden group"
              >
                <div className="p-5 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* Left Column: Operator & Bus Class */}
                    <div className="lg:col-span-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                          {bus.operatorName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                              {bus.operatorName}
                            </h3>
                            <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-600" /> Verified Direct
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <span className="flex items-center text-amber-500 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                              {bus.operatorRating}
                            </span>
                            <span>•</span>
                            <span>{bus.totalReviews} reviews</span>
                            <span>•</span>
                            <span className="font-medium text-slate-600">{bus.busNumber}</span>
                          </div>
                        </div>
                      </div>

                      {/* Class Badge & Safety Highlights */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {bus.busClass}
                        </span>

                        {bus.hasFemaleHostess && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 flex items-center">
                            <UserCheck className="w-3 h-3 mr-1" /> Female Hostess
                          </span>
                        )}

                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {bus.layoutType === '2+1' ? 'Single Solo Seats' : 'Couples / Family'}
                        </span>
                      </div>
                    </div>

                    {/* Middle Column: Schedule & Terminal Info */}
                    <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l lg:border-r border-slate-100 lg:px-6 pt-4 lg:pt-0">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xl font-extrabold text-slate-900">{bus.departureTime}</p>
                          <p className="text-xs font-semibold text-slate-700">{bus.origin}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{bus.originTerminal}</p>
                        </div>

                        <div className="flex flex-col items-center px-4">
                          <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full mb-1">
                            {bus.duration}
                          </span>
                          <div className="w-24 h-0.5 bg-slate-200 relative">
                            <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-teal-600"></div>
                            <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-slate-400"></div>
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1 font-medium">Direct Non-Stop</span>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-extrabold text-slate-900">{bus.arrivalTime}</p>
                          <p className="text-xs font-semibold text-slate-700">{bus.destination}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{bus.destinationTerminal}</p>
                        </div>
                      </div>

                      {/* Amenities Icons */}
                      <div className="flex items-center space-x-3 text-slate-400 text-xs pt-2 border-t border-slate-100/60">
                        {bus.amenities.map((item, i) => (
                          <span key={i} className="text-[11px] text-slate-500 font-medium flex items-center">
                            • {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Transparent Pricing & Book Button */}
                    <div className="lg:col-span-3 text-right flex flex-col justify-between h-full pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      
                      {/* Price breakdown */}
                      <div>
                        <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold mb-1">
                          <TrendingDown className="w-3 h-3" /> Save {formatPKR(savings)} Broker Markup
                        </div>

                        <div className="flex items-baseline justify-end space-x-2">
                          <span className="text-xs text-slate-400 line-through">
                            {formatPKR(bus.brokerPrice)}
                          </span>
                          <span className="text-2xl font-black text-slate-900">
                            {formatPKR(bus.officialPrice)}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500">Official Operator Rate (0% fee)</p>
                      </div>

                      {/* View Seats Button */}
                      <div className="mt-4">
                        <button
                          onClick={() => onSelectBus(bus)}
                          className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center space-x-2 group-hover:scale-102"
                        >
                          <span>Select Seats</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </section>
  );
}
