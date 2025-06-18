import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const HODDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <div style={{ padding: '1rem' }}>

      <h2>HOD Dashboard</h2>
    </div>
    </>
  );
};

export default HODDashboard;
