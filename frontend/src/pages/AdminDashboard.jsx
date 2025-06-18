import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <h2>Admin Dashboard</h2>

        <button onClick={() => navigate('/admin/students')} style={btn}>Students</button>
        <button onClick={() => navigate('/admin/faculty')} style={btn}>Faculty</button>
        <button onClick={() => navigate('/admin/hod')} style={btn}>HOD</button>
        <button onClick={() => navigate('/admin/principal')} style={btn}>Principal</button>
        <button onClick={handleLogout} style={{ ...btn, backgroundColor: 'red' }}>Logout</button>
      </div>
    </>
  );
};

const btn = {
  height: "200px",
  width: "300px",
  cursor: "pointer",
  border: "none",
  borderRadius: "10%",
  color: "white",
  backgroundColor: "blue",
  margin: "10px"
};

export default AdminDashboard;
