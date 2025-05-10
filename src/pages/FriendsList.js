import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdGroup, MdHandshake, MdPerson } from 'react-icons/md';

const friends = [
  { id: 1, name: 'John Doe', workplace: 'LinkedIn', pic: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Jane Smith', workplace: 'Safeway', pic: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 3, name: 'Alex Johnson', workplace: 'Google', pic: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

function FriendsList() {
  const navigate = useNavigate();
  return (
    <div className="friends-list-container">
      <div className="app-card">
        <h3><MdGroup style={{marginRight:4, fontSize:'1.4em'}} /> Friends List</h3>
        <button onClick={() => navigate('/home')}>Back to Home</button>
        <div className="friends-section">
          {friends.map(friend => (
            <div key={friend.id}>
              <MdPerson style={{marginRight:4, fontSize:'1.4em'}} /> {friend.name} - {friend.workplace}
              <button onClick={() => navigate(`${friend.id}/profile`, { state: { name: friend.name, workplace: friend.workplace, pic: friend.pic } })}>View Profile</button>
            </div>
          ))}
        </div>
      </div>
      <div className="app-card">
        <h4><MdHandshake style={{marginRight:4, fontSize:'1.4em'}} /> Friends in Common</h4>
        <div className="friends-in-common">
          <div>John Doe & Jane Smith - Both applied to Acme Corp</div>
          <div>John Doe & Alex Johnson - Both interested in Tech startups</div>
        </div>
      </div>
    </div>
  );
}

export default FriendsList; 