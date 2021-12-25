import AI_API from "./AI_API"

export const getRecommendList = async image => {
  let formData = new FormData();
  formData.append("userFile", image);
  const data = await AI_API.post('searchImage', formData)
    .then(res => {
      return res.data;
    }).catch(err => {
      console.log(err);
    })

  return data
}
