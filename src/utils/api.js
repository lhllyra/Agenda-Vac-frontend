import axios from 'axios';

const { REACT_APP_API_BASE_URL: APIBASEURL } = process.env;

const myAxios = axios.create({
  baseURL: APIBASEURL,
});

export default myAxios;
