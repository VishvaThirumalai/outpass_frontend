// src/components/Contact.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
  FiClock,
  FiHome,
  FiUser,
  FiMessageSquare,
  FiArrowLeft
} from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: "Visit Our Campus",
      details: ["MIT Campus, Anna University", "Chromepet, Chennai", "Tamil Nadu - 600044"],
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+91 44 2251 6000", "Hostel Office: +91 7092980042", "Emergency: 24/7 Support"],
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Email Us",
      details: ["hostel@mit.edu", "support@mithostels.edu", "info@mitchennai.edu"],
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Office Hours",
      details: ["Mon - Fri: 9:00 AM - 5:00 PM", "Saturday: 9:00 AM - 1:00 PM", "Sunday: Emergency Only"],
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-poppins">
      {/* Header - Consistent with Dashboard */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src="/mit-logo1.jpg" 
                    alt="MIT Hostel" 
                    className="h-14 w-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="h-14 w-14 bg-blue-600 flex items-center justify-center text-white font-bold text-lg rounded-lg hidden">
                    MIT
                  </div>
                </div>
                <div className="text-gray-900">
                  <h1 className="text-2xl font-bold">MIT Hostels</h1>
                  <h2 className="text-sm font-semibold text-gray-700">Anna University - Contact Us</h2>
                </div>
              </div>
            </div>

            {/* Back to Home Button */}
            <Link 
              to="/" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 shadow-md"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 lg:py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Get In Touch With Us
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 mb-8 leading-relaxed">
              We're here to help! Reach out to our hostel administration team for any queries or assistance.
            </p>
            <div className="w-20 h-1 bg-blue-300 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 sticky top-32">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <FiUser className="w-7 h-7 text-blue-600" />
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <div className={`${item.bgColor} p-3 rounded-xl flex-shrink-0`}>
                        <div className={item.iconColor}>
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Response</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-blue-600 font-bold text-lg">24/7</div>
                      <div className="text-xs text-gray-600">Emergency Support</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-green-600 font-bold text-lg">2 Hours</div>
                      <div className="text-xs text-gray-600">Avg Response</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10 border border-gray-200">
                <div className="text-center mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Have questions about hostel facilities, admissions, or need support? 
                    Fill out the form below and we'll get back to you promptly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <FiUser className="w-4 h-4 text-blue-600" />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <FiMail className="w-4 h-4 text-blue-600" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FiMessageSquare className="w-4 h-4 text-blue-600" />
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FiMessageSquare className="w-4 h-4 text-blue-600" />
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white resize-vertical"
                      placeholder="Please describe your query in detail..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    <FiSend className="w-5 h-5" />
                    <span className="text-lg">Send Message</span>
                  </button>
                </form>

                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Quick Response</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Secure & Private</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Campus
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the MIT Hostel facilities and beautiful campus environment
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="h-80 lg:h-96 bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-center p-8 text-center">
              <FiMapPin className="w-16 h-16 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">MIT Campus Location</h3>
              <p className="text-gray-600 mb-4 max-w-md">
                Madras Institute of Technology Campus, Anna University<br />
                Chromepet, Chennai, Tamil Nadu - 600044
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                  📍 Get Directions
                </div>
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                  🚗 Parking Available
                </div>
                <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
                  🕒 Open 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Consistent with Dashboard */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">MIT</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">MIT Hostels</h3>
                  <p className="text-gray-400 text-sm">Anna University, Chennai</p>
                  <p className="text-gray-400 text-xs">Government of Tamil Nadu</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md text-sm">
                Premier student accommodation facility providing safe, secure, and comfortable 
                living environment with modern amenities and digital management systems.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/${item === 'Home' ? '' : item.toLowerCase()}`} 
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Emergency Contacts</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <div>Warden: +91 98401 23456</div>
                <div>Security: +91 70929 80042</div>
                <div>Medical: +91 044 2251 6000</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
              <div className="text-gray-400 text-xs text-center lg:text-left">
                <p>© 2024 MIT Hostels, Anna University. All rights reserved.</p>
              </div>
              <div className="flex space-x-4 text-xs">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;