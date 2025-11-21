// src/components/student/StudentHome.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { studentService } from '../../services/studentService';

const StudentHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    active: 0,
    completed: 0,
    rejected: 0
  });
  const [recentOutpasses, setRecentOutpasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, outpassesResponse] = await Promise.all([
        studentService.getStats(),
        studentService.getMyOutpasses()
      ]);

      console.log('📊 Stats Response:', statsResponse);
      console.log('📋 Outpasses Response:', outpassesResponse);

      // Handle different response formats
      let statsData = {};
      if (statsResponse.data) {
        // If response has data property
        statsData = {
          total: statsResponse.data.totalOutpasses || 0,
          pending: statsResponse.data.pendingOutpasses || 0,
          approved: statsResponse.data.approvedOutpasses || 0,
          active: statsResponse.data.activeOutpasses || 0,
          completed: statsResponse.data.completedOutpasses || 0,
          rejected: statsResponse.data.rejectedOutpasses || 0
        };
      } else {
        // If response is direct
        statsData = {
          total: statsResponse.totalOutpasses || statsResponse.total || 0,
          pending: statsResponse.pendingOutpasses || statsResponse.pending || 0,
          approved: statsResponse.approvedOutpasses || statsResponse.approved || 0,
          active: statsResponse.activeOutpasses || statsResponse.active || 0,
          completed: statsResponse.completedOutpasses || statsResponse.completed || 0,
          rejected: statsResponse.rejectedOutpasses || statsResponse.rejected || 0
        };
      }

      const outpassesData = outpassesResponse.data || outpassesResponse || [];

      setStats(statsData);
      setRecentOutpasses(outpassesData.slice(0, 6)); // Get last 6 outpasses
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set default stats on error
      setStats({
        total: 0,
        pending: 0,
        approved: 0,
        active: 0,
        completed: 0,
        rejected: 0
      });
      setRecentOutpasses([]);
    } finally {
      setLoading(false);
    }
  };

  const getHostelBadgeClass = (hostel) => {
    const hostelType = hostel?.toLowerCase() || '';
    if (hostelType.includes('boys')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (hostelType.includes('girls')) return 'bg-pink-100 text-pink-800 border-pink-200';
    if (hostelType.includes('postgrad') || hostelType.includes('pg')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (hostelType.includes('faculty')) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusBadgeClass = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatCardClass = (type) => {
    const baseClasses = "rounded-xl p-6 shadow-lg border-l-4 transition-all duration-300 hover:shadow-xl";
    switch (type) {
      case 'total': return `${baseClasses} bg-gradient-to-r from-blue-50 to-blue-100 border-blue-500`;
      case 'pending': return `${baseClasses} bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-500`;
      case 'approved': return `${baseClasses} bg-gradient-to-r from-green-50 to-green-100 border-green-500`;
      case 'active': return `${baseClasses} bg-gradient-to-r from-blue-50 to-blue-100 border-blue-500`;
      case 'completed': return `${baseClasses} bg-gradient-to-r from-gray-50 to-gray-100 border-gray-500`;
      case 'rejected': return `${baseClasses} bg-gradient-to-r from-red-50 to-red-100 border-red-500`;
      default: return `${baseClasses} bg-gradient-to-r from-gray-50 to-gray-100 border-gray-500`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-poppins">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
                <p className="flex items-center gap-2">
                  Welcome back, <strong className="text-gray-900">{user?.name || user?.username}</strong>!
                </p>
                {user?.hostel && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getHostelBadgeClass(user.hostel)}`}>
                    {user.hostel}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <p className="text-gray-500 text-sm">Here's your outpass activity summary</p>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className={getStatCardClass('total')}>
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Outpasses</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <p className="text-gray-500 text-xs">All time applications</p>
          </div>
          
          <div className={getStatCardClass('pending')}>
            <h3 className="text-gray-600 text-sm font-medium mb-2">Pending</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.pending}</div>
            <p className="text-gray-500 text-xs">Awaiting approval</p>
          </div>
          
          <div className={getStatCardClass('approved')}>
            <h3 className="text-gray-600 text-sm font-medium mb-2">Approved</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.approved}</div>
            <p className="text-gray-500 text-xs">Ready to use</p>
          </div>
          
          <div className={getStatCardClass('active')}>
            <h3 className="text-gray-600 text-sm font-medium mb-2">Active</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.active}</div>
            <p className="text-gray-500 text-xs">Currently outside</p>
          </div>
          
          <div className={getStatCardClass('completed')}>
            <h3 className="text-gray-600 text-sm font-medium mb-2">Completed</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.completed}</div>
            <p className="text-gray-500 text-xs">Returned safely</p>
          </div>
          
          <div className={getStatCardClass('rejected')}>
            <h3 className="text-gray-600 text-sm font-medium mb-2">Rejected</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.rejected}</div>
            <p className="text-gray-500 text-xs">Not approved</p>
          </div>
        </div>

        {/* Recent Outpasses Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Outpass Applications</h3>
            <span className="text-sm text-gray-500">Last 6 applications</span>
          </div>

          {recentOutpasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recentOutpasses.map((outpass) => (
                <div key={outpass.id} className="bg-gray-50 rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold text-gray-700">Outpass #{outpass.id}</div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(outpass.status)}`}>
                      {outpass.status}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-500">Destination:</span>
                      <span className="text-sm text-gray-900 text-right font-medium max-w-[150px] truncate" title={outpass.destination}>
                        {outpass.destination}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-500">Reason:</span>
                      <span className="text-sm text-gray-900 text-right font-medium max-w-[150px] truncate" title={outpass.reason}>
                        {outpass.reason}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs font-medium text-gray-500">From:</span>
                      <span className="text-sm text-gray-900 font-medium">
                        {new Date(outpass.leaveStartDate || outpass.fromDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs font-medium text-gray-500">To:</span>
                      <span className="text-sm text-gray-900 font-medium">
                        {new Date(outpass.expectedReturnDate || outpass.toDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs font-medium text-gray-500">Roll No:</span>
                      <span className="text-sm text-gray-900 font-medium">
                        {outpass.studentRollNumber || user?.rollNumber || 'N/A'}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs font-medium text-gray-500">Hostel:</span>
                      <span className="text-sm text-gray-900 font-medium">
                        {outpass.hostelName || user?.hostel || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No outpasses found</h3>
              <p className="text-gray-500">You haven't applied for any outpasses yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;