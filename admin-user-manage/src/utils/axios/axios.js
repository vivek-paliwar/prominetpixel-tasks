import axios from 'axios';

const axiosapi = axios.create({
  baseURL: 'http://localhost:3002',
});

export default axiosapi;
