import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');
  const name = JSON.parse(localStorage.getItem('name') || '""');
  const departmentId = JSON.parse(localStorage.getItem('department') || '""');

  const [departmentName, setDepartmentName] = useState('');

  // Fetch department name by ID
  useEffect(() => {
    const fetchDepartmentName = async () => {
      try {
        const res = await fetch(`http://localhost:5000/departments/getById/${departmentId}`);
        const data = await res.json();
        if (data && data.name) {
          setDepartmentName(data.name);
        } else {
          setDepartmentName('Unknown');
        }
      } catch (error) {
        console.error('Error fetching department:', error);
        setDepartmentName('Unknown');
      }
    };

    if (departmentId) fetchDepartmentName();
  }, [departmentId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav style={{ background: '#333', color: '#fff', padding: '1rem', display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '1rem' }}>
        👋 Hello, {name || 'User'} - {departmentName}
      </span>

      {roles.includes('admin') && <button onClick={() => navigate('/admin/dashboard')}>Admin Panel</button>}
      {roles.includes('principal') && <button onClick={() => navigate('/principal/dashboard')}>Principal Panel</button>}
      {roles.includes('hod') && <button onClick={() => navigate('/hod/dashboard')}>HOD Panel</button>}
      {roles.includes('faculty') && <button onClick={() => navigate('/faculty/dashboard')}>Faculty Panel</button>}
      {roles.includes('student') && <button onClick={() => navigate('/student/dashboard')}>Student Panel</button>}

      <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>Logout</button>
    </nav>
  );
};

export default Navbar;
