import React, { useState, useMemo } from 'react';
import { generateBusSeats } from '../data/mockBuses';
import { canBookSeat } from '../utils/seatRules';
import { formatPKR } from '../utils/formatters';
import { 
  X, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  Info, 
  TrendingDown, 
  ArrowRight,
  Sparkles,
  User,
  Heart
} from 'lucide-react';

export default function SeatSelectionModal({ 
  bus, 
  searchParams, 
  onClose, 
  onProceedToCheckout 
}) {
  // Generate or memoize seats for this bus
  const [allSeats, setAllSeats] = useState(() => generateBusSeats(bus));
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState([]);
  
  // Passenger gender selector: Defaults to female if search toggle was on, else female by default for safety demonstration
  const [passengerGender, setPassengerGender] = useState(searchParams.femalePreference ? 'female' : 'female');
  const [errorMessage, setErrorMessage] = useState(null);

  const is2plus1 = bus.layoutType === '2+1';

  // Toggle seat selection with safety rules validation
  const handleSeatClick = (seat) => {
    setErrorMessage(null);

    // If already selected, unselect it
    if (selectedSeatNumbers.includes(seat.number)) {
      setSelectedSeatNumbers(prev => prev.filter(num => num !== seat.number));
      return;
    }

    // Safety Engine Validation
    const validation = canBookSeat(seat, allSeats, passengerGender);
    if (!validation.allowed) {
      setErrorMessage(validation.reason);
      return;
    }

    // Check passenger seat limit (e.g., max 4 seats per booking)
    if (selectedSeatNumbers.length >= 4) {
      setErrorMessage('You can select a maximum of 4 seats per transaction.');
      return;
    }

    setSelectedSeatNumbers(prev => [...prev, seat.number]);
  };

  // Group seats into rows for realistic bus rendering
  const rows = useMemo(() => {
    const rowMap = {};
    allSeats.forEach(seat => {
      if (!rowMap[seat.row]) rowMap[seat.row] = [];
      rowMap[seat.row].push(seat);
    });
    return Object.values(rowMap);
  }, [allSeats]);

  const totalFare = selectedSeatNumbers.length * bus.officialPrice;
  const brokerSavings = selectedSeatNumbers.length * (bus.brokerPrice - bus.officialPrice);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-0.5 rounded bg-teal-800/80 text-teal-300 font-bold">
                {bus.busClass}
              </span>
              <h3 className="text-lg font-extrabold text-white">
                {bus.operatorName} • {bus.busNumber}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {bus.origin} ({bus.departureTime}) → {bus.destination} ({bus.arrivalTime})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Safety & Gender Selector Bar */}
        <div className="bg-teal-50/70 border-b border-teal-100 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-teal-900">
                SafarSafe Adjacent Seat Safety Engine Active
              </p>
              <p className="text-[11px] text-teal-700">
                Solo female commuters are automatically protected from unrelated male adjacent bookings.
              </p>
            </div>
          </div>

          {/* Gender selection switch */}
          <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-xl border border-teal-200 shadow-sm">
            <span className="text-xs font-bold text-slate-700">Booking As:</span>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => {
                  setPassengerGender('female');
                  setErrorMessage(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                  passengerGender === 'female'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>Female Commuter</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPassengerGender('male');
                  setErrorMessage(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                  passengerGender === 'male'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>Male / Family</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body: Bus Visualizer & Summary */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Bus Visualizer */}
          <div className="md:col-span-7 flex flex-col items-center">
            
            {/* Legend */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 text-[11px] font-bold text-slate-600">
              <div className="flex items-center space-x-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div className="w-4 h-4 rounded bg-white border-2 border-slate-300"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-teal-50 p-2 rounded-lg border border-teal-200 text-teal-800">
                <div className="w-4 h-4 rounded bg-teal-100 border-2 border-teal-400"></div>
                <span>Ladies Zone</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-rose-50 p-2 rounded-lg border border-rose-200 text-rose-800">
                <div className="w-4 h-4 rounded bg-rose-200 border-2 border-rose-400"></div>
                <span>Booked (Lady)</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-emerald-800">
                <div className="w-4 h-4 rounded bg-emerald-600 border-2 border-emerald-700 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>Your Selection</span>
              </div>
            </div>

            {/* Bus Cabin Outline */}
            <div className="w-full max-w-sm bg-slate-50 border-4 border-slate-300 rounded-t-3xl rounded-b-2xl p-4 shadow-inner relative">
              
              {/* Front Cabin / Windshield / Steering Wheel */}
              <div className="border-b-2 border-dashed border-slate-300 pb-3 mb-4 flex items-center justify-between px-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-slate-600 bg-slate-200 flex items-center justify-center shadow">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    Driver Cabin
                  </span>
                </div>
                <div className="px-2 py-1 rounded bg-teal-100 text-teal-800 text-[10px] font-bold">
                  Passenger Door 🚪
                </div>
              </div>

              {/* Seating Grid */}
              <div className="space-y-2.5">
                {rows.map((rowSeats, rIdx) => {
                  const isFrontLadyRow = rIdx < 3;
                  
                  return (
                    <div key={`row-${rIdx}`} className="relative">
                      {/* Optional Front Ladies zone indicator label */}
                      {rIdx === 0 && (
                        <div className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded text-center mb-2 border border-teal-200">
                          Front Priority Zone: Reserved for Female Commuters
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        
                        {/* Left Side: Column A (or A & B in 2+2) */}
                        <div className="flex space-x-1.5">
                          {is2plus1 ? (
                            // 2+1 layout: Single seat A
                            rowSeats.filter(s => s.col === 'A').map(seat => renderSeatButton(seat))
                          ) : (
                            // 2+2 layout: Seats A and B
                            rowSeats.filter(s => s.col === 'A' || s.col === 'B').map(seat => renderSeatButton(seat))
                          )}
                        </div>

                        {/* Walking Aisle */}
                        <div className="flex-1 flex items-center justify-center text-[9px] font-semibold text-slate-300 uppercase tracking-widest select-none">
                          Aisle
                        </div>

                        {/* Right Side: Columns B & C (or C & D in 2+2) */}
                        <div className="flex space-x-1.5">
                          {is2plus1 ? (
                            // 2+1 layout: Seats B and C
                            rowSeats.filter(s => s.col === 'B' || s.col === 'C').map(seat => renderSeatButton(seat))
                          ) : (
                            // 2+2 layout: Seats C and D
                            rowSeats.filter(s => s.col === 'C' || s.col === 'D').map(seat => renderSeatButton(seat))
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Rear Bus Emergency Exit */}
              <div className="mt-4 pt-3 border-t border-slate-200 text-center text-[10px] font-semibold text-slate-400">
                Rear Emergency Exit & Engine Bay
              </div>

            </div>

          </div>

          {/* Right Column: Dynamic Fare Calculation & Summary */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                Booking Details
              </h4>

              {/* Route & Operator summary card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Route:</span>
                  <span className="font-bold text-slate-800">{bus.origin} → {bus.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Boarding Terminal:</span>
                  <span className="font-bold text-slate-800 text-right max-w-[180px] truncate">{bus.originTerminal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bus Registration:</span>
                  <span className="font-bold text-slate-800">{bus.busNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hostess:</span>
                  <span className="font-bold text-teal-700">
                    {bus.hasFemaleHostess ? '✓ Verified Female Hostess' : 'Standard Crew'}
                  </span>
                </div>
              </div>

              {/* Selected Seats Pill Display */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Selected Seats:
                </label>
                {selectedSeatNumbers.length === 0 ? (
                  <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-dashed border-slate-200">
                    Click any available seat on the bus diagram to select.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedSeatNumbers.map(num => (
                      <span 
                        key={num}
                        className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center space-x-1.5 border border-emerald-300"
                      >
                        <span>Seat #{num}</span>
                        <button 
                          onClick={() => setSelectedSeatNumbers(prev => prev.filter(n => n !== num))}
                          className="hover:text-rose-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic Error Alert if any rule violated */}
              {errorMessage && (
                <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2 animate-shake">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Safety Rule Notice:</span> {errorMessage}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Base Ticket Price ({selectedSeatNumbers.length} seat(s)):</span>
                  <span className="font-semibold text-slate-800">{formatPKR(totalFare)}</span>
                </div>

                <div className="flex justify-between text-emerald-700 font-medium">
                  <span className="flex items-center">
                    <TrendingDown className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Middleman Fee Eliminated:
                  </span>
                  <span className="font-bold text-emerald-600">-{formatPKR(brokerSavings)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>State Bank Raast / Wallet Fee:</span>
                  <span className="font-semibold text-teal-600">Rs. 0 (Free)</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-sm font-extrabold text-slate-900">Total Payable:</span>
                  <span className="text-xl font-black text-slate-900">{formatPKR(totalFare)}</span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={selectedSeatNumbers.length === 0}
                onClick={() => {
                  onProceedToCheckout({
                    bus,
                    selectedSeats: selectedSeatNumbers,
                    totalFare,
                    passengerGender
                  });
                }}
                className={`w-2/3 py-3 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center space-x-2 transition-all ${
                  selectedSeatNumbers.length > 0
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-teal-600/30 active:scale-98'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );

  // Helper renderer for each seat button
  function renderSeatButton(seat) {
    const isSelected = selectedSeatNumbers.includes(seat.number);
    const isBookedFemale = seat.status === 'booked_female';
    const isBookedMale = seat.status === 'booked_male';
    const isBooked = isBookedFemale || isBookedMale;
    
    // Determine paired seat to check adjacent status
    let pairedSeat = null;
    if (seat.pairWith) {
      pairedSeat = allSeats.find(s => s.number === seat.pairWith);
    }
    const isAdjacentToFemale = pairedSeat && pairedSeat.status === 'booked_female';

    let styling = 'bg-white text-slate-700 border-slate-300 hover:border-teal-500 hover:bg-teal-50/50';
    let label = `${seat.number}`;
    let subIcon = null;

    if (isSelected) {
      styling = 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/30 scale-105';
      subIcon = <Check className="w-3 h-3 text-white" />;
    } else if (isBookedFemale) {
      styling = 'bg-rose-100 text-rose-800 border-rose-300 cursor-not-allowed opacity-80';
      subIcon = <span className="text-[9px] font-black">♀</span>;
    } else if (isBookedMale) {
      styling = 'bg-slate-200 text-slate-600 border-slate-300 cursor-not-allowed opacity-80';
      subIcon = <span className="text-[9px] font-bold">♂</span>;
    } else if (seat.isLadiesPriority || isAdjacentToFemale) {
      styling = 'bg-teal-50 text-teal-800 border-teal-300 hover:bg-teal-100';
      subIcon = <span className="text-[9px] font-bold text-teal-600">Lady</span>;
    }

    return (
      <button
        key={seat.id}
        type="button"
        disabled={isBooked}
        onClick={() => handleSeatClick(seat)}
        title={
          isBookedFemale 
            ? `Seat #${seat.number} booked by a female commuter`
            : isBookedMale 
            ? `Seat #${seat.number} booked by a male commuter`
            : isAdjacentToFemale 
            ? `Seat #${seat.number} is adjacent to a female passenger. Female only.`
            : `Seat #${seat.number} Available`
        }
        className={`w-9 h-11 rounded-lg border-2 flex flex-col items-center justify-center text-xs font-bold transition-all ${styling}`}
      >
        <span className="text-[11px] leading-tight">{seat.number}</span>
        {subIcon}
      </button>
    );
  }
}
