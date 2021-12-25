import API from "./API";

export const getReviewList = async userIdx => {
  const data = await API.get(`reviewList/${userIdx}`)
    .then(res => {
      return res.data
    })
  return data
}

export const uploadReview = async (photographerIdx, applyIdx, grade, content) => {
  const data = API.post('review', {
    photographerIdx, applyIdx, grade, content
  })
    .then(res => {
      return res.data
    })
  return data
}

export const deleteReview = async (reviewIdx, photographerIdx) => {
  const flag = API.delete(`review/${reviewIdx}/photographer/${photographerIdx}/delete`)
    .then(res => {
      return res.data
    })
  return flag
}