import API from "./API"

export const getRecommendReqList = async uploadedImg => {
  const data = await API.get('getRecommendList', uploadedImg)
  .then(res => {
    return res.data
  })
  .catch(err => {
    return [
      {"rank" : 1, "photoIdx" : 1, "workIdx" : 2, "storedFilePath" : "URL1"},
      {"rank" : 2, "photoIdx" : 2, "workIdx" : 3, "storedFilePath" : "URL2"},
      {"rank" : 3, "photoIdx" : 3, "workIdx" : 4, "storedFilePath" : "URL3"},
      {"rank" : 4, "photoIdx" : 4, "workIdx" : 2, "storedFilePath" : "URL4"},
    ]
  })
  return data
}

export const getRecommendDetail = async workIdx => {
  const data = await API.get('estimateDetail', workIdx)
  .then(res => {
    return res.data
  }).catch(err => {
    return (
      // 추천받은 사진을 눌렀을 때, 작가정보를 받아올 지 작품 정보를 받아올 지
      // 어디로 리다이렉트 하느냐에 따라 
      "정보"
    )
  })
  return data
}
