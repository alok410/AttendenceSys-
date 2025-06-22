import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
    
      localStorage.setItem('token', data.token);
      localStorage.setItem('roles', JSON.stringify(data.roles));
      localStorage.setItem('name', JSON.stringify(data.user.name));
      localStorage.setItem('name', JSON.stringify(data.user.name));
      localStorage.setItem('department', JSON.stringify(data.user.department_id));
      console.log(data.user);
      






      const roles = data.roles;

      if (roles.includes('admin')) navigate('/admin/dashboard');
      else if (roles.includes('hod')) navigate('/hod/dashboard');
      else if (roles.includes('faculty')) navigate('/faculty/dashboard');
      else if (roles.includes('principal')) navigate('/principal/dashboard');
      else if (roles.includes('student')) navigate('/student/dashboard');
      else throw new Error('No valid role found');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h5>TestFaculty@gmail.com - password -123</h5>
      <h5>TestAdmin@gmail.com - password -123456</h5>
      <h5>Testhod@gmail.com - password -123</h5>
      <h5>TestStu@gmail.com - password -123</h5>
      <h5>TestPrincipal@gmail.com - password -123</h5>



    </div>
  );
};

export default Login;
