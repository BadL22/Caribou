import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Bed, Utensils, Droplet, Bath, XCircle, Calendar, Maximize } from 'lucide-react';
import cabinsData from '../data/cabinsData';

const CabinDetailPage = ({ isSummerSeason }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cabin, setCabin] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  
  // Form state
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    name: '',
    email: '',
    phone: ''
  });
  
  useEffect(() => {
    // Find the cabin matching the ID
    const foundCabin = cabinsData.find(cabin => cabin.id === parseInt(id));
    
    // If cabin not found or not available in winter and season is winter, redirect
    if (!foundCabin || (!isSummerSeason && !foundCabin.winterAvailable)) {
      navigate('/cabins');
      return;
    }
    
    setCabin(foundCabin);
  }, [id, isSummerSeason, navigate]);

  if (!cabin) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading cabin details...</div>
      </div>
    );
  }

  const nextImage = () => {
    if (cabin.galleryImages && cabin.galleryImages.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === cabin.galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (cabin.galleryImages && cabin.galleryImages.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? cabin.galleryImages.length - 1 : prevIndex - 1
      );
    }
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
  };

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the booking
    // For now, just redirect to the payment page with the data
    
    const queryParams = new URLSearchParams({
      cabinId: cabin.id,
      cabinName: cabin.name,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      adults: bookingData.adults,
      children: bookingData.children,
      totalAmount: calculateTotalPrice()
    }).toString();
    
    navigate(`/payment?${queryParams}`);
  };

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights();
    return nights * cabin.price;
  };

  return (
    <div className="py-12 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6">
          <Link to="/cabins" className="text-green-700 hover:text-green-800">
            ← Back to All Cabins
          </Link>
        </nav>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Fullscreen Modal */}
          {fullscreen && (
            <div 
              className="fixed inset-0 bg-black z-50 flex items-center justify-center"
              onClick={toggleFullscreen}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <button 
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
                  onClick={toggleFullscreen}
                >
                  <XCircle size={24} />
                </button>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10"
                >
                  ←
                </button>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10"
                >
                  →
                </button>
                
                <img 
                  src={cabin.galleryImages[currentImageIndex]} 
                  alt={`${cabin.name} - Image ${currentImageIndex + 1}`}
                  className="max-h-screen max-w-full object-contain"
                />
              </div>
            </div>
          )}
          
          {/* Gallery */}
          <div className="relative h-128 bg-gray-300">
            {cabin.galleryImages && cabin.galleryImages.length > 0 ? (
              <>
                <img 
                  src={cabin.galleryImages[currentImageIndex]} 
                  alt={`${cabin.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  ←
                </button>
                
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  →
                </button>
                
                <button 
                  onClick={toggleFullscreen}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <Maximize size={20} />
                </button>
                
                <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-1">
                  Image {currentImageIndex + 1} of {cabin.galleryImages.length}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500">No images available</span>
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          {cabin.galleryImages && cabin.galleryImages.length > 0 && (
            <div className="flex overflow-x-auto p-2 bg-gray-100">
              {cabin.galleryImages.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${cabin.name} thumbnail ${index + 1}`}
                  className={`h-24 w-32 object-cover cursor-pointer mr-2 ${currentImageIndex === index ? 'border-2 border-green-600' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
          
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-green-800">{cabin.name}</h1>
                {!cabin.winterAvailable && (
                  <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                    Summer Season Only
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold text-green-800">${cabin.price}/night</div>
            </div>
            
            <div className="mt-4 grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-green-800 mb-4">Cabin Details</h2>
                
                {cabin.id === 1 ? (
                  <div className="text-gray-700 mb-6">
                    <p className="mb-3">
                      Cabin 6 offers a perfect lakeside getaway with a private dock and scenic lake views. This spacious cabin features warm pine interiors throughout, with two comfortable bedrooms, a charming loft space, and a couch for additional sleeping arrangements.
                    </p>
                    <p className="mb-3">
                      The fully-equipped kitchen includes a refrigerator, stove, microwave, and all necessary cookware and utensils. Outside, you'll find a BBQ grill for outdoor cooking and a fire pit by the lake - perfect for evening gatherings and marshmallow roasting.
                    </p>
                    <p>
                      While this rustic cabin doesn't have indoor plumbing, the shower house is conveniently located directly across from the cabin. The cabin's proximity to the lake makes it ideal for fishing, swimming, and enjoying water activities.
                    </p>
                  </div>
                ) : cabin.id === 2 ? (
                  <div className="text-gray-700 mb-6">
                    <p className="mb-3">
                      Family Retreat is our deluxe cabin perfect for families looking for comfort and amenities. This well-appointed cabin features full plumbing, a private bathroom with a stand-up shower, and a complete kitchen - everything you need for a comfortable stay.
                    </p>
                    <p className="mb-3">
                      With two bedrooms, a loft space, and a sofa, this cabin comfortably accommodates up to 6 people. The spacious interior features warm pine walls and ceilings, creating a cozy atmosphere that perfectly complements the natural surroundings.
                    </p>
                    <p>
                      Step outside onto the spacious deck equipped with a BBQ grill and outdoor seating - ideal for alfresco dining while enjoying the beautiful lake views. The cabin's waterfront location with private dock access makes it easy to enjoy swimming, fishing, and water activities during your stay.
                    </p>
                  </div>
                ) : cabin.id === 3 ? (
                  <div className="text-gray-700 mb-6">
                    <p className="mb-3">
                      Cabin 5 offers a spacious retreat with authentic log cabin charm. Featuring three cozy bedrooms, this cabin is perfect for families or small groups looking for a rustic woodland experience.
                    </p>
                    <p className="mb-3">
                      The well-equipped kitchen area includes a refrigerator and stove, allowing you to prepare meals in the comfort of your cabin. The comfortable living space with a couch and chair provides a perfect spot to relax after a day of outdoor activities.
                    </p>
                    <p>
                      While this rustic cabin doesn't include running water, the shower house and outhouse facilities are conveniently located nearby. The outdoor deck area offers a wonderful space for outdoor dining and enjoying the natural surroundings.
                    </p>
                  </div>
                ) : cabin.id === 4 ? (
                  <div className="text-gray-700 mb-6">
                    <p className="mb-3">
                      Cabin 4 is a charming, intimate retreat perfect for couples seeking a rustic getaway. This cozy log cabin offers a warm, inviting atmosphere with authentic woodland charm.
                    </p>
                    <p className="mb-3">
                      Inside you'll find a comfortable bedroom and a cozy living area with a sofa. The cabin includes a kitchenette with a stove and refrigerator, allowing you to prepare simple meals during your stay.
                    </p>
                    <p>
                      While this cabin maintains its rustic character without running water, the nearby shower house provides all necessary facilities. The cabin's peaceful setting offers the perfect escape for couples looking to disconnect and enjoy nature together.
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-700 mb-6">{cabin.description}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Bed size={20} className="text-green-700 mr-2" />
                    <span>Sleeps {cabin.sleeps} guests</span>
                  </div>
                  
                  {cabin.amenities.bedrooms && (
                    <div className="flex items-center">
                      <span className="font-medium">Bedrooms:</span>
                      <span className="ml-2">{cabin.amenities.bedrooms}</span>
                    </div>
                  )}
                  
                  {cabin.amenities.loft && (
                    <div className="flex items-center">
                      <span className="font-medium">Loft:</span>
                      <span className="ml-2">Yes</span>
                    </div>
                  )}
                  
                  {cabin.amenities.sofa && (
                    <div className="flex items-center">
                      <span className="font-medium">Sleeper Sofa:</span>
                      <span className="ml-2">Yes</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-green-800 mt-6 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {cabin.amenities.kitchen && (
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      <Utensils size={12} className="mr-1" /> Full Kitchen
                    </span>
                  )}
                  
                  {cabin.amenities.plumbing && (
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      <Droplet size={12} className="mr-1" /> Running Water
                    </span>
                  )}
                  
                  {cabin.amenities.bathroom && (
                    <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                      <Bath size={12} className="mr-1" /> Private Bathroom
                    </span>
                  )}
                  
                  {!cabin.amenities.bathroom && (
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      <XCircle size={12} className="mr-1" /> Shower House Access
                    </span>
                  )}
                  
                  {cabin.amenities.dock && (
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
                      </svg>
                      Private Dock
                    </span>
                  )}
                  
                  {cabin.amenities.firePit && (
                    <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                      Fire Pit
                    </span>
                  )}
                  
                  {cabin.amenities.bbq && (
                    <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      BBQ
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                {showBookingForm ? (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-green-800 mb-4">Book {cabin.name}</h2>
                    
                    <form onSubmit={handleBookingSubmit}>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-1">Check In</label>
                            <input 
                              type="date" 
                              name="checkIn"
                              value={bookingData.checkIn}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-1">Check Out</label>
                            <input 
                              type="date" 
                              name="checkOut"
                              value={bookingData.checkOut}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-1">Adults</label>
                            <select 
                              name="adults"
                              value={bookingData.adults}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-1">Children</label>
                            <select 
                              name="children"
                              value={bookingData.children}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              {[0, 1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                          <input 
                            type="text" 
                            name="name"
                            value={bookingData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">Email</label>
                          <input 
                            type="email" 
                            name="email"
                            value={bookingData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">Phone</label>
                          <input 
                            type="tel" 
                            name="phone"
                            value={bookingData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                      </div>
                      
                      {calculateNights() > 0 && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-md">
                          <div className="flex justify-between mb-2">
                            <span>${cabin.price} x {calculateNights()} nights</span>
                            <span>${cabin.price * calculateNights()}</span>
                          </div>
                          <div className="border-t border-gray-300 pt-2 mt-2 font-bold flex justify-between">
                            <span>Total</span>
                            <span>${calculateTotalPrice()}</span>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            50% deposit required: ${calculateTotalPrice() * 0.5}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <button 
                          type="submit"
                          className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded-md font-medium"
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-green-800 mb-4">Booking Information</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Calendar size={20} className="text-green-700 mr-2" />
                        <span>Availability: {cabin.winterAvailable ? 'Year-round' : 'Summer season only (April-October)'}</span>
                      </div>
                      
                      <p className="text-gray-700">
                        {cabin.name} is one of our most popular cabins. Book early to secure your dates.
                      </p>
                      
                      <div className="mt-4">
                        <h3 className="font-medium text-green-800 mb-2">Important Notes</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          <li>Check-in: 3:00 PM, Check-out: 11:00 AM</li>
                          <li>50% deposit required to secure booking</li>
                          <li>Full payment due 14 days prior to arrival</li>
                          <li>Cancellation policy applies</li>
                        </ul>
                      </div>
                      
                      <div className="mt-6">
                        <button 
                          onClick={handleBookNow}
                          className="w-full bg-green-700 hover:bg-green-600 text-white py-3 rounded-md font-medium"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinDetailPage;