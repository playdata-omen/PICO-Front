import API from "./API";

// 작품 업로드
export const uploadWork = async (photographerIdx, categoryIdx, title, images, content) => {
  const data = await API.post('work', { photographerIdx, categoryIdx, title, content, images })
    .then(res => {
      return res.data
    })
  return data
}

// 작가 작품리스트 조회
export const getWorksList = async (userIdx) => {
  const data = await API.get(`user/${userIdx}/work`)
    .then(res => {
      return res.data
    })
  return data
}

// 작품 상세페이지
export const getWorkDetail = async (workIdx) => {
  const data = await API.get(`work/${workIdx}`)
    .then(res => {
      return res.data
    })
  return data
}

// 작품 삭제
export const deleteWork = async (workIdx) => {
  const data = await API.delete(`work/${workIdx}/delete`)
    .then(res => {
      return res.data
    })
  return data
}