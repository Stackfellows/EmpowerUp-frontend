import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Users, 
  TrendingUp, 
  Award, 
  Star,
  Edit,
  Camera,
  Globe,
  Building,
  UserCheck,
  DollarSign,
  Target,
  Crown,
  Gift
} from 'lucide-react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    country: 'United States',
    province: 'California',
    cnicNo: '12345-6789012-3',
    uplineName: 'Michael Chen',
    uplineId: 'michael.chen@email.com',
    joinDate: '2023-01-15',
    membershipLevel: 'Gold',
    totalEarnings: 15750,
    monthlyEarnings: 2850,
    teamSize: 24,
    rank: 'Senior Consultant',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
  });

  const achievements = [
    { title: 'Top Performer', description: 'Achieved highest sales this month', icon: <Crown className="h-6 w-6" />, color: 'from-yellow-400 to-orange-500' },
    { title: 'Team Builder', description: 'Built a team of 20+ members', icon: <Users className="h-6 w-6" />, color: 'from-blue-400 to-purple-500' },
    { title: 'Rising Star', description: 'Fastest growing consultant', icon: <Star className="h-6 w-6" />, color: 'from-pink-400 to-red-500' },
    { title: 'Mentor', description: 'Helped 10+ people succeed', icon: <Award className="h-6 w-6" />, color: 'from-green-400 to-emerald-500' }
  ];

  const stats = [
    { label: 'Total Earnings', value: `$${userData.totalEarnings.toLocaleString()}`, icon: <DollarSign className="h-6 w-6" />, color: 'from-green-500 to-emerald-600' },
    { label: 'Monthly Earnings', value: `$${userData.monthlyEarnings.toLocaleString()}`, icon: <TrendingUp className="h-6 w-6" />, color: 'from-blue-500 to-sky-600' },
    { label: 'Team Size', value: userData.teamSize.toString(), icon: <Users className="h-6 w-6" />, color: 'from-purple-500 to-pink-600' },
    { label: 'Current Rank', value: userData.rank, icon: <Target className="h-6 w-6" />, color: 'from-orange-500 to-red-600' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User className="h-4 w-4" /> },
    { id: 'personal', label: 'Personal Info', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'network', label: 'Network', icon: <Users className="h-4 w-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Award className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass mb-8 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-600/10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-300/20 to-blue-400/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
          
          <div className="relative z-10 p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Image */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-glow"
                >
                  <img
                    src={userData.profileImage}
                    alt={userData.fullName}
                    className="w-full h-full object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-2 right-2 p-2 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </motion.button>
                </motion.div>
                
                {/* Membership Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {userData.membershipLevel}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-sky-800">{userData.fullName}</h1>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 glass rounded-full hover:bg-white/40 transition-all duration-300"
                  >
                    <Edit className="h-4 w-4 text-sky-600" />
                  </motion.button>
                </div>
                
                <p className="text-sky-600 text-lg mb-4">{userData.rank}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-2`}>
                        {stat.icon}
                      </div>
                      <div className="text-lg font-bold text-sky-800">{stat.value}</div>
                      <div className="text-sm text-sky-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center md:justify-start space-x-2 mb-8"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-glow'
                  : 'glass text-sky-700 hover:bg-white/40'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Quick Stats */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card-glass">
                  <h3 className="text-xl font-bold text-sky-800 mb-6">Performance Overview</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sky-600">Monthly Target</span>
                        <span className="font-bold text-sky-800">$3,000</span>
                      </div>
                      <div className="w-full bg-sky-100 rounded-full h-3">
                        <div className="bg-gradient-to-r from-sky-500 to-blue-600 h-3 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                      <div className="text-sm text-sky-600">95% Complete</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sky-600">Team Growth</span>
                        <span className="font-bold text-sky-800">+8 this month</span>
                      </div>
                      <div className="w-full bg-green-100 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <div className="text-sm text-green-600">Excellent Growth</div>
                    </div>
                  </div>
                </div>

                <div className="card-glass">
                  <h3 className="text-xl font-bold text-sky-800 mb-6">Recent Achievements</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.slice(0, 4).map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 glass rounded-xl"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${achievement.color} flex items-center justify-center text-white`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-sky-800">{achievement.title}</h4>
                          <p className="text-sm text-sky-600">{achievement.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="card-glass">
                  <h3 className="text-xl font-bold text-sky-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <Gift className="h-4 w-4" />
                      <span>Refer a Friend</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-glass flex items-center justify-center space-x-2"
                    >
                      <TrendingUp className="h-4 w-4" />
                      <span>View Analytics</span>
                    </motion.button>
                  </div>
                </div>

                <div className="card-glass">
                  <h3 className="text-xl font-bold text-sky-800 mb-4">Upline Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <UserCheck className="h-5 w-5 text-sky-500" />
                      <div>
                        <p className="font-medium text-sky-800">{userData.uplineName}</p>
                        <p className="text-sm text-sky-600">{userData.uplineEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'personal' && (
            <div className="card-glass">
              <h3 className="text-xl font-bold text-sky-800 mb-6">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                    <User className="h-5 w-5 text-sky-500" />
                    <div>
                      <p className="text-sm text-sky-600">Full Name</p>
                      <p className="font-medium text-sky-800">{userData.fullName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                    <Mail className="h-5 w-5 text-sky-500" />
                    <div>
                      <p className="text-sm text-sky-600">Email Address</p>
                      <p className="font-medium text-sky-800">{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                    <Phone className="h-5 w-5 text-sky-500" />
                    <div>
                      <p className="text-sm text-sky-600">Phone Number</p>
                      <p className="font-medium text-sky-800">{userData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                    <Calendar className="h-5 w-5 text-sky-500" />
                    <div>
                      <p className="text-sm text-sky-600">Date of Birth</p>
                      <p className="font-medium text-sky-800">{new Date(userData.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                    <Globe className="h-5 w-5 text-sky-500" />
                    <div>
                      <p className="text-sm text-sky-600">Country</p>
                      <p className="font-medium text-sky-800">{userData.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                    <Building className="h-5 w-5 text-sky-500" />
                    <div>
                      <p className="text-sm text-sky-600">Province/State</p>
                      <p className="font-medium text-sky-800">{userData.province}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                    <CreditCard className="h-5 w-5 text-sky-500" />
                    <div>
                      <p className="text-sm text-sky-600">CNIC Number</p>
                      <p className="font-medium text-sky-800">{userData.cnicNo}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                    <Calendar className="h-5 w-5 text-sky-500" />
                    <div>
                      <p className="text-sm text-sky-600">Join Date</p>
                      <p className="font-medium text-sky-800">{new Date(userData.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'network' && (
            <div className="space-y-6">
              <div className="card-glass">
                <h3 className="text-xl font-bold text-sky-800 mb-6">Network Overview</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 glass rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-sky-800 mb-2">{userData.teamSize}</h4>
                    <p className="text-sky-600">Team Members</p>
                  </div>
                  
                  <div className="text-center p-6 glass rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-sky-800 mb-2">12</h4>
                    <p className="text-sky-600">Active This Month</p>
                  </div>
                  
                  <div className="text-center p-6 glass rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-sky-800 mb-2">5</h4>
                    <p className="text-sky-600">Top Performers</p>
                  </div>
                </div>
              </div>

              <div className="card-glass">
                <h3 className="text-xl font-bold text-sky-800 mb-6">Upline Information</h3>
                <div className="flex items-center space-x-4 p-6 glass rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center">
                    <UserCheck className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-sky-800">{userData.uplineName}</h4>
                    <p className="text-sky-600">{userData.uplineEmail}</p>
                    <p className="text-sm text-sky-500">Your Sponsor</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="card-glass">
              <h3 className="text-xl font-bold text-sky-800 mb-6">Achievements & Badges</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 glass rounded-xl"
                  >
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center mx-auto mb-4`}>
                      {achievement.icon}
                    </div>
                    <h4 className="text-lg font-bold text-sky-800 mb-2">{achievement.title}</h4>
                    <p className="text-sky-600">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;