const BASE_URL = 'http://localhost:4000/api/v1';

export async function apiRequest(endpoint, method = 'GET', body = null) {
  const token = localStorage.getItem("token");

  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}