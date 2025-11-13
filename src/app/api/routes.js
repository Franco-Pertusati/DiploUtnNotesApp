const API_URL = "http://localhost:3000";

export const authAPI = {
  register: async (email, username, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Envía y recibe cookies
      body: JSON.stringify({ email, username, password }),
    });
    
    // DEBUG: Ver si la cookie fue recibida
    console.log('Register response headers:', response.headers.get('set-cookie'));
    
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    
    // DEBUG: Ver si la cookie fue recibida
    console.log('Login response headers:', response.headers.get('set-cookie'));
    
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  },

  verify: async () => {
    console.log('Verify - Enviando petición con cookies...');
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'GET',
      credentials: 'include',
    });
    console.log('Verify response status:', response.status);
    return response.json();
  },
};