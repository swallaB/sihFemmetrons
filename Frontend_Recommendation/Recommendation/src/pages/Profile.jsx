import React, { useState } from 'react';
import ProfileInputForm from './ProfileInputForm';
import Dashboard from './Dashboard';

function Profile() {
  const [currentView, setCurrentView] = useState('form');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });

  const handleSaveProfile = (profile) => {
    setProfileData(profile);
    setCurrentView('dashboard');
  };

  const handleEditProfile = () => {
    setCurrentView('form');
  };

  return (
    <>
      {currentView === 'form' && (
        <ProfileInputForm 
          onSave={handleSaveProfile} 
          initialData={profileData}
        />
      )}
      {currentView === 'dashboard' && (
        <Dashboard 
          profile={profileData} 
          onEdit={handleEditProfile}
        />
      )}
    </>
  );
}

export default Profile;
