import React from 'react';
import { MdNotifications, MdCheckCircle, MdError, MdInfo } from 'react-icons/md';

function Notifications() {
  return (
    <div className="notifications-container">
      <div className="app-card">
        <h3><MdNotifications style={{marginRight:4, fontSize:'1.4em'}} /> Notifications</h3>
      </div>
      <div className="app-card">
        <MdCheckCircle style={{color:'#4caf50', fontSize:'1.4em', marginRight:8}} />
        Your application to Google was viewed.
        <div style={{fontSize:'0.9em', color:'#888'}}>2 hours ago</div>
      </div>
      <div className="app-card">
        <MdInfo style={{color:'#2196f3', fontSize:'1.4em', marginRight:8}} />
        New job posting: Product Manager at Meta.
        <div style={{fontSize:'0.9em', color:'#888'}}>Today</div>
      </div>
      <div className="app-card">
        <MdError style={{color:'#e53935', fontSize:'1.4em', marginRight:8}} />
        Interview scheduled for Software Engineer at Netflix.
        <div style={{fontSize:'0.9em', color:'#888'}}>Yesterday</div>
      </div>
      <div className="app-card">
        <MdCheckCircle style={{color:'#4caf50', fontSize:'1.4em', marginRight:8}} />
        Offer received from Apple!
        <div style={{fontSize:'0.9em', color:'#888'}}>2 days ago</div>
      </div>
    </div>
  );
}

export default Notifications; 