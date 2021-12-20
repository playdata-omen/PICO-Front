import API from "./API";

export const getReviewList = async userIdx => {
  const data = await API.get(`reviews/${userIdx}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return (
        [
          {
            "reviewIdx": 1,
            "created": "2021-12-20T01:00:37.000+0000",
            "content": "i'm so sad",
            "grade": 4.6,
            "user" : {
              "userIdx" : 1,
              "name" : "조하운"
            }
          },
          {
            "reviewIdx": 6,
            "created": "2021-12-20T08:01:43.000+0000",
            "content": "i'm so happy i'm so happy i'm so happy",
            "grade": 4.2,
            "user" : {
              "userIdx" : 1,
              "name" : "마유진"
            }
          }
        ]
      )
    })
  return data
}