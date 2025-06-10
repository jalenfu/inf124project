import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import applicationService from '../services/applicationService';
import jobService from '../services/jobService';
import { MdEvent, MdAccessTime, MdComputer, MdStarBorder, MdStar } from 'react-icons/md';

// Cache duration in milliseconds (1 hour)
const CACHE_DURATION = 60 * 60 * 1000;

function Home({ notLoggedIn }) {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [applications, setApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const getCachedJobs = () => {
    try {
      const cachedData = localStorage.getItem('recommendedJobs');
      if (!cachedData) return null;

      const { jobs, timestamp } = JSON.parse(cachedData);
      const now = new Date().getTime();

      // Check if cache is still valid
      if (now - timestamp < CACHE_DURATION) {
        return jobs;
      }
      return null;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  };

  const setCachedJobs = (jobs) => {
    try {
      const cacheData = {
        jobs,
        timestamp: new Date().getTime()
      };
      localStorage.setItem('recommendedJobs', JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error writing to cache:', error);
    }
  };

  const fetchRecommendedJobs = async (preferred_location, preferred_industry) => {
    try {
      const jobsData = await jobService.searchJobs(
        preferred_industry || '',
        preferred_location || '',
        1,
        25
      );
      const jobs = jobsData.jobs.slice(0, 3); // Get top 3 jobs
      setRecommendedJobs(jobs);
      setCachedJobs(jobs);
    } catch (err) {
      console.error('Error fetching recommended jobs:', err);
      setError(err.message || 'Failed to fetch recommended jobs');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch applications
        const applicationsData = await applicationService.getUserApplications();
        setApplications(applicationsData);

        // Fetch user profile to get preferences
        const profileData = await authService.getProfile();
        setUserProfile(profileData.user);
        const { preferred_location, preferred_industry } = profileData.user;

        // Check cache first
        const cachedJobs = getCachedJobs();
        if (cachedJobs) {
          setRecommendedJobs(cachedJobs);
        } else if (preferred_location || preferred_industry) {
          // If no cache, fetch new data
          await fetchRecommendedJobs(preferred_location, preferred_industry);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (!notLoggedIn) {
      fetchData();
    }
  }, [notLoggedIn]);

  // Function to force refresh recommended jobs
  const refreshRecommendedJobs = async () => {
    if (userProfile) {
      const { preferred_location, preferred_industry } = userProfile;
      await fetchRecommendedJobs(preferred_location, preferred_industry);
    }
  };

  const handleStar = async (job, e) => {
    e.stopPropagation(); // Prevent card click when clicking star
    const savedApp = applications.find(app => app.job_id === job.id);
    if (savedApp) {
      // Remove from applications
      try {
        await applicationService.deleteApplication(savedApp.id);
        setApplications(applications.filter(app => app.id !== savedApp.id));
      } catch (err) {
        console.error('Failed to remove job from applications:', err);
      }
    } else {
      // Add to applications
      try {
        const newApp = await applicationService.createApplication({
          id: job.id,
          title: job.title,
          company_name: job.company_name,
          location: job.location,
        });
        setApplications([...applications, { ...job, id: newApp.id, job_id: job.id, status: 'Wishlisted' }]);
      } catch (err) {
        console.error('Failed to add job to applications:', err);
      }
    }
  };

  const isJobSaved = (jobId) => applications.some(app => app.job_id === jobId);

  // Calculate status counts
  const total = applications.length;
  const interviews = applications.filter(app => app.status === 'Interview Pending' || app.status === 'Interviewed').length;
  const offers = applications.filter(app => app.status === 'Offered').length;

  // Get upcoming events
  const getUpcomingEvents = () => {
    const events = [];
    const today = new Date();
    
    applications.forEach(app => {
      if (app.status === 'Wishlisted' && app.apply_deadline) {
        const deadline = new Date(app.apply_deadline);
        if (deadline >= today) {
          events.push({
            type: 'deadline',
            date: deadline,
            title: `${app.company_name} - ${app.job_title}`,
            icon: <MdAccessTime style={{color: '#ff9800'}} />
          });
        }
      }
      if (app.status === 'Interview Pending' && app.interview_date) {
        const interviewDate = new Date(app.interview_date);
        if (interviewDate >= today) {
          events.push({
            type: 'interview',
            date: interviewDate,
            title: `${app.company_name} - ${app.job_title}`,
            icon: <MdEvent style={{color: '#2196f3'}} />
          });
        }
      }
      if (app.status === 'OA Pending' && app.oa_deadline) {
        const oaDate = new Date(app.oa_deadline);
        if (oaDate >= today) {
          events.push({
            type: 'oa',
            date: oaDate,
            title: `${app.company_name} - ${app.job_title}`,
            icon: <MdComputer style={{color: '#4caf50'}} />
          });
        }
      }
    });

    // Sort events by date
    return events.sort((a, b) => a.date - b.date).slice(0, 4); // Show up to 4 upcoming events
  };

  const upcomingEvents = getUpcomingEvents();

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
        <img 
          src={`/profile-pictures/${userProfile?.profile_picture || 'default1.svg'}`}
          alt="Profile"
          className="profile-pic"
          style={{cursor:'pointer'}} 
          onClick={() => navigate('/home/profile')} 
        />
        <div>
          <h3>{currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Loading...'}</h3>
          <span>Job Seeker</span>
        </div>
      </div>
      <div className="home-cards-grid">
        {/* Recommended Jobs Summary */}
        <div className="home-section-card">
          <div className="section-header">
            <h4>Recommended Jobs</h4>
            <div>
              <button onClick={refreshRecommendedJobs} style={{ marginRight: '8px' }}>Refresh</button>
              <button onClick={() => navigate('job-listings')}>See All</button>
            </div>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : recommendedJobs.length === 0 ? (
            <div>No recommended jobs found. Update your preferences in your profile.</div>
          ) : (
            recommendedJobs.map((job, index) => (
              <div 
                key={index} 
                className="job-card" 
                onClick={() => window.open(job.url, '_blank', 'noopener,noreferrer')}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    {job.title}<br />
                    {job.location}, {job.salary}
                  </div>
                  <button
                    onClick={(e) => handleStar(job, e)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '4px',
                      cursor: 'pointer',
                      color: isJobSaved(job.id) ? '#fbc02d' : '#666'
                    }}
                    title={isJobSaved(job.id) ? "Remove from My Applications" : "Add to My Applications"}
                  >
                    {isJobSaved(job.id) ? <MdStar size={24} /> : <MdStarBorder size={24} />}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Applications Summary */}
        <div className="home-section-card">
          <div className="section-header">
            <h4>Current Applications</h4>
            <button onClick={() => navigate('applications')}>See All</button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : applications.length === 0 ? (
            <div>No applications yet</div>
          ) : (
            applications.slice(0, 3).map((app, index) => (
              <div key={index} className="application-item">
                {app.company_name} - {app.job_title} <span>{app.status}</span>
              </div>
            ))
          )}
        </div>
        {/* Application Status Summary */}
        <div className="home-section-card" onClick={() => navigate('applications')} style={{ cursor: 'pointer' }}>
          <div className="section-header">
            <h4>Application Status</h4>
            <button onClick={(e) => {
              e.stopPropagation();
              navigate('applications');
            }}>View All</button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div className="status-row">
              <div>
                <div className="status-num">{total}</div>
                <div className="status-label">Total</div>
              </div>
              <div>
                <div className="status-num">{interviews}</div>
                <div className="status-label">Interviews</div>
              </div>
              <div>
                <div className="status-num">{offers}</div>
                <div className="status-label">Offers</div>
              </div>
            </div>
          )}
        </div>
        {/* Upcoming Events Summary */}
        <div className="home-section-card">
          <div className="section-header">
            <h4>Upcoming Events</h4>
            <button onClick={() => navigate('schedule')}>See All</button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : upcomingEvents.length === 0 ? (
            <div className="event-summary-row">No upcoming events</div>
          ) : (
            <div className="event-summary-row">
              {upcomingEvents.map((event, index) => (
                <div key={index}>
                  <div className="event-icon">{event.icon}</div>
                  <div>
                    {event.type === 'interview' ? 'Interview' : 
                     event.type === 'deadline' ? 'Deadline' : 'OA'}: {event.title}
                    <br />
                    <small>{event.date.toLocaleDateString()}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home; 