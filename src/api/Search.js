import API from "./API";

export const categorySearch = async (categoryIdx) => {
  const data = await API.get(`photographer/category/${categoryIdx}`)
    .then(res => {
      return res.data
    })
  return data
}

export const textSearch = async (text) => {
  const data = await API.get('photographer/search', {
    params: {
      keyword: text
    }
  })
    .then(res => {
      return res.data
    })
  return data
}