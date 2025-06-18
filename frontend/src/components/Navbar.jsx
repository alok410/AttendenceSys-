import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');
  const name = JSON.parse(localStorage.getItem('name') || '[]');


  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  

  return (
    <nav style={{ background: '#333', color: '#fff', padding: '1rem' }}>
      <span style={{ marginRight: '1rem' }}>👋 Hello, {name || 'User'}</span>

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
