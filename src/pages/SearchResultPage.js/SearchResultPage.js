import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../api/API';

import Spinner from '../../components/Spinner/Spinner';


function SearchResultPage() {
  let { type, search } = useParams();

  const [loaded, setLoaded] = useState(false)
  const [searchResult, setsearchResult] = useState([])

  useEffect(() => {
    console.log(type)
    if(type === 'text') {
      // 서치 조회
      API.get(`search/${search}`)
      .then(res => 
        setsearchResult(res.data),
        setLoaded(true)
      ).catch(err => {
        console.log(err.message)
      })
    } else if(type === 'category') {
      // 카테고리 별 조회 
      console.log(search)
    }
  }, [])
  

  return (

    !loaded ?
    <Spinner />

    :

    <div>
      {search} 검색 결과 : 

      {
        searchResult.length == 0 ?
        <div>
          검색 결과가 없습니다
        </div>

        :
        
        <div>
          {
            searchResult.map(res => 
              <div>
                {res.name}
              </div>
            )
          }
        </div>
      }
    </div>
  )
}

export default SearchResultPage
