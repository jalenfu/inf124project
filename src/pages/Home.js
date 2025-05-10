import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ notLoggedIn }) {
  const navigate = useNavigate();
  if (notLoggedIn) {
    return (
      <div className="home-guest-root">
        <div className="home-guest-content">
          <div className="app-card home-guest-jobs">
            <h2>Recommended Jobs</h2>
            <div className="job-card">Software Engineer<br />Remote, $80k/yr</div>
            <div className="job-card">Marketing Manager<br />In-office, $70k/yr</div>
            <div className="job-card">Product Manager<br />Hybrid, $100k/yr</div>
            <div className="job-card">Data Analyst<br />Remote, $90k/yr</div>
          </div>
          <div className="app-card home-guest-auth">
            <h3>Sign in to access all features</h3>
            <button className="login-btn" onClick={() => navigate('/login')}>Log In</button>
            <div style={{marginTop:12}}>
              Don't have an account?{' '}
              <span style={{color:'#0077b5', cursor:'pointer'}} onClick={() => navigate('/create-account')}>Create Account</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="home-responsive-root">
      {/* Profile Header */}
      <div className="profile-header home-profile">
        <div className="profile-pic" style={{cursor:'pointer'}} onClick={() => navigate('/home/friends/0/profile')} />
        <div>
          <h3>John Doe</h3>
          <span>Job Seeker</span>
        </div>
      </div>
      <div className="home-cards-grid">
        {/* Recommended Jobs Summary */}
        <div className="home-section-card">
          <div className="section-header">
            <h4>Recommended Jobs</h4>
            <button onClick={() => navigate('job-listings')}>See All</button>
          </div>
          <div className="job-card">Software Engineer<br />Remote, $80k/yr</div>
          <div className="job-card">Marketing Manager<br />In-office, $70k/yr</div>
        </div>
        {/* Applications Summary */}
        <div className="home-section-card">
          <div className="section-header">
            <h4>Current Applications</h4>
            <button onClick={() => navigate('applications')}>See All</button>
          </div>
          <div className="application-item">Company A - Job Title <span>Applied</span></div>
          <div className="application-item">Company B - Job Title <span>Interviewing</span></div>
          <div className="application-item">Company C - Job Title <span>Offer</span></div>
        </div>
        {/* Application Status Summary */}
        <div className="home-section-card">
          <div className="section-header">
            <h4>Application Status</h4>
          </div>
          <div className="status-row">
            <div>
              <div className="status-num">10</div>
              <div className="status-label">Total</div>
            </div>
            <div>
              <div className="status-num">3</div>
              <div className="status-label">Interviews</div>
            </div>
            <div>
              <div className="status-num">1</div>
              <div className="status-label">Offers</div>
            </div>
          </div>
        </div>
        {/* Upcoming Events Summary */}
        <div className="home-section-card">
          <div className="section-header">
            <h4>Upcoming Events</h4>
            <button onClick={() => navigate('schedule')}>See All</button>
          </div>
          <div className="event-summary-row">
            <div>
              <div className="event-icon">📅</div>
              <div>Interview: ABC, Oct 15</div>
            </div>
            <div>
              <div className="event-icon">⏰</div>
              <div>Deadline: 123, Oct 18</div>
            </div>
          </div>
        </div>
        {/* Friends List Summary */}
        <div className="home-section-card">
          <div className="section-header">
            <h4>Friends List</h4>
            <button onClick={() => navigate('friends')}>See All</button>
          </div>
          <div className="friend-summary-row">
            <div>John Doe <span>@LinkedIn</span></div>
            <div>Jane Smith <span>@Safeway</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 