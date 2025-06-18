import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import HodDashboard from './pages/HodDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';

import AllStudents from './pages/AllStudents';
import AllFaculty from './pages/AllFaculty';
import AllHOD from './pages/AllHOD';


import Forbidden from './pages/Forbidden';
import AllPrincipal from './pages/AllPrincipal';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/403" element={<Forbidden />} />

        {/* Admin Dashboard & Admin-Only Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AllStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AllFaculty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hod"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AllHOD />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/principal"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AllPrincipal />
            </ProtectedRoute>
          }
        />

        {/* Role-specific Dashboards */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hod/dashboard"
          element={
            <ProtectedRoute allowedRoles={['hod']}>
              <HodDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/principal/dashboard"
          element={
            <ProtectedRoute allowedRoles={['principal']}>
              <PrincipalDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
