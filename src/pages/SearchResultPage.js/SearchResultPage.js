import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Spinner from '../../components/Spinner/Spinner';

import serverAxios from '../../utils/serverAxios';

function SearchResultPage() {
  let { search } = useParams();

  const [loaded, setLoaded] = useState(false)
  const [searchResult, setsearchResult] = useState([])

  useEffect(() => {
    serverAxios.get(`search/${search}`)
    .then(res => 
      setsearchResult(res.data),
      setLoaded(true)
    ).catch(err => {
        console.log(err.message)
    })
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
