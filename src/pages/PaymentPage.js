import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CreditCard, CheckCircle, XCircle, Shield, ArrowLeft } from 'lucide-react';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [booking, setBooking] = useState({
    cabinId: queryParams.get('cabinId'),
    cabinName: queryParams.get('cabinName'),
    checkIn: queryParams.get('checkIn'),
    checkOut: queryParams.get('checkOut'),
    adults: queryParams.get('adults'),
    children: queryParams.get('children'),
    totalAmount: queryParams.get('totalAmount')
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: ''
  });
  
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  
  useEffect(() => {
    // If booking data is missing, redirect to home
    if (!booking.cabinId || !booking.totalAmount) {
      navigate('/');
    }
  }, [booking, navigate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value
    });
  };
  
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      
      // 90% chance of success (for demo purposes)
      if (Math.random() < 0.9) {
        setPaymentComplete(true);
      } else {
        setPaymentError(true);
      }
    }, 2000);
  };
  
  const resetPayment = () => {
    setPaymentError(false);
    setPaymentComplete(false);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const calculateDepositAmount = () => {
    if (!booking.totalAmount) return 0;
    return parseFloat(booking.totalAmount) * 0.5;
  };

  if (paymentComplete) {
    return (
      <div className="py-12 bg-amber-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-green-100 mx-auto rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for booking with Caribou Log Cabin Resort. Your deposit payment was successful.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left mb-6">
              <h3 className="text-lg font-bold text-green-800 mb-4">Booking Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Cabin:</span>
                  <span>{booking.cabinName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Check-in:</span>
                  <span>{formatDate(booking.checkIn)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Check-out:</span>
                  <span>{formatDate(booking.checkOut)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Guests:</span>
                  <span>{booking.adults} adults, {booking.children} children</span>
                </div>
                
                <div className="border-t border-gray-300 pt-3 mt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${booking.totalAmount}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-800 font-bold mt-1">
                    <span>Deposit paid:</span>
                    <span>${calculateDepositAmount().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 mt-1">
                    <span>Balance due at check-in:</span>
                    <span>${(booking.totalAmount - calculateDepositAmount()).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              A confirmation email has been sent to your email address with all the details.
            </p>
            
            <Link to="/"
              className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium inline-block"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (paymentError) {
    return (
      <div className="py-12 bg-amber-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-red-100 mx-auto rounded-full flex items-center justify-center mb-4">
              <XCircle size={32} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-800 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">
              We were unable to process your payment. Please try again with a different payment method.
            </p>
            
            <button 
              onClick={resetPayment}
              className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6">
          <Link to={`/cabin/${booking.cabinId}`} className="text-green-700 hover:text-green-800 flex items-center">
            <ArrowLeft size={16} className="mr-1" /> Back to Booking
          </Link>
        </nav>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Secure Payment</h1>
          <p className="mt-2 text-gray-600">Complete your booking by paying the deposit</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-green-800 mb-6">Payment Details</h2>
              
              <div className="mb-6">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange('credit-card')}
                    className={`flex-1 py-3 px-4 border rounded-md flex items-center justify-center ${
                      paymentMethod === 'credit-card' 
                        ? 'border-green-600 bg-green-50 text-green-800' 
                        : 'border-gray-300'
                    }`}
                  >
                    <CreditCard size={20} className="mr-2" />
                    <span>Credit Card</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange('paypal')}
                    className={`flex-1 py-3 px-4 border rounded-md flex items-center justify-center ${
                      paymentMethod === 'paypal' 
                        ? 'border-green-600 bg-green-50 text-green-800' 
                        : 'border-gray-300'
                    }`}
                  >
                    <span className="font-bold">Pay</span>
                    <span className="text-blue-600 font-bold">Pal</span>
                  </button>
                </div>
              </div>
              
              {paymentMethod === 'credit-card' && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Name on Card</label>
                      <input 
                        type="text" 
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Card Number</label>
                      <input 
                        type="text" 
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">Expiry Date</label>
                        <input 
                          type="text" 
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">Security Code</label>
                        <input 
                          type="text" 
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handleInputChange}
                          placeholder="CVV"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Billing Address</label>
                      <input 
                        type="text" 
                        name="billingAddress"
                        value={paymentData.billingAddress}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">City</label>
                        <input 
                          type="text" 
                          name="billingCity"
                          value={paymentData.billingCity}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">State</label>
                        <input 
                          type="text" 
                          name="billingState"
                          value={paymentData.billingState}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">Zip Code</label>
                        <input 
                          type="text" 
                          name="billingZip"
                          value={paymentData.billingZip}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        required
                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 text-gray-700">
                        I agree to the <a href="#" className="text-green-700 hover:underline">terms and conditions</a>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center text-sm text-gray-600 mt-6 mb-6">
                    <Shield size={16} className="mr-1" />
                    <span>Payments are secure and encrypted</span>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-green-700 hover:bg-green-600 text-white py-3 rounded-md font-medium"
                    disabled={processing}
                  >
                    {processing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay Deposit: ${calculateDepositAmount().toFixed(2)}`
                    )}
                  </button>
                </form>
              )}
              
              {paymentMethod === 'paypal' && (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-6">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                  <button 
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
                    disabled={processing}
                  >
                    {processing ? 'Processing...' : 'Continue to PayPal'}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Booking Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-green-800 mb-4">Booking Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Cabin:</span>
                  <span>{booking.cabinName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Check-in:</span>
                  <span>{formatDate(booking.checkIn)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Check-out:</span>
                  <span>{formatDate(booking.checkOut)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Guests:</span>
                  <span>{booking.adults} adults, {booking.children} children</span>
                </div>
                
                <div className="border-t border-gray-300 pt-3 mt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${booking.totalAmount}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-800 font-bold mt-1">
                    <span>Deposit (50%):</span>
                    <span>${calculateDepositAmount().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 mt-1">
                    <span>Balance due:</span>
                    <span>${(booking.totalAmount - calculateDepositAmount()).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-300">
                <h3 className="font-medium text-green-800 mb-2">Cancellation Policy</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Full refund if cancelled 14+ days before check-in</li>
                  <li>• 50% refund if cancelled 7-13 days before check-in</li>
                  <li>• No refund within 7 days of check-in</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;