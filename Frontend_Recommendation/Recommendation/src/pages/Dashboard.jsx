import React from 'react';
import { User, Calendar, Phone, MapPin, Edit3 } from 'lucide-react';

const Dashboard = ({ profile, onEdit }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getGenderEmoji = (gender) => {
    switch (gender) {
      case 'Male': return '👨';
      case 'Female': return '👩';
      case 'Other': return '👤';
      default: return '👤';
    }
  };

  const getFullAddress = () => {
    const addressParts = [profile.address, profile.city, profile.state, profile.country, profile.pincode]
      .filter(part => part && part.trim());
    return addressParts.join(', ') || 'Not provided';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Profile Dashboard</h1>
          <p className="text-gray-600 text-lg">Your personal information at a glance</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
                  {getGenderEmoji(profile.gender)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">
                    {profile.firstName || 'First'} {profile.lastName || 'Last'}
                  </h2>
                  <p className="text-blue-100 text-lg mt-1">Profile Overview</p>
                </div>
              </div>
              <button
                onClick={onEdit}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-3 transition-colors group"
              >
                <Edit3 className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <User className="w-6 h-6 text-blue-500 mr-3" />
                    Personal Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        👤
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">Full Name</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {profile.firstName || 'Not provided'} {profile.lastName || ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">Date of Birth</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {formatDate(profile.dateOfBirth)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        🚻
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">Gender</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {profile.gender || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Phone className="w-6 h-6 text-blue-500 mr-3" />
                    Contact Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">Phone Number</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {profile.phone || 'Not provided'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">Full Address</p>
                        <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                          {getFullAddress()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Breakdown */}
            <div className="mt-8 bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 text-blue-500 mr-3" />
                Address Details
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl mb-2">🏙️</div>
                  <p className="text-sm font-medium text-gray-600">City</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {profile.city || 'Not provided'}
                  </p>
                </div>

                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl mb-2">🗺️</div>
                  <p className="text-sm font-medium text-gray-600">State</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {profile.state || 'Not provided'}
                  </p>
                </div>

                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl mb-2">🌍</div>
                  <p className="text-sm font-medium text-gray-600">Country</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {profile.country || 'Not provided'}
                  </p>
                </div>

                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl mb-2">📮</div>
                  <p className="text-sm font-medium text-gray-600">Pincode</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {profile.pincode || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-8 text-center">
              <button
                onClick={onEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors flex items-center space-x-3 mx-auto group"
              >
                <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Profile Completion</h3>
              <p className="text-gray-600">Keep your profile up to date</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {Math.round((Object.values(profile).filter(value => value && value.trim()).length / Object.keys(profile).length) * 100)}%
              </div>
              <p className="text-sm text-gray-600">Complete</p>
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(Object.values(profile).filter(value => value && value.trim()).length / Object.keys(profile).length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


