const API_URL = 'http://localhost:3001/api';

const jobService = {
  async searchJobs(query = '', location = '', page = 1, radius = 25) {
    try {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token ? 'Present' : 'Missing');

      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch(`${API_URL}/jobs/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&page=${page}&radius=${radius}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          throw new Error('Your session has expired. Please log in again.');
        }
        throw new Error(data.message || data.error || 'Failed to fetch jobs');
      }

      if (!data || !Array.isArray(data.jobs)) {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format from server');
      }

      return data;
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  }
};

export default jobService; 