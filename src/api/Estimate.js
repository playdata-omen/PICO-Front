import API from "./API"

export const getEstimateReqList = async userIdx => {
  const data = await API.get('getEstimateList', userIdx)
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

export const getEstimateDetail = async estimateIdx => {
  const data = await API.get('estimateDetail', estimateIdx)
  .then(res => {
    return res.data
  }).catch(err => {
    return (

      
      {
        "id": 1, 
        "userIdx": 1,
        "category" : {"categoryIdx":4,"kind":"제품"},
        "city" : "서울",
        "address" : "은평구",
        "startDate": "2021-12-15",
        "endDate": "2021-12-20",
        "content" : "상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 ",
        "applyList": [
          {
            // 여기 정보가 어떻게 들어갈지 정해야 함
            "applyIdx" : 1,
            "userIdx" : 2,
            "name" : "이기환",
            "review" : 4
          },
          {
            // 여기 정보가 어떻게 들어갈지 정해야 함
            "applyIdx" : 2,
            "userIdx" : 3,
            "name" : "차재훈",
            "review" : 4
          }
        ]
      }
    )
  })
  return data
}


// reqEstimate(navigate, category, content, city, address, startDate, endDate)
export const reqEstimate = async(navigate, category, content, city, address, startDate, endDate) => {
  const response = await API.post('estimateReq', {
    category, content, city, address, startDate, endDate
  })
  .then(res => {
    navigate('/myPage')
  })
  .catch(err => {
    alert('err test')
    navigate('/myPage')
  })
}