import axios from 'axios';

window.config = JSON.stringify(process.env);

const client = axios.create({
  baseURL: 'http://localhost:3001',
});

client.interceptors.response.use(response => response.data);

export const setAuthorizationHeader = token =>
  (client.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};

export default client;
