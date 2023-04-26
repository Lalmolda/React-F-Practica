import axios from 'axios';

window.config = JSON.stringify(process.env);

const client = axios.create({
  baseURL: 'http://localhost:3001/',
});

client.interceptors.response.use(response => response.data);

export default client;
