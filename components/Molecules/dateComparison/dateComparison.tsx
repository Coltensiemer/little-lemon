

export function dateComparison(reservation: Array<any>) {
  if (!reservation || reservation.length === 0) return; 

  const today = new Date();
  
  console.log('current', today)

  console.log(reservation)
  const comparisonResults = reservation.map((res) => {
      const reservationDate = new Date(res.date);

      console.log("reservationDate", reservationDate)
      
      if (reservationDate < today) {
          return "Past"; // Reservation has happened in the past
      } else if (reservationDate > today) {
          return "Future"; // Reservation is in the future
      } else {
          return "Today"; // Reservation is for the current day
      }
  });

  return comparisonResults;
}