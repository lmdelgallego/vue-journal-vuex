import axios from 'axios';


const journalApi = axios.create({
  baseURL: 'https://goalcoach-a4187.firebaseio.com'
})

console.log(process.env.NODE_ENV);

export default journalApi;
