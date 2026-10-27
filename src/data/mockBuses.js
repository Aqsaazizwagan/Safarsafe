export const MOCK_BUSES = [
  {
    id: 'bus-fm-101',
    busNumber: 'FM-7821',
    operatorName: 'Faisal Movers',
    operatorTagline: 'Pakistan’s Premier Luxury Fleet',
    operatorRating: 4.8,
    totalReviews: 3420,
    origin: 'Karachi',
    destination: 'Hyderabad',
    originTerminal: 'Sohrab Goth Super Highway Terminal',
    destinationTerminal: 'Auto Bhan Road Terminal, Hyderabad',
    departureTime: '07:30 AM',
    arrivalTime: '09:45 AM',
    duration: '2h 15m',
    officialPrice: 1200,
    brokerPrice: 1550, // Rs. 350 broker fee eliminated
    busClass: 'Executive 2+1',
    layoutType: '2+1', // 3 columns: single left, double right
    totalSeats: 30,
    hasFemaleHostess: true,
    safetyFeatures: ['Dedicated Female Hostess', 'CCTV 24/7 Monitored', 'GPS Live Tracking', 'Adjacent Ladies Protection'],
    amenities: ['High-speed WiFi', 'USB Fast Charging', 'Individual Audio-Video', 'AC & Climate Control', 'Light Refreshment'],
    departureDate: '2026-09-06'
  },
  {
    id: 'bus-dw-204',
    busNumber: 'DW-4412',
    operatorName: 'Daewoo Express',
    operatorTagline: 'Nationwide Trusted Pioneer',
    operatorRating: 4.9,
    totalReviews: 5120,
    origin: 'Karachi',
    destination: 'Hyderabad',
    originTerminal: 'Cantt Station Daewoo Terminal',
    destinationTerminal: 'Rajputana Hospital Terminal, Hyderabad',
    departureTime: '08:45 AM',
    arrivalTime: '11:00 AM',
    duration: '2h 15m',
    officialPrice: 1350,
    brokerPrice: 1750, // Rs. 400 broker fee eliminated
    busClass: 'Business Class 2+2',
    layoutType: '2+2',
    totalSeats: 40,
    hasFemaleHostess: true,
    safetyFeatures: ['Dedicated Female Hostess', 'Front Rows Female Priority', 'Direct Terminal Boarding', 'Verified Drivers'],
    amenities: ['Onboard WiFi', 'USB Ports', 'Reclining Seats', 'AC Climate Control', 'Hot & Cold Beverages'],
    departureDate: '2026-09-06'
  },
  {
    id: 'bus-rm-309',
    busNumber: 'RM-9901',
    operatorName: 'Road Master',
    operatorTagline: 'Smart Motorway Cruisers',
    operatorRating: 4.7,
    totalReviews: 1890,
    origin: 'Karachi',
    destination: 'Sukkur',
    originTerminal: 'Sohrab Goth Terminal, Karachi',
    destinationTerminal: 'Military Road Terminal, Sukkur',
    departureTime: '09:15 AM',
    arrivalTime: '03:45 PM',
    duration: '6h 30m',
    officialPrice: 2900,
    brokerPrice: 3400, // Rs. 500 broker fee eliminated
    busClass: 'Executive Luxury 2+1',
    layoutType: '2+1',
    totalSeats: 30,
    hasFemaleHostess: true,
    safetyFeatures: ['Female Staff Onboard', 'Emergency SOS Button at Seats', 'Zero Inter-city Stops', 'CCTV Streamed'],
    amenities: ['Personal Touchscreen VOD', 'Fast WiFi', 'Blanket & Pillow', 'Meal Box Included', 'Extra Legroom'],
    departureDate: '2026-09-06'
  },
  {
    id: 'bus-kn-411',
    busNumber: 'KT-5510',
    operatorName: 'Kainat Travels',
    operatorTagline: 'Comfort & Safety in Every Mile',
    operatorRating: 4.6,
    totalReviews: 1240,
    origin: 'Karachi',
    destination: 'Sukkur',
    originTerminal: 'Taj Complex, M.A. Jinnah Road',
    destinationTerminal: 'Sukkur Bypass Stand',
    departureTime: '11:00 AM',
    arrivalTime: '05:30 PM',
    duration: '6h 30m',
    officialPrice: 2600,
    brokerPrice: 3000,
    busClass: 'Business Class 2+2',
    layoutType: '2+2',
    totalSeats: 40,
    hasFemaleHostess: false,
    safetyFeatures: ['Family Zone Enforced', 'GPS Monitored', 'Zero Stand Overcrowding'],
    amenities: ['Air Conditioned', 'USB Ports', 'Water Bottle', 'Audio Music'],
    departureDate: '2026-09-06'
  },
  {
    id: 'bus-fm-502',
    busNumber: 'FM-1190',
    operatorName: 'Faisal Movers',
    operatorTagline: 'Pakistan’s Premier Luxury Fleet',
    operatorRating: 4.9,
    totalReviews: 4890,
    origin: 'Lahore',
    destination: 'Islamabad / Rawalpindi',
    originTerminal: 'Thokar Niaz Baig Terminal, Lahore',
    destinationTerminal: 'Faizabad Interchange Terminal, Rawalpindi',
    departureTime: '08:00 AM',
    arrivalTime: '12:15 PM',
    duration: '4h 15m',
    officialPrice: 2400,
    brokerPrice: 2850,
    busClass: 'Executive 2+1',
    layoutType: '2+1',
    totalSeats: 30,
    hasFemaleHostess: true,
    safetyFeatures: ['Dedicated Female Hostess', 'Direct Motorway M-2 Non-stop', 'Adjacent Ladies Protection', 'CCTV 24/7'],
    amenities: ['High-speed 4G WiFi', 'Tea/Coffee Service', 'Individual Android Screens', 'Snack Box', 'Leather Recliner'],
    departureDate: '2026-09-06'
  },
  {
    id: 'bus-bt-605',
    busNumber: 'BT-3320',
    operatorName: 'Bilal Travels',
    operatorTagline: 'Reliable Daily Commute',
    operatorRating: 4.6,
    totalReviews: 2150,
    origin: 'Lahore',
    destination: 'Islamabad / Rawalpindi',
    originTerminal: 'Kalma Chowk Bilal Travels Stand',
    destinationTerminal: '26 Number Chungi, Islamabad',
    departureTime: '09:30 AM',
    arrivalTime: '02:00 PM',
    duration: '4h 30m',
    officialPrice: 2100,
    brokerPrice: 2500,
    busClass: 'Standard AC 2+2',
    layoutType: '2+2',
    totalSeats: 40,
    hasFemaleHostess: false,
    safetyFeatures: ['Front Ladies Section', 'Motorway Toll Verified', 'Speed-governed Vehicles'],
    amenities: ['Air Conditioning', 'Mobile Charging Ports', 'Comfortable Seating'],
    departureDate: '2026-09-06'
  },
  {
    id: 'bus-se-708',
    busNumber: 'SE-8822',
    operatorName: 'Sania Express',
    operatorTagline: 'Sindh-Punjab Express Line',
    operatorRating: 4.5,
    totalReviews: 980,
    origin: 'Karachi',
    destination: 'Moro',
    originTerminal: 'Sohrab Goth Terminal, Karachi',
    destinationTerminal: 'Moro Bypass Junction Stand',
    departureTime: '01:30 PM',
    arrivalTime: '06:45 PM',
    duration: '5h 15m',
    officialPrice: 2200,
    brokerPrice: 2600,
    busClass: 'Executive 2+1',
    layoutType: '2+1',
    totalSeats: 30,
    hasFemaleHostess: true,
    safetyFeatures: ['Female Safety Zone', 'CCTV Security', 'Live GPS Tracking'],
    amenities: ['AC System', 'Cold Mineral Water', 'USB Ports', 'Reclining Seats'],
    departureDate: '2026-09-06'
  },
  {
    id: 'bus-dw-801',
    busNumber: 'DW-7001',
    operatorName: 'Daewoo Express',
    operatorTagline: 'Nationwide Trusted Pioneer',
    operatorRating: 4.9,
    totalReviews: 6200,
    origin: 'Multan',
    destination: 'Lahore',
    originTerminal: 'Chungi No. 9 Daewoo Terminal, Multan',
    destinationTerminal: 'Thokar Niaz Baig Terminal, Lahore',
    departureTime: '10:00 AM',
    arrivalTime: '02:45 PM',
    duration: '4h 45m',
    officialPrice: 2250,
    brokerPrice: 2650,
    busClass: 'Business Class 2+2',
    layoutType: '2+2',
    totalSeats: 40,
    hasFemaleHostess: true,
    safetyFeatures: ['Dedicated Female Hostess', 'Front Rows Ladies Preference', 'Rest Area Monitoring'],
    amenities: ['WiFi', 'Fast Charging', 'Audio-Video', 'Refreshment Pack', 'Luggage Tag Security'],
    departureDate: '2026-09-06'
  }
];

