import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Snowflake } from 'lucide-react';
import Logo from './Logo';

const Navbar = ({ toggleSeason, isSummerSeason }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="bg-green-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center">
                <img 
                  src="/logo2.jpg" 
                  alt="Caribou Log Cabin Resort Logo" 
                  className="h-10 w-auto mr-2"
                />
                <span className="text-xl font-bold">Caribou Log Cabin Resort</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">Home</Link>
            <Link to="/cabins" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">Our Cabins</Link>
            <Link to="/booking" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">Book Now</Link>
            <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">Contact</Link>
            <button 
              onClick={toggleSeason} 
              className="flex items-center ml-4 px-3 py-2 rounded-md text-sm font-medium bg-green-700 hover:bg-green-600"
            >
              {isSummerSeason ? (
                <>
                  <Snowflake size={16} className="mr-1" /> Winter Mode
                </>
              ) : (
                <>
                  <Sun size={16} className="mr-1" /> Summer Mode
                </>
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">Home</Link>
            <Link to="/cabins" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">Our Cabins</Link>
            <Link to="/booking" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">Book Now</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">Contact</Link>
            <button 
              onClick={toggleSeason} 
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
            >
              {isSummerSeason ? "Switch to Winter Mode" : "Switch to Summer Mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;