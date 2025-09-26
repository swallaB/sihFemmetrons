
// import React, { useState, useEffect } from 'react';
// import { MapPin, Clock, DollarSign, Eye, Star } from 'lucide-react';
// import axios from 'axios';

// const RecommendationPage = () => {
//   const [activeTab, setActiveTab] = useState('top');
//   const [topRecommendations, setTopRecommendations] = useState([]);
//   const [allInternships, setAllInternships] = useState([]);

//   // Dummy reviews data
//   const reviews = [
//     {
//       id: 1,
//       name: "Arjun Sharma",
//       rating: 5,
//       feedback: "InternMatch helped me secure my dream internship at TCS. The platform's recommendation system is excellent and the application process was seamless.",
//       role: "Software Engineer Intern",
//       company: "TCS",
//       avatar: "AS"
//     },
//     {
//       id: 2,
//       name: "Priya Patel",
//       rating: 5,
//       feedback: "Found the perfect internship match for my career goals. The variety of opportunities and detailed company information helped me make informed decisions.",
//       role: "Data Science Intern",
//       company: "Infosys",
//       avatar: "PP"
//     },
//     {
//       id: 3,
//       name: "Rahul Kumar",
//       rating: 4,
//       feedback: "Professional platform with excellent user experience. Successfully landed multiple interview calls through InternMatch's network of partner companies.",
//       role: "Product Management Intern",
//       company: "Flipkart",
//       avatar: "RK"
//     },
//     {
//       id: 4,
//       name: "Sneha Reddy",
//       rating: 5,
//       feedback: "The personalized recommendations and career guidance provided by InternMatch were instrumental in securing my current internship position.",
//       role: "UX Design Intern",
//       company: "Paytm",
//       avatar: "SR"
//     }
//   ];
//   const mapInternshipData = (internship) => ({
//   id: internship.Internship_ID,
//   internshipTitle: internship.Internship_Title,
//   companyName: internship.Company_Name,
//   sector: internship.Sector,
//   areaField: internship.Area_Field,
//   mode: internship.Mode,
//   internshipDistrict: internship.Internship_District,
//   duration: internship.Duration_Months ? `${internship.Duration_Months} months` : "NA",
//   stipend: internship.Stipend_Amount ? `₹${internship.Stipend_Amount}` : "NA",
//   applications: internship.Applications || 0,
//   logo: internship.Logo || "",
// });
//   // Fetch internships from backend
//   useEffect(() => {
//   const fetchInternships = async () => {
//     try {
//       // Fetch all internships (public)
//       const allRes = await axios.get("http://localhost:5000/api/internships");
//        console.log("All Internships (raw data):", allRes.data);
//       setAllInternships(allRes.data);

//       // Get auth token from localStorage
//       const token = localStorage.getItem("token"); // replace "token" with your key if different
//       if (!token) {
//         console.warn("No auth token found. Cannot fetch recommendations.");
//         return;
//       }

//       // Fetch top recommendations with Authorization header
//       const topRes = await axios.get("http://localhost:5000/api/internships/recommend", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       console.log("Top Recommendations (raw data):", topRes.data);

//       setTopRecommendations(topRes.data);
//     } catch (err) {
//       console.error("Error fetching internships:", err);
//     }
//   };

//   fetchInternships();
// }, []);


//   const currentInternships = activeTab === 'top' ? topRecommendations : allInternships;

//   const getModeColor = (mode) => {
//     switch (mode) {
//       case 'Online': return 'bg-blue-50 text-blue-700 border border-blue-200';
//       case 'Offline': return 'bg-slate-50 text-slate-700 border border-slate-200';
//       case 'Hybrid': return 'bg-blue-50 text-blue-600 border border-blue-200';
//       default: return 'bg-slate-50 text-slate-700 border border-slate-200';
//     }
//   };

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         size={14}
//         className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
//       />
//     ));
//   };
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Professional Animated Background */}
//       <div className="fixed inset-0 z-0 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50"></div>

