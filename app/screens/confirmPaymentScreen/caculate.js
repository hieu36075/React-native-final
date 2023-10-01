export function formatDateRange(checkIn, checkOut) {
    const options = { month: 'short', day: 'numeric' };
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
  
    const checkInFormatted = checkInDate.toLocaleDateString('en-US', options);
    const checkOutFormatted = checkOutDate.toLocaleDateString('en-US', options);
  
    return `${checkInFormatted} - ${checkOutFormatted}`;
  }

 export  function calculateNumberOfDays(checkIn, checkOut) {
    const oneDay = 24 * 60 * 60 * 1000; // Số mili giây trong một ngày
  
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
  
    // Tính toán số mili giây giữa hai ngày
    const differenceInMilliseconds = Math.abs(checkOutDate - checkInDate);
  
    // Chuyển đổi số mili giây thành số ngày
    const numberOfDays = Math.round(differenceInMilliseconds / oneDay);
  
    return numberOfDays;
  }

