import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdBusiness, MdListAlt, MdCardGiftcard, MdAttachMoney, MdHealthAndSafety, MdWork, MdSchool, MdBuild } from 'react-icons/md';

function JobPosting() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  return (
    <div className="job-posting-container">
      <div className="app-card">
        <h3><MdBusiness style={{marginRight:4, fontSize:'1.4em'}} /> Job Posting Details</h3>
        <button onClick={() => navigate('/home/job-listings')}>Back to Job Listings</button>
        <button onClick={() => navigate(`/home/job-listings/${jobId}/apply`)}>Apply</button>
        <div className="company-info">
          <div><b>Company X</b></div>
          <div>Senior Software Engineer Position</div>
          <div>Full-time, Remote</div>
        </div>
      </div>
      <div className="app-card">
        <h4><MdListAlt style={{marginRight:4, fontSize:'1.4em'}} /> Requirements</h4>
        <div><MdWork style={{marginRight:4, fontSize:'1.4em'}} /> Experience: Minimum 5 years</div>
        <div><MdSchool style={{marginRight:4, fontSize:'1.4em'}} /> Education: B.S. Computer Science</div>
        <div><MdBuild style={{marginRight:4, fontSize:'1.4em'}} /> Skills: Proficient in ...</div>
      </div>
      <div className="app-card">
        <h4><MdCardGiftcard style={{marginRight:4, fontSize:'1.4em'}} /> Additional Benefits</h4>
        <div><MdAttachMoney style={{marginRight:4, fontSize:'1.4em'}} /> Annual Bonus: 10% of annual salary</div>
        <div><MdHealthAndSafety style={{marginRight:4, fontSize:'1.4em'}} /> Health Insurance: Provided</div>
      </div>
    </div>
  );
}

export default JobPosting; 