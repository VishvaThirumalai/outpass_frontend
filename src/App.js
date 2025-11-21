// src/App.js - UPDATED
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import StudentDashboard from './components/student/StudentDashboard';
import WardenDashboard from './components/warden/WardenDashboard';
import SecurityDashboard from './components/security/SecurityDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import Profile from './components/common/Profile';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes - Only accessible after login */}
            <Route path="/student/*" element={
              <ProtectedRoute role="STUDENT">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/warden/*" element={
              <ProtectedRoute role="WARDEN">
                <WardenDashboard />
              </ProtectedRoute>
            } />
            <Route path="/security/*" element={
              <ProtectedRoute role="SECURITY">
                <SecurityDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/*" element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Catch all route - redirect to dashboard */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;