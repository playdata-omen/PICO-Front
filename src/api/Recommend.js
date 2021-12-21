import API from "./API"
import axios from 'axios'

export const getRecommendList = async image => {
  const data = await API.post('getRecommendList', image)
  .then(res => {
    return res.data
  })
  .catch(err => {
    return []
  })
  return data
}

export const getRecommendListFromFlask = async image => {
  const FlaskAPI = axios.create({
    baseURL: "http://localhost:5000/"
    // baseURL: SERVER_URL,
  })

  let formData = new FormData();
  formData.append("userFile", image);
  const data = await FlaskAPI.post('searchImage', formData)
    .then(res => {
      return res.data
    }).catch(err => {
    })

  return data
}
