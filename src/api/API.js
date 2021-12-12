import axios from 'axios'
import { SERVER_URL } from '../constants'

const API = axios.create({
  baseURL: SERVER_URL,
  // headers: { ACCESS_TOKEN }
})


export default API