import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <div className="flex items-center">
                <img 
                  src="/logo2.jpg" 
                  alt="Caribou Log Cabin Resort Logo" 
                  className="h-12 w-auto mr-2"
                />
                <span>Caribou Log Cabin Resort</span>
              </div>
            </h3>
            <p className="text-gray-300 mb-4">Experience rustic comfort in our beautiful woodland cabins.</p>
            <div className="flex items-center space-x-3 mb-2">
              <MapPin size={16} />
              <span>239 Carter Side Road</span>
            </div>
            <div className="flex items-center space-x-3 mb-2">
              <Phone size={16} />
              <span>705-257-5434</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={16} />
              <span>cariboulogcabinresort@gmail.com</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/cabins" className="text-gray-300 hover:text-white">Our Cabins</Link></li>
              <li><Link to="/booking" className="text-gray-300 hover:text-white">Book Now</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Visit Us</h3>
            <p className="text-gray-300 mb-4">Experience the beauty of nature with all the comforts you need for an unforgettable vacation.</p>
            <div className="mt-4">
              <a href="/booking" className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md inline-block">
                Book Your Stay
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} Caribou Log Cabin Resort. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;