interface RegisterResponse {
  user: {
    id: string;
    email: string;
    username: string;
  };
  message?: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    username: string;
  };
  message?: string;
}

interface LogoutResponse {
  message: string;
}

interface UserInfoResponse {
  id: string;
  email: string;
  username: string;
}

interface VerifyResponse {
  valid: boolean;
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

interface ErrorResponse {
  message: string;
}

export const authAPI = {
  register: async (
    email: string,
    username: string,
    password: string
  ): Promise<RegisterResponse> => {
    const response = await fetch('/api/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, username, password }),
    });

    console.log(response);

    if (!response.ok) {
      const err: ErrorResponse = await response
        .json()
        .catch(() => ({ message: "Registration failed" }));
      throw new Error(err.message || "Registration failed");
    }

    return response.json();
  },

  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch('/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    console.log("Login response status:", response.status);

    if (!response.ok) {
      const err: ErrorResponse = await response
        .json()
        .catch(() => ({ message: "Login failed" }));
      throw new Error(err.message || "Login failed");
    }

    return response.json();
  },

  logout: async (): Promise<LogoutResponse> => {
    const response = await fetch('/api/auth/logout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const err: ErrorResponse = await response
        .json()
        .catch(() => ({ message: "Logout failed" }));
      throw new Error(err.message || "Logout failed");
    }

    return response.json();
  },

  userInfo: async (): Promise<UserInfoResponse> => {
    const response = await fetch('/api/auth/user-info', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const err: ErrorResponse = await response
        .json()
        .catch(() => ({ message: "Consult failed" }));
      throw new Error(err.message || "Consult failed");
    }

    return response.json();
  },

  verify: async (): Promise<VerifyResponse> => {
    const response = await fetch('/api/auth/verify', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const err: ErrorResponse = await response
        .json()
        .catch(() => ({ message: "Verification failed" }));
      throw new Error(err.message || "Verification failed");
    }

    return response.json();
  },
};