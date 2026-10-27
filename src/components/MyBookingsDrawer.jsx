import React from 'react';
import { formatPKR } from '../utils/formatters';
import { 
  X, 
  Ticket, 
  Bus, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  Trash2,
  Clock
} from 'lucide-react';

export default function MyBookingsDrawer({ 
  isOpen, 
  onClose, 
  bookings, 
  onViewTicket,
  onClearBookings 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col">
        
        {/* Drawer Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Ticket className="w-5 h-5 text-teal-400" />
            <h3 className="font-extrabold text-base">My SafarSafe Tickets</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <Ticket className="w-12 h-12 mx-auto mb-3 text-slate-300 stroke-1" />
              <p className="font-bold text-slate-700">No tickets booked yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Your booked bus tickets and digital QR passes will appear here.
              </p>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.pnr}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-teal-400 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-black text-teal-700">
                    {b.pnr}
                  </span>
                  <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                    {b.payment.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center space-x-1">
                    <span>{b.bus.origin}</span>
                    <span className="text-teal-600">→</span>
                    <span>{b.bus.destination}</span>
                  </div>
                  <p className="text-slate-600 font-semibold">{b.bus.operatorName} • {b.bus.busNumber}</p>
                  <p className="text-slate-500 text-[11px]">Departure: {b.bus.departureTime} • Seats: #{b.seats.join(', ')}</p>
                  <p className="text-slate-500 text-[11px]">Passenger: {b.passenger.name}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-black text-slate-900 text-xs">
                    {formatPKR(b.totalFare)}
                  </span>
                  <button
                    onClick={() => {
                      onViewTicket(b);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center space-x-1 shadow-sm transition-all"
                  >
                    <span>View Boarding Pass</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {bookings.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-500">{bookings.length} ticket(s) saved</span>
            <button
              onClick={onClearBookings}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
