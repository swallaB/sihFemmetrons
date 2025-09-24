import React from 'react';
import { Navbar } from '../common';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;