import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const FacultyDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Navbar />

    <div style={{ padding: '1rem' }}>

      <h2>Faculty Dashboard</h2>
    </div>
    </>

  );
};

export default FacultyDashboard;
