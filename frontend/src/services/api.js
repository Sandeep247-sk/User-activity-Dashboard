const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = body?.message || "Request failed";
    throw new Error(message);
  }

  return body;
};

export const loginRequest = (payload) =>
  request("/api/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const registerRequest = (payload) =>
  request("/api/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const fetchActivityLogs = () => request("/api/activity");

