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
import AdminDashboard from './admin/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-slate-900 font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Rute Publik */}
              <Route path="/" element={<Home />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rute Khusus Member (Wajib Login) */}
              <Route
                path="/schedule"
                element={
                  <ProtectedRoute>
                    <Schedule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/member"
                element={
                  <ProtectedRoute>
                    <MemberDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Rute Khusus Admin */}
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