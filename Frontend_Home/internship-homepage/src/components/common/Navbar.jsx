import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { code: 'en', name: 'English', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    setIsLanguageOpen(false);
  };

  return (
    <header 
      className="bg-white backdrop-blur-lg border-b sticky top-0 z-50" 
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', 
        borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
        position: 'sticky',
        top: '0',
        zIndex: '50'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 32px' }}>
        <div className="flex justify-between items-center py-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0' }}>
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <div 
              className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg"
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 50%, #1d4ed8 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              <span className="text-white font-bold text-lg drop-shadow-sm" style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}>
                IM
              </span>
            </div>
            <div className="transform group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent" style={{ 
                fontSize: '20px', 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1f2937, #4b5563)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                internMatch
              </h1>
              <p className="text-xs text-gray-500 font-medium" style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                PM Internship Scheme
              </p>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-8" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1', maxWidth: '28rem', margin: '0 32px' }}>
            <nav 
              className="flex space-x-1 bg-gray-100 rounded-2xl p-2" 
              style={{ 
                display: 'flex', 
                gap: '60px',
                backgroundColor: '#f3f4f6',
                borderRadius: '16px',
                padding: '8px'
              }}
            >
              <a 
                href="#" 
                className="px-6 py-2 bg-white text-blue-600 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105" 
                style={{ 
                  padding: '8px 24px',
                  backgroundColor: 'white',
                  color: '#2563eb', 
                  fontWeight: '600',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                Home
              </a>
              <a 
                href="#" 
                className="px-6 py-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-xl font-semibold transition-all duration-300 hover:shadow-sm" 
                style={{ 
                  padding: '8px 24px',
                  color: '#4b5563', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease'
                }}
              >
                Recommendations
              </a>
              <a 
                href="#" 
                className="px-6 py-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-xl font-semibold transition-all duration-300 hover:shadow-sm" 
                style={{ 
                  padding: '8px 24px',
                  color: '#4b5563', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease'
                }}
              >
                My Profile
              </a>
            </nav>
          </div>

          {/* Right Section - Language Selector & Profile */}
          <div className="flex items-center space-x-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px', 
                  backgroundColor: '#2563eb', 
                  color: 'white', 
                  borderRadius: '12px', 
                  fontSize: '13px', 
                  fontWeight: '600', 
                  border: 'none', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)'
                }}
              >
                <div 
                  className="w-6 h-6 bg-white bg-opacity-20 rounded-lg flex items-center justify-center"
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 'bold' }}>A</span>
                </div>
                <span className="hidden sm:inline text-sm">{selectedLanguage}</span>
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: isLanguageOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Language Dropdown */}
              {isLanguageOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                  style={{
                    position: 'absolute',
                    right: '0',
                    top: '100%',
                    marginTop: '8px',
                    width: '192px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    border: '1px solid #e5e7eb',
                    padding: '8px 0',
                    zIndex: '50',
                    animation: 'fadeIn 0.2s ease-out'
                  }}
                >
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language)}
                      className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 16px',
                        backgroundColor: selectedLanguage === language.name ? '#eff6ff' : 'transparent',
                        color: selectedLanguage === language.name ? '#2563eb' : '#374151',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: selectedLanguage === language.name ? '600' : '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ marginRight: '12px', fontSize: '16px' }}>{language.flag}</span>
                      <span>{language.name}</span>
                      {selectedLanguage === language.name && (
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginLeft: 'auto', color: '#2563eb' }}
                        >
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Button */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 16px', 
                  background: 'linear-gradient(135deg, #2563eb, #9333ea)', 
                  color: 'white', 
                  borderRadius: '12px', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  border: 'none', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)'
                }}
              >
                <div 
                  className="w-8 h-8 bg-white bg-opacity-20 rounded-xl flex items-center justify-center ring-2 ring-white ring-opacity-30"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>🚪</span>
                </div>
                <span className="hidden sm:inline">Log Out</span>
                <div 
                  className="w-2 h-2 bg-green-400 rounded-full absolute -top-1 -right-1 ring-2 ring-white animate-pulse"
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#4ade80',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    border: '2px solid white',
                    animation: 'pulse 2s infinite'
                  }}
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          {/* <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-110"
              style={{
                padding: '8px',
                borderRadius: '12px',
                color: '#4b5563',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div> */}
        </div>

        {/* Mobile Menu */}
        {/* <div 
          className="md:hidden border-t border-gray-200 overflow-hidden transition-all duration-300"
          style={{ 
            borderTop: '1px solid #e5e7eb',
            maxHeight: isMobileMenuOpen ? '300px' : '0px',
            opacity: isMobileMenuOpen ? 1 : 0,
            transition: 'all 0.3s ease',
            overflow: 'hidden'
          }}
        >
          <nav className="py-4 space-y-3" style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a 
              href="#" 
              className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-xl font-semibold mx-2 transition-all duration-300 transform hover:scale-105" 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                margin: '0 8px',
                color: '#2563eb', 
                backgroundColor: '#eff6ff',
                fontWeight: '600',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <span className="mr-3" style={{ marginRight: '12px', fontSize: '18px' }}>🏠</span>
              Home
            </a>
            <a 
              href="#" 
              className="flex items-center px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold mx-2 transition-all duration-300 transform hover:scale-105" 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                margin: '0 8px',
                color: '#4b5563', 
                fontWeight: '600',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <span className="mr-3" style={{ marginRight: '12px', fontSize: '18px' }}>💡</span>
              Recommendations
            </a>
            <a 
              href="#" 
              className="flex items-center px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold mx-2 transition-all duration-300 transform hover:scale-105" 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                margin: '0 8px',
                color: '#4b5563', 
                fontWeight: '600',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <span className="mr-3" style={{ marginRight: '12px', fontSize: '18px' }}>👤</span>
              My Profile
            </a>
            
            Mobile Language Selector
            <div className="mx-2 px-4 py-3 bg-blue-50 rounded-xl">
              <div className="flex items-center mb-3" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <span className="mr-3 text-lg" style={{ marginRight: '12px', fontSize: '18px' }}>🌐</span>
                <span className="font-semibold text-blue-700" style={{ fontWeight: '600', color: '#1d4ed8' }}>Language</span>
              </div>
              <div className="grid grid-cols-1 gap-2" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                {languages.slice(0, 4).map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className="flex items-center px-3 py-2 text-left hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 12px',
                      backgroundColor: selectedLanguage === language.name ? '#dbeafe' : 'transparent',
                      color: selectedLanguage === language.name ? '#1d4ed8' : '#374151',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: selectedLanguage === language.name ? '600' : '500',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ marginRight: '8px', fontSize: '14px' }}>{language.flag}</span>
                    <span>{language.name}</span>
                    {selectedLanguage === language.name && (
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: 'auto', color: '#1d4ed8' }}
                      >
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

export default Navbar;