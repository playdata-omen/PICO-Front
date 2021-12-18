import API from "./API";

export const categorySearch = async (categoryIdx) => {
  const data = await API.get('categorySearch', categoryIdx)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return (
        [
          {
            "photographerIdx": 10,
            "user": {
              "userIdx": 10,
              "name": "임우송",
              "email": "kingdomduner@gmail.com"
            }
          },
          {
            "photographerIdx": 11,
            "user": {
              "userIdx": 11,
              "name": "김지명",
              "email": "kim-pick@gmail.com"
            }
          },
        ]
      )
    })
  return data
}

export const textSearch = async (text) => {
  const data = await API.get('categorySearch', text)
    .then(res => {
      return res.data
    })
  return data
}