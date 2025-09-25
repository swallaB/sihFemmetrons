// import React, { useState } from 'react';
// import ProfileInputForm from './ProfileInputForm';
// import Dashboard from './Dashboard';

// function Profile() {
//   const [currentView, setCurrentView] = useState('form');
//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     gender: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     country: '',
//     pincode: '',
//   });

//   const handleSaveProfile = (profile) => {
//     setProfileData(profile);
//     setCurrentView('dashboard');
//   };

//   const handleEditProfile = () => {
//     setCurrentView('form');
//   };

//   return (
//     <>
//       {currentView === 'form' && (
//         <ProfileInputForm 
//           onSave={handleSaveProfile} 
//           initialData={profileData}
//         />
//       )}
//       {currentView === 'dashboard' && (
//         <Dashboard 
//           profile={profileData} 
//           onEdit={handleEditProfile}
//         />
//       )}
//     </>
//   );
// }

// export default Profile;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileInputForm from "./ProfileInputForm";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // redirect if not logged in
          return;
        }

        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);

        // Check if all required fields are filled
        const requiredFields = [
          "firstName",
          "lastName",
          "dateOfBirth",
          "gender",
          "phone",
          "address",
          "city",
          "state",
          "country",
          "pincode",
        ];

        const isComplete = requiredFields.every(
          (field) => res.data[field] && res.data[field].trim() !== ""
        );

        if (isComplete) {
          navigate("/dashboard"); // redirect if profile is complete
        } else {
          setLoading(false); // show form if incomplete
        }
      } catch (err) {
        console.error(err);
        navigate("/login"); // redirect if error
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return <ProfileInputForm initialData={profile} />;
};

export default Profile;
