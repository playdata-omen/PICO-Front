import axios from "axios";
import { AI_URL } from "../../constants";

const AI_API = axios.create({
  baseURL: AI_URL,
})

export default AI_API