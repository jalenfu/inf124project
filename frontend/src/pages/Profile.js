import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdPerson, MdLocationOn, MdBusiness, MdSave, MdUpload, MdDescription } from 'react-icons/md';
import authService from '../services/authService';
import ProfilePictureSelector from '../components/ProfilePictureSelector';
import '../App.css';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [preferredLocation, setPreferredLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState('default1.png');

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Retail',
    'Media',
    'Transportation',
    'Energy',
    'Construction'
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const data = await authService.getProfile();
        setUser(data.user);
        setPreferredLocation(data.user.preferred_location || '');
        setSelectedIndustries(data.user.preferred_industry ? data.user.preferred_industry.split(',') : []);
        setSelectedPicture(data.user.profile_picture || 'default1.png');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleIndustryToggle = (industry) => {
    setSelectedIndustries(prev => {
      if (prev.includes(industry)) {
        return prev.filter(i => i !== industry);
      } else {
        return [...prev, industry];
      }
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await authService.updateProfile({
        preferred_location: preferredLocation,
        preferred_industry: selectedIndustries.join(','),
        profile_picture: selectedPicture
      });
      setUser(response.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // If viewing a friend's profile
  if (location.state?.friend) {
    const friend = location.state.friend;
    return (
      <div className="profile-container">
        <h2>{friend.username}'s Profile</h2>
        <div className="profile-info">
          <img 
            src={`/profile-pictures/${friend.profile_picture || 'default1.png'}`}
            alt={`${friend.username}'s profile`}
            className="profile-picture"
          />
          <p><strong>Location:</strong> {friend.preferred_location || 'Not specified'}</p>
          <p><strong>Industry:</strong> {friend.preferred_industry || 'Not specified'}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-info">
        <img 
          src={`/profile-pictures/${selectedPicture}`}
          alt="Your profile"
          className="profile-picture"
        />
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        
        <div className="profile-form">
          <ProfilePictureSelector
            selectedPicture={selectedPicture}
            onSelect={setSelectedPicture}
          />

          <div>
            <label htmlFor="location">Preferred Location:</label>
            <input
              type="text"
              id="location"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              placeholder="Enter your preferred location"
            />
          </div>

          <div>
            <label>Preferred Industries:</label>
            <div className="industry-tags">
              {industries.map(industry => (
                <button
                  key={industry}
                  className={selectedIndustries.includes(industry) ? 'selected' : ''}
                  onClick={() => handleIndustryToggle(industry)}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 