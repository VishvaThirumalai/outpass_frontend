// src/components/About.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiUsers, FiHome, FiShield } from 'react-icons/fi';

const About = () => {
  const features = [
    {
      icon: <FiHome className="w-8 h-8" />,
      title: "Modern Accommodation",
      description: "State-of-the-art hostel facilities with all modern amenities"
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "24/7 Security",
      description: "Round-the-clock security and surveillance for student safety"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community Living",
      description: "Fostering a vibrant community for holistic development"
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Academic Excellence",
      description: "Environment conducive to learning and academic growth"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/mit-logo1.jpg" alt="MIT Hostel" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MIT Hostel Management</h1>
                <p className="text-sm text-gray-600">About Our Facilities</p>
              </div>
            </div>
            <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">About MIT Hostels</h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
            Providing world-class accommodation that nurtures academic excellence and personal growth
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At MIT Hostels, our mission is to create a home away from home for students, 
                providing a safe, comfortable, and stimulating environment that supports both 
                academic pursuits and personal development.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We believe that quality accommodation plays a vital role in a student's 
                educational journey, and we are committed to maintaining the highest standards 
                of living conditions, security, and community engagement.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/mit-about1.jpg" 
                alt="MIT Hostel Mission" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive facilities designed for modern student living
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Our Legacy</h2>
            <div className="text-lg text-gray-600 space-y-6">
              <p>
                Established as part of the prestigious Manipal Academy of Higher Education, 
                MIT Hostels have been serving students for decades, evolving continuously 
                to meet the changing needs of modern education.
              </p>
              <p>
                Our outpass management system represents our commitment to leveraging technology 
                for enhanced security and convenience, ensuring that students can focus on what 
                matters most - their education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 MIT Hostel Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
