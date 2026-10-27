import React, { useState } from 'react';
import { DATABASE_TABLES, SQL_SCHEMA_DDL } from '../data/schemaData';
import { 
  Database, 
  Table, 
  Key, 
  Link, 
  Code, 
  Copy, 
  Check, 
  ShieldCheck, 
  Server, 
  Zap, 
  FileText 
} from 'lucide-react';

export default function DatabaseSchemaView() {
  const [activeTab, setActiveTab] = useState('tables'); // 'tables' | 'ddl' | 'architecture'
  const [copiedSql, setCopiedSql] = useState(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_DDL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold flex items-center">
              <Database className="w-3.5 h-3.5 mr-1 text-teal-400" />
              Relational Data Architecture
            </span>
            <span className="text-slate-400 text-xs">• Production PostgreSQL / MySQL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            SafarSafe Database & Schema Specifications
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Engineered for high-concurrency ticket reservations, cryptographic QR boarding validation, and zero middleman fee audit trails.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setActiveTab('tables')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'tables'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Tables Schema</span>
          </button>

          <button
            onClick={() => setActiveTab('ddl')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'ddl'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>SQL DDL</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'architecture'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Safety Architecture</span>
          </button>
        </div>
      </div>

      {/* Content: TAB 1 - TABLES SCHEMAS */}
      {activeTab === 'tables' && (
        <div className="space-y-6">
          {DATABASE_TABLES.map(table => (
            <div 
              key={table.name}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >
              {/* Table Title Bar */}
              <div className="bg-slate-50 px-6 py-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-mono font-bold text-xs">
                    {table.name.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="font-mono font-black text-slate-900 text-sm sm:text-base">
                    {table.name}
                  </h3>
                  <span className="text-xs text-slate-500 hidden sm:inline">• {table.description}</span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  {table.columns.length} columns
                </span>
              </div>

              {/* Columns Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100/60 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-6">Column Name</th>
                      <th className="py-2.5 px-4">Data Type</th>
                      <th className="py-2.5 px-4">Constraints</th>
                      <th className="py-2.5 px-6">Description & Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {table.columns.map((col, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-6 font-mono font-bold text-slate-900 flex items-center space-x-2">
                          {col.isPrimary && (
                            <span title="Primary Key">
                              <Key className="w-3.5 h-3.5 text-amber-500" />
                            </span>
                          )}
                          {col.isForeignKey && (
                            <span title={`Foreign Key referencing ${col.references}`}>
                              <Link className="w-3.5 h-3.5 text-blue-500" />
                            </span>
                          )}
                          <span>{col.name}</span>
                        </td>

                        <td className="py-3 px-4 font-mono font-semibold text-teal-700">
                          {col.type}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {col.isPrimary && (
                              <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                                PK
                              </span>
                            )}
                            {col.isForeignKey && (
                              <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                                FK
                              </span>
                            )}
                            {col.isUnique && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">
                                UNIQUE
                              </span>
                            )}
                            {col.nullable === false && (
                              <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                                NOT NULL
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-6 text-slate-600">
                          {col.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content: TAB 2 - RAW SQL DDL */}
      {activeTab === 'ddl' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-mono font-bold text-slate-200">
                schema_safarsafe_postgres.sql
              </span>
            </div>

            <button
              onClick={handleCopySql}
              className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Script'}</span>
            </button>
          </div>

          <pre className="p-6 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed selection:bg-teal-500 selection:text-white">
            {SQL_SCHEMA_DDL}
          </pre>
        </div>
      )}

      {/* Content: TAB 3 - ARCHITECTURE & SAFETY DESIGN NOTES */}
      {activeTab === 'architecture' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-teal-700">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-bold text-base text-slate-900">
                1. Adjacent Lady Seat Concurrency Design
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              To prevent race conditions where two simultaneous API requests attempt to book adjacent seats (e.g. a male passenger attempting to book next to a solo female passenger while both carts are active):
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 font-mono">
              <li>Distributed Redis Locks with key: `lock:bus:{bus_id}:seat:{seat_num}`</li>
              <li>Row-level locking via PostgreSQL: `SELECT * FROM bookings WHERE bus_id = ... FOR UPDATE`</li>
              <li>Conditional Partial Unique Index on `(bus_id, journey_date, seat_number)`</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-emerald-700">
              <Zap className="w-5 h-5" />
              <h3 className="font-bold text-base text-slate-900">
                2. Zero Middleman Fee Direct Settlement
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transactions are settled via State Bank of Pakistan's <strong>Raast Instant Payment Gateway</strong> directly to verified operator IBANs:
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 font-mono">
              <li>Direct settlement eliminates the 15-20% broker fee cut</li>
              <li>Idempotency keys prevent duplicate bank deductions</li>
              <li>Real-time automated reconciliation using Raast EndToEndId</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-blue-700">
              <Key className="w-5 h-5" />
              <h3 className="font-bold text-base text-slate-900">
                3. Cryptographic QR Verification
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              To prevent counterfeit boarding passes at physical terminals:
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 font-mono">
              <li>Every boarding QR embeds an HMAC-SHA256 signature</li>
              <li>Conductor scanner offline validates against operator public key</li>
              <li>Single-use scan validation flags duplicates immediately</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-rose-700">
              <FileText className="w-5 h-5" />
              <h3 className="font-bold text-base text-slate-900">
                4. Automated SOS & Emergency Dispatch
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Female travelers have dedicated emergency contacts bound to their booking profile:
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 font-mono">
              <li>Auto SMS webhook fires when conductor validates boarding QR</li>
              <li>Live vehicle GPS location link dispatched to guardian</li>
              <li>1-tap dial 1122 & Police 15 integration on mobile pass</li>
            </ul>
          </div>

        </div>
      )}

    </div>
  );
}
