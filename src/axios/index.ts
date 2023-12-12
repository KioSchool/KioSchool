import axios from 'axios';

const adminApi = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT == 'development' ? 'http://localhost:8080/admin' : 'todo',
  withCredentials: true,
});

const userApi = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT == 'development' ? 'http://localhost:8080' : 'todo',
});

export { adminApi, userApi };
