import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEvent, MdPerson, MdAccessTime, MdComputer } from 'react-icons/md';

function Schedule() {
  const navigate = useNavigate();
  return (
    <div className="schedule-container">
      <div className="app-card">
        <h3><MdEvent style={{marginRight:4, fontSize:'1.4em'}} /> Upcoming Events</h3>
        <button onClick={() => navigate('/home')}>Back to Home</button>
        <div className="event-icons">
          <div><MdPerson style={{fontSize:'1.4em'}} /> Interviews</div>
          <div><MdAccessTime style={{fontSize:'1.4em'}} /> Deadlines</div>
          <div><MdComputer style={{fontSize:'1.4em'}} /> OA Dates</div>
        </div>
      </div>
      <div className="app-card">
        <h4><MdPerson style={{marginRight:4, fontSize:'1.4em'}} /> Upcoming Interviews</h4>
        <div>Company ABC - Software Engineer <span>Oct 15, 2022</span></div>
        <div>Company XYZ - Product Manager <span>Oct 20, 2022</span></div>
      </div>
      <div className="app-card">
        <h4><MdAccessTime style={{marginRight:4, fontSize:'1.4em'}} /> Application Deadlines</h4>
        <div>Company 123 - Marketing Specialist <span>Oct 18, 2022</span></div>
        <div>Company EFG - Data Analyst <span>Oct 25, 2022</span></div>
      </div>
      <div className="app-card">
        <h4><MdComputer style={{marginRight:4, fontSize:'1.4em'}} /> OA Dates</h4>
        <div>No upcoming OA dates</div>
      </div>
    </div>
  );
}

export default Schedule; 