/**
 * Generate seat layout for a given bus
 * Status types:
 * - 'available': Available for anyone (or female if rule applies)
 * - 'female_priority': Recommended/reserved for solo female passengers (Front rows)
 * - 'booked_female': Booked by female commuter (Coral indicator)
 * - 'booked_male': Booked by male commuter (Slate indicator)
 */
export function generateBusSeats(bus) {
  const is2plus1 = bus.layoutType === '2+1';
  const rows = is2plus1 ? 10 : 10;
  const seats = [];

  let seatNumber = 1;

  for (let r = 1; r <= rows; r++) {
    if (is2plus1) {
      // 2+1 layout: Column A (single seat on left), Column B & C (double seat on right)
      // Left Single Seat
      const singleSeatNum = seatNumber++;
      const isFrontRow = r <= 3;
      
      // Deterministic mock statuses for realistic demo
      let statusA = 'available';
      if (r === 1) statusA = 'booked_female';
      else if (r === 2) statusA = 'female_priority';
      else if (r === 4) statusA = 'booked_male';
      else if (r === 6) statusA = 'booked_male';

      seats.push({
        id: `seat-${singleSeatNum}`,
        number: singleSeatNum,
        row: r,
        col: 'A',
        pairWith: null, // Single seat, no adjacent seat! Very safe for solo female
        isLadiesPriority: isFrontRow,
        status: statusA,
        price: bus.officialPrice,
        isSingleSeat: true
      });

      // Right Double Seats: B (aisle) & C (window)
      const seatBNum = seatNumber++;
      const seatCNum = seatNumber++;

      let statusB = 'available';
      let statusC = 'available';

      if (r === 1) {
        statusB = 'booked_female';
        statusC = 'booked_female';
      } else if (r === 2) {
        statusB = 'female_priority';
        statusC = 'female_priority';
      } else if (r === 3) {
        statusB = 'booked_female';
        statusC = 'female_priority'; // Solo female booked B, C is adjacent!
      } else if (r === 5) {
        statusB = 'booked_male';
        statusC = 'booked_male';
      } else if (r === 7) {
        statusB = 'booked_male';
        statusC = 'available';
      }

      seats.push({
        id: `seat-${seatBNum}`,
        number: seatBNum,
        row: r,
        col: 'B',
        pairWith: seatCNum,
        isLadiesPriority: isFrontRow,
        status: statusB,
        price: bus.officialPrice,
        isSingleSeat: false
      });

      seats.push({
        id: `seat-${seatCNum}`,
        number: seatCNum,
        row: r,
        col: 'C',
        pairWith: seatBNum,
        isLadiesPriority: isFrontRow,
        status: statusC,
        price: bus.officialPrice,
        isSingleSeat: false
      });
    } else {
      // 2+2 layout: Column A & B (left double), Column C & D (right double)
      const seatANum = seatNumber++;
      const seatBNum = seatNumber++;
      const seatCNum = seatNumber++;
      const seatDNum = seatNumber++;

      const isFrontRow = r <= 3;

      let statusA = 'available';
      let statusB = 'available';
      let statusC = 'available';
      let statusD = 'available';

      if (r === 1) {
        statusA = 'booked_female';
        statusB = 'booked_female';
        statusC = 'booked_female';
        statusD = 'female_priority';
      } else if (r === 2) {
        statusA = 'booked_female';
        statusB = 'female_priority';
        statusC = 'female_priority';
        statusD = 'female_priority';
      } else if (r === 4) {
        statusA = 'booked_male';
        statusB = 'booked_male';
        statusC = 'booked_male';
        statusD = 'booked_male';
      } else if (r === 6) {
        statusA = 'available';
        statusB = 'booked_male';
        statusC = 'booked_female';
        statusD = 'female_priority';
      }

      seats.push(
        {
          id: `seat-${seatANum}`,
          number: seatANum,
          row: r,
          col: 'A',
          pairWith: seatBNum,
          isLadiesPriority: isFrontRow,
          status: statusA,
          price: bus.officialPrice
        },
        {
          id: `seat-${seatBNum}`,
          number: seatBNum,
          row: r,
          col: 'B',
          pairWith: seatANum,
          isLadiesPriority: isFrontRow,
          status: statusB,
          price: bus.officialPrice
        },
        {
          id: `seat-${seatCNum}`,
          number: seatCNum,
          row: r,
          col: 'C',
          pairWith: seatDNum,
          isLadiesPriority: isFrontRow,
          status: statusC,
          price: bus.officialPrice
        },
        {
          id: `seat-${seatDNum}`,
          number: seatDNum,
          row: r,
          col: 'D',
          pairWith: seatCNum,
          isLadiesPriority: isFrontRow,
          status: statusD,
          price: bus.officialPrice
        }
      );
    }
  }

  return seats;
}
