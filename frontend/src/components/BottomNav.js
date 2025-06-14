import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdHome, MdListAlt } from 'react-icons/md';
import './BottomNav.css';

function BottomNav({ loggedIn }) {
  const location = useLocation();
  return (
    <nav className="bottom-nav">
      <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
        <MdHome style={{fontSize:'1.5em', verticalAlign:'middle', marginBottom:'2px'}} />
        <span className="nav-label">Home</span>
      </Link>
      {loggedIn ? (
        <Link to="/home/applications" className={location.pathname.startsWith('/home/applications') ? 'active' : ''}>
          <MdListAlt style={{fontSize:'1.5em', verticalAlign:'middle', marginBottom:'2px'}} />
          <span className="nav-label">Applications</span>
        </Link>
      ) : (
        <span className="nav-disabled">
          <MdListAlt style={{fontSize:'1.5em', verticalAlign:'middle', marginBottom:'2px', opacity:0.4}} />
          <span className="nav-label" style={{opacity:0.4}}>Applications</span>
        </span>
      )}
    </nav>
  );
}

export default BottomNav; 