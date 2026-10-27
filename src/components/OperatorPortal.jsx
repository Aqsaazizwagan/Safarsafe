import React, { useState } from 'react';
import { formatPKR } from '../utils/formatters';
import { 
  LayoutDashboard, 
  Bus, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  DollarSign, 
  QrCode, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  Edit3, 
  Plus, 
  Check, 
  X,
  Search,
  Download
} from 'lucide-react';

export default function OperatorPortal({ buses, setBuses }) {
  const [selectedBusId, setSelectedBusId] = useState(buses[0]?.id || '');
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [editingPriceBusId, setEditingPriceBusId] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [manifestSearch, setManifestSearch] = useState('');

  // Selected bus object
  const activeBus = buses.find(b => b.id === selectedBusId) || buses[0];

  // Mock passenger manifest for the selected bus
  const [manifest, setManifest] = useState([
    { seat: 1, name: 'Zainab Bibi', gender: 'female', cnic: '42201-1123456-8', phone: '0300-8812345', gateway: 'EasyPaisa', amount: 1200, status: 'Boarded' },
    { seat: 2, name: 'Sana Tariq', gender: 'female', cnic: '42101-7788990-2', phone: '0312-3344556', gateway: 'Raast', amount: 1200, status: 'Reserved' },
    { seat: 3, name: 'Fatima Noor', gender: 'female', cnic: '42301-4455667-4', phone: '0333-9988776', gateway: 'JazzCash', amount: 1200, status: 'Boarded' },
    { seat: 4, name: 'Hamza Farooq', gender: 'male', cnic: '42201-9988112-1', phone: '0345-2211443', gateway: 'Card', amount: 1200, status: 'Reserved' },
    { seat: 7, name: 'Muhammad Ali', gender: 'male', cnic: '42101-5544332-9', phone: '0301-7766554', gateway: 'EasyPaisa', amount: 1200, status: 'Boarded' },
    { seat: 12, name: 'Mariam Siddiqui', gender: 'female', cnic: '42201-6655443-6', phone: '0321-4433221', gateway: 'Raast', amount: 1200, status: 'Reserved' }
  ]);

  const handleToggleBoarding = (seatNum) => {
    setManifest(prev => prev.map(item => {
      if (item.seat === seatNum) {
        return {
          ...item,
          status: item.status === 'Boarded' ? 'Reserved' : 'Boarded'
        };
      }
      return item;
    }));
  };

  const handleUpdatePrice = (busId) => {
    const val = Number(newPrice);
    if (!isNaN(val) && val > 0) {
      setBuses(prev => prev.map(b => {
        if (b.id === busId) {
          return {
            ...b,
            officialPrice: val,
            brokerPrice: Math.round(val * 1.25)
          };
        }
        return b;
      }));
      setEditingPriceBusId(null);
      setNewPrice('');
    }
  };

  const handleRaastPayout = () => {
    setPayoutRequested(true);
    setTimeout(() => {
      setPayoutRequested(false);
      alert('Payout of Rs. 142,500 successfully transferred to your Raast Corporate IBAN (PK36RAAS0000001234567890). SBP Settlement Ref: RAAST-SETTLE-89104.');
    }, 1500);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-teal-400" />
              Verified Operator Terminal Partner
            </span>
            <span className="text-slate-400 text-xs">• Faisal Movers & Daewoo Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Bus Operator & Fleet Administration
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time seat occupancy, dynamic pricing controls, female safety audits, and zero-fee SBP Raast payouts.
          </p>
        </div>

        {/* Payout Action Card */}
        <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
          <div>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              Settlement Balance
            </p>
            <p className="text-2xl font-black text-emerald-400">
              {formatPKR(142500)}
            </p>
            <p className="text-[10px] text-slate-400">Zero Middleman Deductions</p>
          </div>

          <button
            onClick={handleRaastPayout}
            disabled={payoutRequested}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold shadow-md shadow-teal-600/20 transition-all flex items-center justify-center space-x-2"
          >
            <QrCode className="w-4 h-4" />
            <span>{payoutRequested ? 'Settling via Raast...' : 'Withdraw via Raast'}</span>
          </button>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Gross Sales */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Today's Gross Sales</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{formatPKR(482500)}</p>
          <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +18.4% vs last week
          </p>
        </div>

        {/* KPI 2: Booked Seats */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Tickets Issued</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">194 Commuters</p>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Avg Occupancy: <span className="font-bold text-slate-800">88.4%</span>
          </p>
        </div>

        {/* KPI 3: Female Safety Index */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Female Safety Index</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">100% Compliant</p>
          <p className="text-xs text-teal-700 font-semibold mt-1">
            Zero adjacent male violations
          </p>
        </div>

        {/* KPI 4: Active Departures */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Fleets</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bus className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{buses.length} Schedules</p>
          <p className="text-xs text-slate-500 font-medium mt-1">
            All GPS units online & tracked
          </p>
        </div>

      </div>

      {/* Main Operator Workstation: Route Manager & Real-time Manifest */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 5 Cols: Routes & Live Pricing Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Active Bus Departures
                </h3>
                <p className="text-xs text-slate-500">Select a schedule to view live manifest</p>
              </div>
            </div>

            <div className="space-y-3">
              {buses.map(bus => {
                const isSelected = bus.id === activeBus.id;
                const isEditing = editingPriceBusId === bus.id;

                return (
                  <div
                    key={bus.id}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-teal-500 bg-teal-50/40 shadow-sm' 
                        : 'border-slate-100 hover:border-slate-300 bg-slate-50/50'
                    }`}
                    onClick={() => setSelectedBusId(bus.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-slate-900 text-sm">{bus.busNumber}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          {bus.busClass}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-teal-800">{bus.departureTime}</span>
                    </div>

                    <div className="mt-2 text-xs text-slate-600 flex justify-between items-center">
                      <span>{bus.origin} → {bus.destination}</span>
                      
                      {/* Price & Edit Button */}
                      <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
                        {isEditing ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="number"
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                              placeholder={bus.officialPrice}
                              className="w-16 px-1.5 py-0.5 text-xs font-bold border border-slate-300 rounded outline-none"
                            />
                            <button
                              onClick={() => handleUpdatePrice(bus.id)}
                              className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-500"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setEditingPriceBusId(null)}
                              className="p-1 bg-slate-300 text-slate-700 rounded hover:bg-slate-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <span className="font-bold text-slate-900">{formatPKR(bus.officialPrice)}</span>
                            <button
                              onClick={() => {
                                setEditingPriceBusId(bus.id);
                                setNewPrice(bus.officialPrice);
                              }}
                              className="p-1 text-slate-400 hover:text-teal-600 transition-colors"
                              title="Edit Fare"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Real-Time Seat Manifest & Boarding Status */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            
            {/* Manifest Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                    Passenger Manifest: {activeBus.busNumber}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    {activeBus.origin} ➔ {activeBus.destination}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Scheduled Departure: {activeBus.departureTime} • Terminal: {activeBus.originTerminal}
                </p>
              </div>

              {/* Search filter within manifest */}
              <div className="relative">
                <input
                  type="text"
                  value={manifestSearch}
                  onChange={(e) => setManifestSearch(e.target.value)}
                  placeholder="Search passenger or CNIC..."
                  className="text-xs border border-slate-300 rounded-xl px-3 py-1.5 pl-8 outline-none focus:ring-2 focus:ring-teal-500 w-full sm:w-48"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Manifest Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Seat</th>
                    <th className="py-2.5 px-3">Passenger</th>
                    <th className="py-2.5 px-3">Gender / Safe Zone</th>
                    <th className="py-2.5 px-3">Payment</th>
                    <th className="py-2.5 px-3">Boarding Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {manifest
                    .filter(p => 
                      p.name.toLowerCase().includes(manifestSearch.toLowerCase()) ||
                      p.cnic.includes(manifestSearch)
                    )
                    .map(commuter => (
                      <tr key={commuter.seat} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-mono font-extrabold text-teal-800">
                          #{commuter.seat}
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-bold text-slate-900">{commuter.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{commuter.cnic}</p>
                        </td>
                        <td className="py-3 px-3">
                          {commuter.gender === 'female' ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                              ♀ Lady Safe Zone
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                              ♂ Male Passenger
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-slate-800">{commuter.gateway}</span>
                          <span className="block text-[10px] text-emerald-600 font-bold">Paid (0% Fee)</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            commuter.status === 'Boarded' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {commuter.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleToggleBoarding(commuter.seat)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                              commuter.status === 'Boarded'
                                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                : 'bg-emerald-600 text-white hover:bg-emerald-500'
                            }`}
                          >
                            {commuter.status === 'Boarded' ? 'Undo Check-in' : 'Mark Boarded'}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Quick Manifest Summary & Conductor Handover */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Verified Direct Manifest • State Transport Regulated</span>
              <button
                onClick={() => alert('Manifest exported as CSV for Terminal Dispatcher.')}
                className="text-teal-700 font-bold hover:underline flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                <span>Download Dispatch Sheet</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
