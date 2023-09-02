





export function dateComparison(reservation:string) {
  if (!reservation || reservation.length === 0) return null;

  const today = new Date();

  const reservationDate = new Date(reservation);

  if (reservationDate < today) {
    return 'Past'; 
  } else if (reservationDate > today) {
    return 'Future'; 
  } else {
    return 'Today'; 
  }
}
