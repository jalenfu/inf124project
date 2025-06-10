const axios = require('axios');

const API_URL = 'http://localhost:3001/api';

async function getTestToken() {
  try {
    // First try to login with test credentials
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'testpassword123'
    });

    if (loginResponse.data && loginResponse.data.token) {
      console.log('Successfully logged in and got token:');
      console.log(loginResponse.data.token);
      return loginResponse.data.token;
    }
  } catch (error) {
    console.error('Login failed, trying to register...');
    
    try {
      // If login fails, try to register
      const registerResponse = await axios.post(`${API_URL}/auth/register`, {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword123',
        firstName: 'Test',
        lastName: 'User'
      });

      if (registerResponse.data && registerResponse.data.token) {
        console.log('Successfully registered and got token:');
        console.log(registerResponse.data.token);
        return registerResponse.data.token;
      }
    } catch (registerError) {
      console.error('Registration failed:', registerError.response?.data || registerError.message);
    }
  }
}

// Run the function
getTestToken(); 