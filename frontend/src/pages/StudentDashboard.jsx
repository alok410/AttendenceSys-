import React from 'react';
import Navbar from '../components/Navbar';

const StudentDashboard = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <h2>Student Dashboard</h2>
        {/* Add more student-specific content here */}
      </div>
    </>
  );
};

export default StudentDashboard;
