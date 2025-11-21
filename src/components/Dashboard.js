// src/components/Dashboard.js - FINAL ENHANCED VERSION
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiHome, 
  FiUser, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiInfo,
  FiMail,
  FiPhone,
  FiMapPin,
  FiAward,
  FiUsers,
  FiShield,
  FiCheckCircle,
  FiLogIn,
  FiStar,
  FiBook,
  FiPhoneCall,
  FiCalendar,
  FiClock,
  FiShield as FiSecurity
} from 'react-icons/fi';

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Hostel images for slideshow
  const hostelImages = [
    '/imagef.jpg',
    '/imaged.jpg',
    '/imageb.jpg',
    '/image1.jpg',
    '/imageg.jpg',
  ];
  // Marquee messages - professional colors
  const marqueeMessages = [
    "Welcome to MIT Hostels - Premium student accommodation with world-class facilities!",
    "Safe & secure hostel environment with 24/7 security and modern amenities"
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % hostelImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hostelImages.length]);

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsSidebarOpen(false);
  };

  const handleRoleDashboard = () => {
    if (user) {
      const dashboardMap = {
        'STUDENT': '/student',
        'WARDEN': '/warden',
        'SECURITY': '/security',
        'ADMIN': '/admin'
      };
      const redirectPath = dashboardMap[user.role] || '/';
      navigate(redirectPath);
    }
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % hostelImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + hostelImages.length) % hostelImages.length);
  };

  // Features data
  const features = [
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: "Easy Outpass Application",
      description: "Apply for outpasses online with just a few clicks. No paperwork required."
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Secure System",
      description: "Role-based access control with end-to-end encryption ensures complete data security."
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Multi-user Support",
      description: "Separate dashboards for students, wardens, security staff, and administrators."
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "24/7 Availability",
      description: "Access the system anytime, anywhere with our cloud-based infrastructure."
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Quick Approvals",
      description: "Real-time notifications and fast approval process for outpass requests."
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: "Attendance Tracking",
      description: "Automated attendance system integrated with outpass management."
    },
    {
      icon: <FiSecurity className="w-8 h-8" />,
      title: "Emergency Features",
      description: "Instant alerts and emergency contact system for student safety."
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: "Premium Support",
      description: "24/7 technical support and assistance for all users."
    }
  ];

  // Statistics data
  const stats = [
    { number: "5000+", label: "Students" },
    { number: "50+", label: "Wardens" },
    { number: "100+", label: "Security Staff"},
    { number: "10,000+", label: "Monthly Outpasses" }
  ];

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Enhanced Professional Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-16 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section - Enhanced with proper logo display */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src="/mit-logo1.jpg" 
                    alt="MIT Hostel" 
                    className="h-16 w-auto object-contain shadow-sm"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="h-16 w-16 bg-blue-600 flex items-center justify-center text-white font-bold text-lg hidden">
                    MIT
                  </div>
                </div>
                <div className="text-gray-900">
                  <h1 className="text-3xl font-bold">MIT Hostel</h1>
                  <h2 className="text-lg font-semibold text-gray-700">Anna University</h2>
                </div>
              </div>
            </div>

            {/* Desktop Navigation - Enhanced */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100"
              >
                About
              </Link>

              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100"
              >
                Contact
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-300">
                  <button
                    onClick={handleRoleDashboard}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-md"
                  >
                    <FiUser className="w-5 h-5" />
                    <span>Dashboard</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-md"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-md"
                >
                  <FiLogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Professional Marquee Banner */}
      <div className="bg-blue-800 text-white py-3 relative z-40">
        <marquee 
          behavior="scroll" 
          direction="left" 
          scrollamount="6"
          className="text-sm font-medium"
        >
          {marqueeMessages.map((message, index) => (
            <span key={index} className="mx-8">
              • {message} •
            </span>
          ))}
        </marquee>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          ></div>
          
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">MIT</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                </div>
                <button 
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="space-y-3">
                <Link 
                  to="/about" 
                  className="block text-gray-700 hover:text-blue-600 font-semibold py-4 px-6 rounded-xl border-l-4 border-blue-600 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-300"
                  onClick={toggleSidebar}
                >
                  <FiInfo className="w-6 h-6" />
                  <span className="text-lg">About</span>
                </Link>
                
                <Link 
                  to="/contact" 
                  className="block text-gray-700 hover:text-blue-600 font-semibold py-4 px-6 rounded-xl border-l-4 border-blue-600 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-300"
                  onClick={toggleSidebar}
                >
                  <FiPhoneCall className="w-6 h-6" />
                  <span className="text-lg">Contact</span>
                </Link>
                
                {isAuthenticated ? (
                  <div className="pt-6 border-t border-gray-200 space-y-4">
                    <button
                      onClick={handleRoleDashboard}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <FiUser className="w-5 h-5" />
                      <span className="text-lg">Dashboard</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <FiLogOut className="w-5 h-5" />
                      <span className="text-lg">Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 mt-6"
                  >
                    <FiLogIn className="w-5 h-5" />
                    <span className="text-lg">Login</span>
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
    
    {/* University Information - Left Side */}
    <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
      {/* Main University Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 lg:mb-4 leading-tight">
          Anna University
        </h1>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 mb-4 lg:mb-6 leading-snug">
          Madras Institute of Technology (MIT) Campus
        </h2>
        
        <div className="space-y-2 lg:space-y-3 text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
          <p className="text-center lg:text-left">Established in 1948, by Shri C. Rojom</p>
          <p className="text-center lg:text-left">Merged in 1979 with Anna University</p>
          <p className="font-medium text-gray-800 text-center lg:text-left">
            A Benchmarked Institution for Engineering and Technology
          </p>
          <p className="text-center lg:text-left">with alumni footprints in all domains across the globe</p>
        </div>
      </div>

      {/* Accreditation Section */}
      <div className="border-t border-gray-200 pt-4 lg:pt-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="p-2 sm:p-3 lg:p-4">
            <div className="text-xs sm:text-sm text-gray-500 mb-1 lg:mb-2">MIA & UMC</div>
            <div className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Accreditation</div>
          </div>
          
          <div className="p-2 sm:p-3 lg:p-4">
            <div className="text-xs sm:text-sm text-gray-500 mb-1 lg:mb-2">MIT Post 2000</div>
            <div className="text-base sm:text-lg lg:text-xl font-bold text-blue-600">2</div>
          </div>
          
          <div className="p-2 sm:p-3 lg:p-4">
            <div className="text-xs sm:text-sm text-gray-500 mb-1 lg:mb-2">Q2 Post 2000</div>
            <div className="text-base sm:text-lg lg:text-xl font-bold text-blue-600">465</div>
          </div>
        </div>
      </div>
    </div>

    {/* Sliding Window - Right Side */}
    <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[400px] overflow-hidden rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl border border-gray-200 order-1 lg:order-2">
      <div className="relative h-full w-full">
        {hostelImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
          </div>
        ))}
      </div>
     
      {/* Hero Content */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-2 right-0 flex items-center justify-center text-center text-white px-3 sm:px-4">
        <div className=" max-w-xs sm:max-w-sm mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">Welcome to MIT Hostels</h1>
            
            <div className="flex flex-col space-y-1 sm:space-y-2">
              {!isAuthenticated && (
                <button
                  onClick={handleLogin}
                  className="bg-blue-400 hover:bg-green-700 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <FiLogIn className="w-4 h-4" />
                  <span>Get Started</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-1 sm:p-2 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110 shadow-lg z-10"
      >
        <span className="text-lg sm:text-xl">‹</span>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-1 sm:p-2 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110 shadow-lg z-10"
      >
        <span className="text-lg sm:text-xl">›</span>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10">
        {hostelImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125 shadow-lg' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  </div>
</div>

      

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our System?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience seamless hostel management with our advanced outpass system designed for modern campuses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="text-blue-600 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Preview Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img 
                src="/imagec.jpg" 
                alt="MIT Hostel Campus" 
                className="rounded-xl shadow-lg w-full h-80 object-cover"
              />
              <div className="absolute -bottom-5 -left-4 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg">
                <div className="text-lg font-bold">Since 1953</div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                About MIT Hostels
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                MIT Hostels, under Anna University, have been providing quality accommodation 
                for students since 1953. Our hostels are designed to create a conducive environment 
                for academic excellence and personal growth.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With state-of-the-art facilities, robust security systems, and a dedicated 
                management team, we ensure a comfortable and safe living experience for all students.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiCheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Wi-Fi Campus</div>
                    <div className="text-xs text-gray-600">High-speed internet</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiShield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Security</div>
                    <div className="text-xs text-gray-600">24/7 surveillance</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link 
                  to="/about"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-200 text-sm"
                >
                  <FiInfo className="w-4 h-4" />
                  <span>Learn More</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Government Branding */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                
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
              <div className="flex space-x-2">
                <div className="bg-gray-800 px-3 py-1 rounded text-xs">
                  🏛️ Government Recognized
                </div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs">
                  ⭐ A+ NAAC Accredited
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Facilities', 'Announcements', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/${item.toLowerCase()}`} 
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 text-sm"
                    >
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
              <div className="space-y-3 text-gray-400 text-sm">
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-blue-400" />
                  <div>
                    <div>MIT Campus, Anna University</div>
                    <div className="text-xs">Sardar Patel Road, Chennai - 600025</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FiPhone className="w-4 h-4 text-green-400" />
                  <div>
                    <div>+91 7092980042</div>
                    <div className="text-xs">Hostel Office</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMail className="w-4 h-4 text-purple-400" />
                  <div>
                    <div>hostel@mit.edu</div>
                    <div className="text-xs">Official Email</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
              <div className="text-gray-400 text-xs text-center lg:text-left">
                <p>© 2024 MIT Hostels, Anna University. All rights reserved.</p>
                <p className="mt-1">A Government of Tamil Nadu Institution</p>
              </div>
              
              <div className="flex space-x-4 text-xs">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
            
            {/* Government Disclaimer */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-gray-500 text-xs text-center">
                This is the official website of MIT Hostels, Anna University. Content managed by Hostel Management Committee.
                For any discrepancies, contact hostel@mit.edu | Last updated: March 2024
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;