import axios from 'axios'
import { ACCESS_TOKEN, SERVER_URL } from '../constants'

const API = axios.create({
  baseURL: SERVER_URL,
})

const getToken = async () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
      return `Bearer ${token}`;
  } else {
      return null;
  }
};

API.interceptors.request.use(async config => {
  config.headers["content-type"] = "application/json; charset=utf-8";
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  config.headers["Accept"] = "*/*";
  //getToken는 로컬 스토리지에 토큰이 있다면 반환한다 없다면 null 값 반환
  config.headers["authorization"] = await getToken();
  return config;
});

// API.interceptors.response.use((response) => {
//   if (response.headers.client) {
//     localStorage.setItem(ACCESS_TOKEN, response.headers['access-token']);
//     // localStorage.setItem('client', response.headers.client);
//     // localStorage.setItem('uid', response.headers.uid);
//     // localStorage.setItem('token-type', response.headers['token-type']);
//   }
//   return response;
// });

export default API