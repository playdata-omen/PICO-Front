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
// {
//   "address": "string",
//   "category": 0,
//   "city": "string",
//   "content": "string",
//   "created": {
//     "date": 0,
//     "day": 0,
//     "hours": 0,
//     "minutes": 0,
//     "month": 0,
//     "nanos": 0,
//     "seconds": 0,
//     "time": 0,
//     "timezoneOffset": 0,
//     "year": 0
//   },
//   "endDate": "string",
//   "idx": 0,
//   "photographerIdx": 0,
//   "startDate": "string",
//   "status": "string",
//   "user": 0
// }


// reqEstimate(navigate, category, content, city, address, startDate, endDate, photographerIdx)
// reqEstimate(navigate, category, content, city, address, startDate, endDate)
export const reqEstimate = async (navigate, categoryIdx, content, city, address, startDate, endDate, photographerIdx) => {
  let re1 = /\.\s/gi;
  let re2 = /\./gi
  startDate = startDate.replace(re1, '-').replace(re2, '')
  endDate = endDate.replace(re1, '-').replace(re2, '')
  photographerIdx = !!photographerIdx ? photographerIdx : 0
  // console.log(`${photographerIdx}`)
  // export const reqEstimate = async(navigate, category, content, city, address, startDate, endDate) => {
  await API.post('estimate', { categoryIdx, content, city, address, startDate, endDate, photographerIdx })
    .catch(err => {
      alert(err.message)
    })
  navigate('/myPage')
}

// /estimate/confirmEstimate/{estimateIdx}/{photographerIdx}
// /photographer/{photographerIdx}/estimate/{estimateIdx}
export const confirmEstimate = async (estimateIdx, photographerIdx) => {
  const data = await API.put(`estimate/${estimateIdx}/confirmEstimate/photographer/${photographerIdx}`)
    // const data = await API.put(`photographer/${photgrapherIdx}/estimate/${estimateIdx}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err.message
    })
  return data
}

export const confirmOrder = async (estimateIdx, photographerIdx) => {
  const data = await API.put(`estimate/${estimateIdx}/confirmOrder/photographer/${photographerIdx}`)
    .then(res => {
      return res.data
    })
  return data
}

// /estimate/{estimateId}/photographer/{photographerId}/apply
export const applyEstimate = async (estimateIdx, photographerIdx) => {
  const data = await API.put(`estimate/${estimateIdx}/photographer/${photographerIdx}/apply`)
    .then(res => {
      return res.data
    })
  return data
}