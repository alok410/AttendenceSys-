import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const FacultyDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <h2>Faculty Dashboard</h2>
        <button
          style={{ marginTop: '1rem', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#3498db', color: 'white', border: 'none' }}
          onClick={() => navigate('/faculty/my-subjects')}
        >
          📘 My Subjects
        </button>
      </div>
    </>
  );
};

export default FacultyDashboard;