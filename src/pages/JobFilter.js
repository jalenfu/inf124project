import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdBusinessCenter, MdLocationOn, MdAttachMoney, MdLabel, MdTrendingUp, MdCode } from 'react-icons/md';

function JobFilter() {
  const navigate = useNavigate();
  return (
    <div className="job-filter-container">
      <div className="app-card">
        <h3><MdSearch style={{marginRight:4, fontSize:'1.4em'}} /> Job Filters</h3>
        <button onClick={() => navigate('/home/job-listings')}>Back to Job Listings</button>
        <div className="filter-section">
          <label><MdLocationOn style={{marginRight:4, fontSize:'1.4em'}} /> Location</label>
          <div className="location-tags">
            <button><MdLocationOn style={{marginRight:4, fontSize:'1.4em'}} /> Remote</button>
            <button><MdLocationOn style={{marginRight:4, fontSize:'1.4em'}} /> New York</button>
            <button><MdLocationOn style={{marginRight:4, fontSize:'1.4em'}} /> San Francisco</button>
            <button><MdLocationOn style={{marginRight:4, fontSize:'1.4em'}} /> London</button>
          </div>
          <label><MdAttachMoney style={{marginRight:4, fontSize:'1.4em'}} /> Salary</label>
          <input type="text" placeholder="Enter desired salary range" />
          <label><MdLabel style={{marginRight:4, fontSize:'1.4em'}} /> Skill Tags</label>
          <div className="skill-tags">
            <button><MdTrendingUp style={{marginRight:4, fontSize:'1.4em'}} /> Marketing</button>
            <button><MdCode style={{marginRight:4, fontSize:'1.4em'}} /> Web Development</button>
          </div>
          <button className="apply-filters-btn"><MdSearch style={{marginRight:4, fontSize:'1.4em', verticalAlign:'middle'}} /> Apply Filters</button>
        </div>
      </div>
      <div className="app-card">
        <h4><MdBusinessCenter style={{marginRight:4, fontSize:'1.4em'}} /> Recommended Jobs</h4>
        <div>Marketing Specialist - San Francisco, CA</div>
        <div>Front end Developer - Remote</div>
      </div>
    </div>
  );
}

export default JobFilter; 