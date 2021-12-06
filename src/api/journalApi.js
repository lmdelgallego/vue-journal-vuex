import axios from 'axios';


const journalApi = axios.create({
  baseURL: 'https://goalcoach-a4187.firebaseio.com'
});

journalApi.interceptors.request.use(config => {
  const token = localStorage.getItem('idToken');
  config.params = {auth: token};
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

console.log(process.env.NODE_ENV);

export default journalApi;
