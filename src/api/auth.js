import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export async function registerUser(data) {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
}

export async function loginUser(data) {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
}

export async function getCurrentUser(token) {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getAccountData(token) {
  const response = await axios.get(`${API_URL}/account-data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
