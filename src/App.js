import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CabinsPage from './pages/CabinsPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import CabinDetailPage from './pages/CabinDetailPage';
import PaymentPage from './pages/PaymentPage';
import './App.css';

function App() {
  // State to track current season
  const [isSummerSeason, setIsSummerSeason] = useState(true);
  
  // Function to toggle season
  const toggleSeason = () => {
    setIsSummerSeason(!isSummerSeason);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-amber-50">
        <Navbar toggleSeason={toggleSeason} isSummerSeason={isSummerSeason} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cabins" element={<CabinsPage isSummerSeason={isSummerSeason} />} />
            <Route path="/cabin/:id" element={<CabinDetailPage isSummerSeason={isSummerSeason} />} />
            <Route path="/booking" element={<BookingPage isSummerSeason={isSummerSeason} />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;