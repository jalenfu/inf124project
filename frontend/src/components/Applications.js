import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdEdit, MdDelete } from 'react-icons/md';
import applicationService from '../services/applicationService';
import './Applications.css';

const Applications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [applyDeadline, setApplyDeadline] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [oaDeadline, setOaDeadline] = useState('');

  const statusColors = {
    'Applied': 'primary',
    'Interview Pending': 'warning',
    'Interviewed': 'info',
    'Offered': 'success',
    'Rejected': 'danger',
    'Withdrawn': 'secondary',
    'Wishlisted': 'info',
    'OA Pending': 'warning',
    'OA Taken': 'success',
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to view your applications.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    fetchApplications();
  }, []);

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

  const handleUpdateStatus = async () => {
    try {
      await applicationService.updateApplicationStatus(
        selectedApplication.id,
        status,
        notes,
        applyDeadline || null,
        interviewDate || null,
        oaDeadline || null
      );
      setShowModal(false);
      fetchApplications();
    } catch (err) {
      setError(err.message || 'Failed to update application status');
    }
  };

  const handleDelete = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await applicationService.deleteApplication(applicationId);
        fetchApplications();
      } catch (err) {
        setError(err.message || 'Failed to delete application');
      }
    }
  };

  const openStatusModal = (application) => {
    setSelectedApplication(application);
    setStatus(application.status);
    setNotes(application.notes || '');
    setApplyDeadline(application.apply_deadline ? application.apply_deadline.substring(0, 10) : '');
    setInterviewDate(application.interview_date ? application.interview_date.substring(0, 10) : '');
    setOaDeadline(application.oa_deadline ? application.oa_deadline.substring(0, 10) : '');
    setShowModal(true);
  };

  return (
    <div className="applications-container">
      <div className="applications-header">
        <button className="back-button" onClick={() => navigate('/home')}>
          <MdArrowBack /> Back
        </button>
        <h2>My Applications</h2>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((application) => (
            <div key={application.id} className="application-card">
              <div className="application-header">
                <h3>{application.job_title}</h3>
                <Badge bg={statusColors[application.status] || 'secondary'}>
                  {application.status}
                </Badge>
              </div>
              <div className="application-details">
                <div className="detail-item">
                  <strong>Company:</strong> {application.company_name}
                </div>
                <div className="detail-item">
                  <strong>Location:</strong> {application.location}
                </div>
                <div className="detail-item">
                  <strong>Applied:</strong> {new Date(application.applied_date).toLocaleDateString()}
                </div>
                <div className="detail-item">
                  <strong>Last Updated:</strong> {new Date(application.last_updated).toLocaleDateString()}
                </div>
              </div>
              <div className="application-actions">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => openStatusModal(application)}
                >
                  <MdEdit /> Update Status
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(application.id)}
                >
                  <MdDelete /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Application Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Applied">Applied</option>
                <option value="Wishlisted">Wishlisted</option>
                <option value="Interview Pending">Interview Pending</option>
                <option value="Interviewed">Interviewed</option>
                <option value="OA Pending">OA Pending</option>
                <option value="OA Taken">OA Taken</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
                <option value="Withdrawn">Withdrawn</option>
              </Form.Select>
            </Form.Group>
            {status === 'Wishlisted' && (
              <Form.Group className="mb-3">
                <Form.Label>Apply Deadline</Form.Label>
                <Form.Control
                  type="date"
                  value={applyDeadline}
                  onChange={e => setApplyDeadline(e.target.value)}
                />
              </Form.Group>
            )}
            {status === 'Interview Pending' && (
              <Form.Group className="mb-3">
                <Form.Label>Interview Date</Form.Label>
                <Form.Control
                  type="date"
                  value={interviewDate}
                  onChange={e => setInterviewDate(e.target.value)}
                />
              </Form.Group>
            )}
            {status === 'OA Pending' && (
              <Form.Group className="mb-3">
                <Form.Label>OA Deadline</Form.Label>
                <Form.Control
                  type="date"
                  value={oaDeadline}
                  onChange={e => setOaDeadline(e.target.value)}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about this application..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Applications; 