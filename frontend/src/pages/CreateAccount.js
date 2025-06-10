import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await authService.register(username, email, password, firstName, lastName);
      // Force a page reload to update the user state
      window.location.href = '/home';
    } catch (err) {
      setError(err.message || 'Failed to create account');
    }
  };

  return (
    <div className="create-account-container">
      <form className="app-card" onSubmit={handleCreate} style={{maxWidth:400, margin:'40px auto'}}>
        <h2>Create Account</h2>
        {error && <div className="error-message">{error}</div>}
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="login-btn">Create Account</button>
        <div style={{marginTop:12}}>
          Already have an account?{' '}
          <span style={{color:'#0077b5', cursor:'pointer'}} onClick={() => navigate('/login')}>Login</span>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount; 