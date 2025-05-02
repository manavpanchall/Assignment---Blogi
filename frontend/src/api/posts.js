import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = (authTokens) => {
  return {
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
    },
  };
};

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts/`);
  return response.data;
};

export const getPost = async (id) => {
  const response = await axios.get(`${API_URL}/posts/${id}/`);
  return response.data;
};

export const getUserPosts = async (authTokens) => {
  const response = await axios.get(
    `${API_URL}/my-posts/`,
    getAuthHeaders(authTokens)
  );
  return response.data;
};

export const createPost = async (post, authTokens) => {
  const response = await axios.post(
    `${API_URL}/posts/`,
    post,
    getAuthHeaders(authTokens)
  );
  return response.data;
};

export const updatePost = async (id, post, authTokens) => {
  const response = await axios.put(
    `${API_URL}/posts/${id}/`,
    post,
    getAuthHeaders(authTokens)
  );
  return response.data;
};

export const deletePost = async (id, authTokens) => {
  const response = await axios.delete(
    `${API_URL}/posts/${id}/`,
    getAuthHeaders(authTokens)
  );
  return response.data;
};