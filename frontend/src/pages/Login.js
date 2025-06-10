import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await authService.login(email, password);
      // Force a page reload to update the user state
      window.location.href = '/home';
    } catch (err) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <div className="login-container">
      <form className="app-card" onSubmit={handleLogin} style={{maxWidth:400, margin:'40px auto'}}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
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