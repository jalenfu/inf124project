import React from 'react';
import '../styles/ProfilePictureSelector.css';

const PROFILE_PICTURES = [
  { id: 'default1.svg', name: 'Briefcase' },
  { id: 'default2.svg', name: 'Graduation Cap' },
  { id: 'default3.svg', name: 'Lightbulb' },
  { id: 'default4.svg', name: 'Rocket' },
  { id: 'default5.svg', name: 'Compass' },
  { id: 'default6.svg', name: 'Star' }
];

const ProfilePictureSelector = ({ selectedPicture, onSelect }) => {
  return (
    <div className="profile-picture-selector">
      <h3>Select Profile Picture</h3>
      <div className="picture-grid">
        {PROFILE_PICTURES.map((pic) => (
          <div
            key={pic.id}
            className={`picture-option ${selectedPicture === pic.id ? 'selected' : ''}`}
            onClick={() => onSelect(pic.id)}
          >
            <img
              src={`/profile-pictures/${pic.id}`}
              alt={pic.name}
              className="profile-picture-preview"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePictureSelector; 