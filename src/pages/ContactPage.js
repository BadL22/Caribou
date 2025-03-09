import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    // This is just a simulation for the demo
    setTimeout(() => {
      setFormSubmitted(true);
    }, 1000);
  };
  
  if (formSubmitted) {
    return (
      <div className="py-12 bg-amber-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-green-100 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting Caribou Log Cabin Resort. We'll get back to you as soon as possible.
            </p>
            <button 
              onClick={() => setFormSubmitted(false)}
              className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800">Contact Us</h2>
          <p className="mt-2 text-gray-600">We'd love to hear from you. Get in touch with us!</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin size={20} className="text-green-700" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-gray-600">239 Carter Side Road</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone size={20} className="text-green-700" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-gray-600">705-257-5434</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-green-700" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">cariboulogcabinresort@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock size={20} className="text-green-700" />
                  <div>
                    <h4 className="font-medium">Office Hours</h4>
                    <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Monday - Saturday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Your Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit"
                    className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;