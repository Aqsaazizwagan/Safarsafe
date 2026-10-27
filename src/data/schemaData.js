export const DATABASE_TABLES = [
  {
    name: 'users',
    description: 'Passenger & Commuter Profiles with Gender & Emergency Verification',
    columns: [
      { name: 'user_id', type: 'UUID', isPrimary: true, nullable: false, description: 'Unique passenger identifier (Primary Key)' },
      { name: 'name', type: 'VARCHAR(120)', nullable: false, description: 'Full legal name as printed on CNIC' },
      { name: 'email', type: 'VARCHAR(255)', isUnique: true, nullable: false, description: 'Verified passenger email' },
      { name: 'phone', type: 'VARCHAR(20)', isUnique: true, nullable: false, description: 'Pakistani mobile number (03XX-XXXXXXX)' },
      { name: 'cnic', type: 'VARCHAR(15)', isUnique: true, nullable: true, description: 'National Identity Card (13 digits formatted)' },
      { name: 'gender', type: 'VARCHAR(10)', nullable: false, description: 'Passenger gender: "female", "male", "other"' },
      { name: 'emergency_name', type: 'VARCHAR(120)', nullable: true, description: 'Emergency contact guardian/family name' },
      { name: 'emergency_phone', type: 'VARCHAR(20)', nullable: true, description: 'Emergency contact reachable phone' },
      { name: 'role', type: 'VARCHAR(20)', defaultValue: "'commuter'", description: '"commuter", "operator_admin", "super_admin"' },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', defaultValue: 'NOW()', description: 'Account registration timestamp' }
    ]
  },
  {
    name: 'operators',
    description: 'Verified Pakistani Bus Fleet Companies (Daewoo, Faisal Movers, etc.)',
    columns: [
      { name: 'operator_id', type: 'UUID', isPrimary: true, nullable: false, description: 'Unique operator identifier' },
      { name: 'operator_name', type: 'VARCHAR(150)', nullable: false, description: 'Brand name (e.g., Faisal Movers, Daewoo Express)' },
      { name: 'license_no', type: 'VARCHAR(80)', isUnique: true, nullable: false, description: 'Transport Department Commercial Route Permit' },
      { name: 'headquarters', type: 'VARCHAR(150)', nullable: false, description: 'Main hub office city' },
      { name: 'helpline_phone', type: 'VARCHAR(20)', nullable: false, description: '24/7 passenger assistance number' },
      { name: 'raast_iban', type: 'VARCHAR(34)', nullable: false, description: 'Verified corporate Raast IBAN for direct settlements' },
      { name: 'is_verified', type: 'BOOLEAN', defaultValue: 'true', description: 'Zero broker verified badge flag' },
      { name: 'rating', type: 'NUMERIC(2,1)', defaultValue: '4.8', description: 'Average passenger review score (1.0 - 5.0)' }
    ]
  },
  {
    name: 'routes_and_buses',
    description: 'Fleet Vehicles, Seating Class, Origins, Destinations, and Fair Pricing',
    columns: [
      { name: 'bus_id', type: 'VARCHAR(50)', isPrimary: true, nullable: false, description: 'Vehicle / Schedule identifier' },
      { name: 'operator_id', type: 'UUID', isForeignKey: true, references: 'operators.operator_id', description: 'Associated bus company' },
      { name: 'bus_registration', type: 'VARCHAR(30)', nullable: false, description: 'Official number plate (e.g. FM-7821)' },
      { name: 'origin', type: 'VARCHAR(80)', nullable: false, description: 'Departure city (e.g. Karachi, Lahore)' },
      { name: 'destination', type: 'VARCHAR(80)', nullable: false, description: 'Arrival city (e.g. Hyderabad, Sukkur, Islamabad)' },
      { name: 'origin_terminal', type: 'VARCHAR(150)', nullable: false, description: 'Departure boarding terminal & Google map link' },
      { name: 'destination_terminal', type: 'VARCHAR(150)', nullable: false, description: 'Arrival disembarkation terminal' },
      { name: 'departure_time', type: 'TIME', nullable: false, description: 'Scheduled departure timestamp' },
      { name: 'arrival_time', type: 'TIME', nullable: false, description: 'Scheduled arrival timestamp' },
      { name: 'bus_class', type: 'VARCHAR(50)', nullable: false, description: '"Executive 2+1", "Business Class 2+2", "Sleeper"' },
      { name: 'layout_type', type: 'VARCHAR(10)', nullable: false, description: '"2+1" or "2+2"' },
      { name: 'total_seats', type: 'INT', nullable: false, description: 'Total seat capacity (e.g., 30 or 40 seats)' },
      { name: 'official_price', type: 'NUMERIC(10,2)', nullable: false, description: 'Direct operator ticket fare in PKR' },
      { name: 'has_female_hostess', type: 'BOOLEAN', defaultValue: 'true', description: 'Presence of verified female hostess onboard' }
    ]
  },
  {
    name: 'bookings',
    description: 'Confirmed & Pending Ticket Reservations with Scannable QR Verification',
    columns: [
      { name: 'booking_id', type: 'UUID', isPrimary: true, nullable: false, description: 'Primary booking UUID' },
      { name: 'pnr', type: 'VARCHAR(15)', isUnique: true, nullable: false, description: 'Passenger Name Record code (e.g. SFR-82910)' },
      { name: 'user_id', type: 'UUID', isForeignKey: true, references: 'users.user_id', description: 'Booked passenger reference' },
      { name: 'bus_id', type: 'VARCHAR(50)', isForeignKey: true, references: 'routes_and_buses.bus_id', description: 'Selected bus trip' },
      { name: 'seat_number', type: 'VARCHAR(50)', nullable: false, description: 'Comma-separated seat numbers (e.g., "3, 4")' },
      { name: 'passenger_gender', type: 'VARCHAR(10)', nullable: false, description: 'Gender of traveling passenger for safety enforcement' },
      { name: 'payment_status', type: 'VARCHAR(20)', nullable: false, description: '"Pending", "Paid", "Failed", "Refunded"' },
      { name: 'total_amount', type: 'NUMERIC(10,2)', nullable: false, description: 'Net ticket total in PKR (0 broker fee)' },
      { name: 'qr_code_hash', type: 'TEXT', nullable: false, description: 'HMAC cryptographic token for conductor QR scanner validation' },
      { name: 'journey_date', type: 'DATE', nullable: false, description: 'Travel date' },
      { name: 'boarding_status', type: 'VARCHAR(20)', defaultValue: "'Reserved'", description: '"Reserved", "Boarded", "No-Show", "Cancelled"' },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', defaultValue: 'NOW()', description: 'Booking timestamp' }
    ]
  },
  {
    name: 'transactions',
    description: 'Payment Audit Trail across EasyPaisa, JazzCash, Raast, and Cards',
    columns: [
      { name: 'transaction_id', type: 'UUID', isPrimary: true, nullable: false, description: 'Unique transaction audit identifier' },
      { name: 'booking_id', type: 'UUID', isForeignKey: true, references: 'bookings.booking_id', description: 'Linked booking reference' },
      { name: 'gateway', type: 'VARCHAR(20)', nullable: false, description: '"EasyPaisa", "JazzCash", "Raast", "Card"' },
      { name: 'amount', type: 'NUMERIC(10,2)', nullable: false, description: 'Amount paid in Pakistani Rupees (PKR)' },
      { name: 'reference_code', type: 'VARCHAR(80)', isUnique: true, nullable: false, description: 'Gateway TRX ID / Raast Settlement EndToEndId' },
      { name: 'account_masked', type: 'VARCHAR(40)', nullable: false, description: 'Masked phone (0300****567) or Card (**** 4242)' },
      { name: 'status', type: 'VARCHAR(20)', nullable: false, description: '"SUCCESS", "PENDING", "DECLINED"' },
      { name: 'metadata_json', type: 'JSONB', nullable: true, description: 'Gateway response payload (USSD prompt, 3DS auth)' },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', defaultValue: 'NOW()', description: 'Payment settlement timestamp' }
    ]
  }
];

