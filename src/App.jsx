import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import SafetyBanner from './components/SafetyBanner';
import BusList from './components/BusList';
import SeatSelectionModal from './components/SeatSelectionModal';
import CheckoutModal from './components/CheckoutModal';
import ETicketModal from './components/ETicketModal';
import OperatorPortal from './components/OperatorPortal';
import DatabaseSchemaView from './components/DatabaseSchemaView';
import MyBookingsDrawer from './components/MyBookingsDrawer';
import Footer from './components/Footer';

import { MOCK_BUSES } from './data/mockBuses';

export default function App() {
  // Navigation tabs: 'search' | 'operator' | 'schema'
  const [activeTab, setActiveTab] = useState('search');

  // Search parameters
  const [searchParams, setSearchParams] = useState({
    origin: 'Karachi',
    destination: 'Hyderabad',
    date: '2026-09-06',
    passengers: 1,
    femalePreference: true
  });

  // Bus fleet inventory state (can be modified dynamically in Operator Portal)
  const [buses, setBuses] = useState(MOCK_BUSES);

  // Modals state
  const [seatModalBus, setSeatModalBus] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [eTicketData, setETicketData] = useState(null);
  const [isBookingsDrawerOpen, setIsBookingsDrawerOpen] = useState(false);

  // Local storage for confirmed bookings
  const [myBookings, setMyBookings] = useState(() => {
    const saved = localStorage.getItem('safarsafe_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    // Default seed booking for instant showcase
    return [
      {
        bookingId: 'BK-991204',
        pnr: 'SFR-K82PA',
        bus: MOCK_BUSES[0],
        seats: [2],
        totalFare: 1200,
        passenger: {
          name: 'Fatima Zahra',
          cnic: '42101-5511223-4',
          phone: '0300-1122334',
          email: 'fatima.z@example.com',
          gender: 'female',
          emergencyName: 'Kamran Zahra (Brother)',
          emergencyPhone: '0321-7788990'
        },
        payment: {
          gateway: 'Raast',
          trxId: 'RAAST-PK-9810442',
          status: 'PAID',
          paidAt: '2026-09-06T02:30:00.000Z',
          amount: 1200
        },
        qrCodeHash: 'SAFARSAFE-VERIFIED:SFR-K82PA:FM-7821:2:17887000'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('safarsafe_bookings', JSON.stringify(myBookings));
  }, [myBookings]);

  // Handler when user triggers search
  const handleExecuteSearch = () => {
    // Scroll smoothly to bus list
    window.scrollTo({
      top: 520,
      behavior: 'smooth'
    });
  };

  // Handler when user confirms payment and booking is issued
  const handleBookingConfirmed = (confirmedBooking) => {
    setMyBookings(prev => [confirmedBooking, ...prev]);
    setCheckoutData(null);
    setETicketData(confirmedBooking);
  };

  const handleClearBookings = () => {
    setMyBookings([]);
    localStorage.removeItem('safarsafe_bookings');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        myBookingsCount={myBookings.length}
        onOpenBookings={() => setIsBookingsDrawerOpen(true)}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === 'search' && (
          <div>
            {/* Hero & Search Engine */}
            <HeroSearch
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onSearch={handleExecuteSearch}
            />

            {/* Safety & Fair Pricing Value Proposition */}
            <SafetyBanner />

            {/* Direct Route & Comparison Bus List */}
            <BusList
              buses={buses}
              searchParams={searchParams}
              onSelectBus={(bus) => setSeatModalBus(bus)}
            />
          </div>
        )}

        {activeTab === 'operator' && (
          <OperatorPortal
            buses={buses}
            setBuses={setBuses}
          />
        )}

        {activeTab === 'schema' && (
          <DatabaseSchemaView />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSwitchToOperator={() => {
          setActiveTab('operator');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSwitchToSchema={() => {
          setActiveTab('schema');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* MODAL 1: Interactive Seat Selection */}
      {seatModalBus && (
        <SeatSelectionModal
          bus={seatModalBus}
          searchParams={searchParams}
          onClose={() => setSeatModalBus(null)}
          onProceedToCheckout={(selectionInfo) => {
            setSeatModalBus(null);
            setCheckoutData(selectionInfo);
          }}
        />
      )}

      {/* MODAL 2: Localized Multi-Gateway Payment Checkout */}
      {checkoutData && (
        <CheckoutModal
          bookingData={checkoutData}
          onClose={() => setCheckoutData(null)}
          onBookingSuccess={handleBookingConfirmed}
        />
      )}

      {/* MODAL 3: Official Digital Boarding Pass (E-Ticket with QR) */}
      {eTicketData && (
        <ETicketModal
          booking={eTicketData}
          onClose={() => setETicketData(null)}
        />
      )}

      {/* DRAWER: My Tickets Drawer */}
      <MyBookingsDrawer
        isOpen={isBookingsDrawerOpen}
        onClose={() => setIsBookingsDrawerOpen(false)}
        bookings={myBookings}
        onViewTicket={(booking) => setETicketData(booking)}
        onClearBookings={handleClearBookings}
      />
    </div>
  );
}
