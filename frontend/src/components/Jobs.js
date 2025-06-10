import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import jobService from '../services/jobService';
import applicationService from '../services/applicationService';
import authService from '../services/authService';
import { MdStarBorder, MdStar } from 'react-icons/md';

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    query: '',
    location: '',
    page: 1,
    radius: 25
  });
  const [applications, setApplications] = useState([]);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const profileData = await authService.getProfile();
        const { preferred_location, preferred_industry } = profileData.user;
        
        setSearchParams(prev => ({
          ...prev,
          location: preferred_location || '',
          query: preferred_industry || ''
        }));

        // If we have preferences, perform the search automatically
        if (preferred_location || preferred_industry) {
          searchJobs(preferred_industry || '', preferred_location || '');
        }
      } catch (err) {
        console.error('Error fetching user preferences:', err);
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to search for jobs.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    fetchUserPreferences();
  }, []);

  const searchJobs = async (query = searchParams.query, location = searchParams.location) => {
    try {
      setLoading(true);
      setError(null);
      const results = await jobService.searchJobs(
        query,
        location,
        searchParams.page,
        searchParams.radius
      );
      setJobs(results.jobs || []);
    } catch (err) {
      console.error('Error searching jobs:', err);
      if (err.message.includes('session has expired') || err.message.includes('Please log in')) {
        setError('Your session has expired. Please log in again.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err.message || 'Failed to fetch jobs. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setAppLoading(true);
        const data = await applicationService.getUserApplications();
        setApplications(data);
      } catch (err) {
        // Optionally handle error
      } finally {
        setAppLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchJobs();
  };

  const handleStar = async (job) => {
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

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Job Search</h2>
      
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="query"
                placeholder="Job title or keywords"
                value={searchParams.query}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="location"
                placeholder="Location"
                value={searchParams.location}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Button type="submit" variant="primary" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {jobs.map((job) => (
            <Col key={job.id} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.company_name}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Location:</strong> {job.location}<br />
                    <strong>Salary:</strong> {job.salary || 'Not specified'}<br />
                    {job.description && (
                      <>
                        <strong>Description:</strong>
                        <p>{job.description.substring(0, 150)}...</p>
                      </>
                    )}
                  </Card.Text>
                  <Button
                    variant="primary"
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant={isJobSaved(job.id) ? "warning" : "outline-warning"}
                    className="ms-2"
                    onClick={() => handleStar(job)}
                    title={isJobSaved(job.id) ? "Remove from My Applications" : "Add to My Applications"}
                  >
                    {isJobSaved(job.id) ? <MdStar size={20} /> : <MdStarBorder size={20} />}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {!loading && jobs.length === 0 && !error && (
        <div className="text-center">
          <p>No jobs found. Try adjusting your search criteria.</p>
        </div>
      )}
    </Container>
  );
};

export default Jobs; 