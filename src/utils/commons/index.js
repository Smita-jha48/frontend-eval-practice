const getFormattedDateFromUtcDate = (utcDate, timeZone) => {
    const date = new Date(utcDate);
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timezone: { timeZone },
      timeZoneName: 'short',
      hour12: false,
    };
  
    return date.toLocaleString('en-US', options);
  };
  
  export default getFormattedDateFromUtcDate;