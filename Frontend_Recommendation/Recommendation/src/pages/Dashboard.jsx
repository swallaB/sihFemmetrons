
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Phone, MapPin, Edit3, Briefcase } from 'lucide-react';
import axios from 'axios';
import { useTranslation } from "react-i18next";


const Dashboard = () => {
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      const res = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userProfile = res.data;

      // Redirect to profile form if incomplete
      if (!userProfile.firstName || !userProfile.lastName || !userProfile.dateOfBirth) {
        navigate('/profile');
        return;
      }

      setProfile(userProfile);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch profile. Please login again.');
      navigate('/signin');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
    if (!profile) return 'Not provided';
    const addressParts = [profile.address, profile.city, profile.state, profile.country, profile.pincode]
      .filter(part => part && part.trim());
    return addressParts.join(', ') || 'Not provided';
  };
    const onEdit = () => navigate('/profileInput');
    const onUpdateRecommendations=()=> navigate('/internship-form')
 if (loading) return <p className="text-center mt-20 text-xl">Loading profile...</p>;
if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("Profile Dashboard")}</h1>
          <p className="text-gray-600 text-lg">Your details & recommendations at a glance</p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT: Profile Section */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                  {getGenderEmoji(profile.gender)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {profile.firstName || 'First'} {profile.lastName || 'Last'}
                  </h2>
                  <p className="text-blue-100">Profile Overview</p>
                </div>
              </div>
              <button
                onClick={onEdit}
                className="bg-white/20 hover:bg-white/30 rounded-xl p-2 transition"
              >
                Edit<Edit3 className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 text-blue-500 mr-2" /> {t("Personal Information")}
                </h3>
                <p><strong>Full Name:</strong> {profile.firstName} {profile.lastName}</p>
                <p><strong>DOB:</strong> {formatDate(profile.dateOfBirth)}</p>
                <p><strong>Gender:</strong> {profile.gender || 'Not provided'}</p>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Phone className="w-5 h-5 text-blue-500 mr-2" />{t("Contact Information")}
                </h3>
                <p><strong>Phone:</strong> {profile.phone || 'Not provided'}</p>
                <p><strong>Address:</strong> {getFullAddress()}</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Recommendations Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Briefcase className="w-6 h-6 text-indigo-600 mr-2" /> {t("Recommendations")}
              </h2>
              <button
                onClick={onUpdateRecommendations}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                {t("Update")}
              </button>
            </div>

            {/* Recommendation List */}
            {recommendations && recommendations.length > 0 ? (
              <ul className="space-y-4">
                {recommendations.map((rec, index) => (
                  <li key={index} className="p-4 bg-gray-50 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800">{rec.title}</h3>
                    <p className="text-gray-600">{rec.company}</p>
                    <p className="text-sm text-gray-500">Duration: {rec.duration}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">No recommendations yet. Click update to generate.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
