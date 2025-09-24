import React, { useState} from 'react';
import { Building2, Tag, BookOpen, Target, MapPin, Globe, Star, ChevronRight, TrendingUp, Award, Users, Clock, Heart, Eye, Code, Briefcase, DollarSign, ChevronLeft } from 'lucide-react';

const RecommendationPage = () => {
  const [activeTab, setActiveTab] = useState('top');

  // Sample internship data with professional styling
  const topRecommendations = [
    {
      id: 1,
      companyName: "TCS",
      sector: "Information Technology",
      areaField: "Software Development",
      internshipTitle: "Full Stack Developer Intern",
      internshipDistrict: "Mumbai",
      mode: "Hybrid",
      duration: "3 months",
      stipend: "₹25,000/month",
      applications: "2.3k",
      rating: 4.8,
      logo: "https://logos-world.net/wp-content/uploads/2020/09/TCS-Logo.png"
    },
    {
      id: 2,
      companyName: "Infosys",
      sector: "Information Technology",
      areaField: "Data Science",
      internshipTitle: "Machine Learning Intern",
      internshipDistrict: "Bangalore",
      mode: "Online",
      duration: "4 months",
      stipend: "₹30,000/month",
      applications: "1.8k",
      rating: 4.7,
      logo: "https://logos-world.net/wp-content/uploads/2020/09/Infosys-Logo.png"
    },
    {
      id: 3,
      companyName: "Wipro",
      sector: "Information Technology",
      areaField: "Cybersecurity",
      internshipTitle: "Security Analyst Intern",
      internshipDistrict: "Pune",
      mode: "Offline",
      duration: "6 months",
      stipend: "₹22,000/month",
      applications: "1.2k",
      rating: 4.6,
      logo: "https://logos-world.net/wp-content/uploads/2020/09/Wipro-Logo.png"
    },
    {
      id: 4,
      companyName: "Reliance Industries",
      sector: "Energy & Petrochemicals",
      areaField: "Process Engineering",
      internshipTitle: "Chemical Engineering Intern",
      internshipDistrict: "Jamnagar",
      mode: "Offline",
      duration: "5 months",
      stipend: "₹35,000/month",
      applications: "900",
      rating: 4.9,
      logo: "https://logos-world.net/wp-content/uploads/2020/09/Reliance-Logo.png"
    },
    {
      id: 5,
      companyName: "HDFC Bank",
      sector: "Banking & Financial Services",
      areaField: "Digital Banking",
      internshipTitle: "Fintech Development Intern",
      internshipDistrict: "Delhi",
      mode: "Hybrid",
      duration: "4 months",
      stipend: "₹28,000/month",
      applications: "1.5k",
      rating: 4.5,
      logo: "https://logos-world.net/wp-content/uploads/2020/09/HDFC-Bank-Logo.png"
    },
    {
      id: 6,
      companyName: "Mahindra Group",
      sector: "Automotive",
      areaField: "Electric Vehicles",
      internshipTitle: "EV Research Intern",
      internshipDistrict: "Chennai",
      mode: "Offline",
      duration: "6 months",
      stipend: "₹32,000/month",
      applications: "750",
      rating: 4.8,
      logo: "https://logos-world.net/wp-content/uploads/2020/09/Mahindra-Logo.png"
    }
  ];

  const allInternships = [
    ...topRecommendations,
    {
      id: 7,
      companyName: "Flipkart",
      sector: "E-commerce",
      areaField: "Product Management",
      internshipTitle: "Product Manager Intern",
      internshipDistrict: "Bangalore",
      mode: "Hybrid",
      duration: "3 months",
      stipend: "₹40,000/month",
      applications: "3.2k",
      rating: 4.9,
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png"
    },
    {
      id: 8,
      companyName: "Zomato",
      sector: "Food Tech",
      areaField: "Mobile Development",
      internshipTitle: "Android Developer Intern",
      internshipDistrict: "Gurgaon",
      mode: "Online",
      duration: "4 months",
      stipend: "₹26,000/month",
      applications: "2.1k",
      rating: 4.4,
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Zomato-Logo.png"
    },
    {
      id: 9,
      companyName: "Paytm",
      sector: "Fintech",
      areaField: "UX/UI Design",
      internshipTitle: "Design Intern",
      internshipDistrict: "Noida",
      mode: "Hybrid",
      duration: "3 months",
      stipend: "₹24,000/month",
      applications: "1.9k",
      rating: 4.6,
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Paytm-Logo.png"
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Arjun Sharma",
      rating: 5,
      feedback: "InternMatch helped me secure my dream internship at TCS. The platform's recommendation system is excellent and the application process was seamless.",
      role: "Software Engineer Intern",
      company: "TCS",
      avatar: "AS"
    },
    {
      id: 2,
      name: "Priya Patel",
      rating: 5,
      feedback: "Found the perfect internship match for my career goals. The variety of opportunities and detailed company information helped me make informed decisions.",
      role: "Data Science Intern",
      company: "Infosys",
      avatar: "PP"
    },
    {
      id: 3,
      name: "Rahul Kumar",
      rating: 4,
      feedback: "Professional platform with excellent user experience. Successfully landed multiple interview calls through InternMatch's network of partner companies.",
      role: "Product Management Intern",
      company: "Flipkart",
      avatar: "RK"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      rating: 5,
      feedback: "The personalized recommendations and career guidance provided by InternMatch were instrumental in securing my current internship position.",
      role: "UX Design Intern",
      company: "Paytm",
      avatar: "SR"
    }
  ];

  const currentInternships = activeTab === 'top' ? topRecommendations : allInternships;

  const getModeColor = (mode) => {
    switch (mode) {
      case 'Online': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Offline': return 'bg-slate-50 text-slate-700 border border-slate-200';
      case 'Hybrid': return 'bg-blue-50 text-blue-600 border border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50"></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-blue-300/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-slate-200/30 to-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-100/40 to-slate-100/40 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-300/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-slate-400/40 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-slate-300/40 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Clean Professional Navbar */}
        <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-12">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">iM</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    internMatch
                  </span>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="#" className="relative text-blue-600 font-semibold group">
                    Internships
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                  </a>
                  <a href="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Jobs</a>
                  <a href="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Competitions</a>
                  <a href="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Mentorships</a>
                  <a href="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Resources</a>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
                  For Employers
                </button>
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-200">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Recommendations Section - Starting point */}
        <div className="py-20 relative overflow-hidden">
          {/* Professional Background Animation for Recommendations */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-100/30 to-slate-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-r from-slate-200/30 to-blue-200/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            <div className="absolute top-1/3 right-1/5 w-4 h-4 bg-blue-300/40 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
            <div className="absolute bottom-1/4 left-1/6 w-3 h-3 bg-slate-400/40 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header with Professional Toggle */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-16">
              <div className="text-center lg:text-left mb-8 lg:mb-0">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  Curated <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">For You</span>
                </h2>
                <p className="text-slate-600 text-lg">Handpicked opportunities that match your aspirations and skillset.</p>
              </div>

              {/* Updated Professional Toggle with professional blue colors */}
              <div className="relative">
                <div className="flex items-center bg-slate-100 rounded-2xl p-1.5 shadow-inner">
                  <button
                    onClick={() => setActiveTab('top')}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${activeTab === 'top'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-blue-50 text-blue-200 hover:bg-blue-100'
                      }`}
                  >
                    For You
                  </button>

                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${activeTab === 'all'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-blue-50 text-blue-200 hover:bg-blue-100'
                      }`}
                  >
                    All Internships
                  </button>
                </div>
              </div>

            </div>

            {/* Enhanced Attractive & Simple Internship Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="group bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden transform hover:scale-[1.03] hover:border-blue-300"
                >
                  {/* Enhanced Card Header */}
                  <div className="relative p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50">
                    <div className="flex items-center space-x-4">
                      {/* Company Logo Image */}
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md overflow-hidden">
                        <img
                          src={internship.logo}
                          alt={internship.companyName}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl items-center justify-center text-white font-bold text-sm hidden">
                          {internship.companyName.slice(0, 3).toUpperCase()}
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

                  {/* Enhanced Card Body */}
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

                    {/* Smaller, More Attractive View Details Button */}
                    <button className="
  w-auto                     /* width adjusts to content instead of full */
  px-6 py-3                  /* increased padding for bigger button */
  text-sm                     /* slightly larger text */
  font-semibold
  rounded-lg
  bg-gradient-to-r from-blue-500 to-blue-400
  text-white
  hover:shadow-md hover:shadow-blue-500/30
  transform hover:scale-105
  transition-all duration-300
  hover:from-blue-600 hover:to-blue-700
  active:scale-95
">
  View Details
</button>


                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">What Students Say</h2>
              <p className="text-slate-600 text-lg">Hear from those who landed internships through InternMatch</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold mr-3">
                      {review.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{review.name}</h4>
                      <p className="text-sm text-slate-500">{review.role} @ {review.company}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">{renderStars(review.rating)}</div>
                  <p className="text-slate-600 text-sm leading-relaxed">"{review.feedback}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        
      </div>
    </div>
  );
};

export default RecommendationPage;