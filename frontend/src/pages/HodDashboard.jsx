import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HODDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <h2>HOD Dashboard</h2>

      <button style={btn} onClick={() => navigate('/hod/assign-subject')}>
        Assign Subject to Faculty
      </button>
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
export default HODDashboard;
