import API from "./API";


export const getApplyDetail = async applyIdx => {
  const data = await API.get(`apply/${applyIdx}`)
    .then(res => {
      return res.data
    })
  return data
}

// token.user.userIdx
export const getApplyList = async () => {
  const data = await API.get('apply')
    .then(res => {
      return res.data
    })
  console.log(data)
  return data
}
