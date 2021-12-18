import API from "./API";


export const uploadWork = async (navigate, category, title, files, content) => {
  await API.post('uploadWork', {
    category, title, files, content
  })
  .then(res => {
    console.log(res.data)
  })
  .catch(err => {
    console.log(err.message);
    console.log(files);
  })
  navigate('/myPage')
}

export const getWorksList = async (userIdx)  => {
  const data = await API.get(`getWorksList/${userIdx}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    return(
      // []
      [
        {
          "workIdx": 1,
          "title": "work1",
        },
        {
          "workIdx": 2,
          "title": "work2",
        },
        {
          "workIdx": 3,
          "title": "work3",
        },
        {
          "workIdx": 4,
          "title": "work4",
        },
        {
          "workIdx": 5,
          "title": "work5",
        },
      ]
    )
  })
  return data
}

export const getWorkDetail = async (workIdx) => {
  const data = await API.get(`getWork${workIdx}`)
  .then(res => {
    return res.data
  })
  .catch(res => {
    return (
      {
        "workIdx" : 1,
        "photographerIdx" : 1,
        "title" : "작품 이름",
        "content": "작품 설명",
        "category": 1,
        "photos" : [
          "imgUrl1",
          "imgUrl2",
          "imgUrl3"
        ],
      }
    )
  })
  return data
}