//         {/* Animated gradient orbs */}
//         <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-blue-300/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
//         <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-slate-200/30 to-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
//         <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-100/40 to-slate-100/40 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>

//         {/* Floating geometric shapes */}
//         <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-300/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
//         <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-slate-400/40 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
//         <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
//         <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-slate-300/40 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>

//         {/* Subtle grid pattern */}
//         <div className="absolute inset-0 opacity-[0.02]" style={{
//           backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
//           backgroundSize: '40px 40px'
//         }}></div>
//       </div>

//       <div className="relative z-10">
//         {/* Recommendations Section - Starting point */}
//         <div className="py-20 relative overflow-hidden">
//           {/* Professional Background Animation for Recommendations */}
//           <div className="absolute inset-0">
//             <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-100/30 to-slate-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//             <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-r from-slate-200/30 to-blue-200/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
//             <div className="absolute top-1/3 right-1/5 w-4 h-4 bg-blue-300/40 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
//             <div className="absolute bottom-1/4 left-1/6 w-3 h-3 bg-slate-400/40 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
//           </div>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//             {/* Section Header with Professional Toggle */}
//             <div className="flex flex-col lg:flex-row justify-between items-center mb-16">
//               <div className="text-center lg:text-left mb-8 lg:mb-0">
//                 <h2 className="text-4xl font-bold text-slate-900 mb-4">
//                   Curated <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">For You</span>
//                 </h2>
//                 <p className="text-slate-600 text-lg">Handpicked opportunities that match your aspirations and skillset.</p>
//               </div>

//               {/* Updated Professional Toggle with professional blue colors */}
//               <div className="relative">
//                 <div className="flex items-center bg-slate-100 rounded-2xl p-1.5 shadow-inner">
//                   <button
//                     onClick={() => setActiveTab('top')}
//                     className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${activeTab === 'top'
//                       ? 'bg-blue-600 text-white shadow-md'
//                       : 'bg-blue-50 text-blue-200 hover:bg-blue-100'
//                       }`}
//                   >
//                     For You
//                   </button>

//                   <button
//                     onClick={() => setActiveTab('all')}
//                     className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${activeTab === 'all'
//                       ? 'bg-blue-600 text-white shadow-md'
//                       : 'bg-blue-50 text-blue-200 hover:bg-blue-100'
//                       }`}
//                   >
//                     All Internships
//                   </button>
//                 </div>
//               </div>

//             </div>

//             {/* Enhanced Attractive & Simple Internship Cards Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {currentInternships.map((internship) => (
//                 <div
//                   key={internship.id}
//                   className="group bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden transform hover:scale-[1.03] hover:border-blue-300"
//                 >
//                   {/* Enhanced Card Header */}
//                   <div className="relative p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50">
//                     <div className="flex items-center space-x-4">
//                       {/* Company Logo Image */}
//                       <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md overflow-hidden">
//                         <img
//                           src={internship.logo}
//                           alt={internship.companyName}
//                           className="w-12 h-12 object-contain"
//                           onError={(e) => {
//                             e.target.style.display = 'none';
//                             e.target.nextSibling.style.display = 'flex';
//                           }}
//                         />
//                         <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl items-center justify-center text-white font-bold text-sm hidden">
//                           {internship.companyName.slice(0, 3).toUpperCase()}
//                         </div>
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-xl font-bold text-slate-900">{internship.companyName}</h3>
//                         <p className="text-sm text-slate-500 font-medium">{internship.sector}</p>
//                       </div>
//                       <div className={`px-4 py-2 rounded-full text-xs font-semibold ${getModeColor(internship.mode)} shadow-sm`}>
//                         {internship.mode}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Enhanced Card Body */}
//                   <div className="p-6">
//                     <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">{internship.internshipTitle}</h4>
//                     <p className="text-slate-600 text-sm mb-5 font-medium bg-slate-50 px-1 py-2 rounded-lg">{internship.areaField}</p>

