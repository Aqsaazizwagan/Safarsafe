export const CITIES = [
  {
    id: 'khi',
    name: 'Karachi',
    province: 'Sindh',
    popularTerminals: [
      'Sohrab Goth Terminal, Super Highway',
      'Cantt Station Terminal, Saddar',
      'Taj Complex, M.A. Jinnah Road'
    ]
  },
  {
    id: 'hyd',
    name: 'Hyderabad',
    province: 'Sindh',
    popularTerminals: [
      'Auto Bhan Road Terminal',
      'Rajputana Hospital Bus Stand',
      'Wadhu Wah Road Stand'
    ]
  },
  {
    id: 'suk',
    name: 'Sukkur',
    province: 'Sindh',
    popularTerminals: [
      'Military Road Daewoo Terminal',
      'Sukkur National Highway Bypass'
    ]
  },
  {
    id: 'mro',
    name: 'Moro',
    province: 'Sindh',
    popularTerminals: [
      'Moro Bypass Main Junction',
      'Taj Gas Station Stop'
    ]
  },
  {
    id: 'mux',
    name: 'Multan',
    province: 'Punjab',
    popularTerminals: [
      'Chungi No. 9 Daewoo Terminal',
      'Vehari Chowk Terminal',
      'Kalma Chowk Bus Stand'
    ]
  },
  {
    id: 'fsd',
    name: 'Faisalabad',
    province: 'Punjab',
    popularTerminals: [
      'Kohinoor City Terminal',
      'General Bus Stand, Rajbah Road'
    ]
  },
  {
    id: 'lhe',
    name: 'Lahore',
    province: 'Punjab',
    popularTerminals: [
      'Thokar Niaz Baig Terminal',
      'Kalma Chowk Faisal Movers Terminal',
      'Badami Bagh General Stand'
    ]
  },
  {
    id: 'isb',
    name: 'Islamabad / Rawalpindi',
    province: 'Federal / Punjab',
    popularTerminals: [
      'Faizabad Interchange Terminal',
      '26 Number Chungi, Peshawar Road',
      'I-8 Bus Terminal, Islamabad'
    ]
  },
  {
    id: 'pew',
    name: 'Peshawar',
    province: 'KPK',
    popularTerminals: [
      'Ring Road Terminal',
      'General Bus Stand Haji Camp'
    ]
  },
  {
    id: 'qta',
    name: 'Quetta',
    province: 'Balochistan',
    popularTerminals: [
      'Saryab Road Terminal',
      'Hazar Ganji Bus Stand'
    ]
  }
];

export const POPULAR_ROUTES = [
  { origin: 'Karachi', destination: 'Hyderabad', duration: '2h 15m', avgFare: 1100 },
  { origin: 'Karachi', destination: 'Sukkur', duration: '6h 30m', avgFare: 2800 },
  { origin: 'Lahore', destination: 'Islamabad / Rawalpindi', duration: '4h 15m', avgFare: 2400 },
  { origin: 'Karachi', destination: 'Lahore', duration: '16h 00m', avgFare: 6500 },
  { origin: 'Multan', destination: 'Lahore', duration: '4h 45m', avgFare: 2200 },
  { origin: 'Sukkur', destination: 'Karachi', duration: '6h 30m', avgFare: 2800 },
];