export const SQL_SCHEMA_DDL = `-- SafarSafe Database Schema (PostgreSQL)
-- Optimized for High-Concurrency Bus Ticketing & Female Traveler Safety

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users & Commuters
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    cnic VARCHAR(15) UNIQUE,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('female', 'male', 'other')),
    emergency_name VARCHAR(120),
    emergency_phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'commuter',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bus Operators
CREATE TABLE operators (
    operator_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    operator_name VARCHAR(150) NOT NULL,
    license_no VARCHAR(80) UNIQUE NOT NULL,
    headquarters VARCHAR(150) NOT NULL,
    helpline_phone VARCHAR(20) NOT NULL,
    raast_iban VARCHAR(34) NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    rating NUMERIC(2,1) DEFAULT 4.8
);

-- 3. Routes & Buses
CREATE TABLE routes_and_buses (
    bus_id VARCHAR(50) PRIMARY KEY,
    operator_id UUID REFERENCES operators(operator_id) ON DELETE CASCADE,
    bus_registration VARCHAR(30) NOT NULL,
    origin VARCHAR(80) NOT NULL,
    destination VARCHAR(80) NOT NULL,
    origin_terminal VARCHAR(150) NOT NULL,
    destination_terminal VARCHAR(150) NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    bus_class VARCHAR(50) NOT NULL,
    layout_type VARCHAR(10) NOT NULL CHECK (layout_type IN ('2+1', '2+2')),
    total_seats INT NOT NULL,
    official_price NUMERIC(10,2) NOT NULL,
    has_female_hostess BOOLEAN DEFAULT TRUE
);

-- Indexing for instant route & destination queries
CREATE INDEX idx_routes_origin_dest ON routes_and_buses(origin, destination);

-- 4. Bookings
CREATE TABLE bookings (
    booking_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pnr VARCHAR(15) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(user_id),
    bus_id VARCHAR(50) REFERENCES routes_and_buses(bus_id),
    seat_number VARCHAR(50) NOT NULL,
    passenger_gender VARCHAR(10) NOT NULL,
    payment_status VARCHAR(20) NOT NULL CHECK (payment_status IN ('Pending', 'Paid', 'Failed', 'Refunded')),
    total_amount NUMERIC(10,2) NOT NULL,
    qr_code_hash TEXT NOT NULL,
    journey_date DATE NOT NULL,
    boarding_status VARCHAR(20) DEFAULT 'Reserved',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Composite Index for preventing race-condition double bookings
CREATE UNIQUE INDEX idx_unique_seat_date ON bookings (bus_id, journey_date, seat_number) 
WHERE payment_status IN ('Paid', 'Pending');

-- 5. Transactions
CREATE TABLE transactions (
    transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(booking_id) ON DELETE CASCADE,
    gateway VARCHAR(20) NOT NULL CHECK (gateway IN ('EasyPaisa', 'JazzCash', 'Raast', 'Card')),
    amount NUMERIC(10,2) NOT NULL,
    reference_code VARCHAR(80) UNIQUE NOT NULL,
    account_masked VARCHAR(40) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('SUCCESS', 'PENDING', 'DECLINED')),
    metadata_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;
