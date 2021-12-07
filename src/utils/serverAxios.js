import axios from 'axios'
import { SERVER_URL } from '../constants'

const serverAxios = axios.create({
  baseURL: SERVER_URL
})

export default serverAxios