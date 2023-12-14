import axios from 'axios';

const adminApi = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT == 'development' ? 'http://localhost:8080/admin' : 'https://kio-school.fly.dev/admin',
  withCredentials: true,
});

const userApi = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT == 'development' ? 'http://localhost:8080' : 'https://kio-school.fly.dev',
});

export { adminApi, userApi };
