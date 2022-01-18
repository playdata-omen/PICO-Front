import API from './API';

// 채팅방의 메시지 내용 리스트 가져오기
export const getChatMessageList = async (chatRoomIdx) => {
  const data = await API.get(`chatmessage/${chatRoomIdx}`)
    .then((res) => {
      return res.data;
    });
  return data;
};
