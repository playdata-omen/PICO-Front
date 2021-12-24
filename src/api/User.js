import reactDom from "react-dom";
import API from "./API";

export const getUserWithUserIdx = async userIdx => {
  const data = await API.get(`user/${userIdx}`)
    .then(res => {
      return res.data
    })
  return data
}

export const getUserWithPIdx = async photographerIdx => {
  const data = await API.get(`photographer/${photographerIdx}/user`)
    .then(res => {
      return res.data
    })
  return data
}

export const getPhotographerDetail = async userIdx => {
  const data = await API.get(`user/${userIdx}/photographer`)
    .then(res => {
      return res.data
    })
  return data
}
