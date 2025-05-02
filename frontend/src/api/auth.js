import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/token/`, {
    username,
    password,
  });
  return response;
};

export const register = async (username, password) => {
  const response = await axios.post(`${API_URL}/register/`, {
    username,
    password,
  });
  return response;
};