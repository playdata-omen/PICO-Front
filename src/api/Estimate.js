import API from "./API"

//token.user.userIdx
export const getEstimateReqList = async() => {
  const data = await API.get('getEstimateRes')
  .then(res => {
    return res.data
  })
  .catch(err => {
    return [
      {"estimateIdx" : 1, "status": "1", "created" : {}},
      {"estimateIdx" : 2, "status": "1", "created" : {}},
      {"estimateIdx" : 3, "status": "1", "created" : {}},
      {"estimateIdx" : 4, "status": "1", "created" : {}},
    ]
  })
  return data
}

export const getEstimateDetail = async estimateIdx => {
  const data = await API.get(`estimateDetail/${estimateIdx}`)
    .then(res => {
      return res.data
    }).catch(err => {
      return (
        {
          "estimateIdx": 1,
          "userIdx": 1,
          "categoryIdx": 2,
          "city": "서울",
          "address": "은평구",
          "startDate": "2021-12-15",
          "endDate": "2021-12-20",
          "content": "String content",
          "applyList": [
            {
              // ApplyDTO
              "applyIdx": 3,
              "user": {
                "userIdx": 1,
                "name": "이기환",
              },
              // UserDTO.ApplyUserCard
              "photographer": {
                "photographerIdx": 1,
                "grade": 4.2,
                "name": "이기환",
              }
            },
            {
              // ApplyDTO
              "applyIdx": 4,
              "user": {
                "userIdx": 1,
                "name": "이기환",
              },
              // UserDTO.ApplyUserCard
              "photographer": {
                "photographerIdx": 2,
                "grade": 3.8,
                "name": "차재훈",
              }
            }
          ]
        }
      )
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

// reqEstimate(navigate, category, content, city, address, startDate, endDate)
export const reqEstimate = async(navigate, address, category, city, content, startDate, endDate, photographerIdx) => {
  startDate = startDate.replaceAll('/', '-')
  endDate = endDate.replaceAll('/', '-')
  // export const reqEstimate = async(navigate, category, content, city, address, startDate, endDate) => {
  await API.post('estimate/', { address, category, city, content, startDate, endDate, photographerIdx })
    .catch(err => {
      alert(err.message)
    })
  navigate('/myPage')
}

export const confirmEstimate = async(estimateIdx, photgrapherIdx) => {
  await API.post(`confirmEstimate/${estimateIdx}/${photgrapherIdx}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    return err.message
  })
}

export const confirmOrder = async(estimateIdx, photgrapherIdx) => {
  await API.post(`confirmOrder/${estimateIdx}/${photgrapherIdx}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    return err.message
  })
}