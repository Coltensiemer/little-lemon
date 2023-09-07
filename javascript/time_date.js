export function formatTime({ hours, minutes }) {
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}:00`;
  }

  // Formates the date that is rendered
  export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' }
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }
