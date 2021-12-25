import API from "./API"

//token.user.userIdx
export const getEstimateReqList = async () => {
  const data = await API.get('estimate')
    .then(res => {
      return res.data
    })
  return data
}

export const getEstimateDetail = async estimateIdx => {
  const data = await API.get(`estimate/${estimateIdx}`)
    .then(res => {
      return res.data
    })
  return data
}

// 경적요청
export const reqEstimate = async (navigate, categoryIdx, content, city, address, startDate, endDate, photographerIdx) => {
  let re1 = /\.\s/gi;
  let re2 = /\./gi
  startDate = startDate.replace(re1, '-').replace(re2, '')
  endDate = endDate.replace(re1, '-').replace(re2, '')
  photographerIdx = !!photographerIdx ? photographerIdx : 0
  await API.post('estimate', {
    categoryIdx, content, city, address, startDate, endDate, photographerIdx
  })
    .catch(err => {
      alert(err.message)
    })
  navigate('/myPage')
}

// 의뢰확정
export const confirmEstimate = async (estimateIdx, photographerIdx) => {
  const data = await API.put(`estimate/${estimateIdx}/confirmEstimate/photographer/${photographerIdx}`)
    .then(res => {
      return res.data
    })
  return data
}

// 수행완료
export const confirmOrder = async (estimateIdx, photographerIdx) => {
  const data = await API.put(`estimate/${estimateIdx}/confirmOrder/photographer/${photographerIdx}`)
    .then(res => {
      return res.data
    })
  return data
}

// 의뢰지원
export const applyEstimate = async (estimateIdx, photographerIdx) => {
  const data = await API.put(`estimate/${estimateIdx}/photographer/${photographerIdx}/apply`)
    .then(res => {
      return res.data
    })
  return data
}

// 견적서 삭제
export const deleteEstimate = async estimateIdx => {
  const data = await API.delete(`estimate/${estimateIdx}`)
    .then(res => {
      return res.data
    })
  return data
}