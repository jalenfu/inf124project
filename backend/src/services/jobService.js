const axios = require('axios');

const ADZUNA_APP_ID = 'cf7aa9bc';
const ADZUNA_API_KEY = '168a2910bbd0942020937d9d4ca76a16';
const ADZUNA_API_URL = 'https://api.adzuna.com/v1/api/jobs';

const jobService = {
  async searchJobs(query = '', location = '', page = 1, radius = 25) {
    try {
      const url = `${ADZUNA_API_URL}/us/search/${page}`;
      const params = {
        app_id: ADZUNA_APP_ID,
        app_key: ADZUNA_API_KEY,
        results_per_page: 20,
        what: query,
        where: location,
        'content-type': 'application/json'
      };

      const response = await axios.get(url, { params });

      if (!response.data) {
        throw new Error('No data received from Adzuna API');
      }

      if (!response.data.results) {
        throw new Error('Invalid response format from Adzuna API');
      }

      // console.log('Adzuna API Response:', response.data);

      const jobs = response.data.results.map(job => ({
        id: job.id,
        title: job.title,
        company_name: job.company.display_name || 'Company not specified',
        location: job.location?.display_name || job.location?.area || 'Location not specified',
        description: job.description || 'No description available',
        salary: job.salary_min != job.salary_max ? `\$${job.salary_min} - \$${job.salary_max} / week` : `\$${job.salary_min} / year` || 'Not specified',
        url: job.redirect_url || job.url,
        created: job.created,
        contract_type: job.contract_type || 'Not specified',
        category: job.category?.label || 'Not specified'
      }));

      return { jobs };
    } catch (error) {
      if (error.response) {
        throw new Error(`Adzuna API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      throw new Error(`Failed to search jobs: ${error.message}`);
    }
  }
};

module.exports = jobService; 