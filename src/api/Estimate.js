import API from "./API"

export const getEstimateReqList = async userIdx => {
  const data = await API.get('getEstimateList')
  .then(res => {
    // return res.data
    return [
      {"estimateIdx" : 1, "name" : "견적1"},
      {"estimateIdx" : 2, "name" : "견적2"},
    ]
  })
  .catch(err => {
    console.log('오싙')
    return [
      {"estimateIdx" : 1, "name" : "견적1"},
      {"estimateIdx" : 2, "name" : "견적2"},
      {"estimateIdx" : 3, "name" : "견적3"},
      {"estimateIdx" : 4, "name" : "견적4"},
      {"estimateIdx" : 5, "name" : "견적"},
    ]
  })
  return data
}