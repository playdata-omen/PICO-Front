import API from "./API";

// export const getPhotographerUser = async photographerIdx => {
//   const data = await API.get(`photographer/user/${photographerIdx}`)
//     .then(res => {
//       return res.data
//     })
//     .catch(err => {
//       return ({
//         userIdx: 12,
//         email: 'lgh95m@gmail.com',
//         name: '유저정보에러 테스트',
//         phone: '010-4446-0410',
//         isPhotographer: true
//       })
//     })
//   return data
// }

export const getUserWithPIdx = async photographerIdx => {
  const data = await API.get(`user/${photographerIdx}`)
    .then(res => {
      return res.data
    })
  // .catch(err => {
  //   // return 1 //pUserIdx
  // })
  return data
}

export const getPhotographerDetail = async userIdx => {
  const data = await API.get(`photographer/${userIdx}`)
    .then(res => {
      return res.data
    })
  return data
}
