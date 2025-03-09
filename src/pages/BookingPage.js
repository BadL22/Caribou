import React, { useState, useEffect } from 'react';
import cabinsData from '../data/cabinsData';

const BookingPage = ({ isSummerSeason }) => {
  const [selectedCabin, setSelectedCabin] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState({});
  const [selectedCabinObj, setSelectedCabinObj] = useState(null);
  
  // Make sure cabinsData is an array
  const cabinsArray = Array.isArray(cabinsData) ? cabinsData : [];
  
  // Filter cabins based on season
  const availableCabins = isSummerSeason 
    ? cabinsArray 
    : cabinsArray.filter(cabin => cabin.winterAvailable);
  
  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('cabinBookings');
    if (savedBookings) {
      try {
        const bookingsData = JSON.parse(savedBookings);
        setUnavailableDates(bookingsData);
      } catch (error) {
        console.error("Error loading saved bookings:", error);
      }
    }
  }, []);
  
  // Update selected cabin object when cabin ID changes
  useEffect(() => {
    if (selectedCabin) {
      const cabin = availableCabins.find(c => c.id.toString() === selectedCabin.toString());
      setSelectedCabinObj(cabin);
      
      // Reset dates when cabin changes
      setCheckInDate('');
      setCheckOutDate('');
    } else {
      setSelectedCabinObj(null);
    }
  }, [selectedCabin, availableCabins]);
  
  // Function to check if a date is already booked
  const isDateBooked = (date, cabinId) => {
    if (!cabinId || !date) return false;
    
    const cabinBookings = unavailableDates[cabinId] || [];
    return cabinBookings.some(booking => {
      const bookingStart = new Date(booking.checkIn);
      const bookingEnd = new Date(booking.checkOut);
      const checkDate = new Date(date);
      
      // Set all dates to midnight for comparison
      bookingStart.setHours(0, 0, 0, 0);
      bookingEnd.setHours(0, 0, 0, 0);
      checkDate.setHours(0, 0, 0, 0);
      
      // Check if date falls within a booking period (inclusive)
      return checkDate >= bookingStart && checkDate <= bookingEnd;
    });
  };
  
  // Generate array of dates between start and end
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Set to midnight for comparison
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    // Current date for loop
    let current = new Date(start);
    
    // Add each date in the range
    while (current <= end) {
      dates.push(new Date(current).toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  };
  
  // Check if entire date range is available
  const isDateRangeAvailable = (startDate, endDate, cabinId) => {
    if (!startDate || !endDate || !cabinId) return true;
    
    const dateRange = getDatesInRange(startDate, endDate);
    return !dateRange.some(date => isDateBooked(date, cabinId));
  };
  
  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckInDate(newCheckIn);
    
    // Reset checkout if it's before new checkin
    if (checkOutDate && new Date(checkOutDate) <= new Date(newCheckIn)) {
      setCheckOutDate('');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedCabin || !checkInDate || !checkOutDate) {
      alert("Please complete all required fields.");
      return;
    }
    
    // Check if date range is available
    if (!isDateRangeAvailable(checkInDate, checkOutDate, selectedCabin)) {
      alert("Sorry, some dates in your selected range are already booked. Please choose different dates.");
      return;
    }
    
    // Create new booking
    const newBooking = {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults,
      children,
      bookingDate: new Date().toISOString()
    };
    
    // Update unavailable dates
    const updatedUnavailableDates = { ...unavailableDates };
    if (!updatedUnavailableDates[selectedCabin]) {
      updatedUnavailableDates[selectedCabin] = [];
    }
    updatedUnavailableDates[selectedCabin].push(newBooking);
    
    // Save to localStorage and update state
    localStorage.setItem('cabinBookings', JSON.stringify(updatedUnavailableDates));
    setUnavailableDates(updatedUnavailableDates);
    
    // Show success message
    setBookingSuccess(true);
  };
  
  // Function to get minimum check-in date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  // Function to get minimum check-out date (check-in date or today)
  const getMinCheckoutDate = () => {
    if (checkInDate) {
      const dayAfterCheckin = new Date(checkInDate);
      dayAfterCheckin.setDate(dayAfterCheckin.getDate() + 1);
      return dayAfterCheckin.toISOString().split('T')[0];
    }
    return getMinDate();
  };

  if (bookingSuccess) {
    return (
      <div className="py-12 bg-amber-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-green-100 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Booking Successful!</h2>
            <p className="text-gray-600 mb-2">
              Thank you for booking with Caribou Log Cabin Resort. You will receive a confirmation email shortly.
            </p>
            <div className="bg-green-50 p-4 rounded-md my-4 text-left">
              <h3 className="font-bold text-green-800 mb-2">Booking Details:</h3>
              <p><span className="font-medium">Cabin:</span> {selectedCabinObj?.name}</p>
              <p><span className="font-medium">Check-in:</span> {new Date(checkInDate).toLocaleDateString()}</p>
              <p><span className="font-medium">Check-out:</span> {new Date(checkOutDate).toLocaleDateString()}</p>
              <p><span className="font-medium">Guests:</span> {adults} adults, {children} children</p>
            </div>
            <button 
              onClick={() => {
                setBookingSuccess(false);
                setSelectedCabin(null);
                setCheckInDate('');
                setCheckOutDate('');
              }}
              className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium"
            >
              Book Another Cabin
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800">Book Your Stay</h2>
          <p className="mt-2 text-gray-600">
            {isSummerSeason ? 
              "All cabins available during summer season" : 
              "Limited cabins available during winter season"}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Select Cabin</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={selectedCabin || ""}
                  onChange={(e) => setSelectedCabin(e.target.value)}
                  required
                >
                  <option value="">Select a cabin...</option>
                  {availableCabins && availableCabins.length > 0 ? (
                    availableCabins.map(cabin => (
                      <option key={cabin.id} value={cabin.id}>
                        {cabin.name} - Sleeps {cabin.sleeps} - ${cabin.price}/night
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No cabins available</option>
                  )}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Check In</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={checkInDate}
                    onChange={handleCheckInChange}
                    min={getMinDate()}
                    required
                    disabled={!selectedCabin}
                  />
                  {selectedCabin && (
                    <div className="mt-1 text-xs text-gray-500">
                      Select an available date
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Check Out</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={getMinCheckoutDate()}
                    required
                    disabled={!checkInDate}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Adults</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Children</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Contact Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            {/* Show unavailable dates warning if needed */}
            {selectedCabin && unavailableDates[selectedCabin] && unavailableDates[selectedCabin].length > 0 && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <h4 className="font-medium text-amber-800 mb-2">Unavailable Dates:</h4>
                <p className="text-sm text-amber-700">
                  This cabin has existing bookings. Please select different dates if your preferred dates are unavailable.
                </p>
                <div className="mt-2 text-sm">
                  {unavailableDates[selectedCabin].map((booking, index) => (
                    <div key={index} className="text-gray-600">
                      {new Date(booking.checkIn).toLocaleDateString()} to {new Date(booking.checkOut).toLocaleDateString()}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <button 
                type="submit"
                className="w-full bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium"
                disabled={
                  !selectedCabin || 
                  !checkInDate || 
                  !checkOutDate || 
                  (selectedCabin && checkInDate && checkOutDate && !isDateRangeAvailable(checkInDate, checkOutDate, selectedCabin))
                }
              >
                Complete Booking
              </button>
              
              {/* Show unavailable warning if dates are already booked */}
              {selectedCabin && checkInDate && checkOutDate && !isDateRangeAvailable(checkInDate, checkOutDate, selectedCabin) && (
                <p className="mt-2 text-sm text-red-600">
                  Sorry, some of these dates are already booked. Please select different dates.
                </p>
              )}
            </div>
          </form>
        </div>
        
        {/* Booking Policies */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-green-800 mb-4">Booking Policies</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-800 mb-2">Payment Policy</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>50% deposit required to secure booking</li>
                <li>Full payment due 14 days prior to arrival</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-green-800 mb-2">Cancellation Policy</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Full refund if cancelled 14+ days before check-in</li>
                <li>50% refund if cancelled 7-13 days before check-in</li>
                <li>No refund for cancellations within 7 days of check-in</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;