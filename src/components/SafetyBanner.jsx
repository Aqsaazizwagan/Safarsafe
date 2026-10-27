import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Sparkles, 
  DollarSign, 
  Headphones, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export default function SafetyBanner() {
  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The SafarSafe Promise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Commuters Across Pakistan Trust SafarSafe
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Engineered to eliminate terminal harassment, middleman extortion, and seat assignment anxiety.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Female Traveler Protection */}
          <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-100/70 text-teal-800 uppercase tracking-wider inline-block mb-2">
              Gender-Smart Engine
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Adjacent Ladies Seat Protection
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              When a solo female reserves a seat, the adjacent seat is automatically locked for female passengers only. Male travelers cannot select adjacent seats, ensuring dignity and peace of mind.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs text-teal-700 font-semibold">
              <Check className="w-4 h-4 mr-1.5 text-teal-600" />
              Strictly enforced across all verified fleets
            </div>
          </div>

          {/* Pillar 2: 100% Direct Fair Pricing */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100/70 text-emerald-800 uppercase tracking-wider inline-block mb-2">
              Zero Middleman Markups
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Official Direct Bus Operator Rates
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Physical bus stands (Sohrab Goth, Faizabad, Thokar) have unauthorized agents charging Rs. 300 to Rs. 500 extra per ticket. SafarSafe connects you straight to operator servers at Rs. 0 middleman fee.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs text-emerald-700 font-semibold">
              <Check className="w-4 h-4 mr-1.5 text-emerald-600" />
              100% transparent pricing breakdown
            </div>
          </div>

          {/* Pillar 3: Fast Pakistani Gateways & Verification */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-teal-600" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 uppercase tracking-wider inline-block mb-2">
              Instant E-Tickets
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Raast, EasyPaisa, JazzCash & Cards
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pay using your mobile wallet with zero hassle. Receive an authenticated digital boarding pass with cryptographic QR code on your phone and WhatsApp immediately.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs text-slate-700 font-semibold">
              <Check className="w-4 h-4 mr-1.5 text-teal-600" />
              Verified directly at bus door scanning
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
