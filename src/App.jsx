import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import Home from './pages/Home';
import Achievements from './pages/Achievements';
import Schedule from './pages/Schedule';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberDashboard from './member/MemberDashboard';
import CompleteProfile from './member/CompleteProfile';
import AdminDashboard from './admin/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-slate-900 font-sans relative overflow-x-hidden">
          {/* Ambient Red Glow Mesh Background (Global) */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[130px]" />
          </div>

          <Navbar />
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/member"
                element={
                  <ProtectedRoute>
                    <MemberDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/complete-profile"
                element={
                  <ProtectedRoute>
                    <CompleteProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}