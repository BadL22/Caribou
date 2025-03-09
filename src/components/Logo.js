import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/logo.png" 
        alt="Caribou Log Cabin Resort" 
        className="h-12 w-auto mr-2" 
      />
    </Link>
  );
};

export default Logo;