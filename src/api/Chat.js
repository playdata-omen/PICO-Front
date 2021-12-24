import API from "./API";

export const getChatMessageList = async chatRoomIdx => {
  const data = await API.get(`chatmessage/${chatRoomIdx}`)
  .then(res => {
    return res.data
  })
  return data
}