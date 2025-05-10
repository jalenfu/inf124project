import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateAccount({ onCreate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    // Placeholder: Accept any account creation
    onCreate({ name, email });
    navigate('/home');
  };

  return (
    <div className="create-account-container">
      <form className="app-card" onSubmit={handleCreate} style={{maxWidth:400, margin:'40px auto'}}>
        <h2>Create Account</h2>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
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