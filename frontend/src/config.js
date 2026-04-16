// API Configuration
// In development: http://localhost:5001/api
// In production: /api (relative URL served by same backend)
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5001/api';

export default API_BASE_URL;
