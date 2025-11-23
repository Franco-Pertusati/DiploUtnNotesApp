const API_URL = "http://localhost:3000";

export const authAPI = {
  register: async (email, username, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, username, password }),
    });

    console.log("Register response status:", response.status);

    if (!response.ok) {
      const err = await response
        .json()
        .catch(() => ({ message: "Registration failed" }));
      throw new Error(err.message || "Registration failed");
    }

    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    console.log("Login response status:", response.status);

    if (!response.ok) {
      const err = await response
        .json()
        .catch(() => ({ message: "Login failed" }));
      throw new Error(err.message || "Login failed");
    }

    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response
        .json()
        .catch(() => ({ message: "Logout failed" }));
      throw new Error(err.message || "Logout failed");
    }

    return response.json();
  },

  userInfo: async () => {
    const response = await fetch(`${API_URL}/auth/user-info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response
        .json()
        .catch(() => ({ message: "Consult failed" }));
      throw new Error(err.message || "Consult failed");
    }

    return response.json();
  },

  verify: async () => {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response
        .json()
        .catch(() => ({ message: "Verification failed" }));
      throw new Error(err.message || "Verification failed");
    }

    return response.json();
  },
};
