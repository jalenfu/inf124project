import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdPerson, MdLocationOn, MdBusiness, MdSave, MdUpload, MdDescription } from 'react-icons/md';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const friend = location.state;

  if (friend) {
    // Friend profile placeholder
    return (
      <div className="profile-container">
        <div className="app-card" style={{textAlign:'center'}}>
          <img src={friend.pic} alt={friend.name} style={{width:96, height:96, borderRadius:'50%', marginBottom:16}} />
          <h2>{friend.name}</h2>
          <div style={{color:'#888', fontSize:'1.1em'}}>{friend.workplace}</div>
          <button onClick={() => navigate('/home/friends')}>Back to Friends List</button>
        </div>
      </div>
    );
  }

  // User's own profile
  return (
    <div className="profile-container">
      <div className="app-card">
        <h3><MdPerson style={{marginRight:4, fontSize:'1.4em'}} /> Profile Settings</h3>
        <button onClick={() => navigate('/home')}>Back to Home</button>
        <div className="profile-header">
          <div className="profile-pic" />
          <div>
            <h4>John Doe</h4>
            <span>Software Engineer</span>
          </div>
        </div>
      </div>
      <div className="app-card">
        <div className="profile-form">
          <label><MdLocationOn style={{marginRight:4, fontSize:'1.4em'}} /> Location</label>
          <input type="text" placeholder="Enter your location" />
          <label><MdBusiness style={{marginRight:4, fontSize:'1.4em'}} /> Preferred Industry</label>
          <div className="industry-tags">
            <button>Technology</button>
            <button>Finance</button>
            <button>Healthcare</button>
            <button>Marketing</button>
          </div>
          <button className="save-btn"><MdSave style={{marginRight:4, fontSize:'1.4em', verticalAlign:'middle'}} /> Save Changes</button>
          <label><MdDescription style={{marginRight:4, fontSize:'1.4em'}} /> Upload Resume</label>
          <input type="file" />
          <button className="upload-btn"><MdUpload style={{marginRight:4, fontSize:'1.4em', verticalAlign:'middle'}} /> Upload</button>
        </div>
      </div>
    </div>
  );
}

export default Profile; 