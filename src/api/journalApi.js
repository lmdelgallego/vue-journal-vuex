import axios from 'axios';


const journalApi = axios.create({
  baseURL: 'https://goalcoach-a4187.firebaseio.com'
})

export default journalApi;
