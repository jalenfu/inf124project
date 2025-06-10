const jobService = require('./services/jobService');

async function testJobApi() {
  console.log('Testing Adzuna API Integration...\n');

  try {
    // Test 1: Search for JavaScript Developer jobs
    console.log('Test 1: Searching for JavaScript Developer jobs...');
    console.log('API URL:', 'https://api.adzuna.com/v1/api/jobs/us/search/1');
    console.log('Parameters:', {
      app_id: 'cf7aa9bc',
      app_key: '168a2910bbd0942020937d9d4ca76a16',
      results_per_page: 20,
      what: 'javascript developer',
      content_type: 'application/json'
    });
    
    const searchResults = await jobService.searchJobs('javascript developer', '', 1);
    console.log(`Found ${searchResults.jobs.length} jobs`);
    console.log('First job details:');
    console.log(JSON.stringify(searchResults.jobs[0], null, 2));
    console.log('\n');

    // Test 2: Get details of the first job
    if (searchResults.jobs.length > 0) {
      console.log('Test 2: Getting details for the first job...');
      const jobDetails = await jobService.getJobDetails(searchResults.jobs[0].id);
      console.log('Job details:');
      console.log(JSON.stringify(jobDetails, null, 2));
      console.log('\n');
    }

    // Test 3: Search with location
    console.log('Test 3: Searching for jobs in New York...');
    const locationResults = await jobService.searchJobs('developer', 'New York', 1);
    console.log(`Found ${locationResults.jobs.length} jobs in New York`);
    console.log('First job location:');
    console.log(JSON.stringify(locationResults.jobs[0].location, null, 2));
    console.log('\n');

    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error details:', error);
    }
  }
}

// Run the tests
testJobApi(); 