import axios from 'axios'
import { ACCESS_TOKEN, SERVER_URL } from '../constants'

const API = axios.create({
  baseURL: SERVER_URL,
  headers: {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
})

// API.defaults.headers.common['Authorization'] = localStorage.getItem(ACCESS_TOKEN);


// axios.interceptors.response.use((response) => {
//   if (response.headers.client) {
//     localStorage.setItem('access-token', response.headers['access-token']);
//     localStorage.setItem('client', response.headers.client);
//     localStorage.setItem('uid', response.headers.uid);
//     localStorage.setItem('token-type', response.headers['token-type']);
//   }
//   return response;
// });


export default API