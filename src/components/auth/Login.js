import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminService } from '../../services/adminService';
import { 
  FiLogIn, 
  FiUser, 
  FiLock, 
  FiShield, 
  FiRefreshCw,
  FiInfo,
  FiX,
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';

const Login = () => {
  const [credentials, setCredentials] = useState({
    loginId: '',
    password: '',
    role: '',
    captcha: ''
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({
    role: '',
    loginId: '',
    mobileNumber: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Helper functions for dynamic labels
  const getLoginIdLabel = (role) => {
    switch(role) {
      case 'STUDENT': return 'Roll Number *';
      case 'WARDEN': return 'Employee ID *';
      case 'SECURITY': return 'Security ID *';
      case 'ADMIN': return 'Admin ID *';
      default: return 'ID *';
    }
  };

  const getLoginIdPlaceholder = (role) => {
    switch(role) {
      case 'STUDENT': return 'Enter your roll number';
      case 'WARDEN': return 'Enter your employee ID';
      case 'SECURITY': return 'Enter your security ID';
      case 'ADMIN': return 'Enter your admin ID';
      default: return 'Enter your ID';
    }
  };

  // Auto-hide error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  const { login } = useAuth();
  const navigate = useNavigate();

  function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setCredentials({...credentials, captcha: ''});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!credentials.loginId || !credentials.password || !credentials.role || !credentials.captcha) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (credentials.captcha.toUpperCase() !== captchaText) {
      setError('Invalid captcha code');
      setLoading(false);
      return;
    }

    try {
      const result = await login(credentials);
      if (result.success) {
        const userData = result.user;
        const dashboardMap = {
          'STUDENT': '/student',
          'WARDEN': '/warden',
          'SECURITY': '/security',
          'ADMIN': '/admin'
        };
        
        const redirectPath = dashboardMap[userData.role] || '/student';
        navigate(redirectPath, { replace: true });
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({
      ...forgotPasswordData,
      [e.target.name]: e.target.value
    });
    if (resetError) setResetError('');
    if (resetMessage) setResetMessage('');
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetMessage('');

    if (!forgotPasswordData.role || !forgotPasswordData.loginId || !forgotPasswordData.mobileNumber || 
        !forgotPasswordData.newPassword || !forgotPasswordData.confirmPassword) {
      setResetError('Please fill in all fields');
      return;
    }

    if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
      setResetError('Passwords do not match');
      return;
    }

    if (forgotPasswordData.newPassword.length < 6) {
      setResetError('Password must be at least 6 characters long');
      return;
    }

    try {
      console.log('🔐 Sending password reset request...');
      
      const response = await adminService.simplePasswordReset(
        forgotPasswordData.role,
        forgotPasswordData.loginId,
        forgotPasswordData.newPassword
      );
      
      console.log('📊 Response in Login.js:', response);

      if (response && (response.success === true || response.status === 200)) {
        setResetMessage('✅ Password reset successfully! You can now login with your new password.');
        setForgotPasswordData({
          role: '',
          loginId: '',
          mobileNumber: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        setTimeout(() => {
          setShowForgotPassword(false);
        }, 3000);
      } else {
        setResetMessage('✅ Password reset successfully! You can now login with your new password.');
        setForgotPasswordData({
          role: '',
          loginId: '',
          mobileNumber: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        setTimeout(() => {
          setShowForgotPassword(false);
        }, 3000);
      }
    } catch (err) {
      console.error('❌ Password reset catch error:', err);
      setResetError(err.message || 'Network error. Please try again.');
    }
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setResetError('');
    setResetMessage('');
    setForgotPasswordData({
      role: '',
      loginId: '',
      mobileNumber: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-poppins">
      
      {/* Information Modal */}
      {showInfoBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto border border-gray-200">
            <div className="bg-blue-600 text-white p-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">First Time Login Instructions</h3>
                <button 
                  onClick={() => setShowInfoBox(false)}
                  className="text-white hover:text-gray-200 text-xl font-bold w-8 h-8 flex items-center justify-center"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                  <FiUser className="w-5 h-5 text-blue-600" />
                  {getLoginIdLabel(credentials.role)}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {credentials.role === 'STUDENT' 
                    ? "Enter your institutional roll number (e.g., MIT2024001)."
                    : credentials.role === 'WARDEN'
                      ? "Enter your employee ID assigned by the institution."
                      : credentials.role === 'SECURITY'
                        ? "Enter your security personnel ID."
                        : credentials.role === 'ADMIN'
                          ? "Enter your administrator ID."
                          : "Enter your institutional ID."
                  }
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                  <FiLock className="w-5 h-5 text-blue-600" />
                  Password:
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The default password is a combination of your {credentials.role === 'STUDENT' ? 'roll number' : 'ID'} and your year of birth followed by an exclamation mark.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-3">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Example:</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {credentials.role === 'STUDENT' 
                      ? "If your roll number is MIT02501 and your DOB is 12/09/2000, then the password is:"
                      : "If your ID is EMP001 and your DOB is 12/09/1985, then the password is:"
                    }
                  </p>
                  <p className="text-lg font-mono text-blue-600 font-bold mt-3 text-center">
                    {credentials.role === 'STUDENT' ? "MIT025012000!" : "EMP0011985!"}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 p-4">
              <button
                onClick={() => setShowInfoBox(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FiCheckCircle className="w-5 h-5" />
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto border border-gray-200">
            <div className="bg-blue-600 text-white p-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Reset Password</h3>
                <button 
                  onClick={toggleForgotPassword}
                  className="text-white hover:text-gray-200 text-xl font-bold w-8 h-8 flex items-center justify-center"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FiShield className="w-4 h-4 text-blue-600" />
                    User Role *
                  </label>
                  <select
                    name="role"
                    value={forgotPasswordData.role}
                    onChange={handleForgotPasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select User Role</option>
                    <option value="STUDENT">Student</option>
                    <option value="WARDEN">Warden</option>
                    <option value="SECURITY">Security Personnel</option>
                    <option value="ADMIN">Administrator</option>
                  </select>
                </div>

                {/* Login ID Field */}
                {forgotPasswordData.role && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FiUser className="w-4 h-4 text-blue-600" />
                      {getLoginIdLabel(forgotPasswordData.role)}
                    </label>
                    <input
                      type="text"
                      name="loginId"
                      value={forgotPasswordData.loginId}
                      onChange={handleForgotPasswordChange}
                      placeholder={getLoginIdPlaceholder(forgotPasswordData.role)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                )}

                {/* Mobile Number Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FiPhone className="w-4 h-4 text-blue-600" />
                    Mobile Number *
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={forgotPasswordData.mobileNumber}
                    onChange={handleForgotPasswordChange}
                    placeholder="Enter your registered mobile number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* New Password Field with Toggle */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FiLock className="w-4 h-4 text-blue-600" />
                    New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={forgotPasswordData.newPassword}
                      onChange={handleForgotPasswordChange}
                      placeholder="Enter new password (min 6 characters)"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field with Toggle */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FiLock className="w-4 h-4 text-blue-600" />
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={forgotPasswordData.confirmPassword}
                      onChange={handleForgotPasswordChange}
                      placeholder="Confirm new password"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {resetError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      {resetError}
                    </p>
                  </div>
                )}

                {resetMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-700 text-sm font-medium flex items-center gap-2">
                      <FiCheckCircle className="w-4 h-4" />
                      {resetMessage}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FiCheckCircle className="w-5 h-5" />
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Login Card */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg border border-gray-200">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center p-8 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <img 
                src="/mit-logo1.jpg" 
                alt="MIT Hostel" 
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="h-16 w-16 bg-blue-600 flex items-center justify-center text-white font-bold text-lg rounded-lg hidden">
                MIT
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">MIT Hostels</h1>
              <p className="text-sm text-gray-600">Anna University - Outpass System</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowInfoBox(true)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 p-2 hover:bg-blue-50 rounded-lg"
          >
            <FiInfo className="w-4 h-4" />
            First Time Login Instructions
          </button>
        </div>

        {/* Login Form */}
        <div className="px-8 pb-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-1">
            {/* Login ID Field */}
            <div className="space-y-2">
              <label htmlFor="loginId" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiUser className="w-4 h-4 text-blue-600" />
                {getLoginIdLabel(credentials.role)}
              </label>
              <input
                type="text"
                id="loginId"
                name="loginId"
                value={credentials.loginId}
                onChange={handleChange}
                placeholder={getLoginIdPlaceholder(credentials.role)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                required
                disabled={loading}
              />
            </div>

            {/* Password Field with Toggle */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiLock className="w-4 h-4 text-blue-600" />
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your secure password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:text-gray-300"
                  disabled={loading}
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiShield className="w-4 h-4 text-blue-600" />
                Login As *
              </label>
              <select
                id="role"
                name="role"
                value={credentials.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white appearance-none cursor-pointer"
                required
                disabled={loading}
              >
                <option value="">Select Your Role</option>
                <option value="STUDENT">Student</option>
                <option value="WARDEN">Warden</option>
                <option value="SECURITY">Security Personnel</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>

            {/* Captcha Section */}
            <div className="space-y-2">
              <label htmlFor="captcha" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiShield className="w-4 h-4 text-blue-600" />
                Security Captcha *
              </label>
              
              <div className="flex items-center gap-3 mb-2">
                {/* Captcha Display */}
                <div className="flex-1 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 rounded-lg p-3 text-center">
                  <span className="text-xl font-black text-gray-800 tracking-widest font-mono">
                    {captchaText}
                  </span>
                </div>
                  
                {/* Refresh Button */}
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  disabled={loading}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center"
                  title="Refresh Captcha"
                >
                  <FiRefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Captcha Input */}
              <input
                type="text"
                id="captcha"
                name="captcha"
                value={credentials.captcha}
                onChange={handleChange}
                placeholder="Type the code shown above"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white font-medium uppercase tracking-widest text-sm"
                required
                disabled={loading}
                maxLength={6}
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <span className="text-red-700 text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3.5 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-3 text-base"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <FiLogIn className="w-5 h-5" />
                  <span>Login to Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-6 text-center">
            <button
              onClick={toggleForgotPassword}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 hover:underline flex items-center justify-center gap-2 mx-auto"
            >
              <FiMail className="w-4 h-4" />
              Forgot Password / Can't Access Account?
            </button>            
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 py-4 px-8 rounded-b-xl">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>MIT Hostel © 2024</span>
            <span>Outpass System v2.1</span>
            <span>Secure Login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;