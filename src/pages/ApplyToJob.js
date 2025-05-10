import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdEdit, MdDescription, MdSchool, MdRocketLaunch, MdBusinessCenter } from 'react-icons/md';

function ApplyToJob() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  return (
    <div className="apply-to-job-container">
      <div className="app-card">
        <h3><MdEdit style={{marginRight:4, fontSize:'1.4em'}} /> Apply to Job</h3>
        <button onClick={() => navigate(`/home/job-listings/${jobId}`)}>Back to Job Details</button>
      </div>
      <div className="app-card">
        <label><MdDescription style={{marginRight:4, fontSize:'1.4em'}} /> Attach Cover Letter</label>
        <input type="file" />
      </div>
      <div className="app-card">
        <label><MdSchool style={{marginRight:4, fontSize:'1.4em'}} /> College Education</label>
        <div className="education-tags">
          <button><MdSchool style={{marginRight:4, fontSize:'1.4em'}} /> Bachelor's Degree</button>
          <button><MdSchool style={{marginRight:4, fontSize:'1.4em'}} /> Master's Degree</button>
          <button><MdSchool style={{marginRight:4, fontSize:'1.4em'}} /> PhD</button>
        </div>
      </div>
      <button className="submit-application-btn"><MdRocketLaunch style={{marginRight:4, fontSize:'1.4em', verticalAlign:'middle'}} /> Submit Application</button>
      <div className="app-card">
        <h4><MdBusinessCenter style={{marginRight:4, fontSize:'1.4em'}} /> Recommended Job Openings</h4>
        <div>Software Developer - Salary: $70,000+</div>
        <div>UI/UX Designer - Salary: $60,000+</div>
      </div>
    </div>
  );
}

export default ApplyToJob; 