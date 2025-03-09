import React from 'react';
import { Bed, Utensils, Droplet, Bath, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cabin = ({ cabin, availableInWinter }) => {
  const { id, name, description, price, sleeps, amenities, images, winterAvailable, galleryImages } = cabin;
  
  // If cabin is not available in winter and we're showing winter cabins, don't render
  if (!availableInWinter && !winterAvailable) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/cabin/${id}`} className="block">
        <div className="h-48 bg-gray-300 relative">
          {galleryImages && galleryImages.length > 0 ? (
            <img 
              src={galleryImages[0]} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-500">Image Coming Soon</span>
            </div>
          )}
          
          {!winterAvailable && (
            <div className="absolute top-2 right-2 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              Summer Only
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/cabin/${id}`} className="block">
          <h3 className="text-xl font-bold text-green-800 hover:text-green-600">{name}</h3>
        </Link>
        <p className="text-gray-600 mt-2">{description}</p>
        
        <div className="mt-4">
          <div className="flex items-center">
            <Bed size={16} className="text-green-700 mr-2" />
            <span>Sleeps {sleeps} guests</span>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {amenities.kitchen && (
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                <Utensils size={12} className="mr-1" /> Full Kitchen
              </span>
            )}
            
            {amenities.plumbing && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                <Droplet size={12} className="mr-1" /> Running Water
              </span>
            )}
            
            {amenities.bathroom && (
              <span className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                <Bath size={12} className="mr-1" /> Private Bathroom
              </span>
            )}
            
            {!amenities.bathroom && (
              <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                <XCircle size={12} className="mr-1" /> Shower House Access
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xl font-bold text-green-800">${price}/night</div>
          <Link 
            to={`/cabin/${id}`}
            className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md inline-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cabin;