import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder: Accept any login
    onLogin({ email });
    navigate('/home');
  };

  return (
    <div className="login-container">
      <form className="app-card" onSubmit={handleLogin} style={{maxWidth:400, margin:'40px auto'}}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="login-btn">Login</button>
        <div style={{marginTop:12}}>
          Don't have an account?{' '}
          <span style={{color:'#0077b5', cursor:'pointer'}} onClick={() => navigate('/create-account')}>Create Account</span>
        </div>
      </form>
    </div>
  );
}

export default Login; 