import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDescription, MdStar, MdClose, MdAdd, MdCheckCircle, MdHourglassEmpty } from 'react-icons/md';
import { FaTrophy } from 'react-icons/fa';

function ApplicationList() {
  const navigate = useNavigate();
  return (
    <div className="application-list-container">
      <div className="app-card">
        <h3><MdDescription style={{marginRight:4}} /> What Next - Current Applications</h3>
        <button onClick={() => navigate('/home')}>Back to Home</button>
        <button onClick={() => navigate('/home/job-listings')}>Go to Job Listings</button>
        <div className="current-applications">
          <div>Company A - Position: Job Title <span><MdCheckCircle color="#4caf50" style={{verticalAlign:'middle'}} /> Applied</span></div>
          <div>Company B - Position: Job Title <span><MdHourglassEmpty color="#ffc107" style={{verticalAlign:'middle'}} /> Interviewing</span></div>
          <div>Company C - Position: Job Title <span><FaTrophy color="#ff9800" style={{verticalAlign:'middle'}} /> Offer</span></div>
        </div>
      </div>
      <div className="app-card">
        <h4><MdStar style={{marginRight:4}} color="#fbc02d" /> Wishlist</h4>
        <div className="application-status-list">
          <div>Company D - Position: Job Title</div>
        </div>
      </div>
      <div className="app-card">
        <h4><MdClose style={{marginRight:4}} color="#e53935" /> Rejected</h4>
        <div className="application-status-list">
          <div>Company E - Position: Job Title</div>
        </div>
      </div>
      <button className="add-application-btn"><MdAdd style={{verticalAlign:'middle'}} /> Add New Application</button>
    </div>
  );
}

export default ApplicationList; 