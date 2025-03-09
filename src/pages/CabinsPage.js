import React from 'react';
import { Link } from 'react-router-dom';
import Cabin from '../components/Cabin';
import cabinsData from '../data/cabinsData';

const CabinsPage = ({ isSummerSeason }) => {
  return (
    <div className="py-12 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800">Our Cabins</h2>
          <p className="mt-2 text-gray-600">
            {isSummerSeason ? 
              "All cabins available during summer season" : 
              "Limited cabins available during winter season"}
          </p>
        </div>
        
        {/* Season Toggle Info */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 text-center">
          <p className="text-gray-700">
            Currently showing cabins for: 
            <span className="font-bold text-green-800 ml-2">
              {isSummerSeason ? "Summer Season" : "Winter Season"}
            </span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {isSummerSeason ? 
              "All 4 cabins are available during summer months (April-October)" : 
              "Only select cabins are available during winter months (November-March)"}
          </p>
        </div>
        
        {/* Cabins Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {cabinsData.map(cabin => (
            <Cabin 
              key={cabin.id} 
              cabin={cabin} 
              availableInWinter={isSummerSeason} 
            />
          ))}
        </div>
        
        {/* No Cabins Message (only shows in winter if all cabins are filtered out) */}
        {!isSummerSeason && cabinsData.filter(cabin => cabin.winterAvailable).length === 0 && (
          <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">No Cabins Available</h3>
            <p className="mt-2 text-gray-600">
              All of our cabins are closed during the winter season. Please check back during our summer season.
            </p>
          </div>
        )}
        
        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/booking" className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium">Book Your Stay</Link>
        </div>
      </div>
    </div>
  );
};

export default CabinsPage;