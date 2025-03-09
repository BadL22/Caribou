import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Info, MapPin, Clock, Phone, Mail } from 'lucide-react';
import Slideshow from '../components/Slideshow';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section with Slideshow */}
      <Slideshow images={[
        "/cabin6.jpg",
        "/cabin5.jpg",
        "/lake.jpg",
        "/lake2.jpg",
        "/lake3.jpg"
      ]} />
      
      {/* Booking Buttons below Slideshow */}
      <div className="bg-green-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <h2 className="text-xl font-bold">Ready for your rustic getaway?</h2>
          <div className="flex space-x-4">
            <Link to="/booking" className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-md font-medium">Book Now</Link>
            <Link to="/cabins" className="border border-white hover:bg-green-700 px-6 py-3 rounded-md font-medium">View Cabins</Link>
          </div>
        </div>
      </div>
      
      {/* Location & Quick Info */}
      <div className="bg-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <MapPin size={24} className="text-green-700" />
              <div>
                <h3 className="font-medium">Location</h3>
                <p>239 Carter Side Road</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone size={24} className="text-green-700" />
              <div>
                <h3 className="font-medium">Contact</h3>
                <p>705-257-5434</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock size={24} className="text-green-700" />
              <div>
                <h3 className="font-medium">Check In/Out</h3>
                <p>In: 3PM | Out: 11AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Important Info Section */}
      <div className="py-12 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800">Things to Know Before You Book</h2>
            <p className="mt-2 text-gray-600">Important information to ensure a comfortable stay</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-3">Check-in/Check-out</h3>
              <p>Check-in time is 3:00 PM. Check-out time is 11:00 AM. Late check-outs may incur additional fees.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-3">Amenities</h3>
              <p>Each cabin is unique with different amenities. Some cabins require use of our central shower house. Please review cabin details carefully.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-3">Seasonal Availability</h3>
              <p>Some cabins are not available during winter months (November-March). Check availability calendar for details.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-3">Pet Policy</h3>
              <p>We are pet-friendly. Pets must be kept on leash in common areas and never left unattended in cabins.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-3">Payment</h3>
              <p>50% deposit required to secure booking. Full payment due 14 days prior to arrival. We accept credit cards and e-transfers.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-3">Cancellation Policy</h3>
              <p>Full refund if cancelled 14+ days before check-in. 50% refund if cancelled 7-13 days before check-in. No refund within 7 days.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-green-700 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Rustic Retreat?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">Experience the beauty of nature with all the comforts you need for an unforgettable vacation.</p>
          <Link to="/booking" className="inline-block bg-white text-green-800 px-6 py-3 rounded-md font-medium hover:bg-gray-100">Book Your Cabin Now</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;