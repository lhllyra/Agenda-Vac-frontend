import axios from 'axios';

// const { REACT_APP_API_BASE_URL: apiBaseURL } = process.env;

const myAxios = axios.create({
  baseURL: 'http://localhost:3004',
});

export default myAxios;