//                     <div className="grid grid-cols-2 gap-4 mb-6">
//                       <div className="flex items-center text-slate-700 text-sm bg-slate-00 rounded-lg p-3">
//                         <MapPin size={18} className="text-blue-500 mr-2 flex-shrink-0" />
//                         <span className="font-semibold">{internship.internshipDistrict}</span>
//                       </div>
//                       <div className="flex items-center text-slate-700 text-sm bg-slate-00 rounded-lg p-3">
//                         <Clock size={18} className="text-blue-500 mr-2 flex-shrink-0" />
//                         <span className="font-semibold">{internship.duration}</span>
//                       </div>
//                       <div className="flex items-center text-slate-700 text-sm bg-green-00 rounded-lg p-3">
//                         <DollarSign size={18} className="text-green-700 mr-2 flex-shrink-0" />
//                         <span className="font-semibold text-green-700">{internship.stipend}</span>
//                       </div>
//                       <div className="flex items-center text-slate-700 text-sm bg-blue-10 rounded-lg p-3">
//                         <Eye size={18} className="text-blue-500 mr-2 flex-shrink-0" />
//                         <span className="font-semibold">{internship.applications}</span>
//                       </div>
//                     </div>

//                     {/* Smaller, More Attractive View Details Button */}
//                     <button className="
//   w-auto                     /* width adjusts to content instead of full */
//   px-6 py-3                  /* increased padding for bigger button */
//   text-sm                     /* slightly larger text */
//   font-semibold
//   rounded-lg
//   bg-gradient-to-r from-blue-500 to-blue-400
//   text-white
//   hover:shadow-md hover:shadow-blue-500/30
//   transform hover:scale-105
//   transition-all duration-300
//   hover:from-blue-600 hover:to-blue-700
//   active:scale-95
// ">
//   View Details
// </button>


//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Reviews Section */}
//         <div className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl font-bold text-slate-900 mb-4">What Students Say</h2>
//               <p className="text-slate-600 text-lg">Hear from those who landed internships through InternMatch</p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {reviews.map((review) => (
//                 <div
//                   key={review.id}
//                   className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
//                 >
//                   <div className="flex items-center mb-4">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold mr-3">
//                       {review.avatar}
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-slate-900">{review.name}</h4>
//                       <p className="text-sm text-slate-500">{review.role} @ {review.company}</p>
//                     </div>
//                   </div>
//                   <div className="flex mb-3">{renderStars(review.rating)}</div>
//                   <p className="text-slate-600 text-sm leading-relaxed">"{review.feedback}"</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Footer CTA */}
        
//       </div>
//     </div>
//   );
// };

// export default RecommendationPage;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Clock, DollarSign, Eye } from "lucide-react";
import { useNavigate } from 'react-router-dom';


// Helper to map backend data to frontend-friendly keys
const mapInternshipData = (internship) => ({
  id: internship.Internship_ID,
  internshipTitle: internship.Internship_Title,
  companyName: internship.Company_Name,
  sector: internship.Sector,
  areaField: internship.Area_Field,
  mode: internship.Mode,
  internshipDistrict: internship.Internship_District,
  duration: internship.Duration_Months ? `${internship.Duration_Months} months` : "NA",
  stipend: internship.Stipend_Amount ? `₹${internship.Stipend_Amount}` : "NA",
  applications: internship.Applications || 0,
  logo: internship.Logo || "",
});

