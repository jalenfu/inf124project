const axios = require('axios');

const API_URL = 'https://inf124project.onrender.com/api';
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImlhdCI6MTc0OTUzMzQ5MCwiZXhwIjoxNzQ5NTM3MDkwfQ.kyYcPh90yER5qZduTndtqvUVf__ogEU8rVS6sQUb-W0'; // Replace with a valid JWT token

async function testBackendApi() {
  console.log('Testing Backend API Integration...\n');

  try {
    // Test 1: Search for JavaScript Developer jobs
    console.log('Test 1: Searching for JavaScript Developer jobs...');
    const searchResponse = await axios.get(`${API_URL}/jobs/search`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`
      },
      params: {
        query: 'javascript developer',
        location: '',
        page: 1,
        radius: 25
      }
    });

    console.log('Response status:', searchResponse.status);
    console.log('Response headers:', searchResponse.headers);
    console.log('Response data:', JSON.stringify(searchResponse.data, null, 2));

    if (searchResponse.data && searchResponse.data.jobs) {
      console.log(`\nFound ${searchResponse.data.jobs.length} jobs`);
      
      // Display first job details
      if (searchResponse.data.jobs.length > 0) {
        console.log('\nFirst job details:');
        console.log(JSON.stringify(searchResponse.data.jobs[0], null, 2));
      }
    }

  } catch (error) {
    console.error('\nTest failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    }
  }
}

// Run the tests
testBackendApi(); 