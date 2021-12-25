import API from "./API";

// 지원 정보 가져오기
export const getApplyDetail = async applyIdx => {
  const data = await API.get(`apply/${applyIdx}`)
    .then(res => {
      return res.data
    })
  return data
}

// 로그인 한 유저가 작가일 때 의뢰요청서/ 지원서 정보 리스트 가져오기
export const getApplyList = async () => {
  const data = await API.get('apply')
    .then(res => {
      return res.data
    })
  console.log(data)
  return data
}
