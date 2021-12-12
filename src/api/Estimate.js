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
  const data = await API.get('estimateDe', estimateIdx)
  .then(res => {
    return res.data
  }).catch(err => {
    return (
      {
        "category" : {"categoryIdx":4,"kind":"제품"},
        "city" : "서울",
        "address" : "은평구",
        "startDate" : "",
        "endDate" : "",
        "content" : "dasdfjahsdkhvlalsdfkjlashdfklalscdkjh",
        "response": [
          {
            // 여기 정보가 어떻게 들어갈지 정해야 함
            "responseIdx" : 1,
            "user" : "차재훈"
          },
          {
            // 여기 정보가 어떻게 들어갈지 정해야 함
            "responseIdx" : 2,
            "user" : "이기환"
          },
        ]
      }
    )
  })
  return data
}