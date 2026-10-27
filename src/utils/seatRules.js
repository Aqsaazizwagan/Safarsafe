/**
 * Seat Safety Rules Engine for Pakistani Intercity Buses
 * Protects solo female commuters by preventing unauthorized adjacent bookings
 */

export function canBookSeat(seat, allSeats, passengerGender) {
  // If seat is already booked, cannot book
  if (seat.status === 'booked_female' || seat.status === 'booked_male') {
    return {
      allowed: false,
      reason: 'This seat is already booked.'
    };
  }

  // Find paired adjacent seat in the same row (if double seat)
  let pairedSeat = null;
  if (seat.pairWith) {
    pairedSeat = allSeats.find(s => s.number === seat.pairWith);
  }

  // If passenger is MALE:
  if (passengerGender === 'male') {
    // Cannot book seats in Ladies Priority Zone (Front 3 rows)
    if (seat.isLadiesPriority) {
      return {
        allowed: false,
        reason: 'Front zone seats are strictly reserved for female commuters and families.'
      };
    }

    // Cannot book adjacent to a female passenger
    if (pairedSeat && pairedSeat.status === 'booked_female') {
      return {
        allowed: false,
        reason: 'Adjacent seat is booked by a solo female passenger. Per transport safety regulations, adjacent seats are reserved for females only.'
      };
    }
  }

  // If passenger is FEMALE:
  if (passengerGender === 'female') {
    // If adjacent seat is booked by a male, give an advisory or block
    if (pairedSeat && pairedSeat.status === 'booked_male') {
      return {
        allowed: false,
        reason: 'Adjacent seat is booked by a male passenger. For your safety and comfort, please choose a seat next to another female, an empty pair, or a single row seat.'
      };
    }
  }

  return {
    allowed: true,
    reason: null
  };
}

export function getSeatBadgeInfo(seat, allSeats, selectedSeatNumbers) {
  const isSelected = selectedSeatNumbers.includes(seat.number);

  if (isSelected) {
    return {
      bg: 'bg-emerald-600 text-white shadow-emerald-200 shadow-md border-emerald-700',
      label: 'Selected',
      icon: 'check'
    };
  }

  if (seat.status === 'booked_female') {
    return {
      bg: 'bg-rose-100 text-rose-700 border-rose-300 opacity-90 cursor-not-allowed',
      label: 'Booked (Female)',
      icon: 'female'
    };
  }

  if (seat.status === 'booked_male') {
    return {
      bg: 'bg-slate-200 text-slate-700 border-slate-300 opacity-90 cursor-not-allowed',
      label: 'Booked (Male)',
      icon: 'male'
    };
  }

  // If available but adjacent to a female, mark as Female-Only
  let pairedSeat = null;
  if (seat.pairWith) {
    pairedSeat = allSeats.find(s => s.number === seat.pairWith);
  }

  if (seat.isLadiesPriority || (pairedSeat && pairedSeat.status === 'booked_female')) {
    return {
      bg: 'bg-teal-50 text-teal-700 border-teal-300 hover:bg-teal-100 cursor-pointer',
      label: 'Ladies Safe Zone',
      icon: 'shield-check'
    };
  }

  return {
    bg: 'bg-white text-slate-700 border-slate-200 hover:border-teal-500 hover:bg-slate-50 cursor-pointer',
    label: 'Available',
    icon: 'chair'
  };
}
