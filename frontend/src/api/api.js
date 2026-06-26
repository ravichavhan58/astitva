const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const config = {
    method: options.method || "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        data,
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Helper Methods
api.get = (url) => api(url);

api.post = (url, body) =>
  api(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

api.put = (url, body) =>
  api(url, {
    method: "PUT",
    body: JSON.stringify(body),
  });

api.patch = (url, body) =>
  api(url, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

api.delete = (url) =>
  api(url, {
    method: "DELETE",
  });

export default api;
