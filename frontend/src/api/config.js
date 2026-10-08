// Auto-selects localhost when developing locally, and your live Render backend when deployed on Vercel
export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://footymetrics.onrender.com');

export default API_BASE_URL;
