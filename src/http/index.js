import axios from 'axios';

const token = localStorage.getItem('token');

export const API_URL = 'https://test-api.misaka.net.ru/api/';

export const $api_get = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const $api_post = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api_post.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  config.headers = {
    accept: 'text/plain',
    Authorization: `Bearer ${token}`,
    'Content-type': 'application/json',
  };

  return config;
});

$api_get.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.accept = 'text/plain';
  return config;
});
