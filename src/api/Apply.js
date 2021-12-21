import API from "./API";


export const getApplyDetail = async applyIdx => {
  const data = await API.get(`apply/${applyIdx}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return (
        {
          "applyIdx": 1, 
          "photographerIdx": 4, 
          "status": "1", 
          "created": {}, 
          "estimate": {
            "estimateIdx": 1,
            "status": 4
          }
        }
      )
    })
  return data
}

// token.user.userIdx
export const getApplyList = async () => {
  const data = await API.get('apply')
    .then(res => {
      return res.data
    })
    // .catch(err => {
    //   return [
    //     { "applyIdx": 1, "estimateIdx": 1, "photographerIdx": "1", "created": {} },
    //     { "applyIdx": 1, "estimateIdx": 1, "status": "1", "created": {} },
    //     { "applyIdx": 1, "estimateIdx": 1, "status": "1", "created": {} },
    //   ]
    // })
  console.log(data)
  return data
}
