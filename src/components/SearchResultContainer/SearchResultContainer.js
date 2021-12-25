import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { categorySearch, textSearch } from '../../api/Search'
import MyInfoCard from '../Cards/MyInfoCard/MyInfoCard'
import Spinner from '../Spinner/Spinner'
import styles from './SearchResultContainer.module.css'

function SearchResultContainer({ type, search }) {
  let navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState()

  const photographerPage = photographerIdx => navigate(`/profile/${photographerIdx}`)

  useEffect(() => {
    const fetchData = async () => {
      type === 'text' && setResult(await textSearch(search))
      type === 'category' && setResult(await categorySearch(parseInt(search)))
      setLoading(false)
    }
    fetchData()
    console.log(result)
  }, [])
  
  return (

    loading ?

      <Spinner />

      :

      <div className={styles.container}>
        {
          result.length ?
            result.map(res =>
              <div onClick={() => photographerPage(res.photographer.photographerIdx)}>
                <MyInfoCard user={res.user} />
              </div>
            )

            :

            <div>
              "{type === 'text' && search}" 에 대한 검색결과가 없습니다 
            </div>
        }
      </div>

  )
}

export default SearchResultContainer
