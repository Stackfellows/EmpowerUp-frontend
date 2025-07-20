import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Calendar, Crown, TrendingUp,
  DollarSign, Users, Award, Target, Edit, Settings,
  BarChart3, PieChart, Activity, Star, Gift, Camera, Globe, Building, UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Profile = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [userProfile, setUserProfile] = useState(null); // State to store fetched user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [activeTab, setActiveTab] = useState('overview');

  // useEffect to fetch user data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const userString = localStorage.getItem('user');
        let loggedInUser = null;

        if (userString) {
          try {
            loggedInUser = JSON.parse(userString);
          } catch (parseError) {
            console.error("Profile.jsx: Error parsing 'user' from localStorage:", parseError);
            setError("Corrupted user data in storage. Please log in again.");
            setLoading(false);
            navigate('/login');
            return;
          }
        }

        if (!loggedInUser || !loggedInUser.id) {
          setError("User not logged in. Please log in to view your profile.");
          setLoading(false);
          navigate('/login');
          return;
        }

        const userId = loggedInUser.id;
        const token = localStorage.getItem('token'); // Get token if you plan to use it for auth

        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}` // Uncomment if you add auth middleware
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch user profile');
        }

        setUserProfile(data.user);
      } catch (err) {
        console.error("Profile.jsx: Caught error during profile fetch:", err);
        setError(err.message || "An unexpected error occurred while loading profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]); // navigate is a dependency to ensure useEffect runs if it changes (rare, but good practice)

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('You have been logged out.'); // Consider a custom modal
    navigate('/login'); // Redirect to login page
  };

  // Placeholder for achievements (you'd fetch these dynamically in a real app)
  const achievements = [
    { title: "Top Performer", date: "2024-01", icon: Crown, color: "from-yellow-500 to-orange-500" },
    { title: "Team Builder", date: "2023-12", icon: Users, color: "from-blue-500 to-indigo-500" },
    { title: "Sales Champion", date: "2023-11", icon: Target, color: "from-green-500 to-emerald-500" },
    { title: "Rising Star", date: "2023-10", icon: Star, color: "from-purple-500 to-pink-500" }
  ];

  // Conditional rendering for loading, error, or no data
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">No profile data found. Please log in.</div>
      </div>
    );
  }

  // Dynamic stats based on fetched userProfile
  const stats = [
    { label: 'Total Points', value: userProfile.points ? userProfile.points.toLocaleString() : 'N/A', icon: <BarChart3 className="h-6 w-6" />, color: 'from-blue-500 to-sky-600' },
    { label: 'Current Designation', value: userProfile.designation || 'N/A', icon: <Award className="h-6 w-6" />, color: 'from-purple-500 to-pink-600' },
    { label: 'Your Discount', value: userProfile.discountPercentage ? `${userProfile.discountPercentage}%` : 'N/A', icon: <DollarSign className="h-6 w-6" />, color: 'from-green-500 to-emerald-600' },
    { label: 'Team Size', value: 'N/A (Backend Needed)', icon: <Users className="h-6 w-6" />, color: 'from-orange-500 to-red-600' }, // Team size would need a separate backend query
  ];

  // Placeholder for network stats (adapt to your backend's actual response structure)
  const networkStats = {
    totalEarnings: userProfile.totalEarnings || 0, // Assuming backend provides this
    monthlyEarnings: userProfile.monthlyEarnings || 0, // Assuming backend provides this
    teamSize: userProfile.teamSize || 0, // Assuming backend provides this
    directReferrals: userProfile.directReferrals || 0, // Assuming backend provides this
    totalSales: userProfile.totalSales || 0, // Assuming backend provides this
    commissionRate: userProfile.commissionRate || 0, // Assuming backend provides this
    rank: userProfile.rank || 'N/A', // Assuming backend provides this
    nextRankTarget: userProfile.nextRankTarget || 0 // Assuming backend provides this
  };

  // Placeholder for recent activity (adapt to your backend's actual response structure)
  const recentActivity = [
    { type: "sale", description: "New sale: Vitamin C Serum", amount: "+$45.99", time: "2 hours ago" },
    { type: "referral", description: "New team member joined", amount: "+$100 bonus", time: "1 day ago" },
    { type: "commission", description: "Weekly commission payout", amount: "+$1,250", time: "3 days ago" },
    { type: "achievement", description: "Reached Silver Level", amount: "Achievement", time: "1 week ago" }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl p-8 mb-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={userProfile.profileImage || 'https://placehold.co/300x300/E0F2F7/2C3E50?text=User'} // Use userProfile.profileImage or fallback
                alt={userProfile.name || 'User Profile'} // Use userProfile.name
                className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white/30"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full p-2 shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                {userProfile.name}
              </h1>
              <div className="text-xl text-sky-600 font-semibold mb-4">
                {userProfile.designation || 'New Member'}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{userProfile.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{userProfile.province || 'N/A'}, {userProfile.country || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>

              <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 glow-effect">
                <Edit className="w-4 h-4 inline mr-2" />
                Edit Profile
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${networkStats.monthlyEarnings.toLocaleString()}
                </div>
                <div className="text-green-700 text-sm">Monthly Earnings</div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-sky-100 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {networkStats.teamSize}
                </div>
                <div className="text-blue-700 text-sm">Team Members</div>
              </div>
            </div>
            {/* Logout Button */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-colors font-semibold"
                >
                    Logout
                </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 p-2 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Performance Metrics */}
              <div className="lg:col-span-2 space-y-8">
                {/* Earnings Chart */}
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-sky-600" />
                    Earnings Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-sky-600 mb-2">
                        ${networkStats.totalEarnings.toLocaleString()}
                      </div>
                      <div className="text-gray-600">Total Earnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        ${networkStats.monthlyEarnings.toLocaleString()}
                      </div>
                      <div className="text-gray-600">This Month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {networkStats.commissionRate}%
                      </div>
                      <div className="text-gray-600">Commission Rate</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Activity className="w-6 h-6 mr-2 text-sky-600" />
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-2xl">
                        <div>
                          <div className="font-medium text-gray-800">{activity.description}</div>
                          <div className="text-sm text-gray-600">{activity.time}</div>
                        </div>
                        <div className={`font-semibold ${
                          activity.amount.includes('+') ? 'text-green-600' : 'text-sky-600'
                        }`}>
                          {activity.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Progress Card */}
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Next Level Progress</h4>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Current: {userProfile.designation || 'N/A'}</span> {/* Use dynamic designation */}
                      <span>Next: Elite</span> {/* Hardcoded, but could be dynamic */}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-sky-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(userProfile.points / networkStats.nextRankTarget) * 100}%` }} // Dynamic progress
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sky-600">${userProfile.points.toLocaleString()}</div> {/* Dynamic points */}
                    <div className="text-sm text-gray-600">of ${networkStats.nextRankTarget.toLocaleString()} needed</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300">
                      View Products
                    </button>
                    <button className="w-full bg-white/20 border border-white/30 text-gray-700 py-3 rounded-2xl font-medium hover:bg-white/30 transition-all duration-300">
                      Invite Friends
                    </button>
                    <button className="w-full bg-white/20 border border-white/30 text-gray-700 py-3 rounded-2xl font-medium hover:bg-white/30 transition-all duration-300">
                      Training Center
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'network' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Network Stats */}
              <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-sky-600" />
                  Network Statistics
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sky-600 mb-2">{networkStats.teamSize}</div>
                    <div className="text-gray-600">Total Team</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{networkStats.directReferrals}</div>
                    <div className="text-gray-600">Direct Referrals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">#{networkStats.rank}</div>
                    <div className="text-gray-600">Global Rank</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      ${networkStats.totalSales.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Team Sales</div>
                  </div>
                </div>
              </div>

              {/* Upline Information */}
              <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Upline Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{userProfile.uplineName || 'No Upline'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{userProfile.uplineId || 'N/A'}</span> {/* Assuming uplineId is email or ID */}
                  </div>
                  <button className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 mt-4">
                    Contact Upline
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <DollarSign className="w-6 h-6 mr-2 text-sky-600" />
                Detailed Earnings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
                  <h4 className="font-semibold text-gray-700 mb-2">Total Earnings</h4>
                  <p className="text-3xl font-bold text-green-600">${networkStats.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
                  <h4 className="font-semibold text-gray-700 mb-2">Monthly Earnings</h4>
                  <p className="text-3xl font-bold text-blue-600">${networkStats.monthlyEarnings.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
                  <h4 className="font-semibold text-gray-700 mb-2">Total Sales Generated</h4>
                  <p className="text-3xl font-bold text-purple-600">${networkStats.totalSales.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
                  <h4 className="font-semibold text-gray-700 mb-2">Commission Rate</h4>
                  <p className="text-3xl font-bold text-orange-600">{networkStats.commissionRate}%</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className={`inline-flex p-4 bg-gradient-to-br ${achievement.color} rounded-2xl mb-4`}>
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.date}</p>
                </div>
              ))}
            </div>
          )}

            {activeTab === 'settings' && (
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Settings className="w-6 h-6 mr-2 text-sky-600" />
                        Account Settings
                    </h3>
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm">
                            <label className="block text-gray-700 font-medium mb-2 md:mb-0">Change Password</label>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                Reset Password
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm">
                            <label className="block text-gray-700 font-medium mb-2 md:mb-0">Notification Preferences</label>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                Manage Notifications
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm">
                            <label className="block text-gray-700 font-medium mb-2 md:mb-0">Delete Account</label>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
