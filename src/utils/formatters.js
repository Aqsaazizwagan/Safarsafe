export function formatPKR(amount) {
  if (amount === undefined || amount === null) return 'Rs. 0';
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`;
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-PK', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function generatePNR() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'SFR-';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateTrxId(gateway) {
  const randNum = Math.floor(10000000 + Math.random() * 90000000);
  switch (gateway) {
    case 'EasyPaisa':
      return `EP-${randNum}`;
    case 'JazzCash':
      return `JC-${randNum}`;
    case 'Raast':
      return `RAAST-PK-${randNum}`;
    case 'Card':
      return `PAY-CARD-${randNum}`;
    default:
      return `TRX-${randNum}`;
  }
}

export function maskPhone(phone) {
  if (!phone) return '';
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 11) {
    return `${clean.slice(0, 4)}-${clean.slice(4)}`;
  }
  return phone;
}

export function maskCNIC(cnic) {
  if (!cnic) return '';
  const clean = cnic.replace(/\D/g, '');
  if (clean.length === 13) {
    return `${clean.slice(0, 5)}-${clean.slice(5, 12)}-${clean.slice(12)}`;
  }
  return cnic;
}
