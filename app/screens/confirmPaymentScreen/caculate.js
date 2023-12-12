export function formatDateRange(checkIn, checkOut) {
    const options = { month: 'short', day: 'numeric' };
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
  
    const checkInFormatted = checkInDate.toLocaleDateString('en-US', options);
    const checkOutFormatted = checkOutDate.toLocaleDateString('en-US', options);
  
    return `${checkInFormatted} - ${checkOutFormatted}`;
  }

 export  function calculateNumberOfDays(checkIn, checkOut) {
    const oneDay = 24 * 60 * 60 * 1000; 
  
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
  
   
    const differenceInMilliseconds = Math.abs(checkOutDate - checkInDate);
  
   
    const numberOfDays = Math.round(differenceInMilliseconds / oneDay);
  
    return numberOfDays;
  }

