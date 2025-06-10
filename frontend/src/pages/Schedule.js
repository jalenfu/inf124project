import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEvent, MdPerson, MdAccessTime, MdComputer } from 'react-icons/md';
import applicationService from '../services/applicationService';

function Schedule() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await applicationService.getUserApplications();
        setApplications(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

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
    return events.sort((a, b) => a.date - b.date);
  };

  const upcomingEvents = getUpcomingEvents();

  // Group events by type
  const interviews = upcomingEvents.filter(event => event.type === 'interview');
  const deadlines = upcomingEvents.filter(event => event.type === 'deadline');
  const oaDates = upcomingEvents.filter(event => event.type === 'oa');

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

      {loading ? (
        <div className="app-card">Loading...</div>
      ) : error ? (
        <div className="app-card alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="app-card">
            <h4><MdPerson style={{marginRight:4, fontSize:'1.4em'}} /> Upcoming Interviews</h4>
            {interviews.length === 0 ? (
              <div>No upcoming interviews</div>
            ) : (
              interviews.map((event, index) => (
                <div key={index}>
                  {event.title} <span>{event.date.toLocaleDateString()}</span>
                </div>
              ))
            )}
          </div>

          <div className="app-card">
            <h4><MdAccessTime style={{marginRight:4, fontSize:'1.4em'}} /> Application Deadlines</h4>
            {deadlines.length === 0 ? (
              <div>No upcoming deadlines</div>
            ) : (
              deadlines.map((event, index) => (
                <div key={index}>
                  {event.title} <span>{event.date.toLocaleDateString()}</span>
                </div>
              ))
            )}
          </div>

          <div className="app-card">
            <h4><MdComputer style={{marginRight:4, fontSize:'1.4em'}} /> OA Dates</h4>
            {oaDates.length === 0 ? (
              <div>No upcoming OA dates</div>
            ) : (
              oaDates.map((event, index) => (
                <div key={index}>
                  {event.title} <span>{event.date.toLocaleDateString()}</span>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Schedule; 