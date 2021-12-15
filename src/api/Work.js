import API from "./API";

export const getWorksList = async (userIdx)  => {
  const data = await API.get('getWorksList', userIdx)
  .then(res => {
    return res.data
  })
  .catch(err => {
    return(
      []
      // [
      //   {
      //     "workIdx": 1,
      //     "title": "work1",
      //   },
      //   {
      //     "workIdx": 2,
      //     "title": "work2",
      //   },
      //   {
      //     "workIdx": 3,
      //     "title": "work3",
      //   },
      //   {
      //     "workIdx": 4,
      //     "title": "work4",
      //   },
      // ]
    )
  })
  return data
}