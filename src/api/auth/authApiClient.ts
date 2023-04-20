import axios from 'axios';
import API_PATH from 'config/constants';

const authApi = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 2000,
});

export default authApi;
