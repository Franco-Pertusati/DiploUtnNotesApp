const API_URL = "http://localhost:3000/auth";

export const authAPI = {
  register: async (email, username, password) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, username, password }),
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  },

  verify: async () => {
    const response = await fetch(`${API_URL}/verify`, {
      method: 'GET',
      credentials: 'include',
    });
    return response.json();
  },
};