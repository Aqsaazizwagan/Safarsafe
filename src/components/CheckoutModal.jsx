import React, { useState, useEffect } from 'react';
import { formatPKR, generatePNR, generateTrxId } from '../utils/formatters';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Loader2, 
  Lock, 
  Copy, 
  Check, 
  User, 
  Phone, 
  HeartHandshake, 
  ArrowRight,
  ArrowLeft,
  AlertTriangle
} from 'lucide-react';

export default function CheckoutModal({ 
  bookingData, 
  onClose, 
  onBookingSuccess 
}) {
  const { bus, selectedSeats, totalFare, passengerGender } = bookingData;

  // Step state: 'details' -> 'payment' -> 'processing' -> 'success'
  const [step, setStep] = useState('details');

  // Passenger form state
  const [passengerName, setPassengerName] = useState('Ayesha Khan');
  const [cnic, setCnic] = useState('42101-9876543-2');
  const [phone, setPhone] = useState('0301-2345678');
  const [email, setEmail] = useState('ayesha.k@example.com');
  const [emergencyName, setEmergencyName] = useState('Tariq Khan (Father)');
  const [emergencyPhone, setEmergencyPhone] = useState('0321-9876543');

  // Payment method state: 'easypaisa' | 'jazzcash' | 'raast' | 'card'
  const [paymentMethod, setPaymentMethod] = useState('easypaisa');

  // Gateway form states
  const [walletPhone, setWalletPhone] = useState('0301-2345678');
  const [cardHolder, setCardHolder] = useState('Ayesha Khan');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('321');
  const [copiedIban, setCopiedIban] = useState(false);

  // Processing simulation state
  const [processingStatus, setProcessingStatus] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(120);

  // Final confirmed booking object
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Countdown timer during push prompt
  useEffect(() => {
    let interval = null;
    if (step === 'processing' && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timerSeconds]);

  const handleCopyIban = () => {
    navigator.clipboard.writeText('PK36RAAS0000001234567890');
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2500);
  };

  const handleStartPayment = (e) => {
    e.preventDefault();
    setStep('processing');

    const pnr = generatePNR();
    let gatewayName = 'EasyPaisa';
    if (paymentMethod === 'jazzcash') gatewayName = 'JazzCash';
    else if (paymentMethod === 'raast') gatewayName = 'Raast';
    else if (paymentMethod === 'card') gatewayName = 'Card';

    const trxId = generateTrxId(gatewayName);

    // Lifecycle simulation steps
    setProcessingStatus(`Initiating secure handshake with ${gatewayName}...`);

    setTimeout(() => {
      if (paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') {
        setProcessingStatus(`USSD Push prompt sent to ${walletPhone}. Authorizing transaction...`);
      } else if (paymentMethod === 'raast') {
        setProcessingStatus(`Verifying State Bank Raast transaction with IBAN...`);
      } else {
        setProcessingStatus(`Authenticating 3D-Secure 2.0 OTP with issuing bank...`);
      }
    }, 1800);

    setTimeout(() => {
      setProcessingStatus(`Payment verified! Generating cryptographic digital boarding pass...`);
    }, 3600);

    setTimeout(() => {
      const newBooking = {
        bookingId: `BK-${Date.now().toString().slice(-6)}`,
        pnr: pnr,
        bus: bus,
        seats: selectedSeats,
        totalFare: totalFare,
        passenger: {
          name: passengerName,
          cnic: cnic,
          phone: phone,
          email: email,
          gender: passengerGender,
          emergencyName: emergencyName,
          emergencyPhone: emergencyPhone
        },
        payment: {
          gateway: gatewayName,
          trxId: trxId,
          status: 'PAID',
          paidAt: new Date().toISOString(),
          amount: totalFare
        },
        qrCodeHash: `SAFARSAFE-VERIFIED:${pnr}:${bus.busNumber}:${selectedSeats.join(',')}:${Date.now()}`
      };

      setConfirmedBooking(newBooking);
      setStep('success');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 5000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                SafarSafe Express Checkout
              </h3>
              <p className="text-xs text-slate-400">
                100% Direct Bus Booking • SSL 256-bit Encrypted
              </p>
            </div>
          </div>

          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Checkout Steps Progress Bar */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
          <div className={`flex items-center space-x-2 ${step === 'details' ? 'text-teal-700 font-extrabold' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'details' ? 'bg-teal-700 text-white' : 'bg-slate-300 text-slate-700'}`}>1</span>
            <span>Passenger Information</span>
          </div>

          <span className="text-slate-300">───</span>

          <div className={`flex items-center space-x-2 ${step === 'payment' ? 'text-teal-700 font-extrabold' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-teal-700 text-white' : 'bg-slate-300 text-slate-700'}`}>2</span>
            <span>Payment Method</span>
          </div>

          <span className="text-slate-300">───</span>

          <div className={`flex items-center space-x-2 ${step === 'success' ? 'text-emerald-700 font-extrabold' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'success' ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'}`}>3</span>
            <span>E-Ticket</span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          
          {/* STEP 1: PASSENGER DETAILS FORM */}
          {step === 'details' && (
            <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} className="space-y-4">
              <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl text-xs text-teal-900 flex items-center justify-between">
                <div>
                  <span className="font-bold">Trip:</span> {bus.origin} → {bus.destination} ({bus.operatorName})
                </div>
                <div className="font-extrabold text-teal-800">
                  Seats: {selectedSeats.join(', ')} • {formatPKR(totalFare)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Legal Name (as per CNIC) *
                  </label>
                  <input
                    type="text"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    required
                    className="w-full text-sm font-semibold border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. Ayesha Khan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    CNIC / Student ID *
                  </label>
                  <input
                    type="text"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    required
                    className="w-full text-sm font-semibold border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="42101-XXXXXXX-X"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full text-sm font-semibold border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="0300-1234567"
                  />
                  <span className="text-[10px] text-slate-400">Boarding pass & SMS OTP will be sent here</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm font-semibold border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Emergency Contact Information (Crucial for Women Safety) */}
              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center space-x-1.5 mb-2">
                  <HeartHandshake className="w-4 h-4 text-rose-500" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Emergency Contact Alert (Safety Feature)
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 mb-3">
                  This person will receive an automated SMS with your live bus tracking link when you board.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Emergency Contact Name & Relation *
                    </label>
                    <input
                      type="text"
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      required
                      className="w-full text-sm font-semibold border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="e.g. Tariq Khan (Father / Guardian)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Emergency Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      required
                      className="w-full text-sm font-semibold border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="0321-9876543"
                    />
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-2"
                >
                  <span>Continue to Payment Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD SELECTION & GATEWAY FORM */}
          {step === 'payment' && (
            <div className="space-y-6">
              
              {/* Fare Review */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <p className="text-slate-500">Passenger: <span className="font-bold text-slate-800">{passengerName}</span></p>
                  <p className="text-slate-500">Seats: <span className="font-bold text-slate-800">{selectedSeats.join(', ')}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-slate-400">Total Net Amount</p>
                  <p className="text-lg font-black text-slate-900">{formatPKR(totalFare)}</p>
                </div>
              </div>

              {/* 4 Pakistani Gateways Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Select Local Payment Method:
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  
                  {/* EasyPaisa */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-3 rounded-xl border-2 text-left transition-all relative ${
                      paymentMethod === 'easypaisa'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs mb-2">
                      EP
                    </div>
                    <p className="text-xs font-extrabold text-slate-900">EasyPaisa</p>
                    <p className="text-[10px] text-slate-500">Mobile Wallet / USSD</p>
                    {paymentMethod === 'easypaisa' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-600"></span>
                    )}
                  </button>

                  {/* JazzCash */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-3 rounded-xl border-2 text-left transition-all relative ${
                      paymentMethod === 'jazzcash'
                        ? 'border-red-600 bg-red-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-xs mb-2">
                      JC
                    </div>
                    <p className="text-xs font-extrabold text-slate-900">JazzCash</p>
                    <p className="text-[10px] text-slate-500">Wallet / MPIN</p>
                    {paymentMethod === 'jazzcash' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-600"></span>
                    )}
                  </button>

                  {/* Raast Instant Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('raast')}
                    className={`p-3 rounded-xl border-2 text-left transition-all relative ${
                      paymentMethod === 'raast'
                        ? 'border-teal-600 bg-teal-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-black text-xs mb-2">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-extrabold text-slate-900">Raast Instant</p>
                    <p className="text-[10px] text-teal-700 font-semibold">0% SBP Fee</p>
                    {paymentMethod === 'raast' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-600"></span>
                    )}
                  </button>

                  {/* Debit/Credit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border-2 text-left transition-all relative ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-black text-xs mb-2">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-extrabold text-slate-900">Cards</p>
                    <p className="text-[10px] text-slate-500">Visa / MC / PayPak</p>
                    {paymentMethod === 'card' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600"></span>
                    )}
                  </button>

                </div>
              </div>

              {/* Dynamic Gateway Form Inputs */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                
                {/* EasyPaisa & JazzCash Form */}
                {(paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-800">
                        {paymentMethod === 'easypaisa' ? 'EasyPaisa Mobile Account' : 'JazzCash Mobile Account'}
                      </h4>
                      <span className="text-[11px] text-emerald-700 font-bold">Instant USSD Push</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Registered Mobile Number (03XX-XXXXXXX) *
                      </label>
                      <input
                        type="tel"
                        value={walletPhone}
                        onChange={(e) => setWalletPhone(e.target.value)}
                        required
                        className="w-full text-sm font-semibold border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                        placeholder="0300-1234567"
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      A confirmation popup will appear on your phone screen. Enter your 5-digit {paymentMethod === 'easypaisa' ? 'EasyPaisa PIN' : 'JazzCash MPIN'} to approve {formatPKR(totalFare)}.
                    </p>
                  </div>
                )}

                {/* Raast Pay Form */}
                {paymentMethod === 'raast' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-teal-900">
                        State Bank of Pakistan (Raast Instant Settlement)
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                        Zero SBP Charges
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] text-slate-500">Official Merchant Raast IBAN:</p>
                        <p className="text-sm font-mono font-bold text-slate-900 select-all">
                          PK36RAAS0000001234567890
                        </p>
                        <p className="text-[10px] text-teal-700">Account Title: SafarSafe Transport Services</p>
                      </div>

                      <button
                        type="button"
                        onClick={handleCopyIban}
                        className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 flex items-center space-x-1 transition-colors"
                      >
                        {copiedIban ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIban ? 'Copied!' : 'Copy IBAN'}</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      Open any Pakistani banking app (Meezan, HBL, UBL, Bank Alfalah, etc.), select <strong>Raast Pay</strong>, and transfer <strong>{formatPKR(totalFare)}</strong>. The system verifies your transaction instantly.
                    </p>
                  </div>
                )}

                {/* Card Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-800">Debit / Credit Card Details</h4>
                      <span className="text-[10px] text-slate-500 flex items-center">
                        <Lock className="w-3 h-3 text-emerald-600 mr-1" /> 3D-Secure 2.0
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        required
                        className="w-full text-sm font-semibold border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                        placeholder="4242 •••• •••• ••••"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          required
                          className="w-full text-sm font-semibold border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          required
                          className="w-full text-sm font-semibold border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 flex items-center space-x-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleStartPayment}
                  className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-2 active:scale-98"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Pay {formatPKR(totalFare)}</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: PROCESSING STATE MACHINE */}
          {step === 'processing' && (
            <div className="py-12 px-4 text-center max-w-md mx-auto space-y-5">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-teal-100 animate-ping"></div>
                <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-500 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 mb-1">
                  Processing Your Payment
                </h4>
                <p className="text-xs text-teal-700 font-semibold mb-2">
                  {processingStatus}
                </p>
                <p className="text-[11px] text-slate-400">
                  Please do not refresh or close this window. Handshake will complete in seconds.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
                <div className="flex justify-between mb-1">
                  <span>Authorized Gateway:</span>
                  <span className="font-bold text-slate-900">{paymentMethod.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-bold text-emerald-600">{formatPKR(totalFare)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 'success' && confirmedBooking && (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Payment Verified
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Booking Confirmed!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  PNR Number: <span className="font-mono font-extrabold text-teal-700 text-sm">{confirmedBooking.pnr}</span>
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Passenger Name:</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.passenger.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bus Operator:</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.bus.operatorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Seats Reserved:</span>
                  <span className="font-bold text-emerald-700">#{confirmedBooking.seats.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment TRX ID:</span>
                  <span className="font-mono text-slate-700">{confirmedBooking.payment.trxId}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => onBookingSuccess(confirmedBooking)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-bold shadow-lg shadow-teal-600/30 hover:scale-102 transition-all flex items-center space-x-2"
                >
                  <span>View & Print E-Ticket Boarding Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
