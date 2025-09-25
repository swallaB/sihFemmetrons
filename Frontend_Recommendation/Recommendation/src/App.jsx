import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/Landing/LandingPage';
import AuthPage from './pages/AuthPage';
import Homepage from './pages/Homepage';
import ProfileInputForm from './pages/ProfileInputForm';
import Dashboard from './pages/Dashboard';
import Form from './pages/internship_form/form';
import RecommPage from './pages/recomm_page';
import DetailPage from './pages/DetailPage';
import MainLayout from './MainLayout';
import Profile from './pages/Profile';
import RecommCheck from './pages/RecommCheck';

function App() {
  const isLoggedIn = true; 
  {/*const isProfileComplete = false; */}

  return (
    <Router>
      <Routes>

        {/* No Navbar pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<AuthPage />} />

        {/* With Navbar */}
        <Route 
          path="/home" 
          element={
            isLoggedIn ? (
              <MainLayout><Homepage /></MainLayout>
            ) : <Navigate to="/signin" />
          } 
        />
        <Route 
          path="/profile" 
          element={
            isLoggedIn ? (
              <MainLayout><Profile /></MainLayout>
            ) : <Navigate to="/signin" />
          } 
        />
        <Route 
          path="/profileInput" 
          element={
            isLoggedIn ? (
              <MainLayout><ProfileInputForm /></MainLayout>
            ) : <Navigate to="/signin" />
          } 
        />

        <Route 
  path="/dashboard" 
  element={
    isLoggedIn 
      ? <MainLayout><Dashboard /></MainLayout>
      : <Navigate to="/signin" />
  } 
/>
        <Route 
          path="/internship-form" 
          element={
            isLoggedIn ? (
              <MainLayout><Form /></MainLayout>
            ) : <Navigate to="/signin" />
          } 
        />
        <Route 
          path="/recomm-check" 
          element={
            isLoggedIn ? (
              <MainLayout><RecommCheck /></MainLayout>
            ) : <Navigate to="/signin" />
          } 
        />
        <Route 
          path="/recommendations" 
          element={
            isLoggedIn ? (
              <MainLayout><RecommPage /></MainLayout>
            ) : <Navigate to="/signin" />
          } 
        />
        <Route 
          path="/details/:id" 
          element={
            isLoggedIn ? (
              <MainLayout><DetailPage /></MainLayout>
            ) : <Navigate to="/signin" />
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
