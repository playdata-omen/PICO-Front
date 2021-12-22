import { getBase64 } from "../service/FileUtils";
import API from "./API";

// "title" : "title",
//     "content" : "content",
//     "photographerIdx" : 2,
//     "categoryIdx" : 2,
//     "images" : ["dat

export const uploadWork = async (photographerIdx, categoryIdx, title, images, content) => {
  const data = await API.post('work', { photographerIdx, categoryIdx, title, content, images })
    .then(res => {
      return res.data
    })
  return data
}

export const getWorksList = async (userIdx) => {
  const data = await API.get(`user/${userIdx}/work`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return (
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
        //   {
        //     "workIdx": 5,
        //     "title": "work5",
        //   },
        // ]
      )
    })
  return data
}

export const getWorkDetail = async (workIdx) => {
  const data = await API.get(`work/${workIdx}`)
    .then(res => {
      return res.data
    })
    .catch(res => {
      return (
        {
          "workIdx": 1,
          "photographerIdx": 1,
          "title": "작품 이름",
          "content": "작품 설명",
          "category": 1,
          "photos": [
            "imgUrl1",
            "imgUrl2",
            "imgUrl3"
          ],
          "thumbnail": "imgUrl1"
        }
      )
    })
  return data
}