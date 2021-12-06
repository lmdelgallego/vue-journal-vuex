import axios from 'axios';


const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  params: {
    key: 'AIzaSyArFtSOsqmL0k31tCgy47dPKtffXTasr1o'
  }
})

console.log(process.env.NODE_ENV);

export default authApi;
