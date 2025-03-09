import React, { useState } from 'react';
import Cabin from './Cabin'; // Assuming Cabin.js is in the same directory
import cabinsData from '../data/cabinsData'; // Update path if needed

const CabinsList = ({ showWinterOnly = false }) => {
  // Input validation - ensure cabinsData is an array
  const cabinsArray = Array.isArray(cabinsData) ? cabinsData : [];
  
  // For debugging
  console.log('cabinsData type:', typeof cabinsData);
  console.log('Is Array?', Array.isArray(cabinsData));
  console.log('cabinsData length:', cabinsArray.length);
  
  // State for filtering
  const [filterWinter, setFilterWinter] = useState(showWinterOnly);
  
  // Filter cabins based on winter availability if needed
  const filteredCabins = filterWinter 
    ? cabinsArray.filter(cabin => cabin.winterAvailable) 
    : cabinsArray;
  
  return (
    <div className="py-12 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800">Our Cabins</h2>
          <p className="mt-2 text-gray-600">
            Discover our selection of comfortable and scenic accommodations
          </p>
          
          {/* Filter toggle */}
          <div className="mt-4">
            <button 
              onClick={() => setFilterWinter(!filterWinter)}
              className={`px-4 py-2 rounded-md ${
                filterWinter 
                  ? 'bg-green-700 text-white' 
                  : 'bg-white text-green-700 border border-green-700'
              }`}
            >
              {filterWinter ? 'Show All Cabins' : 'Show Winter Available Only'}
            </button>
          </div>
        </div>
        
        {/* Error handling */}
        {!Array.isArray(cabinsArray) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error loading cabin data. Please try again later.
          </div>
        )}
        
        {/* Empty state */}
        {Array.isArray(cabinsArray) && cabinsArray.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No cabins available at this time.</p>
          </div>
        )}
        
        {/* Cabins grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCabins.map(cabin => (
            <Cabin 
              key={cabin.id} 
              cabin={cabin} 
              availableInWinter={filterWinter} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CabinsList;