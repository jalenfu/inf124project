import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdBusinessCenter, MdSearch, MdAccessTime, MdPublic, MdAttachMoney, MdFavoriteBorder, MdLocationOn } from 'react-icons/md';

function SavedJobs() {
  const navigate = useNavigate();
  return (
    <div className="wishlist-container savedjobs-responsive-root">
      <div className="app-card">
        <h3><MdBusinessCenter style={{marginRight:4, fontSize:'1.4em'}} /> Saved Jobs</h3>
        <button onClick={() => navigate('/home')}>Back to Home</button>
        <button onClick={() => navigate('filter')}><MdSearch style={{marginRight:4, fontSize:'1.4em', verticalAlign:'middle'}} /> Filter Jobs</button>
      </div>
      <div className="savedjobs-cards-grid">
        <div className="app-card job-listing">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <b>Senior UX Designer</b> <MdFavoriteBorder style={{fontSize:'1.4em', verticalAlign:'middle'}} />
            </div>
            <button onClick={() => navigate('1')}>View Details</button>
          </div>
          <div>Google Inc.</div>
          <div><MdAccessTime style={{fontSize:'1.2em',verticalAlign:'middle'}} /> Full-time | <MdPublic style={{fontSize:'1.2em',verticalAlign:'middle'}} /> Remote | <MdAttachMoney style={{fontSize:'1.2em',verticalAlign:'middle'}} />$120k-150k</div>
        </div>
        <div className="app-card job-listing">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <b>Software Developer Internship</b> <MdFavoriteBorder style={{fontSize:'1.4em', verticalAlign:'middle'}} />
            </div>
            <button onClick={() => navigate('2')}>View Details</button>
          </div>
          <div>Apple</div>
          <div><MdLocationOn style={{fontSize:'1.2em',verticalAlign:'middle'}} /> Cupertino, CA | <MdPublic style={{fontSize:'1.2em',verticalAlign:'middle'}} /> Remote | <MdAttachMoney style={{fontSize:'1.2em',verticalAlign:'middle'}} />$120k-150k</div>
        </div>
        <div className="app-card job-listing">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <b>Product Manager</b> <MdFavoriteBorder style={{fontSize:'1.4em', verticalAlign:'middle'}} />
            </div>
            <button onClick={() => navigate('3')}>View Details</button>
          </div>
          <div>Meta</div>
          <div><MdAccessTime style={{fontSize:'1.2em',verticalAlign:'middle'}} /> Full-time | <MdLocationOn style={{fontSize:'1.2em',verticalAlign:'middle'}} /> Menlo Park, CA | <MdAttachMoney style={{fontSize:'1.2em',verticalAlign:'middle'}} />$140k-180k</div>
        </div>
        <div className="app-card job-listing">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <b>Data Analyst</b> <MdFavoriteBorder style={{fontSize:'1.4em', verticalAlign:'middle'}} />
            </div>
            <button onClick={() => navigate('4')}>View Details</button>
          </div>
          <div>Netflix</div>
          <div><MdAccessTime style={{fontSize:'1.2em',verticalAlign:'middle'}} /> Full-time | <MdLocationOn style={{fontSize:'1.2em',verticalAlign:'middle'}} /> Los Gatos, CA | <MdAttachMoney style={{fontSize:'1.2em',verticalAlign:'middle'}} />$110k-140k</div>
        </div>
      </div>
    </div>
  );
}

export default SavedJobs; 