// Helper to style internship mode
const getModeColor = (mode) => {
  switch (mode.toLowerCase()) {
    case "remote":
      return "bg-blue-100 text-blue-700";
    case "hybrid":
      return "bg-yellow-100 text-yellow-700";
    case "on-site":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const RecommendationPage = () => {
  const [allInternships, setAllInternships] = useState([]);
  const [topRecommendations, setTopRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState("top");
 const navigate = useNavigate();
const handleClick = (internship) => {
  // Navigate to the internship details page
  navigate(`/details/${internship.id}`, {
    state: { internship }// optional: can pass data to avoid refetching
  });
};
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        // Fetch all internships (public)
        const allRes = await axios.get("http://localhost:5000/api/internships");
        setAllInternships(allRes.data.map(mapInternshipData));

        // Get auth token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No auth token found. Cannot fetch recommendations.");
          return;
        }

        // Fetch top recommendations with Authorization header
        const topRes = await axios.get("http://localhost:5000/api/internships/recommend", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTopRecommendations(topRes.data.map(mapInternshipData));
      } catch (err) {
        console.error("Error fetching internships:", err);
      }
    };

    fetchInternships();
  }, []);

  // Determine which internships to show
  const currentInternships = (activeTab === "top" ? topRecommendations : allInternships).slice(0, 500);

  return (
    <div className="min-h-screen bg-white">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-blue-300/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-slate-200/30 to-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-100/40 to-slate-100/40 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ animationDelay: "4s" }}></div>
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-300/40 rounded-full animate-bounce" style={{ animationDelay: "1s", animationDuration: "3s" }}></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-slate-400/40 rounded-full animate-ping" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse" style={{ animationDelay: "3s" }}></div>
        <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-slate-300/40 rotate-45 animate-spin" style={{ animationDuration: "8s" }}></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }}></div>
      </div>

      <div className="relative z-10">
        <div className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-16">
              <div className="text-center lg:text-left mb-8 lg:mb-0">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  Curated <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">For You</span>
                </h2>
                <p className="text-slate-600 text-lg">Handpicked opportunities that match your aspirations and skillset.</p>
              </div>
              <div className="flex items-center bg-slate-100 rounded-2xl p-1.5 shadow-inner">
                <button
                  onClick={() => setActiveTab("top")}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${activeTab === "top"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                    }`}
                >
                  For You
                </button>
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${activeTab === "all"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                    }`}
                >
                  All Internships
                </button>
              </div>
            </div>

            {/* Internship Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="group bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden transform hover:scale-[1.03] hover:border-blue-300"
                >
                  {/* Card Header */}
                  <div className="relative p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md overflow-hidden">
                        <img
                          src={internship.logo}
                          alt={internship.companyName}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl items-center justify-center text-white font-bold text-sm hidden">
                          {internship.companyName ? internship.companyName.slice(0, 3).toUpperCase() : "N/A"}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">{internship.companyName}</h3>
                        <p className="text-sm text-slate-500 font-medium">{internship.sector}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-xs font-semibold ${getModeColor(internship.mode)} shadow-sm`}>
                        {internship.mode}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">{internship.internshipTitle}</h4>
                    <p className="text-slate-600 text-sm mb-5 font-medium bg-slate-50 px-1 py-2 rounded-lg">{internship.areaField}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-slate-700 text-sm bg-slate-00 rounded-lg p-3">
                        <MapPin size={18} className="text-blue-500 mr-2 flex-shrink-0" />
                        <span className="font-semibold">{internship.internshipDistrict}</span>
                      </div>
                      <div className="flex items-center text-slate-700 text-sm bg-slate-00 rounded-lg p-3">
                        <Clock size={18} className="text-blue-500 mr-2 flex-shrink-0" />
                        <span className="font-semibold">{internship.duration}</span>
                      </div>
                      <div className="flex items-center text-slate-700 text-sm bg-green-00 rounded-lg p-3">
                        <DollarSign size={18} className="text-green-700 mr-2 flex-shrink-0" />
                        <span className="font-semibold text-green-700">{internship.stipend}</span>
                      </div>
                      <div className="flex items-center text-slate-700 text-sm bg-blue-10 rounded-lg p-3">
                        <Eye size={18} className="text-blue-500 mr-2 flex-shrink-0" />
                        <span className="font-semibold">{internship.applications}</span>
                      </div>
                    </div>
                   <button
                      onClick={() => handleClick(internship)}
                      className="w-auto px-6 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:shadow-md hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 active:scale-95"
                    >
                      View Details
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
