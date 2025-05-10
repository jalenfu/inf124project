import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <div className="logo-placeholder" />
      <h2>Welcome to What's Next</h2>
      <button className="login-btn linkedin" onClick={() => navigate('/login')}>Login with LinkedIn</button>
      <button className="login-btn google" onClick={() => navigate('/login')}>Login with Google</button>
      <button className="login-btn create" onClick={() => navigate('/create-account')}>Create Account</button>
      <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}

export default Landing; 