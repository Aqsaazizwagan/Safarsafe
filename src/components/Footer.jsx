import React from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  Heart, 
  Sparkles, 
  TrendingDown, 
  Lock, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';

export default function Footer({ onSwitchToOperator, onSwitchToSchema }) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust & Emergency Helplines Strip */}
        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">
                  24/7 National Emergency & Commuter Assistance Hotlines
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                SafarSafe cooperates directly with Pakistani law enforcement and motorway rescue teams for zero-tolerance safety.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a 
                href="tel:1122" 
                className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors border border-slate-600"
              >
                <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
                <span>Rescue 1122</span>
              </a>

              <a 
                href="tel:15" 
                className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors border border-slate-600"
              >
                <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
                <span>Police 15</span>
              </a>

              <a 
                href="tel:130" 
                className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors border border-slate-600"
              >
                <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
                <span>Motorway Police 130</span>
              </a>

              <a 
                href="tel:1099" 
                className="px-3.5 py-2 rounded-xl bg-rose-900/60 hover:bg-rose-900/90 text-rose-200 text-xs font-bold flex items-center space-x-1.5 transition-colors border border-rose-700/60"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>Women Helpline 1099</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Safar<span className="text-teal-400">Safe</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering solo female travelers, students, and everyday citizens across Pakistan with safe, direct, and zero-commission intercity bus ticketing.
            </p>

            <div className="pt-2 text-xs font-urdu text-teal-300">
              سفر محفوظ، عزت اور وقار کے ساتھ — سفر سیف پاکستان
            </div>
          </div>

          {/* Col 2: Major Hubs & Terminals */}
          <div className="md:col-span-3 space-y-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Major Terminals
            </h5>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>• Karachi: Sohrab Goth & Cantt Daewoo</li>
              <li>• Hyderabad: Auto Bhan & Rajputana Stand</li>
              <li>• Sukkur: Military Road & Bypass Junction</li>
              <li>• Multan: Chungi No. 9 & Vehari Chowk</li>
              <li>• Lahore: Thokar Niaz Baig & Kalma Chowk</li>
              <li>• Islamabad: Faizabad & 26 Number Chungi</li>
            </ul>
          </div>

          {/* Col 3: Verified Fleet Network */}
          <div className="md:col-span-3 space-y-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Verified Bus Operators
            </h5>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>• Faisal Movers Premier Fleet</li>
              <li>• Daewoo Express Pakistan</li>
              <li>• Road Master Luxury Cruisers</li>
              <li>• Kainat Travels Executive</li>
              <li>• Bilal Travels Direct</li>
              <li>• Sania Express Sindh-Punjab</li>
            </ul>
          </div>

          {/* Col 4: Platform & Developer */}
          <div className="md:col-span-2 space-y-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Platform
            </h5>
            <ul className="text-xs space-y-2.5">
              <li>
                <button 
                  onClick={onSwitchToOperator}
                  className="text-teal-400 hover:text-teal-300 font-semibold"
                >
                  Operator Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={onSwitchToSchema}
                  className="text-teal-400 hover:text-teal-300 font-semibold"
                >
                  Database Schemas
                </button>
              </li>
              <li className="text-slate-500">Zero Middleman Policy</li>
              <li className="text-slate-500">Female Protection Bylaws</li>
              <li className="text-slate-500">SBP Raast Integration</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SafarSafe Technologies (Pvt.) Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span>Built for Pakistani Commuters with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>in Pakistan</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
