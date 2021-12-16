import API from "./API";

// export const getPUserWithUIdx = async userIdx => {
export const getPhotographerUser = async userIdx => {
  const data = await API.get('pUser', userIdx)
  .then(res => {
    return res.data
  })
  .catch(err => {
    return ({
      userIdx: 2,
      email: 'lgh95m@gmail.com',
      name: '이기환',
      phone: '010-4446-0410',
      photographer: true
    })
  })
  return data
}

export const getPUserWithPIdx = async photographerIdx => {
  const data = await API.get('pUserIdx', photographerIdx)
  .then(res => {
    return getPhotographerUser(res.data)
  })
  .catch(err => {
    return getPhotographerUser(2)
    // return 1 //pUserIdx
  })
  return data
}

export const getPhotographerDetail = async userIdx => {
  const data = await API.get('photographer', userIdx)
  .then(res => {
    return res.data
  })
  .catch(err => {
    return ({
      hasStudio: true,
      city: '서울특별시',
      address: '전체',
      studioAddress: '서울시 은평구 불광동 머시기',
      otherAreas: false,
      pCategory: [
        2, 3, 4, 5
        // {"categoryIdx":2,"kind":"스냅"},
        // {"categoryIdx":3,"kind":"화보"}
      ]
    })
  })
  return data
}