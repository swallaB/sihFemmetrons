import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Building2, Tag, BookOpen, Target, MapPin, Globe, Star, ChevronRight, TrendingUp, Award, Users, Clock, Heart, Eye, Code, Briefcase, DollarSign, ChevronLeft, Calendar, Mail, Phone, GraduationCap, CheckCircle } from 'lucide-react';

const InternshipDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  // Get internship data from navigation state or mock data
  const [internshipData, setInternshipData] = useState(null);
  const [allInternships, setAllInternships] = useState([]);

  useEffect(() => {
    if (location.state && location.state.internship) {
      setInternshipData(location.state.internship);
      setAllInternships(location.state.allInternships || []);
    } else {
      // Mock data for direct URL access
      const mockInternship = {
        id: parseInt(id),
        companyName: "TCS",
        sector: "Information Technology",
        areaField: "Software Development",
        internshipTitle: "Full Stack Developer Intern",
        internshipDistrict: "Mumbai",
        internshipState: "Maharashtra",
        mode: "Hybrid",
        duration: "3 months",
        durationMonths: 3,
        stipend: "₹25,000/month",
        stipendAmount: "₹25,000",
        stipendType: "Monthly",
        applications: "2.3k",
        candidatesAlreadyApplied: 2300,
        rating: 4.8,
        logo: "https://t4.ftcdn.net/jpg/02/42/88/83/360_F_242888340_7fyDdY0fZvYB694ZYJdonKj9lt4fBFS8.jpg",
        companyLogoURL: "https://t4.ftcdn.net/jpg/02/42/88/83/360_F_242888340_7fyDdY0fZvYB694ZYJdonKj9lt4fBFS8.jpg",
        benefits: ["Health Insurance", "Learning & Development Budget", "Mentorship Program", "Flexible Working Hours", "Performance Bonus"],
        requiredSkills: ["React.js", "Node.js", "MongoDB", "JavaScript", "Python", "Git"],
        applicationDeadline: "2025-10-15",
        companyDescription: "Tata Consultancy Services is an Indian multinational information technology services and consulting company headquartered in Mumbai. It is a part of the Tata Group and operates in 149 locations across 46 countries.",
        requirementContact: { email: "internships@tcs.com", phone: "+91-22-6778-9999" },
        eligibilityEducation: "B.Tech/B.E. in Computer Science, Information Technology, or related field",
        eligibilityExperience: "0-1 years (Freshers welcome)",
        eligibilityDescription: "Strong programming fundamentals, good communication skills, and passion for technology",
        hiringWorkflow: ["Online Application Submission", "Technical Assessment", "Technical Interview Round 1", "Technical Interview Round 2", "HR Interview", "Final Selection"]
      };
      setInternshipData(mockInternship);
    }
  }, [id, location.state]);

  const getModeColor = (mode) => {
    switch (mode) {
      case 'Online': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Offline': return 'bg-slate-50 text-slate-700 border border-slate-200';
      case 'Hybrid': return 'bg-purple-50 text-purple-700 border border-purple-200';
      default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
      />
    ));
  };

  if (!internshipData) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-blue-300/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-slate-200/30 to-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-100/40 to-slate-100/40 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Professional Navbar */}
        <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-12">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ChevronLeft size={20} />
                  <span className="font-medium">Back</span>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">iM</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    internMatch
                  </span>
                </div>
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

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Sidebar - Recommendations */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sticky top-32">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Recommended</h3>
                <div className="space-y-4">
                  {allInternships.slice(0, 3).map((rec) => (
                    <button
                      key={rec.id}
                      onClick={() => navigate(`/internship/${rec.id}`, { state: { internship: rec, allInternships } })}
                      className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
                          <img
                            src={rec.logo}
                            alt={rec.companyName}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg items-center justify-center text-white font-bold text-xs hidden">
                            {rec.companyName.slice(0, 2)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">{rec.companyName}</h4>
                          <p className="text-xs text-slate-500">{rec.sector}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getModeColor(rec.mode)}`}>
                          {rec.mode}
                        </div>
                      </div>
                      <h5 className="font-medium text-slate-800 text-sm mb-2">{rec.internshipTitle}</h5>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center"><MapPin size={12} className="mr-1" />{rec.internshipDistrict}</span>
                        <span className="flex items-center"><Clock size={12} className="mr-1" />{rec.duration}</span>
                        <span className="font-semibold text-green-600">{rec.stipend}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Details */}
            <div className="lg:col-span-2">
              {/* Enhanced Header Section */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden mb-8">
                {/* Professional Header with Better Layout */}
                <div className="relative p-8 bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50">
                  {/* Company Logo and Title Section */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                    {/* Professional Logo Container */}
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden border border-slate-200 flex-shrink-0">
                      <img
                        src={internshipData.logo}
                        alt={internshipData.companyName}
                        className="w-16 h-16 object-contain transition-transform hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl items-center justify-center text-white font-bold text-lg hidden">
                        {internshipData.companyName.slice(0, 3)}
                      </div>
                    </div>

                    {/* Title and Company Info */}
                    <div className="flex-1">
                      <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight mb-2">
                        {internshipData.internshipTitle}
                      </h1>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <h2 className="text-xl font-medium text-blue-700">
                          {internshipData.companyName}
                        </h2>
                        <div className="flex items-center space-x-3">
                          <span className="text-slate-600 font-medium">{internshipData.sector}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600 font-medium">{internshipData.areaField}</span>
                        </div>
                      </div>
                      <div className="flex items-center mt-3 space-x-2">
                        <div className="flex">{renderStars(internshipData.rating)}</div>
                        <span className="text-slate-600 font-medium">({internshipData.rating})</span>
                      </div>
                    </div>

                    {/* Mode Badge */}
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${getModeColor(internshipData.mode)} flex-shrink-0`}>
                      {internshipData.mode}
                    </div>
                  </div>

                  {/* Animated Horizontal Divider */}
                  <div className="relative mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                    <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>

                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-slate-200">
                      <div className="flex items-center justify-center mb-2">
                        <MapPin size={20} className="text-blue-500" />
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Location</p>
                      <p className="font-semibold text-slate-900">{internshipData.internshipDistrict}, {internshipData.internshipState}</p>
                    </div>
                    <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-slate-200">
                      <div className="flex items-center justify-center mb-2">
                        <Clock size={20} className="text-blue-500" />
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Duration</p>
                      <p className="font-semibold text-slate-900">{internshipData.duration}</p>
                    </div>
                    <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-slate-200">
                      <div className="flex items-center justify-center mb-2">
                        <Users size={20} className="text-blue-500" />
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Applicants</p>
                      <p className="font-semibold text-slate-900">{internshipData.candidatesAlreadyApplied.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-slate-200">
                      <div className="flex items-center justify-center mb-2">
                        <Calendar size={20} className="text-red-500" />
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Deadline</p>
                      <p className="font-semibold text-slate-900">{new Date(internshipData.applicationDeadline).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Stipend and Apply Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-slate-200/50">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-sm text-slate-500 font-medium">Stipend</p>
                      <p className="text-2xl font-bold text-green-600">{internshipData.stipend}</p>
                    </div>
                    <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 active:scale-95">
                      Apply Now
                    </button>
                  </div>
                </div>

                {/* Professional Tab Navigation */}
                <div className="px-8 py-4 bg-white border-t border-slate-200">
                  <nav className="flex space-x-8 overflow-x-auto">
                    {[
                      { id: 'overview', label: 'Overview', icon: Eye },
                      { id: 'requirements', label: 'Requirements', icon: CheckCircle },
                      { id: 'process', label: 'Process', icon: TrendingUp },
                      { id: 'benefits', label: 'Benefits', icon: Award }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm rounded-lg transition-all duration-200 whitespace-nowrap ${
                            activeTab === tab.id
                              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          <Icon size={16} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">About the Company</h3>
                      <p className="text-slate-600 leading-relaxed">{internshipData.companyDescription}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Required Skills</h3>
                      <div className="flex flex-wrap gap-3">
                        {internshipData.requiredSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Education Requirements</h3>
                      <p className="text-slate-600 leading-relaxed">{internshipData.eligibilityEducation}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Experience Requirements</h3>
                      <p className="text-slate-600 leading-relaxed">{internshipData.eligibilityExperience}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Additional Requirements</h3>
                      <p className="text-slate-600 leading-relaxed">{internshipData.eligibilityDescription}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Information</h3>
                      <div className="space-y-2">
                        <p className="flex items-center text-slate-600"><Mail size={16} className="mr-2" />{internshipData.requirementContact.email}</p>
                        <p className="flex items-center text-slate-600"><Phone size={16} className="mr-2" />{internshipData.requirementContact.phone}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'process' && (
                  <div className="space-y-8">
                    <h3 className="text-xl font-bold text-slate-900">Hiring Process</h3>
                    <div className="space-y-4">
                      {internshipData.hiringWorkflow.map((step, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="font-medium text-slate-900">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div className="space-y-8">
                    <h3 className="text-xl font-bold text-slate-900">Benefits & Perks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {internshipData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
                          <CheckCircle size={20} className="text-green-600" />
                          <span className="font-medium text-slate-900">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailsPage;