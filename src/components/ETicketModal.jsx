import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { formatPKR, formatDate } from '../utils/formatters';
import { 
  X, 
  Printer, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Bus, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  HeartHandshake, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

export default function ETicketModal({ booking, onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (booking) {
      // Generate authentic high-res QR code
      const qrPayload = JSON.stringify({
        pnr: booking.pnr,
        bus: booking.bus.busNumber,
        operator: booking.bus.operatorName,
        seats: booking.seats,
        passenger: booking.passenger.name,
        cnic: booking.passenger.cnic,
        status: booking.payment.status,
        hash: booking.qrCodeHash
      });

      QRCode.toDataURL(qrPayload, {
        width: 220,
        margin: 2,
        color: {
          dark: '#0F172A',
          light: '#FFFFFF'
        }
      })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error(err));
    }
  }, [booking]);

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `*SafarSafe Digital Bus Ticket*\nPNR: ${booking.pnr}\nOperator: ${booking.bus.operatorName} (${booking.bus.busNumber})\nRoute: ${booking.bus.origin} ➔ ${booking.bus.destination}\nDeparture: ${booking.bus.departureTime}\nSeats: ${booking.seats.join(', ')}\nPassenger: ${booking.passenger.name}\nTerminal: ${booking.bus.originTerminal}\nEmergency Contact: 1122`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(booking.pnr);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">
                Official Digital Boarding Pass
              </h3>
              <p className="text-[11px] text-slate-400">
                Verified Direct Booking • Show this QR at Bus Entrance
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Container */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-slate-50">
          
          <div 
            id="printable-ticket" 
            className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden relative max-w-2xl mx-auto"
          >
            {/* Perforated Notches for Boarding Pass Style */}
            <div className="absolute top-1/2 -left-4 w-8 h-8 bg-slate-50 rounded-full border-r-2 border-slate-200 hidden md:block"></div>
            <div className="absolute top-1/2 -right-4 w-8 h-8 bg-slate-50 rounded-full border-l-2 border-slate-200 hidden md:block"></div>

            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center font-bold text-white shadow-md">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tight">SafarSafe</h2>
                    <p className="text-[10px] text-teal-300 font-bold uppercase tracking-widest">
                      Direct Bus Pass • Verified E-Ticket
                    </p>
                  </div>
                </div>

                {/* PNR Box */}
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Booking PNR</p>
                  <p className="text-xl font-mono font-black text-teal-400 tracking-wider">
                    {booking.pnr}
                  </p>
                </div>
              </div>

              {/* Status pill */}
              <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-700/60">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[11px] flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" /> Confirmed & Paid
                  </span>
                  <span className="text-slate-300">TRX: {booking.payment.trxId}</span>
                </div>
                <span className="text-teal-300 font-semibold">{booking.payment.gateway} Instant</span>
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6 space-y-6">
              
              {/* Route & Timing Highlight */}
              <div className="grid grid-cols-3 gap-2 items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <p className="text-[10px] font-extrabold uppercase text-slate-400">Departure</p>
                  <p className="text-xl font-extrabold text-slate-900">{booking.bus.departureTime}</p>
                  <p className="text-xs font-bold text-teal-700">{booking.bus.origin}</p>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{booking.bus.originTerminal}</p>
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    {booking.bus.duration}
                  </span>
                  <div className="w-full h-0.5 bg-slate-300 my-2 relative">
                    <Bus className="w-4 h-4 text-teal-600 absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-50 px-0.5" />
                  </div>
                  <span className="text-[9px] text-slate-400">Non-Stop Express</span>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-extrabold uppercase text-slate-400">Arrival</p>
                  <p className="text-xl font-extrabold text-slate-900">{booking.bus.arrivalTime}</p>
                  <p className="text-xs font-bold text-teal-700">{booking.bus.destination}</p>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{booking.bus.destinationTerminal}</p>
                </div>
              </div>

              {/* Passenger & Seats Matrix with QR Code */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                
                {/* Left side details */}
                <div className="sm:col-span-7 space-y-3 text-xs">
                  <div className="flex justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Passenger Name:</span>
                    <span className="font-extrabold text-slate-900">{booking.passenger.name}</span>
                  </div>

                  <div className="flex justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">CNIC / ID:</span>
                    <span className="font-mono font-bold text-slate-800">{booking.passenger.cnic}</span>
                  </div>

                  <div className="flex justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Operator & Fleet:</span>
                    <span className="font-bold text-slate-900">{booking.bus.operatorName} ({booking.bus.busNumber})</span>
                  </div>

                  <div className="flex justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Assigned Seats:</span>
                    <span className="font-black text-emerald-700 text-sm">#{booking.seats.join(', ')}</span>
                  </div>

                  <div className="flex justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Safety Zone:</span>
                    <span className="font-bold text-teal-700">
                      {booking.passenger.gender === 'female' ? '✓ Solo Female Adjacent Protected' : 'General'}
                    </span>
                  </div>

                  <div className="flex justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Emergency Alert Sent To:</span>
                    <span className="font-bold text-slate-800">{booking.passenger.emergencyName}</span>
                  </div>

                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500 font-medium">Total Paid (0% Middleman):</span>
                    <span className="font-black text-slate-900 text-sm">{formatPKR(booking.totalFare)}</span>
                  </div>
                </div>

                {/* Right side QR Code */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  {qrDataUrl ? (
                    <img 
                      src={qrDataUrl} 
                      alt="Booking QR Code" 
                      className="w-40 h-40 object-contain rounded-lg shadow-sm border border-slate-200 bg-white p-1"
                    />
                  ) : (
                    <div className="w-40 h-40 bg-slate-200 animate-pulse rounded-lg"></div>
                  )}
                  <p className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider mt-2 text-center">
                    Scan for Direct Boarding
                  </p>
                  <p className="text-[9px] text-slate-400 font-mono text-center">
                    Encrypted Hash: {booking.pnr}-OK
                  </p>
                </div>

              </div>

              {/* Boarding Instructions & Safety Callout */}
              <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-200 text-xs text-teal-900 space-y-1">
                <p className="font-bold flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-teal-700" />
                  SafarSafe Passenger Safety Guarantee
                </p>
                <p className="text-[11px] text-teal-800 leading-relaxed">
                  • Please report to the departure terminal at least 15 minutes before scheduled departure.<br/>
                  • For solo female passengers: Your conductor and onboard female hostess have your verified passenger details.<br/>
                  • In case of any terminal or seat dispute, call our 24/7 SafarSafe Priority Line: <strong>0300-SAFAR-SAFE</strong> or national emergency <strong>1122</strong>.
                </p>
              </div>

            </div>

            {/* Ticket Footer */}
            <div className="bg-slate-100 p-4 text-center border-t border-slate-200 text-[10px] text-slate-500">
              SafarSafe Pakistan (Pvt.) Ltd. • Regulated Direct Bus Ticketing • SBP Raast Verified Merchant
            </div>

          </div>

          {/* Quick Copy / Close for User Convenience */}
          <div className="no-print mt-6 flex justify-center items-center space-x-4">
            <button
              onClick={handleCopyBookingId}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 flex items-center space-x-1.5 shadow-sm"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Copied PNR!' : 'Copy PNR Code'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
            >
              Done / Return to Home
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
